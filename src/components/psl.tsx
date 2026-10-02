import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { matches, teams, type Match, type Res, type Stats } from "@/lib/data";
import { cn } from "@/lib/utils";

export function useLiveMinute(base = 0) {
  const [m, setM] = useState(base);
  useEffect(() => {
    const t = setInterval(() => setM((v) => Math.min(v + 1, 90)), 30000);
    return () => clearInterval(t);
  }, []);
  return m;
}

export function LiveDot() {
  return <span className="live-dot" aria-hidden />;
}

export function TeamLogo({ team, size = 32 }: { team: string; size?: number }) {
  const t = teams[team];
  const [err, setErr] = useState(false);
  if (err || !t)
    return (
      <span
        className="inline-flex shrink-0 items-center justify-center rounded-full font-display text-[10px] font-bold text-background"
        style={{ width: size, height: size, background: t?.color }}
      >
        {t?.short}
      </span>
    );
  return (
    <img
      src={t.logo}
      alt={t.name}
      width={size}
      height={size}
      loading="lazy"
      onError={() => setErr(true)}
      className="shrink-0 object-contain"
      style={{ width: size, height: size }}
    />
  );
}

export function FormDot({ r }: { r: Res }) {
  return (
    <span
      title={r}
      className={cn(
        "inline-block h-2.5 w-2.5 rounded-full",
        r === "W" ? "bg-primary" : r === "D" ? "bg-amber" : "bg-live",
      )}
    />
  );
}

export function SectionTitle({ children, live }: { children: React.ReactNode; live?: boolean }) {
  return (
    <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-extrabold uppercase tracking-wide">
      {live && <LiveDot />}
      {children}
    </h2>
  );
}

export function StatBar({ label, home, away, suffix = "" }: { label: string; home: number; away: number; suffix?: string }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOn(true), 60);
    return () => clearTimeout(t);
  }, []);
  const total = home + away || 1;
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between font-display text-sm font-bold">
        <span>{home}{suffix}</span>
        <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
        <span>{away}{suffix}</span>
      </div>
      <div className="flex h-1.5 gap-1">
        <div className="flex flex-1 justify-end overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary transition-all duration-1000 ease-out" style={{ width: on ? `${(home / total) * 100}%` : 0 }} />
        </div>
        <div className="flex-1 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-live transition-all duration-1000 ease-out" style={{ width: on ? `${(away / total) * 100}%` : 0 }} />
        </div>
      </div>
    </div>
  );
}

export const statRows = (s: Stats) => [
  { label: "Possession", v: s.possession, suffix: "%" },
  { label: "Shots", v: s.shots },
  { label: "Shots on Target", v: s.sot },
  { label: "Corners", v: s.corners },
  { label: "Fouls", v: s.fouls },
  { label: "Yellow Cards", v: s.yellows },
];

export function LiveMatchCard({ match, expanded }: { match: Match; expanded?: boolean }) {
  const nav = useNavigate();
  const minute = useLiveMinute(match.minute ?? 0);
  const h = teams[match.home], a = teams[match.away];
  const hs = match.hs ?? 0, as = match.as ?? 0;
  return (
    <article
      onClick={() => nav({ to: "/matches/$id", params: { id: match.id } })}
      className="card-hover cursor-pointer rounded-xl border border-l-4 border-l-live bg-card p-4"
    >
      <div className="mb-3 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{match.venue}{match.derby && <span className="ml-1 font-bold text-live"> · {match.derby} 🔥</span>}</span>
        <span className="flex items-center gap-1.5 rounded-full bg-live/15 px-2 py-0.5 font-display font-bold text-live">
          <LiveDot /> {minute}'
        </span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex w-24 flex-col items-center gap-1 text-center">
          <TeamLogo team={match.home} size={40} />
          <span className="text-xs font-medium leading-tight">{h.name}</span>
        </div>
        <div className="text-center">
          <div className="font-display text-4xl font-black">
            <span className={hs > as ? "text-primary" : ""}>{hs}</span>
            <span className="mx-2 text-muted-foreground">–</span>
            <span className={as > hs ? "text-primary" : ""}>{as}</span>
          </div>
          <div className="text-[11px] text-muted-foreground">HT {match.ht}</div>
        </div>
        <div className="flex w-24 flex-col items-center gap-1 text-center">
          <TeamLogo team={match.away} size={40} />
          <span className="text-xs font-medium leading-tight">{a.name}</span>
        </div>
      </div>
      {match.stats && !expanded && (
        <div className="mt-3 grid grid-cols-3 rounded-lg bg-secondary py-2 text-center text-xs">
          <div><div className="font-display font-bold">{match.stats.shots.join(" - ")}</div><div className="text-muted-foreground">Shots</div></div>
          <div><div className="font-display font-bold">{match.stats.possession.join(" - ")}</div><div className="text-muted-foreground">Poss %</div></div>
          <div><div className="font-display font-bold">{match.stats.corners.join(" - ")}</div><div className="text-muted-foreground">Corners</div></div>
        </div>
      )}
      {match.events && (
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
          {match.events.map((e, i) => (
            <span key={i} className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-xs">
              {e.icon} {e.player} <span className="text-live">{e.min}'</span>
            </span>
          ))}
        </div>
      )}
      {expanded && match.stats && (
        <div className="mt-4 space-y-3 border-t pt-4">
          {statRows(match.stats).map((s) => <StatBar key={s.label} label={s.label} home={s.v[0]} away={s.v[1]} suffix={s.suffix} />)}
        </div>
      )}
    </article>
  );
}

