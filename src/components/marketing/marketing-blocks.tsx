import type { LucideIcon } from "lucide-react";

export function StatStrip({
  stats,
}: {
  stats: { label: string; value: string; hint?: string }[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-border/80 bg-gradient-to-br from-card via-card to-muted/25 p-5 shadow-[var(--shadow-card)]"
        >
          <div className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {item.value}
          </div>
          <div className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{item.label}</div>
          {item.hint ? <p className="mt-2 text-xs leading-relaxed text-muted-foreground/90">{item.hint}</p> : null}
        </div>
      ))}
    </div>
  );
}

export function BentoCard({
  icon: Icon,
  title,
  description,
  className = "",
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={`group rounded-2xl border border-border/80 bg-gradient-to-br from-card to-muted/15 p-6 shadow-[var(--shadow-card)] transition duration-[var(--duration-fast)] ease-[var(--ease-editorial)] hover:border-primary/20 hover:shadow-md ${className}`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted/40 text-primary transition-colors group-hover:border-primary/25 group-hover:bg-primary/5">
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}

export function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary">{children}</p>
  );
}
