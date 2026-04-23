import { PageShell } from '@/components/shared/page-shell'
import { LegalDocument } from '@/components/marketing/legal-document'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'

export async function generateMetadata() {
  return buildPageMetadata({
    path: '/privacy',
    title: `Privacy Policy | ${SITE_CONFIG.name}`,
    description: `How ${SITE_CONFIG.name} collects, uses, and protects personal data for explorers, owners, and partners.`,
  })
}

const sections = [
  {
    id: 'who-we-are',
    title: 'Who we are',
    blocks: [
      {
        type: 'p' as const,
        text: `${SITE_CONFIG.name} ("we", "us", or "our") operates the discovery platform available at ${SITE_CONFIG.domain} and related mobile experiences. This policy explains how we handle personal information when you browse listings, create an account, or partner with us commercially.`,
      },
    ],
  },
  {
    id: 'data-we-collect',
    title: 'Information we collect',
    blocks: [
      {
        type: 'p' as const,
        text: 'We collect information in three broad categories: information you provide, information collected automatically, and information we receive from partners.',
      },
      {
        type: 'ul' as const,
        items: [
          'Account details such as name, email address, phone number, and authentication tokens when you register or sign in.',
          'Listing content you upload, including descriptions, photos, hours, pricing cues, and messaging threads with explorers.',
          'Device and usage data such as IP address, browser type, coarse location derived from IP, diagnostic logs, and in-app events.',
          'Billing and tax information when you purchase paid placements or subscription products (processed by PCI-compliant processors).',
        ],
      },
    ],
  },
  {
    id: 'how-we-use',
    title: 'How we use information',
    blocks: [
      {
        type: 'ul' as const,
        items: [
          'Operate, personalize, and secure the platform—including fraud prevention, spam detection, and capacity planning.',
          'Send transactional notices (verification, receipts, policy updates) and, where permitted, marketing you can opt out of.',
          'Measure product performance, run experiments, and train ranking models using aggregated or de-identified datasets.',
          'Comply with law enforcement requests when legally required and defend our rights in disputes.',
        ],
      },
    ],
  },
  {
    id: 'sharing',
    title: 'Sharing and processors',
    blocks: [
      {
        type: 'p' as const,
        text: 'We do not sell personal information. We share data with subprocessors who help us host infrastructure, deliver email, analyze reliability, or process payments. Each vendor is contractually required to use data only for services rendered to us.',
      },
      {
        type: 'p' as const,
        text: 'Public listing pages are visible to anyone on the internet by design. Take care not to publish sensitive personal data inside free-text fields.',
      },
    ],
  },
  {
    id: 'retention',
    title: 'Retention',
    blocks: [
      {
        type: 'p' as const,
        text: 'We retain account data while your profile remains open. Backup systems may take up to 90 additional days to purge. Legal holds may extend retention when investigations require it.',
      },
    ],
  },
  {
    id: 'rights',
    title: 'Your rights and choices',
    blocks: [
      {
        type: 'ul' as const,
        items: [
          'Access or export a copy of your account data from the dashboard.',
          'Correct inaccurate profile or listing fields at any time.',
          'Delete your account—understanding that some transactional records may persist where regulations demand.',
          `Object to certain processing (including direct marketing) via settings or by emailing privacy@${SITE_CONFIG.domain}.`,
        ],
      },
    ],
  },
  {
    id: 'international',
    title: 'International transfers',
    blocks: [
      {
        type: 'p' as const,
        text: 'We may process data in India, the United States, the European Union, and other regions where we operate infrastructure. When transferring data across borders we rely on standard contractual clauses or equivalent safeguards.',
      },
    ],
  },
  {
    id: 'children',
    title: 'Children',
    blocks: [
      {
        type: 'p' as const,
        text: `${SITE_CONFIG.name} is not directed to children under 16, and we do not knowingly collect their personal information. Contact us if you believe a minor has provided data so we can delete it.`,
      },
    ],
  },
  {
    id: 'updates',
    title: 'Updates & contact',
    blocks: [
      {
        type: 'p' as const,
        text: `We will post changes to this policy on this page and adjust the "Last updated" date. Material changes may also be emailed to account holders. Questions? Email privacy@${SITE_CONFIG.domain} or write to our registered business address on file.`,
      },
    ],
  },
]

export default function PrivacyPage() {
  return (
    <PageShell
      title="Privacy Policy"
      description="Transparency matters when people trust you with their neighborhoods. Here is how we treat personal data end to end."
    >
      <LegalDocument
        lastUpdated="April 11, 2026"
        intro={`This Privacy Policy applies to ${SITE_CONFIG.name} visitors, account holders, and integration partners worldwide unless a separate agreement states otherwise.`}
        sections={sections}
      />
    </PageShell>
  )
}
