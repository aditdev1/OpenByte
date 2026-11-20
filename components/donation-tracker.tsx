"use client";

import { useEffect, useId, useState } from "react";

import { DONATE_URL as HCB_DONATION_URL } from "../lib/site-content";
import { GOAL_CENTS, type ConfirmedGift } from "../lib/campaign";
import { useCampaign } from "./use-campaign";

const REFRESH_INTERVAL = 60_000;
const GOAL = GOAL_CENTS / 100;

type PublicDonor = {
  name: string;
  amount_cents: number;
  rank: number;
};

type LeaderboardState = {
  donors: PublicDonor[];
  loading: boolean;
  error: string | null;
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

function LiveStatus({
  error,
  label = "Live from Hack Club Bank",
}: {
  error: string | null;
  label?: string;
}) {
  return (
    <p className={`live-status${error ? " is-error" : ""}`}>
      <span className="live-dot" aria-hidden="true" />
      {error ? "Tracker unavailable" : label}
    </p>
  );
}

function TrackerTabs({
  activeTab,
  onChange,
  tabId,
}: {
  tabId: string;
  activeTab: "total" | "leaderboard";
  onChange: (tab: "total" | "leaderboard") => void;
}) {
  return (
    <div
      className="tracker-tabs"
      role="tablist"
      aria-label="Donation details"
      onKeyDown={(event) => {
        const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
        if (!keys.includes(event.key)) return;
        event.preventDefault();
        const current = activeTab === "total" ? 0 : 1;
        const next =
          event.key === "Home" ? 0 : event.key === "End" ? 1 : 1 - current;
        onChange(next === 0 ? "total" : "leaderboard");
        event.currentTarget
          .querySelectorAll<HTMLButtonElement>('[role="tab"]')
          [next]?.focus();
      }}
    >
      <button
        className={activeTab === "total" ? "is-active" : ""}
        onClick={() => onChange("total")}
        role="tab"
        aria-selected={activeTab === "total"}
        id={`${tabId}-total-tab`}
        aria-controls={`${tabId}-total-panel`}
        tabIndex={activeTab === "total" ? 0 : -1}
        type="button"
      >
        Total raised
      </button>
      <button
        className={activeTab === "leaderboard" ? "is-active" : ""}
        onClick={() => onChange("leaderboard")}
        role="tab"
        aria-selected={activeTab === "leaderboard"}
        id={`${tabId}-leaderboard-tab`}
        aria-controls={`${tabId}-leaderboard-panel`}
        tabIndex={activeTab === "leaderboard" ? 0 : -1}
        type="button"
      >
        Leaderboard
      </button>
    </div>
  );
}

function Leaderboard({
  donations,
  loading,
  error,
  publicDonors,
  publicDonorsError,
}: {
  donations: ConfirmedGift[];
  loading: boolean;
  error: string | null;
  publicDonors: PublicDonor[];
  publicDonorsError: string | null;
}) {
  // Top 10 individual contributions, not the HCB public top-donor podium.
  // The public transaction API does not provide donor identity or consent.
  const topContributions = [...donations]
    .filter((donation) => (donation.amount_cents ?? 0) > 0)
    .sort((a, b) => (b.amount_cents ?? 0) - (a.amount_cents ?? 0))
    .slice(0, 10);
  const largestContribution = topContributions[0]?.amount_cents ?? 1;

  if (loading) {
    return (
      <div className="leaderboard-list" aria-label="Loading top contributions">
        {[1, 2, 3, 4].map((item) => (
          <div className="leaderboard-skeleton" key={item} />
        ))}
      </div>
    );
  }

  if (error || topContributions.length === 0) {
    return (
      <div className="leaderboard-empty">
        <strong>We can&apos;t load the top contributions right now.</strong>
        <span>View the latest donation information on Hack Club Bank.</span>
        <a href={HCB_DONATION_URL} target="_blank" rel="noopener noreferrer">
          Open HCB donation page
        </a>
      </div>
    );
  }

  return (
    <>
      <ol className="leaderboard-list" aria-label="Ten largest contributions">
        {topContributions.map((donation, index) => {
          const amountCents = donation.amount_cents ?? 0;
          const barWidth = Math.max(
            20,
            Math.round((amountCents / largestContribution) * 100),
          );
          const rank = index + 1;
          const rankClass = rank <= 3 ? ` rank-${rank}` : "";

          return (
            <li className="leaderboard-row" key={rank}>
              <span className={`leaderboard-rank${rankClass}`}>{rank}</span>
              <span className="leaderboard-donor">Contribution #{rank}</span>
              <span className="leaderboard-amount">
                {formatCurrency(amountCents / 100)}
              </span>
              <span className="leaderboard-bar" aria-hidden="true">
                <span style={{ width: `${barWidth}%` }} />
              </span>
            </li>
          );
        })}
      </ol>

      <div className="public-donor-section">
        <div className="public-donor-heading">
          Publicly recognized supporters
        </div>
        {publicDonors.length > 0 ? (
          <ol className="public-donor-list" aria-label="Publicly named donors">
            {publicDonors.map((donor) => (
              <li key={donor.rank}>
                <span>{donor.name}</span>
                <strong>{formatCurrency(donor.amount_cents / 100)}</strong>
              </li>
            ))}
          </ol>
        ) : (
          <p className="public-donor-caption">
            {publicDonorsError
              ? "Public donor names are temporarily unavailable."
              : "Loading names donors chose to publish on HCB."}
          </p>
        )}
        <p className="public-donor-caption">
          HCB only publishes the names of supporters who choose public
          recognition. The Top 10 above ranks individual gifts, not unique
          donors.
        </p>
      </div>
    </>
  );
}

export function DonationTracker() {
  const tabId = useId();
  const [activeTab, setActiveTab] = useState<"total" | "leaderboard">("total");
  const state = useCampaign();
  const [leaderboardState, setLeaderboardState] = useState<LeaderboardState>({
    donors: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;
    let controller = new AbortController();

    const loadLeaderboard = async () => {
      try {
        const response = await fetch("/hcb-donors.json", {
          signal: controller.signal,
          cache: "no-store",
        });
        if (!response.ok) throw new Error("Public HCB leaderboard unavailable");

        const data: unknown = await response.json();
        if (
          !data ||
          typeof data !== "object" ||
          !("donors" in data) ||
          !Array.isArray(data.donors)
        ) {
          throw new Error("Unexpected HCB leaderboard response");
        }
        const donors = data.donors as PublicDonor[];
        if (
          donors.length === 0 ||
          !donors.every(
            (donor) =>
              typeof donor.name === "string" &&
              Number.isSafeInteger(donor.amount_cents) &&
              Number.isInteger(donor.rank),
          )
        ) {
          throw new Error("Invalid HCB donor rankings");
        }

        if (mounted)
          setLeaderboardState({ donors, loading: false, error: null });
      } catch (error) {
        if (
          !mounted ||
          (error instanceof DOMException && error.name === "AbortError")
        ) {
          return;
        }
        setLeaderboardState({
          donors: [],
          loading: false,
          error: "HCB's public donor rankings are temporarily unavailable.",
        });
      }
    };

    void loadLeaderboard();
    const interval = window.setInterval(() => {
      controller.abort();
      controller = new AbortController();
      void loadLeaderboard();
    }, REFRESH_INTERVAL);

    return () => {
      mounted = false;
      controller.abort();
      window.clearInterval(interval);
    };
  }, []);

  const totalRaised = state.totalCents / 100;
  const progress = Math.min(Math.round((totalRaised / GOAL) * 100), 100);

  return (
    <aside className="tracker-card" aria-label="OpenByte donation tracker">
      <div className="tracker-intro">
        <span className="tracker-label">Live donation data</span>
        <h2>Community funding</h2>
        <p>
          Totals and largest gifts come from confirmed HCB campaign donations. Public
          donor names follow HCB&apos;s recognition settings.
        </p>
      </div>

      <TrackerTabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabId={tabId}
      />

      {activeTab === "total" ? (
        <div
          className="tracker-panel"
          role="tabpanel"
          tabIndex={0}
          id={`${tabId}-${activeTab}-panel`}
          aria-labelledby={`${tabId}-${activeTab}-tab`}
        >
          <LiveStatus error={state.error} />
          <div className="raised-value" aria-live="polite">
            <span>$</span>
            {state.loading || state.error ? "—" : totalRaised.toFixed(2)}
          </div>
          <div className="progress-track" aria-hidden="true">
            <span
              style={{
                width: `${state.loading || state.error ? 0 : progress}%`,
              }}
            />
          </div>
          <div className="progress-meta">
            <span>
              {state.error
                ? "Live total unavailable"
                : state.loading
                  ? "Loading"
                  : `${progress}% funded`}
            </span>
            <span>Goal: {formatCurrency(GOAL)}</span>
          </div>
          <div className="donor-count">
            <strong>
              {state.loading || state.error ? "—" : state.donations.length}
            </strong>
            <span>donations received</span>
          </div>
          {state.error ? <p className="tracker-error">{state.error}</p> : null}
        </div>
      ) : (
        <div
          className="tracker-panel"
          role="tabpanel"
          tabIndex={0}
          id={`${tabId}-${activeTab}-panel`}
          aria-labelledby={`${tabId}-${activeTab}-tab`}
        >
          <LiveStatus error={state.error} label="Live HCB contributions" />
          <div className="leaderboard-heading">
            <div>
              <span className="tracker-label">Top 10 contributions</span>
              <p>Largest individual gifts, including gifts made anonymously.</p>
            </div>
            <span className="leaderboard-count">
              {state.loading
                ? "Loading"
                : `Top ${Math.min(10, state.donations.length)}`}
            </span>
          </div>
          <Leaderboard
            donations={state.donations}
            loading={state.loading}
            error={state.error}
            publicDonors={leaderboardState.donors}
            publicDonorsError={leaderboardState.error}
          />
        </div>
      )}
    </aside>
  );
}
