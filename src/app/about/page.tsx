import Link from "next/link";
import { MapPin, ShieldCheck, Sparkles, Telescope } from "lucide-react";
import { PageShell } from "@/components/shared/page-shell";
import { Button } from "@/components/ui/button";
import { BentoCard, SectionLabel, StatStrip } from "@/components/marketing/marketing-blocks";
import { SITE_CONFIG } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildPageMetadata({
    path: "/about",
    title: `About ${SITE_CONFIG.name}`,
    description: `${SITE_CONFIG.name} is a listing-first discovery platform—built so people can find trustworthy local businesses, services, and spaces without noisy clutter.`,
    openGraphTitle: `About ${SITE_CONFIG.name}`,
    openGraphDescription: SITE_CONFIG.description,
  });
}

const stats = [
  { label: "Cities represented", value: "120+", hint: "Growing partner footprint across metros and towns." },
  { label: "Active listings", value: "48k+", hint: "Verified and community-maintained profiles." },
  { label: "Monthly explorers", value: "310k+", hint: "Readers searching maps, filters, and guides." },
  { label: "Avg. session focus", value: "6.4 min", hint: "Time on site when people compare real options." },
];

export default function AboutPage() {
  return (
    <PageShell
      title={`The story behind ${SITE_CONFIG.name}`}
      description="We started with a simple frustration: local discovery should feel as polished as the best editorial sites—clear structure, honest photos, and search that respects your time."
      actions={
        <>
          <Button variant="outline" asChild>
            <Link href="/listings">Browse listings</Link>
          </Button>
          <Button asChild>
            <Link href="/contact">Talk with us</Link>
          </Button>
        </>
      }
    >
      <StatStrip stats={stats} />

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <BentoCard
          icon={MapPin}
          title="Grounded in place"
          description="Maps, neighborhoods, and filters work together so explorers land on real storefronts—not endless sponsored noise."
        />
        <BentoCard
          icon={ShieldCheck}
          title="Trust by design"
          description="Verification cues, owner responses, and transparent hours help you decide faster, whether it is dinner or a dentist."
        />
        <BentoCard
          icon={Sparkles}
          title="Editorial rhythm"
          description="Articles and guides sit beside listings so context and commerce share the same calm layout."
          className="md:col-span-2"
        />
        <BentoCard
          icon={Telescope}
          title="Built to scale"
          description="One shell powers articles, classifieds, image stories, and profiles—ready for teams who operate many verticals."
          className="lg:col-span-4"
        />
      </div>

      <div className="mt-16 grid gap-8 rounded-2xl border border-border/80 bg-gradient-to-br from-muted/30 via-background to-background p-6 sm:p-10 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionLabel>Mission</SectionLabel>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Make local discovery feel human again.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {SITE_CONFIG.name} pairs structured business data with magazine-grade presentation. Owners get room to tell their
            story; readers get scannable cards, honest imagery, and pathways into long-form context when they want depth.
          </p>
        </div>
        <div className="rounded-xl border border-dashed border-primary/25 bg-card/60 p-6">
          <p className="text-sm font-medium text-foreground">What we are shipping next</p>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>Smarter saved searches and alerts for frequent explorers.</li>
            <li>Richer media kits for service businesses and studios.</li>
            <li>Deeper integrations for multi-location brands.</li>
          </ul>
          <Button className="mt-6" variant="secondary" asChild>
            <Link href="/careers">See open roles</Link>
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
