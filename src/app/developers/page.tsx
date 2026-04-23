import Link from "next/link";
import { Code2, KeyRound, Webhook, BookMarked } from "lucide-react";
import { PageShell } from "@/components/shared/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockApiEndpoints } from "@/data/mock-data";
import { SITE_CONFIG } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo";
import { BentoCard, SectionLabel, StatStrip } from "@/components/marketing/marketing-blocks";

export async function generateMetadata() {
  return buildPageMetadata({
    path: "/developers",
    title: `Developers | ${SITE_CONFIG.name}`,
    description: `APIs, webhooks, and integration patterns for partners extending ${SITE_CONFIG.name} listings into their own products.`,
  });
}

const sdks = [
  { name: "REST catalog", detail: "JSON responses with cursor pagination and ETag caching." },
  { name: "Embed widgets", detail: "Drop-in cards for reviews, hours, and CTAs with theming hooks." },
  { name: "CSV bulk tools", detail: "Nightly sync for multi-location brands migrating from legacy directories." },
];

export default function DevelopersPage() {
  return (
    <PageShell
      title="Developer platform"
      description="Automate listing updates, stream verification events, and build co-branded experiences without scraping."
      actions={
        <>
          <Button variant="outline" asChild>
            <Link href="/contact">Request sandbox</Link>
          </Button>
          <Button asChild>
            <Link href="/status">API status</Link>
          </Button>
        </>
      }
    >
      <StatStrip
        stats={[
          { label: "Endpoints", value: "36", hint: "Public + partner beta namespaces." },
          { label: "Webhook topics", value: "12", hint: "Listing, media, messaging, billing." },
          { label: "Median latency", value: "118 ms", hint: "Global edge, p95 under 320 ms." },
          { label: "SLA uptime", value: "99.95%", hint: "Annual target on core read APIs." },
        ]}
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <BentoCard
          icon={Code2}
          title="Typed OpenAPI"
          description="Generate clients in TypeScript, Kotlin, or Swift straight from our published spec—versioned per season."
        />
        <BentoCard
          icon={Webhook}
          title="Evented architecture"
          description="Subscribe to structured payloads when owners publish, pause, or verify so your stack stays in sync."
        />
        <BentoCard
          icon={KeyRound}
          title="Scoped keys"
          description="Rotate credentials per environment with explicit ACLs for read-only analysts or write-capable integrators."
        />
        <BentoCard
          icon={BookMarked}
          title="Partner playbooks"
          description="Implementation guides for agencies, POS vendors, and tourism boards—with solution engineering office hours."
        />
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-2">
        <Card className="border-border/80 bg-card/90">
          <CardContent className="p-6 sm:p-8">
            <SectionLabel>Reference</SectionLabel>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-foreground">
              Sample endpoints
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Names below illustrate common patterns; exact paths ship in the sandbox portal after NDA.
            </p>
            <div className="mt-6 space-y-3">
              {mockApiEndpoints.map((endpoint) => (
                <div
                  key={endpoint.id}
                  className="flex flex-col gap-2 rounded-xl border border-border/70 bg-secondary/25 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary">{endpoint.method}</Badge>
                      <code className="text-xs text-foreground">{endpoint.path}</code>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{endpoint.description}</p>
                  </div>
                  <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    {endpoint.scope}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/80 bg-gradient-to-b from-primary/5 to-card">
          <CardContent className="space-y-6 p-6 sm:p-8">
            <div>
              <SectionLabel>Tooling</SectionLabel>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-foreground">
                What ships in the portal
              </h2>
            </div>
            <ul className="space-y-4">
              {sdks.map((sdk) => (
                <li key={sdk.name} className="rounded-xl border border-border/60 bg-background/60 px-4 py-3">
                  <p className="text-sm font-semibold text-foreground">{sdk.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{sdk.detail}</p>
                </li>
              ))}
            </ul>
            <Button className="w-full" asChild>
              <Link href="/help">Read integration guides</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
