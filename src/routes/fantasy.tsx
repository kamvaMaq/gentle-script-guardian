import { createFileRoute } from "@tanstack/react-router";
import { SectionTitle } from "@/components/psl";
import { fantasy, teams, type Pos } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/fantasy")({
  head: () => ({
    meta: [
      { title: "Fantasy Premiership — GW8" },
      { name: "description", content: "Pick your Fantasy PSL squad, track top picks and learn the scoring system." },
      { property: "og:title", content: "Fantasy Premiership — GW8" },
      { property: "og:description", content: "Build your Betway Premiership fantasy team." },
    ],
  }),
  component: FantasyTab,
});

const posChip: Record<Pos, string> = { GK: "bg-amber/20 text-amber", DEF: "bg-success/20 text-success", MID: "bg-info/20 text-info", FWD: "bg-live/20 text-live" };
const diffColor: Record<string, string> = { Easy: "text-success", Medium: "text-amber", Hard: "text-live" };

const byName = (n: string) => fantasy.find((p) => p.name === n);
const lines: { pos: Pos; icon: string; picks: (string | null)[] }[] = [
  { pos: "FWD", icon: "⚡", picks: ["Thandolwenkosi Ngwenya"] },
  { pos: "FWD", icon: "⚡", picks: ["Brayan León", "Wandile Duba"] },
  { pos: "MID", icon: "🎯", picks: [null, "Oswin Appollis", "Teboho Mokoena", "Quwan Plaatjies", null] },
  { pos: "DEF", icon: "🛡️", picks: [null, null, null] },
  { pos: "GK", icon: "🧤", picks: [null] },
];

const rules = [
  ["Playing 60+ mins", "+2"], ["Goal (GK/DEF)", "+6"], ["Goal (MID)", "+5"], ["Goal (FWD)", "+4"], ["Assist", "+3"],
  ["Clean Sheet (GK/DEF)", "+4"], ["Penalty Save", "+5"], ["Yellow Card", "-1"], ["Red Card", "-3"], ["Own Goal", "-2"],
];

function FantasyTab() {
  const gw = lines.flatMap((l) => l.picks).reduce((s, n) => s + (n ? byName(n)!.gw : 0), 0);
  return (
    <div className="space-y-6 p-4">
      <div className="bg-fantasy-header rounded-xl p-4">
        <div className="font-display text-3xl font-black">FANTASY PREMIERSHIP</div>
        <div className="mt-1 flex items-center justify-between text-sm">
          <div><div className="font-semibold">Gameweek 8</div><div className="text-foreground/70">Deadline: Mon 13 Oct 17:30</div></div>
          <div className="text-right"><div className="text-xs text-foreground/70">Budget</div><div className="font-display text-2xl font-black text-primary">R100.0M</div></div>
        </div>
      </div>

      <div className="bg-pitch relative overflow-hidden rounded-xl border-2 border-foreground/30 px-2 py-5">
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-foreground/40" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/40" />
        <div className="relative space-y-5">
          {lines.map((l, li) => (
            <div key={li} className="flex justify-center gap-2">
              {l.picks.map((n, i) => {
                const p = n ? byName(n) : null;
                return p ? (
                  <div key={i} className="flex w-16 flex-col items-center rounded-lg border-2 bg-background/80 px-1 py-1.5 text-center" style={{ borderColor: teams[p.team]!.color }}>
                    <span className="text-xl">👕</span>
                    <span className="w-full truncate text-[11px] font-bold">{p.name.split(" ").slice(-1)}</span>
                    <span className="text-[10px] text-primary">R{p.price.toFixed(1)}M</span>
                  </div>
                ) : (
                  <div key={i} className="flex w-16 flex-col items-center rounded-lg border-2 border-dashed border-foreground/50 px-1 py-1.5 text-center text-foreground/80">
                    <span className="text-xl">{l.icon}</span><span className="text-[11px] font-bold">{l.pos}</span><span className="text-[10px]">+ Add</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center">
        {[["GW Points", gw, "text-success"], ["Total Pts", "847", "text-primary"], ["Overall Rank", "12,443", "text-gold"], ["Free Transfers", "1", "text-foreground"]].map(([l, v, c]) => (
          <div key={l as string} className="rounded-xl border bg-card px-1 py-2">
            <div className={cn("font-display text-xl font-black", c as string)}>{v}</div>
            <div className="text-[10px] uppercase text-muted-foreground">{l}</div>
          </div>
        ))}
      </div>

      <section>
        <SectionTitle>Top Picks</SectionTitle>
        <div className="no-scrollbar overflow-x-auto rounded-xl border bg-card">
          <table className="w-full min-w-[480px] text-xs">
            <thead className="text-muted-foreground"><tr className="[&>th]:px-2 [&>th]:py-2"><th className="text-left">Player</th><th>Pos</th><th>Price</th><th>Own%</th><th>Pts</th><th>Form</th></tr></thead>
            <tbody>
              {fantasy.map((p) => (
                <tr key={p.name} className="border-t text-center [&>td]:px-2 [&>td]:py-2">
                  <td className="text-left">
                    <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ background: teams[p.team]!.color }} /><span className="font-semibold">{p.name}</span></div>
                    <div className="pl-4.5 text-[10px] text-muted-foreground">{p.team} · <span className={diffColor[p.diff]}>{p.next}</span></div>
                  </td>
                  <td><span className={cn("rounded px-1.5 py-0.5 font-bold", posChip[p.pos])}>{p.pos}</span></td>
                  <td>R{p.price.toFixed(1)}M</td><td>{p.own}%</td>
                  <td className="font-display text-sm font-black">{p.total}</td><td>{p.form}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <SectionTitle>Scoring System</SectionTitle>
        <div className="grid grid-cols-2 gap-2">
          {rules.map(([l, v]) => {
            const neg = v!.startsWith("-");
            return (
              <div key={l} className={cn("flex items-center justify-between rounded-lg border px-3 py-2 text-xs", neg ? "bg-live/10" : "bg-card")}>
                <span>{l}</span><span className={cn("font-display text-sm font-black", neg ? "text-live" : "text-primary")}>{v}</span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
