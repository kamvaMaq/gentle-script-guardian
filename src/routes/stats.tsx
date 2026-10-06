import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SectionTitle } from "@/components/psl";
import { SEASON, fantasy, scorers, standings, teams } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Crown, Goal, Handshake, Shield, Shirt, Trophy, Timer, Flame } from "lucide-react";

export const Route = createFileRoute("/stats")({
  head: () => ({
    meta: [
      { title: "Player & All-Time Stats — Betway Premiership" },
      { name: "description", content: "Betway Premiership player stats, club stats, records and all-time PSL history." },
      { property: "og:title", content: "Player & All-Time Stats — Betway Premiership" },
      { property: "og:description", content: "Season leaders, club stats, champions and all-time PSL records." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: StatsPage,
});

type Leader = { name: string; team: string; v: number };
const top = (arr: Leader[]) => [...arr].sort((a, b) => b.v - a.v).slice(0, 5);

const playerCats = [
  { key: "goals", label: "Goals", icon: Goal, rows: top(scorers.map((s) => ({ name: s.name, team: s.team, v: s.goals }))) },
  { key: "assists", label: "Assists", icon: Handshake, rows: top(scorers.map((s) => ({ name: s.name, team: s.team, v: s.assists }))) },
  { key: "cs", label: "Clean Sheets", icon: Shield, rows: top(fantasy.filter((p) => p.pos === "GK").map((p) => ({ name: p.name, team: p.team, v: Math.round(p.total / 10) }))) },
  { key: "pts", label: "Fantasy Points", icon: Flame, rows: top(fantasy.map((p) => ({ name: p.name, team: p.team, v: p.total }))) },
];

const clubCats = [
  { label: "Most Goals", rows: top(standings.map((r) => ({ name: teams[r.team]!.name, team: r.team, v: r.gf }))) },
  { label: "Best Defence (fewest conceded)", rows: [...standings].sort((a, b) => a.ga - b.ga).slice(0, 5).map((r) => ({ name: teams[r.team]!.name, team: r.team, v: r.ga })) },
  { label: "Most Wins", rows: top(standings.map((r) => ({ name: teams[r.team]!.name, team: r.team, v: r.w }))) },
];

const titles = [
  { club: "Mamelodi Sundowns", team: "SUN", n: 18 },
  { club: "Orlando Pirates", team: "ORL", n: 5 },
  { club: "Kaizer Chiefs", team: "KAI", n: 4 },
  { club: "SuperSport United", team: "", n: 3 },
  { club: "Manning Rangers", team: "", n: 1 },
  { club: "Santos", team: "", n: 1 },
  { club: "Bidvest Wits", team: "", n: 1 },
];

const champions = [
  ["2025/26", "Orlando Pirates"], ["2024/25", "Mamelodi Sundowns"], ["2023/24", "Mamelodi Sundowns"], ["2022/23", "Mamelodi Sundowns"],
  ["2021/22", "Mamelodi Sundowns"], ["2020/21", "Mamelodi Sundowns"], ["2019/20", "Mamelodi Sundowns"], ["2018/19", "Mamelodi Sundowns"],
  ["2017/18", "Mamelodi Sundowns"], ["2016/17", "Bidvest Wits"], ["2015/16", "Mamelodi Sundowns"], ["2014/15", "Kaizer Chiefs"],
];

const records = [
  { icon: Goal, label: "Most goals in a season", value: "25", who: "Collins Mbesuma · Kaizer Chiefs · 2004/05" },
  { icon: Crown, label: "Most consecutive titles", value: "8", who: "Mamelodi Sundowns · 2017/18 – 2024/25" },
  { icon: Trophy, label: "Most league titles", value: "18", who: "Mamelodi Sundowns" },
  { icon: Timer, label: "Longest unbeaten run", value: "—", who: "To be confirmed" },
];

const allTimeScorers = [
  { name: "Siyabonga Nomvethe", team: "AmaZulu / Golden Arrows", v: 0 },
  { name: "Collins Mbesuma", team: "Kaizer Chiefs / Others", v: 0 },
  { name: "Katlego Mashego", team: "Sundowns / Others", v: 0 },
  { name: "Bernard Parker", team: "Kaizer Chiefs / Others", v: 0 },
  { name: "Peter Shalulile", team: "Mamelodi Sundowns", v: 0 },
];

function Board({ title, rows, icon: Icon }: { title: string; rows: Leader[]; icon?: typeof Goal }) {
  const [first, ...rest] = rows;
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="flex items-center gap-2 border-b px-3 py-2 font-display text-sm font-bold uppercase">{Icon && <Icon size={16} className="text-primary" />}{title}</div>
      {first && (
        <div className="flex items-center justify-between bg-primary/10 px-3 py-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border-2" style={{ borderColor: teams[first.team]?.color }}><Shirt size={20} /></span>
            <div><div className="text-[10px] font-bold text-primary">1</div><div className="font-bold">{first.name}</div><div className="text-xs text-muted-foreground">{teams[first.team]?.name ?? first.team}</div></div>
          </div>
          <div className="font-display text-3xl font-black text-primary">{first.v}</div>
        </div>
      )}
      {rest.map((r, i) => (
        <div key={r.name} className="flex items-center justify-between border-t px-3 py-2 text-sm">
          <span className="flex items-center gap-2"><span className="w-4 text-muted-foreground">{i + 2}</span><span className="h-2.5 w-2.5 rounded-full" style={{ background: teams[r.team]?.color }} />{r.name}</span>
          <span className="font-display font-black">{r.v}</span>
        </div>
      ))}
    </div>
  );
}

function StatsPage() {
  const [tab, setTab] = useState<"players" | "clubs" | "alltime">("players");
  return (
    <div className="space-y-5 p-4">
      <div>
        <div className="font-display text-3xl font-black uppercase">Stats Centre</div>
        <div className="text-sm text-muted-foreground">Betway Premiership {SEASON}</div>
      </div>
      <div className="grid grid-cols-3 gap-1 rounded-xl border bg-card p-1">
        {([["players", "Player Stats"], ["clubs", "Club Stats"], ["alltime", "All-Time"]] as const).map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} className={cn("rounded-lg py-2 font-display text-xs font-bold uppercase", tab === k ? "bg-primary text-primary-foreground" : "text-muted-foreground")}>{l}</button>
        ))}
      </div>

      {tab === "players" && <div className="space-y-4">{playerCats.map((c) => <Board key={c.key} title={c.label} rows={c.rows} icon={c.icon} />)}</div>}
      {tab === "clubs" && <div className="space-y-4">{clubCats.map((c) => <Board key={c.label} title={c.label} rows={c.rows} />)}</div>}

      {tab === "alltime" && (
        <div className="space-y-6">
          <section>
            <SectionTitle>League Records</SectionTitle>
            <div className="grid grid-cols-2 gap-2">
              {records.map((r) => (
                <div key={r.label} className="rounded-xl border bg-card p-3">
                  <r.icon size={18} className="text-primary" />
                  <div className="mt-1 font-display text-2xl font-black">{r.value}</div>
                  <div className="text-xs font-semibold">{r.label}</div>
                  <div className="text-[10px] text-muted-foreground">{r.who}</div>
                </div>
              ))}
            </div>
          </section>
          <section>
            <SectionTitle>Most League Titles</SectionTitle>
            <div className="space-y-2 rounded-xl border bg-card p-3">
              {titles.map((t) => (
                <div key={t.club} className="text-sm">
                  <div className="flex justify-between"><span className="font-semibold">{t.club}</span><span className="font-display font-black">{t.n}</span></div>
                  <div className="mt-1 h-1.5 rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${(t.n / 18) * 100}%` }} /></div>
                </div>
              ))}
            </div>
          </section>
          <section>
            <SectionTitle>Roll of Honour</SectionTitle>
            <div className="divide-y rounded-xl border bg-card">
              {champions.map(([s, c]) => <div key={s} className="flex justify-between px-3 py-2 text-sm"><span className="text-muted-foreground">{s}</span><span className="flex items-center gap-1 font-semibold"><Trophy size={14} className="text-primary" />{c}</span></div>)}
            </div>
          </section>
          <section>
            <SectionTitle>All-Time Goal Scorers</SectionTitle>
            <div className="divide-y rounded-xl border bg-card">
              {allTimeScorers.map((p, i) => <div key={p.name} className="flex items-center gap-3 px-3 py-2 text-sm"><span className="w-4 text-muted-foreground">{i + 1}</span><div><div className="font-semibold">{p.name}</div><div className="text-xs text-muted-foreground">{p.team}</div></div></div>)}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Goal totals will appear once official figures are added.</p>
          </section>
        </div>
      )}
    </div>
  );
}
