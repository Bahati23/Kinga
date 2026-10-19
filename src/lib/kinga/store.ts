import { useSyncExternalStore } from 'react';
import { seedState } from './seed';
import type {
  AuditEntry,
  CaseStatus,
  KingaCase,
  KingaState,
  OrgStatus,
  ServiceCapacity,
  SignalInput,
} from './types';

/**
 * Kinga demo data layer.
 *
 * In production this is replaced by the NestJS + PostgreSQL backend described
 * in the project specification. For the prototype, state lives in the browser
 * (localStorage) and every sensitive action is mirrored into an audit log,
 * demonstrating FR12 (immutable audit trail) end-to-end.
 */

const STORAGE_KEY = 'kinga:state:v1';

function uid(prefix: string): string {
  const rand =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
  return `${prefix}-${rand}`;
}

function load(): KingaState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as KingaState;
      if (
        Array.isArray(parsed.cases) &&
        Array.isArray(parsed.services) &&
        typeof parsed.seq === 'number'
      ) {
        return parsed;
      }
    }
  } catch {
    // corrupted storage — fall through to seeds
  }
  return seedState();
}

let state: KingaState = load();
const listeners = new Set<() => void>();

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage unavailable — session-only state
  }
}

function setState(next: KingaState) {
  state = next;
  persist();
  listeners.forEach((listener) => listener());
}

function subscribe(fn: () => void): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function useKinga(): KingaState {
  return useSyncExternalStore(subscribe, () => state);
}

export function getKingaState(): KingaState {
  return state;
}

function auditEntry(actor: string, action: string, resource: string): AuditEntry {
  return { id: uid('aud'), at: Date.now(), actor, action, resource };
}

// ---------------------------------------------------------------------------
// Signals (FR3 — risk signalling)
// ---------------------------------------------------------------------------

export function submitSignal(input: SignalInput): string {
  const now = Date.now();
  const reference = `KNG-${state.seq}`;
  const urgent = input.riskLevel === 'urgent';
  const via =
    input.channel === 'ussd' ? 'USSD' : input.channel === 'sms' ? 'SMS' : 'web';

  const newCase: KingaCase = {
    id: uid('case'),
    reference,
    riskCategory: input.riskCategory,
    riskLevel: input.riskLevel,
    status: 'new',
    channel: input.channel,
    reporter: input.reporter,
    preferredContact: input.preferredContact,
    consentToRefer: input.consentToRefer,
    county: input.county,
    createdAt: now,
    updatedAt: now,
    events: [
      {
        at: now,
        actor: 'System',
        action: `Signal received via ${via}${input.reporter === 'concerned-other' ? ' from a concerned person' : ''}${urgent ? ' — marked urgent' : ''}`,
      },
    ],
  };

  setState({
    ...state,
    seq: state.seq + 1,
    cases: [newCase, ...state.cases],
    audit: [
      auditEntry('System', `Signal received (${input.riskLevel} risk, ${via})`, reference),
      ...state.audit,
    ],
  });

  return reference;
}

// ---------------------------------------------------------------------------
// Case workflow (FR6 assignment, FR7 escalation, FR8 case management)
// ---------------------------------------------------------------------------

function updateCase(
  id: string,
  actor: string,
  action: string,
  patch: Partial<KingaCase>,
  auditAction?: string,
) {
  const now = Date.now();
  let reference = id;
  const cases = state.cases.map((c) => {
    if (c.id !== id) return c;
    reference = c.reference;
    return {
      ...c,
      ...patch,
      updatedAt: now,
      events: [...c.events, { at: now, actor, action }],
    };
  });

  setState({
    ...state,
    cases,
    audit: [auditEntry(actor, auditAction ?? action, reference), ...state.audit],
  });
}

export function assignCase(id: string, responderId: string, actor = 'Duty Coordinator') {
  const responder = state.responders.find((r) => r.id === responderId);
  if (!responder) return;
  updateCase(
    id,
    actor,
    `Case assigned to ${responder.name} (${responder.role})`,
    { status: 'assigned', assignedResponderId: responderId },
    `Assigned case to ${responder.name}`,
  );
}

