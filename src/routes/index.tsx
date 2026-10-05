import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { LiveMatchCard, NextMatch, NoLiveMatches, SectionTitle, SponsorsStrip, TeamLogo, UpcomingCard } from "@/components/psl";
import { catColor, matches, news, scorers, standings, teams } from "@/lib/data";
import { cn } from "@/lib/utils";
import { CircleDot, Flame, Ticket } from "lucide-react";
import { NewsIcon } from "@/components/psl";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Betway Premiership — Official PSL App" },
      { name: "description", content: "2026/27 Betway Premiership live scores, fixtures, standings, fantasy and news." },
      { property: "og:title", content: "Betway Premiership — Official PSL App" },
      { property: "og:description", content: "Live scores, fixtures, standings, fantasy and news from the PSL." },
    ],
  }),
  component: Home,
});

function Home() {
  const [banner, setBanner] = useState(true);
  const live = matches.filter((m) => m.status === "live");
  const upcoming = matches.filter((m) => m.status === "upcoming");
    return (
    <div className="space-y-7 p-4">
      {banner && (
        <div className="bg-derby relative rounded-xl p-4">
          <button onClick={() => setBanner(false)} aria-label="Dismiss" className="absolute right-3 top-2 text-xl text-foreground/70">×</button>
          <div className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-widest"><CircleDot size={16} /> MTN8 Final</div>
          <div className="my-3 flex items-center justify-center gap-4">
            <TeamLogo team="ORL" size={48} />
            <span className="font-display text-2xl font-black">VS</span>
            <TeamLogo team="SUN" size={48} />
          </div>
          <div className="text-center font-display text-lg font-bold uppercase">Orlando Pirates vs Mamelodi Sundowns</div>
          <div className="text-center text-sm text-foreground/80">Moses Mabhida Stadium, Durban</div>
          <div className="mt-3 flex items-center justify-center gap-2 font-display font-bold uppercase"><Ticket size={16} /> Tickets Sold Out</div>
        </div>
      )}

      {live.length > 0 ? (
        <section>
          <SectionTitle live>Live Now</SectionTitle>
          <div className="space-y-3">{live.map((m) => <LiveMatchCard key={m.id} match={m} />)}</div>
        </section>
      ) : (
        <section className="space-y-3">
          <NoLiveMatches />
          {upcoming[0] && <NextMatch match={upcoming[0]} />}
        </section>
      )}

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
        <div className="space-y-2">{upcoming.slice(live.length ? 0 : 1).map((m) => <UpcomingCard key={m.id} match={m} />)}</div>
      </section>

      <section>
        <div className="flex items-center justify-between"><SectionTitle>Table</SectionTitle><Link to="/table" className="mb-3 text-xs font-bold text-primary">FULL TABLE →</Link></div>
        <div className="overflow-hidden rounded-xl border bg-card text-sm">
          <div className="grid grid-cols-[24px_1fr_32px_40px_40px] gap-2 px-3 py-2 text-xs text-muted-foreground"><span>#</span><span>Club</span><span>P</span><span>GD</span><span>Pts</span></div>
          {standings.slice(0, 5).map((r, i) => (
            <div key={r.team} className={cn("grid grid-cols-[24px_1fr_32px_40px_40px] items-center gap-2 border-l-4 border-t px-3 py-2", i < 2 ? "border-l-success" : "border-l-transparent")}>
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
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary"><NewsIcon article={n} /></div>
              <div>
                <span className={cn("inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase", catColor[n.cat])}>{n.cat}{n.hot && <Flame size={11} />}</span>
                <div className="mt-1 text-sm font-semibold leading-snug">{n.title}</div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">{n.author} · {n.ago}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SponsorsStrip />
    </div>
  );
}
