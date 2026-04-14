import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { mockTeamMembers } from "@/data/mock-data";
import { SITE_CONFIG } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo";
import { SectionLabel, StatStrip } from "@/components/marketing/marketing-blocks";

export async function generateMetadata() {
  return buildPageMetadata({
    path: "/team",
    title: `Team | ${SITE_CONFIG.name}`,
    description: `Meet the leadership shaping ${SITE_CONFIG.name}—product, community, and engineering minds focused on trustworthy local discovery.`,
  });
}

const departments = [
  {
    name: "Product & design",
    focus: "Researching how explorers scan listings, then crafting flows that stay fast on phones and desktops.",
  },
  {
    name: "Community & partnerships",
    focus: "Onboarding owners, moderating quality signals, and building programs that keep neighborhoods represented fairly.",
  },
  {
    name: "Platform engineering",
    focus: "Search, media pipelines, and reliability so every page load feels instant—even during busy weekends.",
  },
];

export default function TeamPage() {
  return (
    <PageShell
      title="People behind the platform"
      description="We are a distributed crew of builders who care about maps, typography, and the small businesses that anchor neighborhoods."
      actions={
        <>
          <Button variant="outline" asChild>
            <Link href="/careers">View careers</Link>
          </Button>
          <Button asChild>
            <Link href="/contact">Partner with us</Link>
          </Button>
        </>
      }
    >
      <StatStrip
        stats={[
          { label: "Core team", value: "28", hint: "Across product, design, community, and infra." },
          { label: "Time zones", value: "9", hint: "Async-first with weekly maker demos." },
          { label: "Years combined", value: "140+", hint: "In marketplaces, media, and local SaaS." },
          { label: "Volunteer hours", value: "2.4k", hint: "Annual give-back with small business clinics." },
        ]}
      />

      <div className="mt-14">
        <SectionLabel>Leadership</SectionLabel>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-foreground">
          Faces you will see on stage and in support
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockTeamMembers.map((member) => (
            <Card
              key={member.id}
              className="border-border/80 bg-gradient-to-b from-card to-muted/10 shadow-[var(--shadow-card)] transition hover:border-primary/20"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-14 w-14 border border-border">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{member.name}</p>
                    <p className="text-xs text-primary">{member.role}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{member.location}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <SectionLabel>How we work</SectionLabel>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-foreground">
          Teams organized around customer journeys
        </h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {departments.map((dept) => (
            <Card key={dept.name} className="border-border/80 bg-card/70">
              <CardContent className="p-6">
                <Badge variant="outline" className="text-[10px] uppercase tracking-[0.2em]">
                  Squad
                </Badge>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg font-semibold text-foreground">
                  {dept.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{dept.focus}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
