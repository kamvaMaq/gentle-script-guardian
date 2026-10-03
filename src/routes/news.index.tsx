import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { catColor, news } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/news/")({
  head: () => ({
    meta: [
      { title: "News — Betway Premiership" },
      { name: "description", content: "Transfers, match reports, injuries, interviews and fantasy tips from the PSL." },
      { property: "og:title", content: "News — Betway Premiership" },
      { property: "og:description", content: "The latest PSL news." },
    ],
  }),
  component: NewsTab,
});

const cats = ["ALL", "TRANSFER", "MATCH REPORT", "FANTASY", "INJURY", "INTERVIEW", "AWARDS"];

function NewsTab() {
  const [cat, setCat] = useState("ALL");
  const featured = news[0]!; const rest = news.slice(1);
  const list = rest.filter((n) => cat === "ALL" || n.cat.toUpperCase() === cat);
  return (
    <div className="space-y-5 p-4">
      <article className="glow-orange rounded-xl border border-orange bg-card p-5">
        <div className="text-5xl">{featured.emoji}</div>
        <span className={cn("mt-3 inline-block rounded px-1.5 py-0.5 text-[10px] font-bold uppercase", catColor[featured.cat])}>{featured.cat}</span>
        <h1 className="mt-2 font-display text-2xl font-black leading-tight">{featured.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{featured.summary}</p>
        <div className="mt-3 text-xs text-muted-foreground">✏️ {featured.author} · {featured.ago}</div>
        <Link to="/news/$id" params={{ id: featured.id }} className="mt-4 inline-block rounded-lg bg-primary px-4 py-2 font-display font-bold uppercase text-primary-foreground">Read Article →</Link>
      </article>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={cn("shrink-0 rounded-full border px-3 py-1.5 font-display text-xs font-bold", cat === c ? "border-primary bg-primary text-primary-foreground" : "text-muted-foreground")}>{c}</button>
        ))}
      </div>
      <div className="space-y-2">
        {list.length === 0 && <p className="py-6 text-center text-sm text-muted-foreground">No articles in this category yet.</p>}
        {list.map((n) => (
          <Link key={n.id} to="/news/$id" params={{ id: n.id }} className="card-hover flex gap-3 rounded-xl border bg-card p-3">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-secondary text-3xl">{n.emoji}</div>
            <div>
              <span className={cn("rounded px-1.5 py-0.5 text-[10px] font-bold uppercase", catColor[n.cat])}>{n.cat}</span>{n.hot && <span className="ml-1">🔥</span>}
              <div className="mt-1 text-sm font-bold leading-snug">{n.title}</div>
              <div className="mt-0.5 text-[11px] text-muted-foreground">{n.author} · {n.ago}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
