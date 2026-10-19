import type { KingaCase, KingaState, Service } from './types';

/**
 * Kinga referral engine (prototype implementation of spec §9).
 *
 * Matches a case to verified services using, in priority order:
 *   1. Eligibility   — service is active, organisation is verified/active,
 *                      the service handles this risk category, capacity > full
 *   2. Geography     — county-level coverage (never precise location)
 *   3. Capacity      — available > limited
 *   4. Accessibility — disability-access and language features
 *   5. Availability  — 24/7 services preferred for urgent cases
 *
 * The final decision always rests with a trained human responder; the engine
 * only ranks and explains options.
 */

export type ReasonKind = 'county' | 'capacity' | 'limited' | 'access' | 'hours';

export interface ServiceMatch {
  service: Service;
  organisationName: string;
  score: number;
  /** Machine-readable reason kinds — rendered through i18n as engine.<kind> */
  reasons: ReasonKind[];
  inCounty: boolean;
}

export function matchServices(state: KingaState, kase: KingaCase): ServiceMatch[] {
  const matches: ServiceMatch[] = [];

  for (const service of state.services) {
    if (!service.active) continue;
    if (service.capacity === 'full') continue;
    if (!service.handlesCategories.includes(kase.riskCategory)) continue;

    const org = state.organisations.find((o) => o.id === service.organisationId);
    if (!org || org.status !== 'active') continue;

    let score = 0;
    const reasons: ReasonKind[] = [];

    const inCounty = service.counties.includes(kase.county);
    if (inCounty) {
      score += 5;
      reasons.push('county');
    }

    if (service.capacity === 'available') {
      score += 3;
      reasons.push('capacity');
    } else {
      score += 1;
      reasons.push('limited');
    }

    if (service.accessibility.length > 0) {
      score += Math.min(service.accessibility.length, 2);
      reasons.push('access');
    }

    if (service.hours.includes('24/7')) {
      score += kase.riskLevel === 'urgent' ? 3 : 1;
      reasons.push('hours');
    }

    if (kase.riskLevel === 'urgent' && !inCounty) {
      // For urgent cases, out-of-county services are a weak match only.
      score -= 2;
    }

    matches.push({ service, organisationName: org.name, score, reasons, inCounty });
  }

  return matches.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    // Stable secondary sort: in-county first
    return Number(b.inCounty) - Number(a.inCounty);
  });
}

/** Suggest a responder for a case (verified, covers county, fewest open cases). */
export function suggestResponder(state: KingaState, kase: KingaCase) {
  const openByResponder = new Map<string, number>();
  for (const c of state.cases) {
    if (
      c.assignedResponderId &&
      ['assigned', 'in-progress', 'escalated'].includes(c.status)
    ) {
      openByResponder.set(
        c.assignedResponderId,
        (openByResponder.get(c.assignedResponderId) ?? 0) + 1,
      );
    }
  }

  const eligible = state.responders.filter(
    (r) => r.verified && r.counties.includes(kase.county),
  );
  const pool = eligible.length > 0 ? eligible : state.responders.filter((r) => r.verified);

  return [...pool].sort(
    (a, b) => (openByResponder.get(a.id) ?? 0) - (openByResponder.get(b.id) ?? 0),
  );
}
