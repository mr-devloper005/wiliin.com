import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { HeroSection } from "@/components/home/hero-section";
import { CTASection } from "@/components/home/cta-section";
import { TaskFeedSection } from "@/components/home/task-feed-section";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { SITE_CONFIG } from "@/lib/site-config";
import { getTasksForShell } from "@/config/site.ui";
import { buildPageMetadata } from "@/lib/seo";
import { fetchTaskPosts, getPostImages } from "@/lib/task-data";
import { siteContent } from "@/config/site.content";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: "/",
    title: siteContent.home.metadata.title,
    description: siteContent.home.metadata.description,
    openGraphTitle: siteContent.home.metadata.openGraphTitle,
    openGraphDescription: siteContent.home.metadata.openGraphDescription,
    image: SITE_CONFIG.defaultOgImage,
    keywords: [...siteContent.home.metadata.keywords],
  });
}

export default async function HomePage() {
  const taskFeed = (
    await Promise.all(
      getTasksForShell().map(async (task) => ({
          task,
          posts: await fetchTaskPosts(task.key, 4, { allowMockFallback: false, fresh: true }),
        }))
    )
  ).filter(({ posts }) => posts.length);

  const heroImages = taskFeed
    .flatMap(({ posts }) => posts.flatMap((post) => getPostImages(post)))
    .filter(Boolean)
    .slice(0, 12);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />
      <main>
        <HeroSection images={heroImages} />
        <SchemaJsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              name: SITE_CONFIG.name,
              url: SITE_CONFIG.baseUrl,
              logo: `${SITE_CONFIG.baseUrl.replace(/\/$/, "")}${SITE_CONFIG.defaultOgImage}`,
              sameAs: [],
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: SITE_CONFIG.name,
              url: SITE_CONFIG.baseUrl,
              potentialAction: {
                "@type": "SearchAction",
                target: `${SITE_CONFIG.baseUrl.replace(/\/$/, "")}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            },
          ]}
        />

        <section className="border-t border-border/40 bg-gradient-to-b from-background to-muted/20">
          <div className="site-container editorial-section-y max-w-[var(--container-site)]">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center justify-center text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                {siteContent.home.introBadge}
              </span>
              <h2 className="mt-6 text-balance font-[family-name:var(--font-display)] text-3xl font-semibold leading-[1.12] tracking-tight text-foreground sm:text-4xl md:text-[2.65rem]">
                {siteContent.home.introTitle}
              </h2>
            </div>

            <div className="mx-auto mt-12 grid max-w-5xl gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-16">
              <div className="space-y-6 text-[15px] leading-[1.85] text-muted-foreground sm:text-base">
                {siteContent.home.introParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <aside className="border border-border/70 bg-card/60 p-6 sm:p-8 lg:sticky lg:top-28">
                <span className="text-[11px] font-semibold uppercase tracking-[0.26em] text-muted-foreground">
                  {siteContent.home.sideBadge}
                </span>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {siteContent.home.sidePoints.map((point) => (
                    <li key={point} className="border-l-2 border-primary/35 pl-4">
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href={siteContent.home.primaryLink.href}
                    className="inline-flex items-center justify-center gap-2 rounded-sm border border-foreground/20 bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                  >
                    {siteContent.home.primaryLink.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={siteContent.home.secondaryLink.href}
                    className="inline-flex items-center justify-center gap-2 rounded-sm border border-border bg-transparent px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-muted/50"
                  >
                    {siteContent.home.secondaryLink.label}
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {taskFeed.map(({ task, posts }) => (
          <TaskFeedSection key={task.key} task={task} posts={posts} />
        ))}
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
