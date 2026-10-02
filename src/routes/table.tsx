import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FormDot, TeamLogo } from "@/components/psl";
import { standings, teams, type Row } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/table")({
  head: () => ({
    meta: [
      { title: "2025/26 Standings — Betway Premiership" },
      { name: "description", content: "Full Betway Premiership log with form, goal difference and points." },
      { property: "og:title", content: "2025/26 Standings — Betway Premiership" },
      { property: "og:description", content: "The full PSL log table." },
    ],
  }),
  component: TableTab,
});

const tabs = ["ALL", "HOME", "AWAY", "FORM"] as const;
const formPts = (r: Row) => r.form.reduce((s, f) => s + (f === "W" ? 3 : f === "D" ? 1 : 0), 0);

function TableTab() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("ALL");
  // Home/away splits aren't in the source data, so those views reuse the overall table.
  const rows = tab === "FORM" ? [...standings].sort((a, b) => formPts(b) - formPts(a)) : standings;
  return (
    <div className="p-4">
      <div className="mb-4 flex items-end justify-between">
        <h1 className="font-display text-2xl font-black uppercase">2025/26 Standings</h1>
        <span className="text-xs text-muted-foreground">Updated 4 Mar 2026</span>
      </div>
      <div className="mb-4 grid grid-cols-4 gap-1 rounded-xl bg-card p-1">
        {tabs.map((t) => <button key={t} onClick={() => setTab(t)} className={cn("rounded-lg py-2 font-display text-sm font-bold", tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground")}>{t}</button>)}
      </div>
      <div className="no-scrollbar overflow-x-auto rounded-xl border bg-card">
        <table className="w-full min-w-[560px] text-xs">
          <thead className="text-muted-foreground">
            <tr className="[&>th]:px-1.5 [&>th]:py-2 [&>th]:text-center">
              <th>#</th><th className="!text-left">Club</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GF</th><th>GA</th><th>GD</th><th>Form</th><th>Pts</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const pos = standings.indexOf(r) + 1;
              const zone = pos <= 2 ? "border-l-primary bg-primary/10" : pos === 3 ? "border-l-info bg-info/10" : pos >= 15 ? "border-l-live bg-live/10" : "border-l-transparent";
              const gd = r.gf - r.ga;
              return (
                <tr key={r.team} className={cn("border-l-4 border-t [&>td]:px-1.5 [&>td]:py-2 [&>td]:text-center", zone)}>
                  <td className="font-display font-bold">{pos}</td>
                  <td className="!text-left"><span className="flex items-center gap-2 font-semibold"><TeamLogo team={r.team} size={20} />{teams[r.team].short}</span></td>
                  <td>{r.p}</td><td>{r.w}</td><td>{r.d}</td><td>{r.l}</td><td>{r.gf}</td><td>{r.ga}</td>
                  <td>{gd > 0 ? "+" : ""}{gd}</td>
                  <td><span className="flex justify-center gap-0.5">{r.form.map((f, i) => <FormDot key={i} r={f} />)}</span></td>
                  <td className={cn("font-display text-sm font-black", pos <= 2 && "text-primary")}>{r.pts}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
        <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-primary" /> CAF Champions League</div>
        <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-info" /> CAF Confederation Cup</div>
        <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-live" /> Relegation</div>
      </div>
    </div>
  );
}
