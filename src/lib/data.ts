const L = (id: number) => `https://tmssl.akamaized.net/images/wappen/big/${id}.png`;

export type Res = "W" | "D" | "L";
export type Team = { key: string; name: string; short: string; logo: string; color: string };


export const teams: Record<string, Team> = {
  SUN: { key: "SUN", name: "Mamelodi Sundowns", short: "SUN", logo: L(6356), color: "#FFD700" },
  KAI: { key: "KAI", name: "Kaizer Chiefs", short: "KAI", logo: L(7081), color: "#F7B500" },
  ORL: { key: "ORL", name: "Orlando Pirates", short: "ORL", logo: L(7085), color: "#9CA3AF" },
  AMA: { key: "AMA", name: "AmaZulu", short: "AMA", logo: L(7079), color: "#16A34A" },
  SEK: { key: "SEK", name: "Sekhukhune United", short: "SEK", logo: L(85501), color: "#2563EB" },
  DUR: { key: "DUR", name: "Durban City", short: "DUR", logo: L(22348), color: "#0EA5E9" },
  TSG: { key: "TSG", name: "TS Galaxy", short: "TSG", logo: L(19298), color: "#DC2626" },
  POL: { key: "POL", name: "Polokwane City", short: "POL", logo: L(7099), color: "#EA580C" },
  RBY: { key: "RBY", name: "Richards Bay", short: "RBY", logo: L(18825), color: "#0891B2" },
  ARR: { key: "ARR", name: "Golden Arrows", short: "ARR", logo: L(7077), color: "#65A30D" },
  SIW: { key: "SIW", name: "Siwelele", short: "SIW", logo: L(131361), color: "#7C3AED" },
  STE: { key: "STE", name: "Stellenbosch FC", short: "STE", logo: L(18615), color: "#B91C1C" },
  MAR: { key: "MAR", name: "Marumo Gallants", short: "MAR", logo: L(13317), color: "#CA8A04" },
  ORB: { key: "ORB", name: "Orbit College", short: "ORB", logo: L(19000), color: "#4F46E5" },
  CHI: { key: "CHI", name: "Chippa United", short: "CHI", logo: L(11913), color: "#1D4ED8" },
  MAG: { key: "MAG", name: "Magesi FC", short: "MAG", logo: L(18611), color: "#15803D" },
};

export type Row = { team: string; p: number; w: number; d: number; l: number; gf: number; ga: number; pts: number; form: Res[] };
const r = (team: string, p: number, w: number, d: number, l: number, gf: number, ga: number, pts: number, f: string): Row =>
  ({ team, p, w, d, l, gf, ga, pts, form: f.split(",") as Res[] });

export const standings: Row[] = [
  r("SUN", 15, 9, 5, 1, 24, 7, 32, "W,W,W,D,W"),
  r("KAI", 15, 8, 6, 1, 15, 6, 30, "D,W,W,D,D"),
  r("ORL", 13, 9, 2, 2, 18, 5, 29, "W,W,W,D,W"),
  r("AMA", 15, 8, 3, 4, 18, 14, 27, "W,D,W,L,W"),
  r("SEK", 16, 7, 5, 4, 16, 10, 26, "W,D,W,D,L"),
  r("DUR", 16, 7, 4, 5, 15, 11, 25, "W,L,D,W,D"),
  r("TSG", 16, 7, 3, 6, 22, 16, 24, "L,L,L,L,L"),
  r("POL", 15, 6, 5, 4, 11, 9, 23, "D,W,D,L,W"),
  r("RBY", 16, 4, 7, 5, 14, 16, 19, "W,D,D,D,D"),
  r("ARR", 16, 5, 2, 9, 21, 22, 17, "W,L,D,W,L"),
  r("SIW", 16, 4, 5, 7, 9, 14, 17, "D,L,D,L,D"),
  r("STE", 15, 4, 3, 8, 11, 18, 15, "L,D,D,L,W"),
  r("MAR", 16, 3, 6, 7, 12, 20, 15, "D,L,D,W,D"),
  r("ORB", 16, 4, 1, 11, 12, 28, 13, "W,L,L,L,L"),
  r("CHI", 16, 2, 6, 8, 8, 21, 12, "D,L,D,L,D"),
  r("MAG", 14, 2, 5, 7, 10, 19, 11, "D,L,D,L,L"),
];

