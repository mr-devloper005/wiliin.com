import { PageShell } from "@/components/shared/page-shell";
import { LegalDocument } from "@/components/marketing/legal-document";
import { SITE_CONFIG } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildPageMetadata({
    path: "/terms",
    title: `Terms of Service | ${SITE_CONFIG.name}`,
    description: `Rules for using ${SITE_CONFIG.name}, including acceptable use, accounts, listings, and limitation of liability.`,
  });
}

const sections = [
  {
    id: "agreement",
    title: "Agreement to terms",
    blocks: [
      {
        type: "p" as const,
        text: `By accessing ${SITE_CONFIG.name} you agree to these Terms of Service and our Privacy Policy. If you disagree, do not use the platform.`,
      },
    ],
  },
  {
    id: "accounts",
    title: "Accounts & eligibility",
    blocks: [
      {
        type: "ul" as const,
        items: [
          "You must be at least 16 years old (or the age of digital consent in your region) to create an account.",
          "Provide accurate registration details and keep credentials confidential. You are responsible for activity under your login.",
          "We may suspend or terminate accounts that violate these terms, pose security risks, or abuse staff time.",
        ],
      },
    ],
  },
  {
    id: "listings",
    title: "Listings & merchant obligations",
    blocks: [
      {
        type: "p" as const,
        text: "Business owners warrant that they have authority to publish the information supplied, that it is truthful, and that it complies with advertising standards in their jurisdiction.",
      },
      {
        type: "ul" as const,
        items: [
          "Prohibited content includes illegal services, deceptive pricing, hate speech, harassment, malware, or spammy keyword stuffing.",
          "You grant us a worldwide, royalty-free license to host, display, adapt, and promote your listing content for operating and marketing the platform.",
          "We may remove or demote listings that generate credible abuse reports or fail verification checks.",
        ],
      },
    ],
  },
  {
    id: "explorers",
    title: "Explorers & user conduct",
    blocks: [
      {
        type: "p" as const,
        text: "Community features exist to share helpful context. You may not scrape the site at rates that harm performance, circumvent technical limits, or harvest personal data without consent.",
      },
    ],
  },
  {
    id: "ip",
    title: "Intellectual property",
    blocks: [
      {
        type: "p" as const,
        text: `The ${SITE_CONFIG.name} brand, interface, and codebase (excluding your content) remain our intellectual property. Do not imply endorsement without written permission.`,
      },
    ],
  },
  {
    id: "third-parties",
    title: "Third-party services",
    blocks: [
      {
        type: "p" as const,
        text: "Maps, analytics, payments, or embedded media may be provided by third parties. Their terms govern those interactions.",
      },
    ],
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    blocks: [
      {
        type: "p" as const,
        text: `Listings are user-generated. ${SITE_CONFIG.name} does not guarantee the accuracy of hours, pricing, or availability. Always confirm details directly with businesses.`,
      },
    ],
  },
  {
    id: "liability",
    title: "Limitation of liability",
    blocks: [
      {
        type: "p" as const,
        text: "To the fullest extent permitted by law, we are not liable for indirect, incidental, or consequential damages arising from your use of the platform. Our aggregate liability for any claim is limited to the greater of USD $100 or the amounts you paid us in the prior three months for paid services giving rise to the claim.",
      },
    ],
  },
  {
    id: "changes",
    title: "Changes & contact",
    blocks: [
      {
        type: "p" as const,
        text: `We may update these terms periodically. Continued use after changes constitutes acceptance. Send legal questions to legal@${SITE_CONFIG.domain}.`,
      },
    ],
  },
];

export default function TermsPage() {
  return (
    <PageShell
      title="Terms of Service"
      description="Clear ground rules keep the marketplace fair for explorers, owners, and the teams moderating at scale."
    >
      <LegalDocument
        lastUpdated="April 11, 2026"
        intro={`These Terms of Service ("Terms") govern access to ${SITE_CONFIG.name} websites, APIs, and related services.`}
        sections={sections}
      />
    </PageShell>
  );
}
