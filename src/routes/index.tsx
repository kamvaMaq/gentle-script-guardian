import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { LiveMatchCard, SectionTitle, TeamLogo, UpcomingCard } from "@/components/psl";
import { catColor, matches, news, scorers, standings, teams } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Betway Premiership — Official PSL App" },
      { name: "description", content: "Live scores, fixtures, standings, fantasy and news from South Africa's Betway Premiership." },
      { property: "og:title", content: "Betway Premiership — Official PSL App" },
      { property: "og:description", content: "Live scores, fixtures, standings, fantasy and news from the PSL." },
    ],
  }),
  component: Home,
});

function Home() {
  const [banner, setBanner] = useState(true);
  const [remind, setRemind] = useState(false);
  const derby = matches.find((m) => m.id === "ama-arr")!;
  return (
    <div className="space-y-7 p-4">
      {banner && (
        <div className="bg-derby relative rounded-xl p-4">
          <button onClick={() => setBanner(false)} aria-label="Dismiss" className="absolute right-3 top-2 text-xl text-foreground/70">×</button>
          <div className="font-display text-sm font-bold uppercase tracking-widest">🔥 Durban Derby</div>
          <div className="my-3 flex items-center justify-center gap-4">
            <TeamLogo team="AMA" size={44} />
            <span className="font-display text-2xl font-black">VS</span>
            <TeamLogo team="ARR" size={44} />
          </div>
          <div className="text-center text-sm">{derby.date} · {derby.time} SAST · {derby.venue}</div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button className="rounded-lg bg-live py-2 font-display font-bold uppercase">Get Tickets</button>
            <button onClick={() => setRemind(true)} className="rounded-lg border border-foreground/30 py-2 font-display font-bold uppercase">
              {remind ? "✓ Reminder Set" : "Remind Me"}
            </button>
          </div>
        </div>
      )}

      <section>
        <SectionTitle live>Live Now</SectionTitle>
        <div className="space-y-3">{matches.filter((m) => m.status === "live").map((m) => <LiveMatchCard key={m.id} match={m} />)}</div>
      </section>

      <section>
        <SectionTitle>Top Scorers</SectionTitle>
        <div className="divide-y rounded-xl border bg-card">
          {scorers.slice(0, 5).map((s, i) => (
            <div key={s.name} className="flex items-center gap-3 px-3 py-2.5">
              <span className={cn("flex h-7 w-7 items-center justify-center rounded-full font-display font-black",
                i === 0 ? "bg-gold text-background" : i === 1 ? "bg-silver text-background" : i === 2 ? "bg-bronze text-background" : "bg-secondary")}>{i + 1}</span>
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: teams[s.team]!.color }} />
              <div className="flex-1">
                <div className="text-sm font-semibold">{s.name} {s.flag}</div>
                <div className="text-xs text-muted-foreground">{teams[s.team]!.name}</div>
              </div>
              <div className="text-right">
                <div className="font-display text-xl font-black text-primary">{s.goals}</div>
                <div className="text-[11px] text-muted-foreground">{s.assists} ast</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>Coming Up</SectionTitle>
        <div className="space-y-2">{matches.filter((m) => m.status === "upcoming").map((m) => <UpcomingCard key={m.id} match={m} />)}</div>
      </section>

      <section>
        <div className="flex items-center justify-between"><SectionTitle>Table</SectionTitle><Link to="/table" className="mb-3 text-xs font-bold text-primary">FULL TABLE →</Link></div>
        <div className="overflow-hidden rounded-xl border bg-card text-sm">
          <div className="grid grid-cols-[24px_1fr_32px_40px_40px] gap-2 px-3 py-2 text-xs text-muted-foreground"><span>#</span><span>Club</span><span>P</span><span>GD</span><span>Pts</span></div>
          {standings.slice(0, 5).map((r, i) => (
            <div key={r.team} className={cn("grid grid-cols-[24px_1fr_32px_40px_40px] items-center gap-2 border-l-4 border-t px-3 py-2", i < 2 ? "border-l-primary" : "border-l-transparent")}>
              <span className="font-display font-bold">{i + 1}</span>
              <span className="flex items-center gap-2"><TeamLogo team={r.team} size={20} />{teams[r.team]!.short}</span>
              <span>{r.p}</span><span>{r.gf - r.ga > 0 ? "+" : ""}{r.gf - r.ga}</span>
              <span className="font-display font-black">{r.pts}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>Latest News</SectionTitle>
        <div className="space-y-2">
          {news.slice(0, 4).map((n) => (
            <Link key={n.id} to="/news/$id" params={{ id: n.id }} className="card-hover flex gap-3 rounded-xl border bg-card p-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-secondary text-2xl">{n.emoji}</div>
              <div>
                <span className={cn("rounded px-1.5 py-0.5 text-[10px] font-bold uppercase", catColor[n.cat])}>{n.cat}{n.hot && " 🔥"}</span>
                <div className="mt-1 text-sm font-semibold leading-snug">{n.title}</div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">{n.author} · {n.ago}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
