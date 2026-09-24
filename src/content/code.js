// Code specimens. Each one is placed next to a claim that's already been made
// in plain language — the code is the evidence, never the argument. A buyer
// who skips every one of these should lose nothing.

export const specimens = {
  fieldMap: {
    file: "maps/customer.ts",
    caption: "A mapping is data, so changing one is a reviewable diff.",
    code: `// Which system owns which field is a business decision.
// So it lives here, in review, not buried in a function.
export const customer = defineMap({
  source: "netsuite.customer",
  target: "hubspot.company",
  key: { external: "entityid" },

  fields: {
    companyname: "name",
    baseprice: "price",
    qtyavailable: "inventory",
    email: ownedBy("crm"),
  },

  onConflict: "source-wins",
});`,
  },

  retry: {
    file: "sync/write.ts",
    caption: "The failure path gets the same care as the happy path.",
    code: `const result = await withRetry(
  () => hubspot.batchUpsert(records),
  { attempts: 3, backoff: "exponential" }
);

if (!result.ok) {
  // Not a log line nobody reads. A row, with the payload
  // attached, so the fix is a replay and not a re-import.
  await deadLetter.put({
    records,
    reason: result.error.message,
    retryable: result.error.retryable,
  });

  await notify.daily("sync.failed", result.error);
}`,
  },

  reconcile: {
    file: "jobs/reconcile.ts",
    caption: "This job is why a silent failure can't run for six weeks.",
    code: `// Nightly. Compares both systems field by field and
// reports disagreement — before a person finds it.
const drift = await compare({
  left: erp.checksum(SYNCED_FIELDS),
  right: crm.checksum(SYNCED_FIELDS),
});

if (drift.length > 0) {
  await report({
    count: drift.length,
    sample: drift.slice(0, 20),
    since: lastCleanRun,
  });
}`,
  },

  constraint: {
    file: "scheduling/move.ts",
    caption: "Checked twice: once for speed, once because it's true.",
    code: `// The browser checks so the drag feels instant.
// The server checks because a stale phone will
// otherwise happily schedule the impossible.
export function canMove(visit, to) {
  const blockers = visit.dependsOn
    .filter((dep) => dep.completesAfter(to));

  if (blockers.length) {
    return refuse(\`Blocked by \${blockers[0].name}\`);
  }

  return allow();
}`,
  },
};

export const getSpecimen = (key) => specimens[key];
