const L = (name: string) => `https://imageorigin.supersport.com/psl/clublogos/small/${encodeURIComponent(name)}.png`;

export type Res = "W" | "D" | "L";
export type Team = { key: string; name: string; short: string; logo: string; color: string };

export const SEASON = "2026/27";

export const teams: Record<string, Team> = {
  SUN: { key: "SUN", name: "Mamelodi Sundowns", short: "SUN", logo: L("Mamelodi Sundowns"), color: "#FFD700" },
  ORL: { key: "ORL", name: "Orlando Pirates", short: "ORL", logo: L("Orlando Pirates"), color: "#9CA3AF" },
  AMA: { key: "AMA", name: "AmaZulu FC", short: "AMA", logo: L("AmaZulu FC"), color: "#16A34A" },
  KAI: { key: "KAI", name: "Kaizer Chiefs", short: "KAI", logo: L("Kaizer Chiefs"), color: "#F7B500" },
  MIL: { key: "MIL", name: "Milford FC", short: "MIL", logo: L("Milford FC"), color: "#0EA5E9" },
  SEK: { key: "SEK", name: "Sekhukhune United", short: "SEK", logo: L("Sekhukhune United"), color: "#2563EB" },
  STE: { key: "STE", name: "Stellenbosch FC", short: "STE", logo: L("Stellenbosch FC"), color: "#B91C1C" },
  ARR: { key: "ARR", name: "Golden Arrows", short: "ARR", logo: L("Golden Arrows"), color: "#65A30D" },
  CHI: { key: "CHI", name: "Chippa United", short: "CHI", logo: L("Chippa United"), color: "#1D4ED8" },
  DUR: { key: "DUR", name: "Durban City", short: "DUR", logo: L("Durban City"), color: "#0891B2" },
  POL: { key: "POL", name: "Polokwane City", short: "POL", logo: L("Polokwane City"), color: "#EA580C" },
  GAL: { key: "GAL", name: "TS Galaxy", short: "GAL", logo: L("TS Galaxy"), color: "#DC2626" },
  MAR: { key: "MAR", name: "Marumo Gallants", short: "MAR", logo: L("Marumo Gallants"), color: "#CA8A04" },
  RIC: { key: "RIC", name: "Richards Bay", short: "RIC", logo: L("Richards Bay"), color: "#0E7490" },
  SIW: { key: "SIW", name: "Siwelele", short: "SIW", logo: L("Siwelele"), color: "#7C3AED" },
  KRU: { key: "KRU", name: "Kruger United", short: "KRU", logo: L("Kruger United"), color: "#15803D" },
};

export type Row = { team: string; p: number; w: number; d: number; l: number; gf: number; ga: number; pts: number; form: Res[] };
const r = (team: string, p: number, w: number, d: number, l: number, gf: number, ga: number, pts: number, f: string): Row =>
  ({ team, p, w, d, l, gf, ga, pts, form: f.split(",") as Res[] });

export const standings: Row[] = [
  r("SUN", 8, 6, 2, 0, 20, 4, 20, "W,W,W,D,W"),
  r("ORL", 7, 6, 1, 0, 19, 6, 19, "W,W,W,W,D"),
  r("AMA", 7, 5, 1, 1, 16, 8, 16, "W,W,W,D,L"),
  r("KAI", 7, 3, 4, 0, 13, 7, 13, "W,D,D,D,W"),
  r("MIL", 8, 3, 3, 2, 12, 9, 12, "W,L,D,W,D"),
  r("SEK", 7, 3, 2, 2, 11, 9, 11, "D,W,L,W,D"),
  r("STE", 7, 2, 3, 2, 9, 9, 9, "W,D,L,D,D"),
  r("ARR", 7, 1, 5, 1, 8, 7, 8, "D,W,D,D,L"),
  r("CHI", 7, 1, 5, 1, 7, 7, 8, "W,D,D,L,D"),
  r("DUR", 7, 1, 4, 2, 7, 7, 7, "L,D,W,D,D"),
  r("POL", 7, 1, 4, 2, 7, 8, 7, "D,D,L,W,D"),
  r("GAL", 7, 1, 3, 3, 7, 9, 6, "L,W,D,L,D"),
  r("MAR", 7, 0, 4, 3, 5, 8, 4, "D,L,D,D,L"),
  r("RIC", 7, 0, 3, 4, 5, 12, 3, "L,D,L,D,L"),
  r("SIW", 7, 0, 3, 4, 5, 12, 3, "L,L,D,L,D"),
  r("KRU", 7, 0, 1, 6, 2, 11, 1, "L,L,L,L,D"),
];

