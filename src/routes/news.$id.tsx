import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { catColor, news } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ArrowLeft, Flame, PenLine } from "lucide-react";
import { NewsIcon } from "@/components/psl";

export const Route = createFileRoute("/news/$id")({
  loader: ({ params }) => {
    const article = news.find((n) => n.id === params.id);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Article not found" }, { name: "robots", content: "noindex" }] };
    const a = loaderData.article;
    return { meta: [{ title: `${a.title} — PSL News` }, { name: "description", content: a.summary }, { property: "og:title", content: a.title }, { property: "og:description", content: a.summary }, { property: "og:type", content: "article" }] };
  },
  notFoundComponent: () => <div className="p-8 text-center">Article not found. <Link to="/news" className="text-primary">Back</Link></div>,
  component: Article,
});

function Article() {
  const { article: a } = Route.useLoaderData();
  return (
    <article className="space-y-4 p-4">
      <div className="flex h-40 items-center justify-center rounded-xl bg-card text-primary"><NewsIcon article={a} size={68} /></div>
      <span className={cn("inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase", catColor[a.cat])}>{a.cat}{a.hot && <Flame size={12} />}</span>
      <h1 className="font-display text-3xl font-black leading-tight">{a.title}</h1>
      <div className="flex items-center gap-1 text-xs text-muted-foreground"><PenLine size={12} /> {a.author} · {a.ago}</div>
      <p className="leading-relaxed text-muted-foreground">{a.summary}</p>
      <Link to="/news" className="flex items-center justify-center gap-2 rounded-lg border py-3 font-display font-bold uppercase hover:bg-accent"><ArrowLeft size={16} /> Back to News</Link>
    </article>
  );
}
