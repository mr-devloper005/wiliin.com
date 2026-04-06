"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { SitePost } from "@/lib/site-connector";
import type { TaskConfig } from "@/lib/site-config";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { buildPostUrl } from "@/lib/task-data";
import { cn } from "@/lib/utils";

export function TaskFeedCarousel({
  task,
  posts,
}: {
  task: TaskConfig;
  posts: SitePost[];
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByDir = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const delta = Math.min(360, Math.floor(el.clientWidth * 0.85));
    el.scrollBy({ left: dir * delta, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => scrollByDir(-1)}
        className={cn(
          "absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-sm border border-border/80 bg-background/95 text-foreground shadow-[var(--shadow-sm)] transition hover:bg-muted md:flex",
          "pointer-events-auto"
        )}
        aria-label="Scroll carousel left"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => scrollByDir(1)}
        className={cn(
          "absolute right-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-sm border border-border/80 bg-background/95 text-foreground shadow-[var(--shadow-sm)] transition hover:bg-muted md:flex",
          "pointer-events-auto"
        )}
        aria-label="Scroll carousel right"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div
        ref={scrollerRef}
        className="-mx-1 overflow-x-auto scroll-smooth pb-2 pl-1 pr-1 scroll-px-4 sm:mx-0 sm:px-10 md:scroll-px-6"
      >
        <div className="flex min-w-min gap-6 px-1 pb-2 pt-1 sm:gap-8 md:px-2">
          {posts.slice(0, 5).map((post, index) => (
            <div
              key={`${post.id}-${index}`}
              className={
                task.key === "article"
                  ? "w-[200px] shrink-0 sm:w-[220px] lg:w-[240px]"
                  : task.key === "image"
                    ? "w-[200px] shrink-0 sm:w-[240px] lg:w-[260px]"
                    : task.key === "pdf"
                      ? "w-[190px] shrink-0 sm:w-[220px] lg:w-[240px]"
                      : task.key === "classified"
                        ? "w-[240px] shrink-0 sm:w-[280px] lg:w-[300px]"
                        : "w-[220px] shrink-0 sm:w-[260px] lg:w-[280px]"
              }
            >
              <TaskPostCard
                post={post}
                taskKey={task.key}
                href={buildPostUrl(task.key, post.slug)}
                visualVariant={task.key === "article" ? "gallery" : "default"}
                collectionLabel={task.key === "article" ? task.label : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
