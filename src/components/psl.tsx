import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoAsset from "@/assets/betway-premiership-logo.webp.asset.json";
import { SEASON, matches, sponsors, teams, type Match, type Res, type Stats } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Bell, CalendarDays, Check, ChevronRight, Clock3, Flame, Home, MapPin, Menu, Newspaper, Table2, Ticket, Trophy, Tv2, CircleDot, Globe2, Medal, Target, Mic2, List, CircleHelp } from "lucide-react";
import type { Article } from "@/lib/data";

const newsIcons = [Ticket, Globe2, Trophy, MapPin, CircleDot, Medal, CircleHelp, Target, Mic2, List];
export function NewsIcon({ article, size = 24 }: { article: Article; size?: number }) {
  const Icon = newsIcons[Number(article.id) - 1] ?? Newspaper;
  return <Icon size={size} strokeWidth={1.7} aria-hidden="true" />;
}

// The match minute must come from the data source; never advance it with a timer.
export function useLiveMinute(base?: number) {
  return base;
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

export function NoLiveMatches() {
  return (
    <div className="rounded-xl border bg-card p-5 text-center">
      <CircleDot className="mx-auto text-primary" size={30} strokeWidth={1.6} aria-hidden="true" />
      <div className="mt-2 font-display text-xl font-black uppercase">No Live Matches</div>
      <p className="mt-1 text-sm text-muted-foreground">There's no Betway Premiership match currently in progress.</p>
      <Link to="/matches" className="mt-3 inline-flex items-center gap-1 font-display text-sm font-bold uppercase text-primary">View Upcoming Fixtures <ChevronRight size={16} /></Link>
    </div>
  );
}

export function NextMatch({ match }: { match: Match }) {
  const h = teams[match.home]!, a = teams[match.away]!;
  return (
    <Link to="/matches/$id" params={{ id: match.id }} className="card-hover block rounded-xl border border-l-4 border-l-primary bg-card p-4">
      <div className="mb-3 flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 font-display font-bold uppercase tracking-widest text-primary"><Clock3 size={14} /> Next Match</span>
        <span className="rounded-full bg-secondary px-2 py-0.5 font-display font-bold uppercase">Upcoming</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex w-24 flex-col items-center gap-1 text-center"><TeamLogo team={match.home} size={44} /><span className="text-xs font-semibold">{h.name}</span></div>
        <div className="text-center">
          <div className="font-display text-3xl font-black">{match.time}</div>
          <div className="text-xs text-muted-foreground">{match.date}</div>
        </div>
        <div className="flex w-24 flex-col items-center gap-1 text-center"><TeamLogo team={match.away} size={44} /><span className="text-xs font-semibold">{a.name}</span></div>
      </div>
      <div className="mt-3 flex items-center justify-center gap-1 text-center text-xs text-muted-foreground"><MapPin size={13} /> {match.venue}{match.derby && <span className="inline-flex items-center gap-1 font-bold text-primary"> · {match.derby} <Flame size={13} /></span>}</div>
    </Link>
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

export function StatBar({ label, home, away, suffix = "" }: { label: string; home: number; away: number; suffix?: string | undefined }) {
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
          <div className="h-full rounded-full bg-success transition-all duration-1000 ease-out" style={{ width: on ? `${(home / total) * 100}%` : 0 }} />
        </div>
        <div className="flex-1 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-muted-foreground transition-all duration-1000 ease-out" style={{ width: on ? `${(away / total) * 100}%` : 0 }} />
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
  const minute = useLiveMinute(match.minute);
  const h = teams[match.home]!, a = teams[match.away]!;
  const hs = match.hs ?? 0, as = match.as ?? 0;
  return (
    <article
      onClick={() => nav({ to: "/matches/$id", params: { id: match.id } })}
      className="card-hover cursor-pointer rounded-xl border border-l-4 border-l-live bg-card p-4"
    >
      <div className="mb-3 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{match.venue}{match.derby && <span className="ml-1 inline-flex items-center gap-1 font-bold text-live"> · {match.derby} <Flame size={12} /></span>}</span>
        <span className="flex items-center gap-1.5 rounded-full bg-live/15 px-2 py-0.5 font-display font-bold text-live">
          <LiveDot /> {minute != null ? `${minute}'` : "LIVE"}
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
          {match.ht && <div className="text-[11px] text-muted-foreground">HT {match.ht}</div>}
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
              <CircleDot size={13} className="inline-block align-middle" /> {e.player} <span className="text-live">{e.min}'</span>
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
      {match.derby && <div className="mb-2 flex items-center gap-1 font-display text-xs font-bold text-live"><Flame size={13} /> {match.derby}</div>}
      <Link to="/matches/$id" params={{ id: match.id }} className="flex items-center justify-between gap-2">
        <div className="flex w-28 items-center gap-2"><TeamLogo team={match.home} size={28} /><span className="text-sm font-semibold">{teams[match.home]!!.short}</span></div>
        <div className="text-center">
          <div className="font-display text-xl font-extrabold text-primary">{match.time}</div>
          <div className="text-[11px] text-muted-foreground">{match.date}</div>
        </div>
        <div className="flex w-28 items-center justify-end gap-2"><span className="text-sm font-semibold">{teams[match.away]!!.short}</span><TeamLogo team={match.away} size={28} /></div>
      </Link>
      <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1"><MapPin size={12} /> {match.venue}</span>
        <span className="flex items-center gap-1 rounded bg-secondary px-1.5 py-0.5"><Tv2 size={12} /> {match.tv}</span>
      </div>
      {expanded && (
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button onClick={() => setRemind(true)} className={cn("rounded-lg border py-2 font-display text-sm font-bold uppercase", remind ? "border-success bg-success/15 text-success" : "hover:bg-accent")}>
            <span className="inline-flex items-center gap-1.5">{remind ? <Check size={15} /> : <Bell size={15} />} {remind ? "Reminder Set" : "Remind Me"}</span>
          </button>
          <button onClick={() => setCal(true)} className={cn("rounded-lg border py-2 font-display text-sm font-bold uppercase", cal ? "border-success bg-success/15 text-success" : "hover:bg-accent")}>
            <span className="inline-flex items-center gap-1.5">{cal ? <Check size={15} /> : <CalendarDays size={15} />} {cal ? "Added" : "Add to Calendar"}</span>
          </button>
        </div>
      )}
    </article>
  );
}

export function Header() {
  const live = matches.filter((m) => m.status === "live");
  const items = [
    ...live.map((m) => `LIVE · ${teams[m.home]!.short} ${m.hs ?? ""}–${m.as ?? ""} ${teams[m.away]!.short}${m.minute != null ? ` ${m.minute}'` : ""}`),
    ...matches.filter((m) => m.status === "upcoming").map((m) => `${teams[m.home]!.short} v ${teams[m.away]!.short} · ${m.date} ${m.time}`),
    ...matches.filter((m) => m.status === "ft").map((m) => `FT ${teams[m.home]!.short} ${m.hs}–${m.as} ${teams[m.away]!.short}`),
  ];
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background">
      <div className="flex items-center justify-between gap-2 px-3 py-2">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoAsset.url} alt="Betway Premiership" className="h-10 w-auto rounded-sm bg-foreground object-contain px-1" />
          <div className="leading-none">
            <div className="font-display text-base font-black uppercase tracking-wide">Betway Premiership</div>
            <div className="font-display text-sm font-bold text-primary">{SEASON}</div>
          </div>
        </Link>
        <div className="flex items-center gap-1.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-secondary font-display text-sm font-bold">KM</span>
          <Link to="/more" aria-label="More" title="More" className="rounded-full p-1.5 hover:bg-accent"><Menu size={22} strokeWidth={1.8} /></Link>
        </div>
      </div>
      <div className="overflow-hidden bg-ticker py-1.5 text-primary-foreground">
        <div className="ticker-track flex gap-8 whitespace-nowrap font-display text-sm font-bold">
          {[...items, ...items].map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </div>
    </header>
  );
}

function SponsorTile({ s }: { s: (typeof sponsors)[number] }) {
  const [err, setErr] = useState(!s.logo);
  return (
    <a href={s.href} target="_blank" rel="noreferrer" className="flex h-16 w-32 shrink-0 items-center justify-center rounded-lg bg-foreground p-2">
      {err ? <span className="font-display text-lg font-black text-background">{s.name}</span>
        : <img src={s.logo} alt={s.name} loading="lazy" onError={() => setErr(true)} className="max-h-full max-w-full object-contain" />}
    </a>
  );
}

export function SponsorsStrip() {
  return (
    <section className="-mx-4 bg-surface px-4 py-5">
      <h2 className="mb-3 font-display text-lg font-extrabold uppercase tracking-wide text-primary">Official Partners</h2>
      <div className="no-scrollbar flex gap-3 overflow-x-auto">
        {sponsors.map((s) => <SponsorTile key={s.name} s={s} />)}
      </div>
      <p className="mt-3 text-[11px] text-muted-foreground">Betway: Responsible Gambling — 18+ only. Gamble responsibly.</p>
    </section>
  );
}

export { SponsorTile };

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/fantasy", label: "Fantasy", icon: Trophy, badge: true },
  { to: "/matches", label: "Matches", icon: CalendarDays },
  { to: "/table", label: "Table", icon: Table2 },
  { to: "/news", label: "News", icon: Newspaper },
] as const;

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-1/2 z-30 grid w-full max-w-[430px] -translate-x-1/2 grid-cols-5 border-t border-border bg-background">
      {tabs.map((t) => (
        <Link
          key={t.to}
          to={t.to}
          activeOptions={{ exact: t.to === "/" }}
          className="relative flex flex-col items-center gap-0.5 py-2.5 text-muted-foreground"
          activeProps={{ className: "text-primary" }}
        >
          <span className="relative">
            <t.icon size={22} strokeWidth={1.8} aria-hidden="true" />
            {"badge" in t && <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">3</span>}
          </span>
          <span className="font-display text-xs font-bold uppercase">{t.label}</span>
        </Link>
      ))}
    </nav>
  );
}
