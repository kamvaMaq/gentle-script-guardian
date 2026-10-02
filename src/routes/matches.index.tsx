import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { LiveMatchCard, TeamLogo, UpcomingCard } from "@/components/psl";
import { matches, teams } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/matches/")({
  head: () => ({
    meta: [
      { title: "Matches — Betway Premiership" },
      { name: "description", content: "Live scores, upcoming fixtures and results from the Betway Premiership." },
      { property: "og:title", content: "Matches — Betway Premiership" },
      { property: "og:description", content: "Live scores, fixtures and results." },
    ],
  }),
  component: MatchesTab,
});

const filters = ["live", "upcoming", "ft"] as const;
const labels = { live: "🔴 Live", upcoming: "Upcoming", ft: "Results" };

function MatchesTab() {
  const [f, setF] = useState<(typeof filters)[number]>("live");
  const list = matches.filter((m) => m.status === f);
  return (
    <div className="p-4">
      <div className="mb-4 grid grid-cols-3 gap-1 rounded-xl bg-card p-1">
        {filters.map((k) => (
          <button key={k} onClick={() => setF(k)} className={cn("rounded-lg py-2 font-display text-sm font-bold uppercase", f === k ? "bg-primary text-primary-foreground" : "text-muted-foreground")}>{labels[k]}</button>
        ))}
      </div>
      <div className="space-y-3">
        {f === "live" && list.map((m) => <LiveMatchCard key={m.id} match={m} expanded />)}
        {f === "upcoming" && list.map((m) => <UpcomingCard key={m.id} match={m} expanded />)}
        {f === "ft" && list.map((m) => (
          <Link key={m.id} to="/matches/$id" params={{ id: m.id }} className="card-hover flex items-center justify-between rounded-xl border bg-card p-3">
            <div className="flex w-24 items-center gap-2"><TeamLogo team={m.home} size={26} /><span className="font-semibold">{teams[m.home].short}</span></div>
            <div className="text-center">
              <div className="font-display text-2xl font-black">{m.hs} – {m.as}</div>
              <div className="text-[11px] text-muted-foreground">FT · {m.date}</div>
            </div>
            <div className="flex w-24 items-center justify-end gap-2"><span className="font-semibold">{teams[m.away].short}</span><TeamLogo team={m.away} size={26} /></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
