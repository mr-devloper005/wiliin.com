import Link from "next/link";

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

export type LegalSection = {
  id: string;
  title: string;
  blocks: LegalBlock[];
};

export function LegalDocument({
  lastUpdated,
  intro,
  sections,
}: {
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[minmax(0,15rem)_minmax(0,42rem)]">
      <aside className="lg:sticky lg:top-28 lg:h-fit">
        <nav
          className="rounded-2xl border border-border/80 bg-gradient-to-br from-card to-muted/20 p-5 shadow-[var(--shadow-card)]"
          aria-label="On this page"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">On this page</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <Link
                  href={`#${s.id}`}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <article className="min-w-0">
        <div className="rounded-2xl border border-border/80 bg-card/40 p-6 sm:p-8 lg:p-10">
          <p className="text-xs font-medium text-muted-foreground">Last updated: {lastUpdated}</p>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{intro}</p>
          <div className="mt-12 space-y-14">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  {section.title}
                </h2>
                <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  {section.blocks.map((block, i) =>
                    block.type === "p" ? (
                      <p key={i}>{block.text}</p>
                    ) : (
                      <ul key={i} className="list-disc space-y-2.5 pl-5 marker:text-primary/70">
                        {block.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ),
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
