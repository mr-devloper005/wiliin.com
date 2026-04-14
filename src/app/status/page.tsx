import Link from "next/link";
import { Activity, Clock3, Server } from "lucide-react";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo";
import { SectionLabel, StatStrip } from "@/components/marketing/marketing-blocks";

export async function generateMetadata() {
  return buildPageMetadata({
    path: "/status",
    title: `Status | ${SITE_CONFIG.name}`,
    description: `Live health for ${SITE_CONFIG.name} web apps, APIs, media delivery, and background workers.`,
  });
}

const services = [
  {
    name: "Web application",
    status: "Operational",
    detail: "Next.js edge routes + SSR for marketing and dashboard shells.",
    icon: Server,
  },
  {
    name: "Core API",
    status: "Operational",
    detail: "Authenticated REST + GraphQL façade for listings and messaging.",
    icon: Activity,
  },
  {
    name: "Media pipeline",
    status: "Operational",
    detail: "Image resizing, moderation queue, and CDN propagation.",
    icon: Clock3,
  },
];

const incidents = [
  {
    date: "Apr 4, 2026",
    title: "Elevated latency on image transforms",
    status: "Resolved",
    body: "A hotfix rolled out within 42 minutes; backlog cleared automatically once workers scaled.",
  },
  {
    date: "Mar 21, 2026",
    title: "Delayed webhook retries",
    status: "Resolved",
    body: "Partner deliveries caught up after DNS failover; no data loss.",
  },
  {
    date: "Feb 9, 2026",
    title: "Search index drift",
    status: "Resolved",
    body: "Manual reindex restored category filters for ~18 minutes.",
  },
];

export default function StatusPage() {
  return (
    <PageShell
      title="System status"
      description="We publish incidents here first—subscribe via RSS in the partner portal or check back before launches."
      actions={
        <Button variant="outline" asChild>
          <Link href="/help">Report an issue</Link>
        </Button>
      }
    >
      <StatStrip
        stats={[
          { label: "Uptime (90d)", value: "99.98%", hint: "Public web + API composite." },
          { label: "Active incidents", value: "0", hint: "Updated every 60 seconds." },
          { label: "MTTR", value: "38m", hint: "Mean time to resolve (rolling quarter)." },
          { label: "Scheduled work", value: "None", hint: "No maintenance windows this week." },
        ]}
      />

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.name} className="border-border/80 bg-gradient-to-b from-card to-muted/15">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted/50 text-primary">
                  <service.icon className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-foreground">{service.name}</h2>
                  <Badge className="mt-2" variant="secondary">
                    {service.status}
                  </Badge>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{service.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-10 border-border/80">
        <CardContent className="p-6 sm:p-8">
          <SectionLabel>Incident history</SectionLabel>
          <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-foreground">
            Recent transparency log
          </h3>
          <div className="mt-6 space-y-4">
            {incidents.map((incident) => (
              <div
                key={incident.title}
                className="rounded-xl border border-border/70 bg-secondary/20 px-4 py-4 sm:px-5"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    {incident.date}
                  </span>
                  <Badge variant="outline">{incident.status}</Badge>
                </div>
                <p className="mt-2 text-sm font-semibold text-foreground">{incident.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{incident.body}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageShell>
  );
}
