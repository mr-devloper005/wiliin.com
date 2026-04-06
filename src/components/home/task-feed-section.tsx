import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import type { SitePost } from "@/lib/site-connector";
import type { TaskConfig } from "@/lib/site-config";
import { TaskFeedCarousel } from "@/components/home/task-feed-carousel";
import { siteContent } from "@/config/site.content";

export function TaskFeedSection({
  task,
  posts,
}: {
  task: TaskConfig;
  posts: SitePost[];
}) {
  if (!posts.length) return null;

  return (
    <section className="border-t border-border/50 bg-background py-14 sm:py-16 lg:py-20">
      <div className="site-container max-w-[var(--container-site)]">
        <div className="flex flex-col gap-8 border-b border-border/40 pb-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-4xl">
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              <FileText className="h-3.5 w-3.5 opacity-80" aria-hidden />
              {task.label}
            </p>
            <h2 className="mt-5 text-balance font-[family-name:var(--font-display)] text-[1.85rem] font-semibold leading-[1.15] tracking-tight text-foreground sm:text-[2.25rem] md:text-[2.5rem]">
              {siteContent.taskSectionHeading.replace("{label}", task.label)}
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
              {task.description || siteContent.taskSectionDescriptionSuffix}
            </p>
          </div>
          <Link
            href={task.route}
            className="inline-flex shrink-0 items-center gap-2 self-start text-sm font-semibold text-primary underline-offset-4 transition hover:underline lg:self-end"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10">
          <TaskFeedCarousel task={task} posts={posts} />
        </div>
      </div>
    </section>
  );
}
