import { createFileRoute } from "@tanstack/react-router";
import { SectionTitle, SponsorTile } from "@/components/psl";
import { sponsors } from "@/lib/data";

export const Route = createFileRoute("/more")({
  head: () => ({
    meta: [
      { title: "More — Betway Premiership" },
      { name: "description", content: "PSL tournaments, official partners, about the league, contact and social links." },
      { property: "og:title", content: "More — Betway Premiership" },
      { property: "og:description", content: "Tournaments, partners and info about the PSL." },
    ],
  }),
  component: More,
});

const tournaments = ["Betway Premiership", "MTN8", "Nedbank Cup", "Carling Knockout", "Motsepe Foundation Championship", "Diski Challenge"];

function More() {
  return (
    <div className="space-y-7 p-4">
      <section>
        <SectionTitle>Tournaments</SectionTitle>
        <div className="divide-y rounded-xl border bg-card">
          {tournaments.map((t) => <div key={t} className="flex justify-between px-4 py-3 text-sm font-semibold"><span>🏆 {t}</span><span className="text-muted-foreground">›</span></div>)}
        </div>
      </section>
      <section>
        <SectionTitle>Official Sponsors</SectionTitle>
        <div className="space-y-2">
          {sponsors.map((s) => (
            <div key={s.name} className="flex items-center gap-3 rounded-xl border bg-card p-2">
              <SponsorTile s={s} />
              <div><div className="font-semibold">{s.name}</div><div className="text-xs text-muted-foreground">{s.role}{s.gambling && " · 18+"}</div></div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <SectionTitle>About PSL</SectionTitle>
        <p className="text-sm text-muted-foreground">The Premier Soccer League runs South Africa's professional football. The {"2026/27"} Betway Premiership runs from 31 July 2026 to 22 May 2027. Orlando Pirates are the defending champions.</p>
      </section>
      <section>
        <SectionTitle>Contact & Social</SectionTitle>
        <div className="grid grid-cols-2 gap-2">
          <a href="https://www.facebook.com/OfficialPSL/" target="_blank" rel="noreferrer" className="rounded-lg border bg-card py-3 text-center font-display font-bold">Facebook</a>
          <a href="https://twitter.com/officialpsl/" target="_blank" rel="noreferrer" className="rounded-lg border bg-card py-3 text-center font-display font-bold">X / Twitter</a>
          <a href="https://psl.co.za/" target="_blank" rel="noreferrer" className="col-span-2 rounded-lg border bg-card py-3 text-center font-display font-bold">psl.co.za</a>
        </div>
      </section>
      <p className="rounded-lg border border-primary bg-primary/10 p-3 text-xs">🔞 Responsible gambling: Betway is for people aged 18 and over only. Please gamble responsibly.</p>
    </div>
  );
}
