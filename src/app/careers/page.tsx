import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo";
import { SectionLabel, StatStrip } from "@/components/marketing/marketing-blocks";

export async function generateMetadata() {
  return buildPageMetadata({
    path: "/careers",
    title: `Careers | ${SITE_CONFIG.name}`,
    description: `Join ${SITE_CONFIG.name} and help build the next generation of listing-first local discovery—remote-friendly, design-conscious, and owner-empathetic.`,
  });
}

const roles = [
  {
    title: "Senior product designer",
    location: "Remote · Americas",
    type: "Full-time",
    level: "Senior",
    blurb: "Own discovery flows from search results to listing detail—systems thinker who prototypes in Figma and ships with engineers.",
  },
  {
    title: "Full-stack engineer (marketplace)",
    location: "Remote · Global",
    type: "Full-time",
    level: "Mid / Senior",
    blurb: "Next.js, edge caching, and thoughtful APIs that keep owner dashboards snappy during peak upload windows.",
  },
  {
    title: "Community partnerships lead",
    location: "Hybrid · Mumbai",
    type: "Full-time",
    level: "Lead",
    blurb: "Build relationships with business associations, co-ops, and creator collectives who want fair representation online.",
  },
  {
    title: "Content strategist",
    location: "Remote",
    type: "Contract",
    level: "Mid",
    blurb: "Shape editorial guides that sit beside listings—SEO-smart, human-voiced, and obsessed with local nuance.",
  },
];

const benefits = [
  "Remote-first with optional studio weeks in partner cities",
  "Medical coverage + mental health stipend",
  "$1.8k annual learning budget (conferences, courses, books)",
  "Four-day deep work summers (June–August)",
  "Transparent leveling matrix and bi-annual compensation reviews",
];

export default function CareersPage() {
  return (
    <PageShell
      title="Build the directory the internet deserved"
      description={`${SITE_CONFIG.name} is hiring kind, curious people who want owners to shine and explorers to feel confident.`}
      actions={
        <Button asChild>
          <Link href="/contact">Introduce yourself</Link>
        </Button>
      }
    >
      <StatStrip
        stats={[
          { label: "Employee NPS", value: "64", hint: "Rolling 90-day internal pulse." },
          { label: "Offer acceptance", value: "91%", hint: "Candidates who said yes in 2025." },
          { label: "Parental leave", value: "18 wk", hint: "Primary caregivers, fully paid." },
          { label: "Donation match", value: "2×", hint: "Up to $2k per year for local nonprofits." },
        ]}
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4">
          <SectionLabel>Open roles</SectionLabel>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-foreground">
            Teams hiring now
          </h2>
          {roles.map((role) => (
            <Card key={role.title} className="border-border/80 bg-gradient-to-br from-card to-muted/15 shadow-[var(--shadow-card)]">
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{role.level}</Badge>
                  <Badge variant="outline">{role.type}</Badge>
                </div>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg font-semibold text-foreground">{role.title}</h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">{role.location}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{role.blurb}</p>
                <Button variant="outline" className="mt-5" asChild>
                  <Link href="/contact">Apply or refer someone</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="h-fit border-border/80 bg-card/80 lg:sticky lg:top-28">
          <CardContent className="p-6 sm:p-8">
            <SectionLabel>Life at {SITE_CONFIG.name}</SectionLabel>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-foreground">
              Benefits that respect real life
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              We optimize for sustainable pace: few meetings, documented decisions, and space to do craft work without heroics.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex gap-3 rounded-lg border border-border/60 bg-secondary/30 px-3 py-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <Button className="mt-8 w-full" asChild>
              <Link href="/team">Meet the team</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
