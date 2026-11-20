"use client";

import { useEffect, useState } from "react";
import { fetchCampaignGifts, type ConfirmedGift } from "../lib/campaign";

export function useCampaign() {
  const [state, setState] = useState<{ donations: ConfirmedGift[]; loading: boolean; error: string | null }>({
    donations: [], loading: true, error: null,
  });
  useEffect(() => {
    let controller: AbortController;
    async function refresh() {
      controller?.abort();
      const request = new AbortController();
      controller = request;
      const timeout = window.setTimeout(() => request.abort(), 15_000);
      try {
        const donations = await fetchCampaignGifts(request.signal);
        if (!request.signal.aborted) setState({ donations, loading: false, error: null });
      } catch {
        if (controller === request && active) {
          setState({ donations: [], loading: false, error: "The live HCB total is temporarily unavailable." });
        }
      } finally {
        window.clearTimeout(timeout);
      }
    }
    let active = true;
    function refreshWhenVisible() {
      if (document.visibilityState === "visible") void refresh();
    }
    void refresh();
    const timer = window.setInterval(refreshWhenVisible, 60_000);
    document.addEventListener("visibilitychange", refreshWhenVisible);
    window.addEventListener("pageshow", refreshWhenVisible);
    return () => {
      active = false;
      controller.abort();
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", refreshWhenVisible);
      window.removeEventListener("pageshow", refreshWhenVisible);
    };
  }, []);
  const totalCents = state.donations.reduce((sum, gift) => sum + gift.amount_cents, 0);
  return { ...state, totalCents };
}