export const scorers = [
  { name: "Thandolwenkosi Ngwenya", team: "AMA", flag: "🇿🇼", goals: 6, assists: 2, apps: 7 },
  { name: "Victor Letsoalo", team: "GAL", flag: "🇿🇦", goals: 4, assists: 1, apps: 7 },
  { name: "Wandile Duba", team: "KAI", flag: "🇿🇦", goals: 3, assists: 2, apps: 7 },
  { name: "Brayan León", team: "SUN", flag: "🇨🇴", goals: 3, assists: 4, apps: 8 },
  { name: "Quwan Plaatjies", team: "STE", flag: "🇿🇦", goals: 3, assists: 1, apps: 7 },
  { name: "Nqaba Xulu", team: "RIC", flag: "🇿🇦", goals: 3, assists: 0, apps: 7 },
  { name: "Oswin Appollis", team: "ORL", flag: "🇿🇦", goals: 2, assists: 3, apps: 7 },
  { name: "Tshepang Moremi", team: "ORL", flag: "🇿🇦", goals: 2, assists: 2, apps: 7 },
  { name: "Teboho Mokoena", team: "SUN", flag: "🇿🇦", goals: 2, assists: 5, apps: 8 },
  { name: "Cassius Mailula", team: "SUN", flag: "🇿🇦", goals: 2, assists: 3, apps: 8 },
];

export type MatchEvent = { icon: string; player: string; min: number; side: "home" | "away" };
export type Stats = { possession: [number, number]; shots: [number, number]; sot: [number, number]; corners: [number, number]; fouls: [number, number]; yellows: [number, number] };
export type Match = {
  id: string; status: "live" | "upcoming" | "ft" | "postponed"; home: string; away: string;
  hs?: number; as?: number; ht?: string; minute?: number; venue: string; tv?: string;
  date?: string; time?: string; derby?: string; events?: MatchEvent[]; stats?: Stats;
};

