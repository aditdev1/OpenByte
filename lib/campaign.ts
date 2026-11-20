export const GOAL_CENTS = 500_000;

// Sept 14 is the date of the first gift included in HCB's current $5,000
// campaign. The two earlier deposits ($2 and $20) precede this goal.
const FIRST_GIFT_DATE = "2026-09-14T00:00:00Z";
const endpoint = "https://hcb.hackclub.com/api/v3/organizations/openbyte-non-profit/donations";

export type ConfirmedGift = { amount_cents: number };

export async function fetchCampaignGifts(signal: AbortSignal): Promise<ConfirmedGift[]> {
  const gifts: ConfirmedGift[] = [];
  const seen = new Set<string>();
  const pageSize = 100;
  let expectedTotal: number | undefined;

  for (let page = 1; ; page++) {
    const response = await fetch(`${endpoint}?per_page=${pageSize}&page=${page}`, {
      signal, cache: "no-store", credentials: "omit",
    });
    if (!response.ok) throw new Error("HCB donations unavailable");
    const records: unknown = await response.json();
    if (!Array.isArray(records)) throw new Error("Invalid HCB response");
    const total = response.headers.get("x-total");
    if (total !== null) {
      if (!/^\d+$/.test(total) || (expectedTotal !== undefined && expectedTotal !== Number(total))) {
        throw new Error("HCB pagination changed during refresh");
      }
      expectedTotal = Number(total);
    }
    for (const record of records) {
      if (!record || record.object !== "donation" || typeof record.id !== "string" ||
          seen.has(record.id) || typeof record.status !== "string") {
        throw new Error("Invalid or repeated HCB donation");
      }
      seen.add(record.id);
      if (record.status !== "deposited") continue;
      const created = Date.parse(record.date);
      if (!Number.isFinite(created) || !Number.isSafeInteger(record.amount_cents) || record.amount_cents < 0) {
        throw new Error("Invalid confirmed gift");
      }
      if (created >= Date.parse(FIRST_GIFT_DATE) && record.amount_cents > 0) {
        gifts.push({ amount_cents: record.amount_cents });
      }
    }
    if (records.length < pageSize) {
      if (expectedTotal !== undefined && seen.size !== expectedTotal) throw new Error("Incomplete HCB result");
      return gifts;
    }
  }
}
