import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { LiveDot, SectionTitle, StatBar, TeamLogo, statRows, useLiveMinute } from "@/components/psl";
import { matches, teams } from "@/lib/data";
import { ArrowLeft, CircleDot, MapPin, Tv2 } from "lucide-react";

export const Route = createFileRoute("/matches/$id")({
  loader: ({ params }) => {
    const match = matches.find((m) => m.id === params.id);
    if (!match) throw notFound();
    return { match };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Match not found" }, { name: "robots", content: "noindex" }] };
    const m = loaderData.match;
    const t = `${teams[m.home]!.name} vs ${teams[m.away]!.name} — Match Centre`;
    return { meta: [{ title: t }, { name: "description", content: `Score, events and stats at ${m.venue}.` }, { property: "og:title", content: t }, { property: "og:description", content: `Match centre at ${m.venue}.` }] };
  },
  notFoundComponent: () => <div className="p-8 text-center">Match not found. <Link to="/matches" className="text-primary">Back</Link></div>,
  component: MatchDetail,
});

function MatchDetail() {
  const { match: m } = Route.useLoaderData();
  const h = teams[m.home]!, a = teams[m.away]!;
  const minute = useLiveMinute(m.minute);
  const hs = m.hs ?? 0, as = m.as ?? 0;
  const played = m.status === "ft" || m.status === "live";
  return (
    <div>
      <div className="px-4 py-6" style={{ background: `linear-gradient(90deg, ${h.color}22, transparent 50%, ${a.color}22)` }}>
        <div className="mb-4 flex justify-center">
          {m.status === "live" ? (
            <span className="flex items-center gap-1.5 rounded-full bg-live/15 px-3 py-1 font-display font-bold text-live"><LiveDot /> LIVE{minute != null && ` ${minute}'`}</span>
          ) : (
            <span className="rounded-full bg-secondary px-3 py-1 font-display font-bold">{m.status === "ft" ? "FULL TIME" : m.status === "postponed" ? "POSTPONED" : `UPCOMING · ${m.date} · ${m.time}`}</span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex w-28 flex-col items-center gap-2 text-center"><TeamLogo team={m.home} size={56} /><span className="text-sm font-semibold">{h.name}</span></div>
          <div className="font-display text-5xl font-black">
            {played ? (<><span className={hs > as ? "text-primary" : ""}>{hs}</span><span className="mx-2 text-muted-foreground">–</span><span className={as > hs ? "text-primary" : ""}>{as}</span></>) : <span className="text-muted-foreground">vs</span>}
          </div>
          <div className="flex w-28 flex-col items-center gap-2 text-center"><TeamLogo team={m.away} size={56} /><span className="text-sm font-semibold">{a.name}</span></div>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-center text-xs text-muted-foreground"><span className="inline-flex items-center gap-1"><MapPin size={13} /> {m.venue}</span>{m.tv && <span className="inline-flex items-center gap-1"> · <Tv2 size={13} /> {m.tv}</span>}</div>
      </div>

      <div className="space-y-7 p-4">
        {played && (
          <section>
            <SectionTitle>Match Events</SectionTitle>
            <div className="relative space-y-2 rounded-xl border bg-card p-4">
              <div className="absolute inset-y-4 left-1/2 w-px bg-border" />
              {m.events && m.events.length ? m.events.map((e, i) => (
                <div key={i} className={`flex ${e.side === "home" ? "justify-start" : "justify-end"}`}>
                  <div className={`flex w-[46%] items-center gap-2 text-sm ${e.side === "away" ? "flex-row-reverse text-right" : ""}`}>
                    <CircleDot size={15} /><span className="font-semibold">{e.player}</span><span className="font-display font-bold text-live">{e.min}'</span>
                  </div>
                </div>
              )) : <p className="text-center text-sm text-muted-foreground">Match events not available.</p>}
            </div>
          </section>
        )}
        {m.stats && (
          <section>
            <SectionTitle>Match Statistics</SectionTitle>
            <div className="space-y-4 rounded-xl border bg-card p-4">
              {statRows(m.stats).map((s) => <StatBar key={s.label} label={s.label} home={s.v[0]} away={s.v[1]} suffix={s.suffix} />)}
            </div>
          </section>
        )}
        <Link to="/matches" className="flex items-center justify-center gap-2 rounded-lg border py-3 font-display font-bold uppercase hover:bg-accent"><ArrowLeft size={16} /> Back to Matches</Link>
      </div>
    </div>
  );
}
