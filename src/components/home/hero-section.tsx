"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentImage } from "@/components/shared/content-image";
import { SITE_CONFIG } from "@/lib/site-config";
import { siteContent } from "@/config/site.content";
import { getTasksForShell } from "@/config/site.ui";
import { cn } from "@/lib/utils";

const FALLBACK_IMAGE = "/placeholder.svg?height=1400&width=2400";

/** When only one URL exists, vary crop so tiles still feel distinct */
const TILE_OBJECT_POSITION = [
  "object-[center_25%]",
  "object-[center_55%]",
  "object-[center_40%]",
  "object-left",
  "object-right",
] as const;

type CollageTile = {
  /** grid-column start / span (1-based cols) */
  area: string;
};

/** Asymmetric 12×6 grid: tall left strip + 2×2 on the right */
const COLLAGE_TILES: CollageTile[] = [
  { area: "col-start-1 col-span-5 row-start-1 row-span-6" },
  { area: "col-start-6 col-span-4 row-start-1 row-span-3" },
  { area: "col-start-10 col-span-3 row-start-1 row-span-3" },
  { area: "col-start-6 col-span-3 row-start-4 row-span-3" },
  { area: "col-start-9 col-span-4 row-start-4 row-span-3" },
];

export function HeroSection({ images }: { images: string[] }) {
  const slides = useMemo(() => {
    const valid = images.filter(Boolean);
    return valid.length ? valid.slice(0, 12) : [FALLBACK_IMAGE];
  }, [images]);

  const [activeIndex, setActiveIndex] = useState(0);

  const go = useCallback(
    (delta: number) => {
      setActiveIndex((i) => (i + delta + slides.length) % slides.length);
    },
    [slides.length]
  );

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 8000);
    return () => window.clearInterval(timer);
  }, [slides]);

  return (
    <section className="relative border-b border-border/60 bg-background">
      {/* Minimal top rule */}
      <div className="relative z-10 border-b border-border/40 bg-background">
        <div className="site-container flex max-w-[var(--container-site)] items-center justify-between gap-3 py-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-muted-foreground sm:py-4">
          <span className="text-foreground/75">{SITE_CONFIG.name}</span>
          <span className="hidden sm:inline">{siteContent.hero.badge}</span>
        </div>
      </div>

      {/* Centered editorial hero — reference: library / journal homepage */}
      <div className="site-container max-w-[var(--container-site)] px-4 pb-4 pt-14 sm:px-6 sm:pt-16 md:pt-20 lg:pt-24">
        <div className="mx-auto max-w-[40rem] text-center lg:max-w-[44rem]">
          <h1 className="text-balance font-[family-name:var(--font-display)] text-[2.35rem] font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-[3.15rem] lg:text-[3.45rem]">
            <span className="block">{siteContent.hero.title[0]}</span>
            <span className="mt-2 block text-primary sm:mt-3">{siteContent.hero.title[1]}</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {siteContent.hero.description}
          </p>

          <form
            action="/search"
            className="mx-auto mt-10 max-w-2xl border border-border/90 bg-card shadow-[var(--shadow-sm)]"
          >
            <div className="flex flex-col gap-0 sm:flex-row sm:items-stretch">
              <div className="relative min-w-0 flex-1 border-b border-border/80 sm:border-b-0 sm:border-r">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-[1.125rem] w-[1.125rem] -translate-y-1/2 text-muted-foreground sm:left-4"
                  aria-hidden
                />
                <label htmlFor="hero-search" className="sr-only">
                  Search
                </label>
                <input
                  id="hero-search"
                  name="q"
                  placeholder={siteContent.hero.searchPlaceholder}
                  className="h-12 w-full bg-transparent py-3 pl-10 pr-3 text-base text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/25 sm:h-14 sm:pl-12 sm:text-[1.05rem]"
                />
              </div>
              <Button
                type="submit"
                className="h-12 shrink-0 rounded-none border-0 bg-primary px-8 text-sm font-semibold text-primary-foreground hover:bg-primary/92 sm:h-14 sm:min-w-[7.5rem]"
              >
                Search
              </Button>
            </div>
          </form>

          <div className="mt-3 flex justify-end text-right sm:mx-auto sm:max-w-2xl">
            <Link
              href={siteContent.hero.advancedSearchHref}
              className="text-xs font-medium text-primary underline underline-offset-4 transition hover:text-primary/80"
            >
              {siteContent.hero.advancedSearchLabel}
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-11 min-w-[10rem] rounded-sm border-foreground/20 bg-transparent px-6 text-sm font-semibold text-foreground shadow-none hover:bg-muted/50"
            >
              <Link href={siteContent.hero.primaryCta.href}>
                {siteContent.hero.primaryCta.label}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-11 min-w-[10rem] rounded-sm border-border bg-transparent px-6 text-sm font-semibold text-muted-foreground shadow-none hover:bg-muted/40 hover:text-foreground"
            >
              <Link href={siteContent.hero.secondaryCta.href}>{siteContent.hero.secondaryCta.label}</Link>
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 border-t border-border/50 pt-10 text-xs text-muted-foreground">
            <span className="font-semibold uppercase tracking-[0.2em] text-foreground/80">
              {siteContent.hero.focusLabel}
            </span>
            <span className="text-border" aria-hidden>
              ·
            </span>
            {getTasksForShell()
              .slice(0, 6)
              .map((task) => (
                <Link
                  key={task.key}
                  href={task.route}
                  className="rounded-sm px-2 py-1 font-medium text-foreground/85 underline-offset-4 transition hover:text-primary hover:underline"
                >
                  {task.label}
                </Link>
              ))}
          </div>
        </div>
      </div>

      {/* Collage strip — uneven tiles, layout-only composition */}
      <div className="relative mt-6 border-t border-border/50 bg-muted/40">
        <div className="relative w-full px-2 pb-2 pt-2 sm:px-4 sm:pb-3 sm:pt-3">
          <div
            className="relative mx-auto grid h-[min(52vh,32rem)] max-w-[var(--container-site)] grid-cols-12 grid-rows-6 gap-1.5 sm:h-[min(48vh,34rem)] sm:gap-2 md:gap-2.5"
            role="region"
            aria-label={`Featured photo collage from ${SITE_CONFIG.name}`}
          >
            {COLLAGE_TILES.map((tile, index) => {
              const srcIndex = (activeIndex + index) % slides.length;
              const src = slides[srcIndex];
              const singleSource = slides.length === 1;
              return (
                <div
                  key={`${tile.area}-${index}`}
                  className={`relative min-h-0 overflow-hidden rounded-sm border border-border/40 bg-muted shadow-[inset_0_1px_0_0_rgb(255_255_255/0.06)] sm:rounded-md ${tile.area}`}
                >
                  <ContentImage
                    key={`${src}-${activeIndex}-${index}`}
                    src={src}
                    alt=""
                    fill
                    priority={index < 2}
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 18vw"
                    className={cn(
                      "object-cover transition-opacity duration-500 ease-[var(--ease-editorial)]",
                      singleSource && TILE_OBJECT_POSITION[index % TILE_OBJECT_POSITION.length]
                    )}
                    intrinsicWidth={1200}
                    intrinsicHeight={900}
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/25 via-transparent to-background/5"
                    aria-hidden
                  />
                </div>
              );
            })}
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background via-background/40 to-transparent sm:h-24" />

          {slides.length > 1 ? (
            <div className="absolute right-3 top-3 flex items-center gap-2 rounded-sm border border-border/60 bg-background/90 px-2.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground shadow-sm backdrop-blur-sm sm:right-5 sm:top-4 sm:px-3 sm:text-[11px]">
              <span className="text-foreground/90">
                Collage · {activeIndex + 1} / {slides.length}
              </span>
              <div className="ml-0.5 flex items-center gap-0.5 border-l border-border/70 pl-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="rounded-sm p-1 text-foreground transition hover:bg-muted"
                  aria-label="Previous collage set"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="rounded-sm p-1 text-foreground transition hover:bg-muted"
                  aria-label="Next collage set"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