export function acceptCase(id: string, actor: string) {
  updateCase(id, actor, 'Case accepted — safe contact being established', {
    status: 'in-progress',
  });
}

export function escalateCase(id: string, actor: string) {
  updateCase(
    id,
    actor,
    'Escalated to safeguarding officer for coordinated intervention',
    { status: 'escalated' },
    'Escalated case to safeguarding desk',
  );
}

export function referCase(id: string, serviceId: string, actor: string) {
  const service = state.services.find((s) => s.id === serviceId);
  if (!service) return;
  const org = state.organisations.find((o) => o.id === service.organisationId);
  updateCase(
    id,
    actor,
    `Referred to ${service.name}${org ? ` (${org.name})` : ''}`,
    { status: 'referred', referralServiceId: serviceId },
    `Created referral to ${service.name}`,
  );
}

export function closeCase(id: string, actor: string, outcome: string) {
  const trimmed = outcome.trim();
  updateCase(
    id,
    actor,
    `Closed — ${trimmed || 'referral pathway completed'}`,
    { status: 'closed', note: trimmed || undefined },
    'Closed case',
  );
}

export function markUnreachable(id: string, actor: string) {
  updateCase(
    id,
    actor,
    'Marked unable to reach — will retry through agreed channel',
    { status: 'unreachable' },
    'Marked case unable to reach',
  );
}

export function addCaseNote(id: string, actor: string, note: string) {
  const trimmed = note.trim();
  if (!trimmed) return;
  updateCase(id, actor, 'Safeguarding note added', { note: trimmed }, 'Added case note');
}

export function setCaseStatus(id: string, status: CaseStatus, actor: string) {
  updateCase(id, actor, `Status changed to ${status}`, { status });
}

// ---------------------------------------------------------------------------
// Administration (FR9 service directory, FR10 organisation management)
// ---------------------------------------------------------------------------

export function setOrgStatus(orgId: string, status: OrgStatus, actor = 'Platform Admin') {
  const org = state.organisations.find((o) => o.id === orgId);
  if (!org) return;
  setState({
    ...state,
    organisations: state.organisations.map((o) => (o.id === orgId ? { ...o, status } : o)),
    audit: [
      auditEntry(
        actor,
        status === 'active'
          ? 'Verified and activated organisation'
          : status === 'suspended'
            ? 'Suspended organisation'
            : 'Moved organisation to pending review',
        org.name,
      ),
      ...state.audit,
    ],
  });
}

export function setResponderVerified(responderId: string, verified: boolean, actor = 'Platform Admin') {
  const responder = state.responders.find((r) => r.id === responderId);
  if (!responder) return;
  setState({
    ...state,
    responders: state.responders.map((r) =>
      r.id === responderId ? { ...r, verified } : r,
    ),
    audit: [
      auditEntry(
        actor,
        verified ? 'Verified responder identity and training' : 'Revoked responder verification',
        responder.name,
      ),
      ...state.audit,
    ],
  });
}

export function setServiceActive(serviceId: string, active: boolean, actor = 'Platform Admin') {
  const service = state.services.find((s) => s.id === serviceId);
  if (!service) return;
  setState({
    ...state,
    services: state.services.map((s) => (s.id === serviceId ? { ...s, active } : s)),
    audit: [
      auditEntry(actor, active ? 'Activated referral service' : 'Deactivated referral service', service.name),
      ...state.audit,
    ],
  });
}

export function setServiceCapacity(serviceId: string, capacity: ServiceCapacity, actor = 'Org Admin') {
  const service = state.services.find((s) => s.id === serviceId);
  if (!service) return;
  setState({
    ...state,
    services: state.services.map((s) => (s.id === serviceId ? { ...s, capacity } : s)),
    audit: [
      auditEntry(actor, `Updated service capacity to ${capacity}`, service.name),
      ...state.audit,
    ],
  });
}

// ---------------------------------------------------------------------------
// Demo helpers
// ---------------------------------------------------------------------------

export function resetDemo() {
  setState(seedState());
}