export const scorers = [
  { name: "Junior Dion", team: "ARR", flag: "🇹🇩", goals: 10, assists: 3, apps: 17 },
  { name: "Iqraam Rayners", team: "SUN", flag: "🇿🇦", goals: 9, assists: 4, apps: 15 },
  { name: "Bradley Grobler", team: "SEK", flag: "🇿🇦", goals: 8, assists: 2, apps: 18 },
  { name: "Langelihle Phili", team: "STE", flag: "🇿🇦", goals: 7, assists: 5, apps: 15 },
  { name: "Relebohile Mofokeng", team: "ORL", flag: "🇿🇦", goals: 7, assists: 6, apps: 13 },
  { name: "Glody Lilepo", team: "SUN", flag: "🇨🇩", goals: 6, assists: 4, apps: 14 },
  { name: "Bongokuhle Hlongwane", team: "KAI", flag: "🇿🇦", goals: 5, assists: 3, apps: 14 },
  { name: "Tashreeq Morris", team: "AMA", flag: "🇿🇦", goals: 5, assists: 2, apps: 15 },
  { name: "Thembinkosi Lorch", team: "ORL", flag: "🇿🇦", goals: 4, assists: 7, apps: 13 },
  { name: "Miguel Cardoso", team: "SUN", flag: "🇵🇹", goals: 4, assists: 5, apps: 13 },
];

export type MatchEvent = { icon: string; player: string; min: number; side: "home" | "away" };
export type Stats = { possession: [number, number]; shots: [number, number]; sot: [number, number]; corners: [number, number]; fouls: [number, number]; yellows: [number, number] };
export type Match = {
  id: string; status: "live" | "upcoming" | "ft"; home: string; away: string;
  hs?: number; as?: number; ht?: string; minute?: number; venue: string; tv?: string;
  date?: string; time?: string; derby?: string; events?: MatchEvent[]; stats?: Stats;
};