export function UpcomingCard({ match, expanded }: { match: Match; expanded?: boolean }) {
  const [remind, setRemind] = useState(false);
  const [cal, setCal] = useState(false);
  return (
    <article className={cn("card-hover rounded-xl border bg-card p-3", match.derby && "border-live")}>
      {match.derby && <div className="mb-2 font-display text-xs font-bold text-live">🔥 {match.derby}</div>}
      <Link to="/matches/$id" params={{ id: match.id }} className="flex items-center justify-between gap-2">
        <div className="flex w-28 items-center gap-2"><TeamLogo team={match.home} size={28} /><span className="text-sm font-semibold">{teams[match.home].short}</span></div>
        <div className="text-center">
          <div className="font-display text-xl font-extrabold text-primary">{match.time}</div>
          <div className="text-[11px] text-muted-foreground">{match.date}</div>
        </div>
        <div className="flex w-28 items-center justify-end gap-2"><span className="text-sm font-semibold">{teams[match.away].short}</span><TeamLogo team={match.away} size={28} /></div>
      </Link>
      <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
        <span>📍 {match.venue}</span>
        <span className="rounded bg-secondary px-1.5 py-0.5">📺 {match.tv}</span>
      </div>
      {expanded && (
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button onClick={() => setRemind(true)} className={cn("rounded-lg border py-2 font-display text-sm font-bold uppercase", remind ? "border-primary bg-primary/15 text-primary" : "hover:bg-accent")}>
            {remind ? "✓ Reminder Set" : "🔔 Remind Me"}
          </button>
          <button onClick={() => setCal(true)} className={cn("rounded-lg border py-2 font-display text-sm font-bold uppercase", cal ? "border-primary bg-primary/15 text-primary" : "hover:bg-accent")}>
            {cal ? "✓ Added" : "📅 Add to Calendar"}
          </button>
        </div>
      )}
    </article>
  );
}

function LeagueLogo() {
  const [err, setErr] = useState(false);
  if (err) return <span className="font-display text-lg font-black text-primary">PSL</span>;
  return <img src="https://tmssl.akamaized.net/images/wappen/big/sfa1.png" alt="Betway Premiership" className="h-8 w-8 object-contain" onError={() => setErr(true)} />;
}

export function Header() {
  const live = matches.filter((m) => m.status === "live");
  const items = [...live.map((m) => `🔴 ${teams[m.home].short} ${m.hs}–${m.as} ${teams[m.away].short} ${m.minute}'`),
    ...matches.filter((m) => m.status === "ft").map((m) => `FT ${teams[m.home].short} ${m.hs}–${m.as} ${teams[m.away].short}`)];
  return (
    <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
      <div className="flex items-center justify-between px-4 py-2.5">
        <Link to="/" className="flex items-center gap-2">
          <LeagueLogo />
          <div className="leading-none">
            <div className="font-display text-lg font-black uppercase tracking-wide">Betway Premiership</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Official App</div>
          </div>
        </Link>
        <div className="flex gap-2 text-lg">
          <button aria-label="Search" className="rounded-full p-1.5 hover:bg-accent">🔍</button>
          <button aria-label="Notifications" className="rounded-full p-1.5 hover:bg-accent">🔔</button>
        </div>
      </div>
      <div className="overflow-hidden border-t bg-card py-1.5">
        <div className="ticker-track flex gap-8 whitespace-nowrap font-display text-sm font-bold">
          {[...items, ...items].map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </div>
    </header>
  );
}

const tabs = [
  { to: "/", label: "Home", icon: "⚽" },
  { to: "/fantasy", label: "Fantasy", icon: "🏆", badge: true },
  { to: "/matches", label: "Matches", icon: "📅" },
  { to: "/table", label: "Table", icon: "📊" },
  { to: "/news", label: "News", icon: "📰" },
] as const;

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-1/2 z-30 grid w-full max-w-[430px] -translate-x-1/2 grid-cols-5 border-t bg-background/95 backdrop-blur">
      {tabs.map((t) => (
        <Link
          key={t.to}
          to={t.to}
          activeOptions={{ exact: t.to === "/" }}
          className="relative flex flex-col items-center gap-0.5 py-2.5 text-muted-foreground"
          activeProps={{ className: "text-primary" }}
        >
          <span className="relative text-xl">
            {t.icon}
            {"badge" in t && <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-live text-[9px] font-bold text-foreground">3</span>}
          </span>
          <span className="font-display text-xs font-bold uppercase">{t.label}</span>
        </Link>
      ))}
    </nav>
  );
}
