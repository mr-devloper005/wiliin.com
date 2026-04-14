import Link from "next/link";
import { CalendarHeart, MessageCircle, Users } from "lucide-react";
import { PageShell } from "@/components/shared/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockCommunityEvents, mockCommunityGroups } from "@/data/mock-data";
import { SITE_CONFIG } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo";
import { BentoCard, SectionLabel, StatStrip } from "@/components/marketing/marketing-blocks";

export async function generateMetadata() {
  return buildPageMetadata({
    path: "/community",
    title: `Community | ${SITE_CONFIG.name}`,
    description: `Programs, office hours, and discussion spaces for people who care about local discovery on ${SITE_CONFIG.name}.`,
  });
}

export default function CommunityPage() {
  return (
    <PageShell
      title="Community programs"
      description="We host weekly conversations for owners, creators, and civic partners who want neighborhoods to stay weird, welcoming, and well mapped."
      actions={
        <>
          <Button variant="outline" asChild>
            <Link href="/community/feed">Browse community feed</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Join {SITE_CONFIG.name}</Link>
          </Button>
        </>
      }
    >
      <StatStrip
        stats={[
          { label: "Monthly meetups", value: "18", hint: "Hybrid sessions across partner cities." },
          { label: "Mentor hours", value: "220+", hint: "Volunteer guidance for new listings." },
          { label: "Grassroots grants", value: "$180k", hint: "Micro-funds for street fairs & markets." },
          { label: "Active groups", value: "64", hint: "Industry circles inside the platform." },
        ]}
      />

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        <BentoCard
          icon={Users}
          title="Owner roundtables"
          description="Facilitated conversations on pricing, photography, and seasonal campaigns—no pitches, just peers."
        />
        <BentoCard
          icon={MessageCircle}
          title="Civic listening"
          description="Quarterly forums with planners and BID leaders to keep public data honest and inclusive."
        />
        <BentoCard
          icon={CalendarHeart}
          title="Creator residencies"
          description="Short-term storytellers embedded with districts to publish guides alongside merchants."
        />
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-2">
        <div>
          <SectionLabel>Calendar</SectionLabel>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-foreground">
            Upcoming moments
          </h2>
          <div className="mt-6 space-y-4">
            {mockCommunityEvents.map((event) => (
              <Card key={event.id} className="border-border/80 bg-card/80">
                <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <Badge variant="outline" className="text-[10px] uppercase tracking-[0.18em]">
                      {event.tag}
                    </Badge>
                    <h3 className="mt-2 font-medium text-foreground">{event.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{event.description}</p>
                  </div>
                  <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.16em] text-primary">{event.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div>
          <SectionLabel>Groups</SectionLabel>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-foreground">
            Find your people
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {mockCommunityGroups.map((group) => (
              <Card key={group.id} className="border-border/80 bg-gradient-to-br from-muted/30 to-card">
                <CardContent className="p-5">
                  <p className="text-xs text-muted-foreground">{group.members.toLocaleString()} members</p>
                  <h3 className="mt-1 font-[family-name:var(--font-display)] text-base font-semibold text-foreground">
                    {group.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{group.focus}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