export const matches: Match[] = [
  {
    id: "orl-kai", status: "live", home: "ORL", away: "KAI", hs: 2, as: 1, ht: "2–0", minute: 67,
    venue: "Orlando Stadium", tv: "SuperSport 2", derby: "SOWETO DERBY",
    events: [
      { icon: "⚽", player: "Mofokeng", min: 23, side: "home" },
      { icon: "⚽", player: "Mofokeng", min: 45, side: "home" },
      { icon: "⚽", player: "Hlongwane", min: 52, side: "away" },
      { icon: "🟨", player: "Hlanti", min: 61, side: "away" },
    ],
    stats: { possession: [54, 46], shots: [9, 6], sot: [5, 3], corners: [5, 3], fouls: [8, 11], yellows: [0, 1] },
  },
  {
    id: "sun-sek", status: "live", home: "SUN", away: "SEK", hs: 2, as: 0, ht: "—", minute: 34,
    venue: "Loftus Versfeld", tv: "SuperSport 4",
    events: [
      { icon: "⚽", player: "Rayners", min: 12, side: "home" },
      { icon: "🟨", player: "Grobler", min: 21, side: "away" },
      { icon: "⚽", player: "Lilepo", min: 29, side: "home" },
    ],
    stats: { possession: [62, 38], shots: [11, 4], sot: [6, 1], corners: [7, 2], fouls: [6, 9], yellows: [0, 1] },
  },
  { id: "ama-arr", status: "upcoming", home: "AMA", away: "ARR", date: "Sat 15 Mar", time: "15:00", venue: "Moses Mabhida Stadium", tv: "SuperSport 3", derby: "DURBAN DERBY" },
  { id: "dur-ste", status: "upcoming", home: "DUR", away: "STE", date: "Sat 15 Mar", time: "17:30", venue: "Princess Magogo Stadium", tv: "SuperSport 2" },
  { id: "pol-tsg", status: "upcoming", home: "POL", away: "TSG", date: "Sun 16 Mar", time: "15:00", venue: "Peter Mokaba Stadium", tv: "SuperSport 4" },
  { id: "rby-chi", status: "upcoming", home: "RBY", away: "CHI", date: "Sun 16 Mar", time: "17:30", venue: "uMhlathuze Sports Complex", tv: "SuperSport 3" },
  { id: "sun-sek-ft", status: "ft", home: "SUN", away: "SEK", hs: 3, as: 1, date: "Sat 1 Mar", venue: "Loftus Versfeld", events: [], stats: { possession: [60, 40], shots: [14, 6], sot: [7, 2], corners: [6, 3], fouls: [9, 12], yellows: [1, 2] } },
  { id: "rby-kai-ft", status: "ft", home: "RBY", away: "KAI", hs: 1, as: 0, date: "Sat 1 Mar", venue: "uMhlathuze Sports Complex", events: [], stats: { possession: [41, 59], shots: [7, 10], sot: [3, 2], corners: [2, 6], fouls: [13, 9], yellows: [3, 1] } },
  { id: "mag-arr-ft", status: "ft", home: "MAG", away: "ARR", hs: 2, as: 1, date: "Sun 2 Mar", venue: "Old Peter Mokaba Stadium", events: [{ icon: "⚽", player: "Dion", min: 88, side: "away" }], stats: { possession: [47, 53], shots: [8, 9], sot: [4, 3], corners: [4, 5], fouls: [10, 10], yellows: [2, 2] } },
  { id: "siw-ste-ft", status: "ft", home: "SIW", away: "STE", hs: 0, as: 0, date: "Sun 2 Mar", venue: "Dr Molemela Stadium", events: [], stats: { possession: [50, 50], shots: [5, 6], sot: [1, 2], corners: [3, 4], fouls: [11, 12], yellows: [2, 1] } },
];

export type Article = { id: string; title: string; cat: string; author: string; ago: string; hot?: boolean; emoji: string; summary: string };
export const news: Article[] = [
  { id: "1", title: "How Pirates defied the odds to reach the top: an inside story", cat: "Feature", author: "Ntombizodwa Dlamini", ago: "2h ago", emoji: "🏴‍☠️", summary: "From a turbulent pre-season to the summit of the Betway Premiership — the players and staff reveal how the Buccaneers rebuilt their belief." },
  { id: "2", title: "Sundowns target Nigerian striker in R15M deal — sources", cat: "Transfer", hot: true, author: "Thabo Mokoena", ago: "3h ago", emoji: "💰", summary: "Masandawana are preparing a big-money move to bolster their attack ahead of the CAF Champions League knockouts." },
  { id: "3", title: "Pirates edge Chiefs in Soweto Derby classic — match report", cat: "Match Report", author: "Sipho Nkosi", ago: "5h ago", emoji: "⚽", summary: "A Mofokeng brace settled a pulsating derby at Orlando Stadium." },
  { id: "4", title: "Iqraam Rayners doubtful for Sundowns' CAF clash after training knock", cat: "Injury", author: "Lerato Molefe", ago: "8h ago", emoji: "🩹", summary: "The in-form striker is being assessed by the medical team." },
  { id: "5", title: "Price changes: 3 key players to buy before Gameweek 22", cat: "Fantasy", hot: true, author: "PSL Fantasy Team", ago: "12h ago", emoji: "📈", summary: "Get ahead of the market with these rising assets." },
  { id: "6", title: "Mofokeng named Betway Premiership Player of the Month for February", cat: "Awards", author: "PSL Media", ago: "1d ago", emoji: "🏅", summary: "The Pirates winger caps a brilliant month with the individual honour." },
  { id: "7", title: "Kaizer Chiefs' third straight defeat deepens crisis at Naturena", cat: "Match Report", author: "Sipho Nkosi", ago: "1d ago", emoji: "📉", summary: "Amakhosi supporters are growing restless after another loss." },
  { id: "8", title: "Bradley Grobler at 38: the veteran striker defying Father Time", cat: "Interview", author: "Zanele Khumalo", ago: "2d ago", emoji: "🎙️", summary: "Sekhukhune's evergreen forward on longevity, hunger and goals." },
  { id: "9", title: "Orbit College stun TS Galaxy to hand Rockets fifth straight defeat", cat: "Match Report", hot: true, author: "Sipho Nkosi", ago: "2d ago", emoji: "😱", summary: "The newcomers pulled off the shock of the weekend." },
  { id: "10", title: "PSL announces bumper fixture list for Easter weekend", cat: "News", author: "PSL Media", ago: "3d ago", emoji: "📅", summary: "A packed schedule awaits fans over the long weekend." },
];

