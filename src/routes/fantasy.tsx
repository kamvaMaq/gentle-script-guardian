import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SectionTitle } from "@/components/psl";
import { fantasy, teams, type Pos } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Crosshair, Shield, Goal, Shirt, Zap, Plus, Minus, X, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/fantasy")({
  head: () => ({
    meta: [
      { title: "Fantasy Premiership — GW8" },
      { name: "description", content: "Pick your Fantasy PSL squad, buy and sell players and learn the scoring system." },
      { property: "og:title", content: "Fantasy Premiership — GW8" },
      { property: "og:description", content: "Build your Betway Premiership fantasy team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: FantasyTab,
});

const BUDGET = 100;
const STORE = "psl-fantasy-squad";
const LIMITS: Record<Pos, number> = { GK: 1, DEF: 3, MID: 4, FWD: 3 };
const ORDER: Pos[] = ["FWD", "MID", "DEF", "GK"];
const ICON: Record<Pos, typeof Zap> = { FWD: Zap, MID: Crosshair, DEF: Shield, GK: Goal };
const DEFAULT = ["Thandolwenkosi Ngwenya", "Brayan León", "Wandile Duba", "Oswin Appollis", "Teboho Mokoena", "Quwan Plaatjies"];

const posChip: Record<Pos, string> = { GK: "bg-amber/20 text-amber", DEF: "bg-success/20 text-success", MID: "bg-info/20 text-info", FWD: "bg-live/20 text-live" };
const diffColor: Record<string, string> = { Easy: "text-success", Medium: "text-amber", Hard: "text-live" };
const byName = (n: string) => fantasy.find((p) => p.name === n);

const rules = [
  ["Playing 60+ mins", "+2"], ["Goal (GK/DEF)", "+6"], ["Goal (MID)", "+5"], ["Goal (FWD)", "+4"], ["Assist", "+3"],
  ["Clean Sheet (GK/DEF)", "+4"], ["Penalty Save", "+5"], ["Yellow Card", "-1"], ["Red Card", "-3"], ["Own Goal", "-2"],
];

function FantasyTab() {
  const [squad, setSquad] = useState<string[]>(DEFAULT);
  const [filter, setFilter] = useState<Pos | "ALL">("ALL");
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem(STORE) ?? "null");
      if (Array.isArray(s)) setSquad(s.filter((n: string) => byName(n)));
    } catch { /* ignore */ }
  }, []);
  const save = (s: string[]) => { setSquad(s); localStorage.setItem(STORE, JSON.stringify(s)); };

  const players = squad.map(byName).filter(Boolean) as typeof fantasy;
  const spent = players.reduce((s, p) => s + p.price, 0);
  const bank = BUDGET - spent;
  const gw = players.reduce((s, p) => s + p.gw, 0);
  const count = (pos: Pos) => players.filter((p) => p.pos === pos).length;

  const buy = (name: string) => {
    const p = byName(name)!;
    if (count(p.pos) >= LIMITS[p.pos]) return setMsg(`Your ${p.pos} spots are full. Sell one first.`);
    if (p.price > bank + 1e-9) return setMsg(`Not enough money. You need R${(p.price - bank).toFixed(1)}M more.`);
    save([...squad, name]); setMsg(`Bought ${p.name} for R${p.price.toFixed(1)}M.`);
  };
  const sell = (name: string) => {
    const p = byName(name)!;
    save(squad.filter((n) => n !== name)); setMsg(`Sold ${p.name} for R${p.price.toFixed(1)}M.`);
  };

  const market = useMemo(() => fantasy.filter((p) => filter === "ALL" || p.pos === filter), [filter]);

  return (
    <div className="space-y-6 p-4">
      <div className="bg-fantasy-header rounded-xl p-4">
        <div className="font-display text-3xl font-black">FANTASY PREMIERSHIP</div>
        <div className="mt-1 flex items-center justify-between text-sm">
          <div><div className="font-semibold">Gameweek 8</div><div className="text-foreground/70">Deadline: Mon 13 Oct 17:30</div></div>
          <div className="text-right"><div className="text-xs text-foreground/70">In the bank</div><div className={cn("font-display text-2xl font-black", bank < 0 ? "text-live" : "text-primary")}>R{bank.toFixed(1)}M</div></div>
        </div>
        <div className="mt-1 text-xs text-foreground/70">Squad {players.length}/11 · Spent R{spent.toFixed(1)}M of R{BUDGET}M</div>
      </div>

      {msg && (
        <div className="flex items-center justify-between rounded-lg border bg-card px-3 py-2 text-sm">
          <span>{msg}</span><button aria-label="Dismiss" onClick={() => setMsg(null)}><X size={16} /></button>
        </div>
      )}

      <div className="bg-pitch relative overflow-hidden rounded-xl border-2 border-foreground/30 px-2 py-5">
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-foreground/40" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/40" />
        <div className="relative space-y-5">
          {ORDER.map((pos) => {
            const inPos = players.filter((p) => p.pos === pos);
            const Icon = ICON[pos];
            return (
              <div key={pos} className="flex justify-center gap-2">
                {Array.from({ length: LIMITS[pos] }).map((_, i) => {
                  const p = inPos[i];
                  return p ? (
                    <button key={i} onClick={() => sell(p.name)} title={`Sell ${p.name}`} className="group relative flex w-16 flex-col items-center rounded-lg border-2 bg-background/80 px-1 py-1.5 text-center" style={{ borderColor: teams[p.team]!.color }}>
                      <span className="absolute -right-1.5 -top-1.5 rounded-full bg-live p-0.5 text-foreground"><Minus size={10} /></span>
                      <Shirt size={20} strokeWidth={1.7} />
                      <span className="w-full truncate text-[11px] font-bold">{p.name.split(" ").slice(-1)}</span>
                      <span className="text-[10px] text-primary">R{p.price.toFixed(1)}M</span>
                    </button>
                  ) : (
                    <button key={i} onClick={() => { setFilter(pos); document.getElementById("market")?.scrollIntoView({ behavior: "smooth" }); }} className="flex w-16 flex-col items-center rounded-lg border-2 border-dashed border-foreground/50 px-1 py-1.5 text-center text-foreground/80">
                      <Icon size={20} strokeWidth={1.7} /><span className="text-[11px] font-bold">{pos}</span><span className="text-[10px]">+ Add</span>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <p className="-mt-4 text-center text-xs text-muted-foreground">Tap a player on the pitch to sell, or an empty spot to buy.</p>

      <div className="grid grid-cols-4 gap-2 text-center">
        {[["GW Points", gw, "text-success"], ["Squad", `${players.length}/11`, "text-primary"], ["Bank", `R${bank.toFixed(1)}M`, "text-gold"], ["Spent", `R${spent.toFixed(1)}M`, "text-foreground"]].map(([l, v, c]) => (
          <div key={l as string} className="rounded-xl border bg-card px-1 py-2">
            <div className={cn("font-display text-lg font-black", c as string)}>{v}</div>
            <div className="text-[10px] uppercase text-muted-foreground">{l}</div>
          </div>
        ))}
      </div>

      <section id="market">
        <div className="flex items-center justify-between">
          <SectionTitle>Transfer Market</SectionTitle>
          <button onClick={() => { save(DEFAULT); setMsg("Squad reset."); }} className="flex items-center gap-1 text-xs text-muted-foreground"><RotateCcw size={12} /> Reset</button>
        </div>
        <div className="no-scrollbar mb-2 flex gap-2 overflow-x-auto">
          {(["ALL", "GK", "DEF", "MID", "FWD"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={cn("rounded-full border px-3 py-1 text-xs font-bold", filter === f ? "bg-primary text-primary-foreground" : "bg-card")}>
              {f} {f !== "ALL" && <span className="opacity-70">{count(f)}/{LIMITS[f]}</span>}
            </button>
          ))}
        </div>
        <div className="no-scrollbar overflow-x-auto rounded-xl border bg-card">
          <table className="w-full min-w-[520px] text-xs">
            <thead className="text-muted-foreground"><tr className="[&>th]:px-2 [&>th]:py-2"><th className="text-left">Player</th><th>Pos</th><th>Price</th><th>Own%</th><th>Pts</th><th>Form</th><th></th></tr></thead>
            <tbody>
              {market.map((p) => {
                const owned = squad.includes(p.name);
                const canBuy = count(p.pos) < LIMITS[p.pos] && p.price <= bank + 1e-9;
                return (
                  <tr key={p.name} className="border-t text-center [&>td]:px-2 [&>td]:py-2">
                    <td className="text-left">
                      <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ background: teams[p.team]!.color }} /><span className="font-semibold">{p.name}</span></div>
                      <div className="pl-4.5 text-[10px] text-muted-foreground">{p.team} · <span className={diffColor[p.diff]}>{p.next}</span></div>
                    </td>
                    <td><span className={cn("rounded px-1.5 py-0.5 font-bold", posChip[p.pos])}>{p.pos}</span></td>
                    <td>R{p.price.toFixed(1)}M</td><td>{p.own}%</td>
                    <td className="font-display text-sm font-black">{p.total}</td><td>{p.form}</td>
                    <td>
                      {owned ? (
                        <button onClick={() => sell(p.name)} className="flex items-center gap-1 rounded-md bg-live/20 px-2 py-1 font-bold text-live"><Minus size={12} />Sell</button>
                      ) : (
                        <button onClick={() => buy(p.name)} className={cn("flex items-center gap-1 rounded-md px-2 py-1 font-bold", canBuy ? "bg-success/20 text-success" : "bg-muted text-muted-foreground")}><Plus size={12} />Buy</button>
                      )}
                    </td>
                  </tr>
                );
              })}
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