// Only real fixtures and results go here. Never add invented live matches, scores or stats.
export const matches: Match[] = [
  { id: "dur-ama", status: "upcoming", home: "DUR", away: "AMA", date: "Mon 13 Oct", time: "19:30", venue: "Chatsworth Stadium", tv: "SuperSport PSL", derby: "DURBAN DERBY" },
  { id: "orl-gal", status: "upcoming", home: "ORL", away: "GAL", date: "Mon 13 Oct", time: "19:30", venue: "Orlando Amstel Arena", tv: "SuperSport PSL" },
  { id: "chi-kru", status: "upcoming", home: "CHI", away: "KRU", date: "Fri 17 Oct", time: "15:30", venue: "Buffalo City Stadium", tv: "SuperSport PSL" },
  { id: "arr-mil", status: "upcoming", home: "ARR", away: "MIL", date: "Fri 17 Oct", time: "15:30", venue: "King Goodwill Zwelithini Stadium", tv: "SuperSport PSL" },
  { id: "sek-mar", status: "upcoming", home: "SEK", away: "MAR", date: "Fri 17 Oct", time: "18:00", venue: "Peter Mokaba Stadium", tv: "SuperSport PSL" },
  { id: "siw-pol", status: "upcoming", home: "SIW", away: "POL", date: "Sat 18 Oct", time: "15:30", venue: "Dr Molemela Stadium", tv: "SuperSport PSL" },
  { id: "arr-kai-ft", status: "ft", home: "ARR", away: "KAI", hs: 0, as: 0, date: "20 Sep 2026", venue: "Mbombela Stadium", events: [] },
  { id: "chi-gal-ft", status: "ft", home: "CHI", away: "GAL", hs: 1, as: 0, date: "20 Sep 2026", venue: "Solomon Mahlangu Stadium", events: [] },
  { id: "mil-ric-ft", status: "ft", home: "MIL", away: "RIC", hs: 5, as: 1, date: "13 Sep 2026", venue: "Sugar Ray Xulu Stadium", events: [] },
  { id: "sun-siw-ft", status: "ft", home: "SUN", away: "SIW", hs: 3, as: 0, date: "09 Sep 2026", venue: "Loftus Versfeld", events: [] },
  { id: "arr-sun-ft", status: "ft", home: "ARR", away: "SUN", hs: 1, as: 2, date: "06 Sep 2026", venue: "King Goodwill Zwelithini Stadium", events: [] },
  { id: "chi-mil-ft", status: "ft", home: "CHI", away: "MIL", hs: 0, as: 0, date: "05 Sep 2026", venue: "Buffalo City Stadium", events: [] },
  { id: "kru-dur-ft", status: "ft", home: "KRU", away: "DUR", hs: 0, as: 2, date: "25 Aug 2026", venue: "Mbombela Stadium", events: [] },
];

export type Article = { id: string; title: string; cat: string; author: string; ago: string; hot?: boolean; emoji: string; summary: string };
export const news: Article[] = [
  { id: "1", title: "MTN8 final tickets sold out — Pirates vs Sundowns at Moses Mabhida", cat: "News", hot: true, author: "PSL Media", ago: "02 Oct 2026", emoji: "🎟️", summary: "Every seat at Moses Mabhida Stadium has been snapped up for the season's first cup final between the two giants of South African football." },
  { id: "2", title: "Bafana Bafana thump Eritrea 5-0 for second AFCON qualifier win", cat: "News", author: "PSL Media", ago: "01 Oct 2026", emoji: "🇿🇦", summary: "A commanding display keeps Bafana on course for AFCON qualification." },
  { id: "3", title: "Durban City's Nedbank Cup triumph creates lasting sporting legacy for Chatsworth learners", cat: "Feature", author: "PSL Media", ago: "30 Sep 2026", emoji: "🏆", summary: "The cup run is changing lives in the community around Chatsworth Stadium." },
  { id: "4", title: "PSL confirms venue and ticketing details for 2026 MTN8 Final at Moses Mabhida", cat: "News", author: "PSL Media", ago: "28 Sep 2026", emoji: "📍", summary: "All the information supporters need ahead of the final in Durban." },
  { id: "5", title: "Majadibodu strike lifts Chippa United as TS Galaxy slump to defeat", cat: "Match Report", author: "PSL Media", ago: "20 Sep 2026", emoji: "⚽", summary: "A single goal settled it at Solomon Mahlangu Stadium." },
  { id: "6", title: "Ngwenya wins Player of the Month, Ouaddou Coach of the Month — August awards", cat: "Awards", hot: true, author: "PSL Media", ago: "08 Sep 2026", emoji: "🏅", summary: "AmaZulu's Zimbabwean striker and the Pirates coach scoop August's honours." },
  { id: "7", title: "Milford FC shock Richards Bay 5-1 in the result of the season so far", cat: "Match Report", hot: true, author: "PSL Media", ago: "13 Sep 2026", emoji: "😱", summary: "The newly promoted side ran riot at Sugar Ray Xulu Stadium." },
  { id: "8", title: "Brayan León wins Goal of the Month for stunning volley against AmaZulu", cat: "Awards", author: "PSL Media", ago: "08 Sep 2026", emoji: "🎯", summary: "The Colombian's strike was voted August's best." },
  { id: "9", title: "Ouaddou: Pirates will be hungrier than ever to defend the title", cat: "Interview", author: "PSL Media", ago: "Sep 2026", emoji: "🎙️", summary: "The champions' coach on the challenge of going back-to-back." },
  { id: "10", title: "PSL 2026/27 season preview: 16 teams, 2 new faces, one trophy", cat: "Feature", author: "PSL Media", ago: "Jul 2026", emoji: "📋", summary: "Kruger United and Milford FC join the Betway Premiership." },
];

