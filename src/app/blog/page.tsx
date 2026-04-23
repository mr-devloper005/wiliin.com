import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, PenLine } from "lucide-react";
import { PageShell } from "@/components/shared/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo";

export const revalidate = 60;

export const generateMetadata = () =>
  buildPageMetadata({
    path: "/blog",
    title: `Journal | ${SITE_CONFIG.name}`,
    description: `Field notes, product essays, and owner stories from the ${SITE_CONFIG.name} editorial desk.`,
  });

function formatDate(value?: string | null) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });
}

export default async function BlogPage() {
  const posts = await fetchTaskPosts("comment", 9, { allowMockFallback: true });

  return (
    <PageShell
      title="Journal & field notes"
      description="Longer reads from our team—how we think about discovery, trust signals, and the owners who keep neighborhoods vibrant."
      actions={
        <>
          <Button variant="outline" asChild>
            <Link href="/articles">Editorial archive</Link>
          </Button>
          <Button asChild>
            <Link href="/search">Search stories</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        <Card className="border-border/80 bg-gradient-to-br from-primary/10 via-card to-muted/20 lg:col-span-5">
          <CardContent className="flex h-full flex-col justify-between p-6 sm:p-8">
            <div>
              <Badge variant="secondary" className="text-[10px] uppercase tracking-[0.2em]">
                Letter from the editor
              </Badge>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-foreground">
                Why we still believe in slow publishing.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Listings answer &quot;where&quot; and &quot;when.&quot; The journal answers &quot;why it matters&quot;—profiles of owners,
                data drops from our search team, and transparent posts about product bets.
              </p>
            </div>
            <Button variant="link" className="mt-6 h-auto justify-start gap-1 px-0 text-primary" asChild>
              <Link href="/contact">
                Pitch a story <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4 lg:col-span-7">
          {posts.length === 0 ? (
            <Card className="border-dashed border-border/80">
              <CardContent className="flex flex-col items-start gap-4 p-8 sm:flex-row sm:items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                  <PenLine className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Fresh issues are on the way</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    While we migrate older posts, dive into the main article library for guides and reporting.
                  </p>
                  <Button className="mt-4" asChild>
                    <Link href="/articles">Open articles</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            posts.map((post) => {
              const image = post.media?.find((m) => m.type?.startsWith("image") || m.url)?.url || post.media?.[0]?.url;
              const summary = post.summary || post.metaDescription || "";
              return (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                  <Card className="h-full border-border/80 transition duration-[var(--duration-fast)] hover:border-primary/25 hover:shadow-md">
                    <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-stretch">
                      {image ? (
                        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl bg-muted sm:aspect-auto sm:h-auto sm:w-44">
                          <Image src={image} alt={post.title} fill className="object-cover transition group-hover:scale-[1.02]" />
                        </div>
                      ) : (
                        <div className="flex aspect-[16/10] w-full shrink-0 items-center justify-center rounded-xl bg-muted sm:aspect-auto sm:h-auto sm:w-44">
                          <PenLine className="h-8 w-8 text-muted-foreground/60" />
                        </div>
                      )}
                      <div className="flex min-w-0 flex-1 flex-col justify-center">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                          {formatDate(post.publishedAt || post.createdAt)}
                        </p>
                        <h3 className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-foreground group-hover:text-primary">
                          {post.title}
                        </h3>
                        {summary ? (
                          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{summary}</p>
                        ) : null}
                        <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
                          Read story <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </PageShell>
  );
}
