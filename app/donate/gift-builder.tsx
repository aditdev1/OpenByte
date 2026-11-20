"use client";

import { useState } from "react";
import { LockSimple } from "@phosphor-icons/react/dist/csr/LockSimple";
import { useCampaign } from "../../components/use-campaign";
import { GOAL_CENTS } from "../../lib/campaign";
import { DONATE_URL } from "../../lib/site-content";
import s from "./donate.module.css";

const tiers = [
  { id: "5kRhbX", name: "Supporter", dollars: 5, perk: "A personal thank-you email from our team." },
  { id: "goLhq6", name: "Bronze", dollars: 25, perk: "Supporter benefits, plus an optional Instagram Story shoutout and Monthly Supporters highlight." },
  { id: "8pMh2R", name: "Silver", dollars: 50, perk: "Bronze benefits, plus an optional appreciation post on social media." },
  { id: "5R0hPW", name: "Gold", dollars: 100, perk: "Silver benefits, plus a dedicated appreciation post and priority recognition." },
  { id: "59mh0o", name: "Community Champion", dollars: 200, perk: "Gold benefits, plus a personal thank-you video and a featured supporter spotlight." },
];

function currency(cents: number) {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency", currency: "USD", minimumFractionDigits: cents % 100 ? 2 : 0,
  });
}

const percentFormat = new Intl.NumberFormat("en-US", {
  style: "percent", maximumFractionDigits: 1,
});

function goalShare(cents: number) {
  if (cents > 0 && cents * 1000 < GOAL_CENTS) return "<0.1%";
  const rounded = percentFormat.format(cents / GOAL_CENTS);
  if (rounded === "100%" && cents < GOAL_CENTS) return ">99.9%";
  return rounded;
}

export function GiftBuilder() {
  const campaign = useCampaign();
  const [monthly, setMonthly] = useState(false);
  const [tierId, setTierId] = useState("");
  const [amount, setAmount] = useState("25");
  const tier = monthly ? tiers.find(item => item.id === tierId) : undefined;
  const cents = tier ? tier.dollars * 100 : Math.round(Number(amount) * 100);
  const valid = !!tier || (/^\d+(?:\.\d{1,2})?$/.test(amount) && cents >= 100 && cents <= 99_999_999);
  const known = !campaign.loading && !campaign.error;
  const confirmed = campaign.totalCents;
  const width = Math.min(100, confirmed / GOAL_CENTS * 100);
  const extraWidth = valid ? Math.min(100 - width, cents / GOAL_CENTS * 100) : 0;
  const remaining = GOAL_CENTS - confirmed - cents;
  const checkout = new URL(`${DONATE_URL}/tiers/${tier?.id ?? "custom"}`);
  if (!tier && valid) {
    checkout.searchParams.set("amount", String(cents));
    if (monthly) checkout.searchParams.set("monthly", "true");
  }
  return (
    <section className={s.panel} aria-label="Make a donation">
      <div className={s.goal}>
        <p className={s.eyebrow}>Community fundraising goal</p>
        <p className={s.total}><strong>{known ? currency(confirmed) : "—"}</strong> <span>of {currency(GOAL_CENTS)}</span></p>
        {known ? (
          <>
            <div className={s.track} role="meter" aria-label="Confirmed fundraising progress" aria-valuemin={0} aria-valuemax={GOAL_CENTS / 100} aria-valuenow={Math.min(confirmed, GOAL_CENTS) / 100} aria-valuetext={`${currency(confirmed)} confirmed of ${currency(GOAL_CENTS)}, ${goalShare(confirmed)} funded`}>
              <span style={{ width: `${width}%` }} /><i style={{ width: `${extraWidth}%` }} />
            </div>
            <div className={s.key}>
              <span>{goalShare(confirmed)} funded</span>
              {valid && <span>Your gift · {goalShare(cents)} of goal</span>}
            </div>
          </>
        ) : <p className={s.small} role="status">{campaign.loading ? "Loading confirmed gifts…" : "Live total unavailable. You can still give securely through HCB."}</p>}
      </div>
      <h2 className={s.formTitle}>Choose your gift</h2>
      <div className={s.toggle} role="group" aria-label="Gift frequency">
        <button type="button" aria-pressed={!monthly} onClick={() => setMonthly(false)}>One-time</button>
        <button type="button" aria-pressed={monthly} onClick={() => setMonthly(true)}>Monthly</button>
      </div>
      {monthly && (
        <div className={s.field}>
          <label htmlFor="tier">Monthly supporter tier</label>
          <select id="tier" value={tierId} onChange={e => setTierId(e.target.value)}>
            <option value="">Custom monthly gift</option>
            {tiers.map(item => <option key={item.id} value={item.id}>{item.name} · ${item.dollars}/month</option>)}
          </select>
          {tier && <p className={s.small}>{tier.perk}</p>}
        </div>
      )}
      {!tier && (
        <div className={s.field}>
          <label htmlFor="gift-amount">{monthly ? "Monthly amount" : "Gift amount"}</label>
          <div className={s.presets} role="group" aria-label="Suggested amounts">
            {[10, 25, 50, 100].map(dollars => <button key={dollars} type="button" aria-pressed={valid && cents === dollars * 100} onClick={() => setAmount(String(dollars))}>${dollars}</button>)}
          </div>
          <div className={s.inputWrap}><span aria-hidden="true">$</span>
            <input id="gift-amount" type="text" inputMode="decimal" autoComplete="off" value={amount} onChange={e => setAmount(e.target.value)} aria-invalid={!valid} aria-describedby={valid ? undefined : "amount-error"} />
            <span aria-hidden="true">USD</span>
          </div>
          {!valid && <p id="amount-error" className={s.error}>Enter $1 to $999,999.99 with up to two decimal places.</p>}
        </div>
      )}
      <div className={s.preview} aria-live="polite" aria-atomic="true">
        <strong>Gift impact preview</strong>
        {valid ? (
          <p>
            Your {monthly ? "first monthly payment" : "gift"} of <b>{currency(cents)}</b> would cover <b>{goalShare(cents)}</b> of our goal.
            {known && <> That would bring us to <b>{goalShare(confirmed + cents)} funded</b> ({currency(confirmed + cents)}).
              {remaining > 0 ? ` ${currency(remaining)} would remain.` : confirmed < GOAL_CENTS ? " That would reach our goal." : ""}</>}
          </p>
        ) : <p>Enter a valid amount to preview your gift.</p>}
      </div>
      {valid ? <a href={checkout.href} className={s.checkout}><LockSimple size={18} aria-hidden="true" />Continue to HCB checkout</a>
        : <button type="button" disabled className={s.checkout}>Continue to HCB checkout</button>}
      <p className={s.note}>HCB handles payment details and emails your receipt. Confirmed deposits update the total automatically.</p>
      <noscript><p><a href={DONATE_URL}>Choose your amount and frequency directly on HCB.</a></p></noscript>
    </section>
  );
}