export const catColor: Record<string, string> = {
  Feature: "bg-orange/20 text-orange", Transfer: "bg-gold/20 text-gold", "Match Report": "bg-info/20 text-info",
  Injury: "bg-live/20 text-live", Fantasy: "bg-fantasy/20 text-fantasy", Awards: "bg-gold/20 text-gold",
  Interview: "bg-success/20 text-success", News: "bg-primary/20 text-primary",
};

export type Pos = "GK" | "DEF" | "MID" | "FWD";
const fp = (name: string, pos: Pos, team: string, price: number, gw: number, total: number, own: number, form: number, next: string, diff: string) =>
  ({ name, pos, team, price, gw, total, own, form, next, diff });
export const fantasy = [
  fp("Thandolwenkosi Ngwenya", "FWD", "AMA", 9.5, 14, 96, 61.2, 9.4, "DUR (H) Derby", "Hard"),
  fp("Brayan León", "FWD", "SUN", 10.2, 11, 88, 54.7, 8.8, "RIC (A)", "Easy"),
  fp("Oswin Appollis", "MID", "ORL", 9.8, 9, 84, 52.1, 8.6, "GAL (H)", "Easy"),
  fp("Teboho Mokoena", "MID", "SUN", 9.0, 8, 80, 48.3, 7.8, "RIC (A)", "Easy"),
  fp("Cassius Mailula", "FWD", "SUN", 8.8, 8, 76, 44.5, 7.4, "RIC (A)", "Easy"),
  fp("Wandile Duba", "FWD", "KAI", 8.5, 10, 74, 42.1, 8.2, "STE (H)", "Medium"),
  fp("Victor Letsoalo", "FWD", "GAL", 8.2, 7, 68, 36.4, 6.8, "ORL (A)", "Hard"),
  fp("Tshepang Moremi", "FWD", "ORL", 7.8, 6, 62, 31.7, 6.4, "GAL (H)", "Easy"),
  fp("Quwan Plaatjies", "MID", "STE", 7.5, 8, 60, 28.9, 7.0, "KAI (A)", "Hard"),
  fp("Ghampani Lungu", "MID", "ORL", 7.2, 5, 56, 24.6, 5.8, "GAL (H)", "Easy"),
  fp("Mduduzi Shabalala", "FWD", "KAI", 7.0, 7, 54, 22.3, 6.6, "STE (H)", "Medium"),
  fp("Tashreeq Matthews", "MID", "SUN", 7.0, 6, 52, 20.8, 5.6, "RIC (A)", "Easy"),
];

const S = (f: string) => `https://awesslegacycontent.blob.core.windows.net/newpsl/images/sponsors/${f}`;
export const sponsors = [
  { name: "Betway", role: "Title Sponsor — Betway Premiership", logo: S("betway-premiership-sponsor.jpg"), href: "https://www.betway.co.za", gambling: true },
  { name: "Nedbank", role: "Nedbank Cup", logo: S("nedbank.png"), href: "https://www.nedbank.co.za" },
  { name: "MTN", role: "MTN8", logo: S("mtn.png"), href: "https://www.mtn.co.za" },
  { name: "Carling Black Label", role: "Carling Knockout Cup", logo: S("Carling.PNG"), href: "https://www.carlingblacklabel.co.za" },
  { name: "DStv", role: "Diski Challenge, Compact Cup", logo: "", href: "https://www.dstv.com" },
];
