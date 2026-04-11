import Link from "next/link";
import { BookOpen, LifeBuoy, Map, Search } from "lucide-react";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { buildPageMetadata } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/site-config";
import { BentoCard, SectionLabel } from "@/components/marketing/marketing-blocks";

export async function generateMetadata() {
  return buildPageMetadata({
    path: "/help",
    title: `Help Center | ${SITE_CONFIG.name}`,
    description: `Guides for explorers and owners on ${SITE_CONFIG.name}—listings, search, accounts, and trust tools.`,
  });
}

const topics = [
  {
    title: "Discovering businesses",
    description: "Use maps, filters, and saved searches to compare hours, photos, and amenities side by side.",
    icon: Map,
  },
  {
    title: "Search shortcuts",
    description: "Combine keywords with neighborhoods, price cues, and category chips to narrow results fast.",
    icon: Search,
  },
  {
    title: "Owner dashboard",
    description: "Update media, respond to messages, and publish offers without leaving your analytics view.",
    icon: BookOpen,
  },
  {
    title: "Trust & safety",
    description: "Report inaccurate info, learn how verification works, and understand moderation timelines.",
    icon: LifeBuoy,
  },
];

const faqs = [
  {
    id: "faq-claim",
    question: "How do I claim my business listing?",
    answer:
      "Open the listing, choose Claim this business, and complete verification. Our team reviews documents within two business days and emails you when the profile unlocks.",
  },
  {
    id: "faq-photos",
    question: "Why are my photos still processing?",
    answer:
      "High-resolution uploads pass through a moderation queue to protect visitors from misleading imagery. Most batches clear in under an hour; large galleries may take overnight.",
  },
  {
    id: "faq-rank",
    question: "How does ranking work in search?",
    answer:
      "Relevance blends proximity, completeness of your profile, recency of updates, and community engagement signals. Sponsored modules, when present, are always labeled.",
  },
  {
    id: "faq-delete",
    question: "Can I delete my explorer account?",
    answer:
      "Yes. Visit Settings → Account → Delete profile. Saved lists export as CSV first. Some transactional records may be retained where the law requires.",
  },
  {
    id: "faq-api",
    question: "Do you offer phone support?",
    answer:
      "Priority phone lines open for verified owners on Growth plans. Everyone else can use in-app chat or email—we typically respond same day.",
  },
];

export default function HelpPage() {
  return (
    <PageShell
      title="Help Center"
      description="Practical answers for explorers hunting the right spot and owners managing a living storefront online."
      actions={
        <>
          <Button variant="outline" asChild>
            <Link href="/status">System status</Link>
          </Button>
          <Button asChild>
            <Link href="/contact">Contact support</Link>
          </Button>
        </>
      }
    >
      <div className="rounded-2xl border border-border/80 bg-gradient-to-r from-muted/40 via-background to-background p-6 sm:p-8">
        <SectionLabel>Start here</SectionLabel>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-foreground">
          Four pillars of the {SITE_CONFIG.name} experience
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {topics.map((topic) => (
            <BentoCard key={topic.title} icon={topic.icon} title={topic.title} description={topic.description} />
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
        <Card className="border-border/80 bg-card/80">
          <CardContent className="p-6 sm:p-8">
            <SectionLabel>FAQ</SectionLabel>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-foreground">
              Popular questions this week
            </h3>
            <Accordion type="single" collapsible className="mt-6 w-full">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left text-sm font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
        <Card className="border-primary/20 bg-gradient-to-b from-primary/5 to-card lg:sticky lg:top-28">
          <CardContent className="space-y-4 p-6 sm:p-8">
            <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-foreground">Still stuck?</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Send screenshots, listing URLs, and steps to reproduce. Include your browser version so we can replay the issue
              accurately.
            </p>
            <Button className="w-full" asChild>
              <Link href="/contact">Open a ticket</Link>
            </Button>
            <p className="text-xs text-muted-foreground">
              Average first response under 6 hours on weekdays IST / PT blended coverage.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
