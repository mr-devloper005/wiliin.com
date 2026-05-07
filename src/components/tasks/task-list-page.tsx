import { NavbarShell } from "@/components/shared/navbar-shell";
import { TaskListClient } from "@/components/tasks/task-list-client";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG, getTaskConfig, type TaskKey } from "@/lib/site-config";
import { CATEGORY_OPTIONS, normalizeCategory } from "@/lib/categories";
import { Footer } from "@/components/shared/footer";
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
        <section className="relative mb-12 overflow-hidden rounded-[var(--radius-editorial-lg)] border border-border/70 bg-gradient-to-br from-card via-card to-muted/35 p-6 shadow-[var(--shadow-md)] sm:p-8 lg:mb-14 lg:p-10">
          <div className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-primary/10 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -left-14 bottom-0 h-40 w-40 rounded-full bg-primary/8 blur-3xl" aria-hidden />
          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.8fr)] lg:items-end">
            <div className="max-w-3xl">
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
                  "mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[3.2rem]",
                  task === "article" && "font-[family-name:var(--font-display)]"
                )}
              >
                {taskConfig?.description || "Latest posts"}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                Browse a cleaner directory-style feed with quick category filtering, richer cards,
                and a layout that helps visitors scan the best options faster.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <span className="rounded-full border border-border/70 bg-background/70 px-3 py-2">
                  {posts.length} results loaded
                </span>
                <span className="rounded-full border border-border/70 bg-background/70 px-3 py-2">
                  {CATEGORY_OPTIONS.length} categories
                </span>
                <span className="rounded-full border border-border/70 bg-background/70 px-3 py-2">
                  Editorial card layout
                </span>
              </div>
            </div>
            <form
              className="rounded-[calc(var(--radius-editorial-lg)-0.4rem)] border border-border/70 bg-background/80 p-5 shadow-[var(--shadow-sm)] backdrop-blur"
              action={taskConfig?.route || "#"}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Refine feed
              </p>
              <label className="mt-4 block text-sm font-medium text-foreground">Category</label>
              <select
                name="category"
                defaultValue={normalizedCategory}
                className="mt-2 h-11 w-full rounded-xl border border-border bg-card px-3 text-sm text-foreground shadow-[var(--shadow-sm)] transition duration-[var(--duration-fast)] ease-[var(--ease-editorial)] focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
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
                className="mt-4 h-11 w-full rounded-xl border border-border bg-secondary px-5 text-sm font-semibold text-foreground shadow-[var(--shadow-sm)] transition duration-[var(--duration-fast)] ease-[var(--ease-editorial)] hover:bg-secondary/80"
              >
                Apply filter
              </button>
              <p className="mt-3 text-xs leading-6 text-muted-foreground">
                Use category filters to narrow the list without changing any listing data.
              </p>
            </form>
          </div>
        </section>

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