export const catColor: Record<string, string> = {
  Feature: "bg-orange/20 text-orange", Transfer: "bg-gold/20 text-gold", "Match Report": "bg-info/20 text-info",
  Injury: "bg-live/20 text-live", Fantasy: "bg-fantasy/20 text-fantasy", Awards: "bg-amber/20 text-amber",
  Interview: "bg-primary/20 text-primary", News: "bg-muted text-muted-foreground",
};

export type Pos = "GK" | "DEF" | "MID" | "FWD";
export const fantasy = [
  { name: "Ronwen Williams", pos: "GK" as Pos, team: "SUN", price: 6.0, total: 112, gw: 9, own: 44.2, form: 7.2, next: "SEK (H)", diff: "Easy" },
  { name: "Iqraam Rayners", pos: "FWD" as Pos, team: "SUN", price: 10.5, total: 134, gw: 11, own: 57.8, form: 8.6, next: "SEK (H)", diff: "Easy" },
  { name: "Relebohile Mofokeng", pos: "MID" as Pos, team: "ORL", price: 9.8, total: 127, gw: 14, own: 53.6, form: 9.2, next: "POL (A)", diff: "Easy" },
  { name: "Thembinkosi Lorch", pos: "MID" as Pos, team: "ORL", price: 9.0, total: 112, gw: 8, own: 41.3, form: 7.8, next: "POL (A)", diff: "Easy" },
  { name: "Junior Dion", pos: "FWD" as Pos, team: "ARR", price: 8.5, total: 118, gw: 10, own: 45.9, form: 9.0, next: "AMA (A)", diff: "Hard" },
  { name: "Glody Lilepo", pos: "FWD" as Pos, team: "SUN", price: 8.0, total: 104, gw: 6, own: 34.7, form: 6.8, next: "SEK (H)", diff: "Easy" },
  { name: "Bradley Grobler", pos: "FWD" as Pos, team: "SEK", price: 6.5, total: 96, gw: 7, own: 28.4, form: 6.4, next: "SUN (A)", diff: "Hard" },
  { name: "Bongokuhle Hlongwane", pos: "FWD" as Pos, team: "KAI", price: 8.2, total: 88, gw: 5, own: 31.0, form: 5.8, next: "ORL (A)", diff: "Hard" },
  { name: "Sifiso Hlanti", pos: "DEF" as Pos, team: "KAI", price: 6.8, total: 88, gw: 3, own: 22.1, form: 4.2, next: "ORL (A)", diff: "Hard" },
  { name: "Langelihle Phili", pos: "MID" as Pos, team: "STE", price: 7.0, total: 88, gw: 6, own: 22.4, form: 6.0, next: "SIW (A)", diff: "Medium" },
];
