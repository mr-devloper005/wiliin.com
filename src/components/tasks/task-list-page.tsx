import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { TaskListClient } from "@/components/tasks/task-list-client";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG, getTaskConfig, type TaskKey } from "@/lib/site-config";
import { CATEGORY_OPTIONS, normalizeCategory } from "@/lib/categories";
import { cn } from "@/lib/utils";

import { taskIntroCopy } from '@/config/site.content';



export async function TaskListPage({
  task,
  category,
}: {
  task: TaskKey;
  category?: string;
}) {
  const taskConfig = getTaskConfig(task);
  const posts = await fetchTaskPosts(task, 30);
  const normalizedCategory = category ? normalizeCategory(category) : "all";
  const intro = taskIntroCopy[task];
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");
  const schemaItems = posts.slice(0, 10).map((post, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${baseUrl}${taskConfig?.route || "/posts"}/${post.slug}`,
    name: post.title,
  }));

  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <main className="site-container max-w-[var(--container-site)] py-12 sm:py-14 lg:py-16">
        {task === "listing" ? (
          <SchemaJsonLd
            data={[
              {
                "@context": "https://schema.org",
                "@type": "ItemList",
                name: `${SITE_CONFIG.name} posts`,
                itemListElement: schemaItems,
              },
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                name: SITE_CONFIG.name,
                url: `${baseUrl}/listings`,
                areaServed: "Worldwide",
              },
            ]}
          />
        ) : null}
        {task === "article" || task === "classified" ? (
          <SchemaJsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: `${taskConfig?.label || task} | ${SITE_CONFIG.name}`,
              url: `${baseUrl}${taskConfig?.route || ""}`,
              hasPart: schemaItems,
            }}
          />
        ) : null}
        <div
          className={cn(
            "mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between",
            task === "article"
              ? "rounded-[var(--radius-editorial-lg)] border border-border/60 bg-gradient-to-br from-card via-card to-muted/30 p-6 sm:p-8 lg:mb-14"
              : "border-b border-border/70 pb-10"
          )}
        >
          <div className="max-w-2xl">
            {task === "article" ? <div className="kicker-rule" aria-hidden /> : null}
            <p
              className={cn(
                "text-xs uppercase tracking-[0.28em] text-muted-foreground",
                task === "article" && "mt-4"
              )}
            >
              {taskConfig?.label || task}
            </p>
            <h1
              className={cn(
                "mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl",
                task === "article" && "font-[family-name:var(--font-display)] sm:text-[2.65rem]"
              )}
            >
              {taskConfig?.description || "Latest posts"}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Browse by category to narrow results.
            </p>
          </div>
          <form
            className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            action={taskConfig?.route || "#"}
          >
            <label className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Category
            </label>
            <select
              name="category"
              defaultValue={normalizedCategory}
              className="h-11 min-w-[160px] rounded-xl border border-border bg-card px-3 text-sm text-foreground shadow-[var(--shadow-sm)] transition duration-[var(--duration-fast)] ease-[var(--ease-editorial)] focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              <option value="all">All categories</option>
              {CATEGORY_OPTIONS.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="h-11 rounded-xl border border-border bg-secondary px-5 text-sm font-semibold text-foreground shadow-[var(--shadow-sm)] transition duration-[var(--duration-fast)] ease-[var(--ease-editorial)] hover:bg-secondary/80"
            >
              Apply
            </button>
          </form>
        </div>

        {intro ? (
          <section className="mb-12 rounded-[var(--radius-editorial-lg)] border border-border bg-card/80 p-6 shadow-[var(--shadow-sm)] sm:p-8">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-foreground">
              {intro.title}
            </h2>
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mt-4 text-sm leading-7 text-muted-foreground">
                {paragraph}
              </p>
            ))}
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              {intro.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-semibold text-foreground hover:underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </section>
        ) : null}

        <TaskListClient task={task} initialPosts={posts} category={normalizedCategory} />
      </main>
      <Footer />
    </div>
  );
}
