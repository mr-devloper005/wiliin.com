import { PageShell } from '@/components/shared/page-shell'
import { LegalDocument } from '@/components/marketing/legal-document'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'

export async function generateMetadata() {
  return buildPageMetadata({
    path: '/cookies',
    title: `Cookie Policy | ${SITE_CONFIG.name}`,
    description: `How ${SITE_CONFIG.name} uses cookies, local storage, and similar technologies across web and embedded experiences.`,
  })
}

const sections = [
  {
    id: 'what',
    title: 'What are cookies?',
    blocks: [
      {
        type: 'p' as const,
        text: 'Cookies are small text files stored on your device. We also use similar technologies such as local storage, session storage, and pixels to remember preferences and measure performance.',
      },
    ],
  },
  {
    id: 'types',
    title: 'Types of cookies we use',
    blocks: [
      {
        type: 'ul' as const,
        items: [
          'Strictly necessary cookies keep you signed in, route traffic securely, and prevent cross-site request forgery.',
          'Functional cookies remember UI choices—like map zoom, filters, or dark mode—so sessions feel continuous.',
          'Analytics cookies help us understand feature adoption and drop-off. Where required, we ask consent before enabling them.',
          'Advertising cookies, when used, power frequency capping and attribution for co-marketing campaigns. They can be declined in the cookie banner.',
        ],
      },
    ],
  },
  {
    id: 'control',
    title: 'Managing preferences',
    blocks: [
      {
        type: 'p' as const,
        text: 'Use the cookie settings link in the footer (or browser controls) to toggle non-essential categories. Blocking some cookies may limit personalization but core browsing remains available.',
      },
    ],
  },
  {
    id: 'retention',
    title: 'Retention',
    blocks: [
      {
        type: 'p' as const,
        text: 'Session cookies expire when you close the browser. Persistent cookies last between 30 days and 12 months depending on purpose. Analytics identifiers rotate quarterly where possible.',
      },
    ],
  },
  {
    id: 'updates',
    title: 'Updates',
    blocks: [
      {
        type: 'p' as const,
        text: `We will revise this Cookie Policy when we introduce new technologies. The "Last updated" date reflects the latest review. Contact privacy@${SITE_CONFIG.domain} with questions.`,
      },
    ],
  },
]

export default function CookiesPage() {
  return (
    <PageShell
      title="Cookie Policy"
      description="You should know exactly what persists on your device. Here is how we use cookies today and how to control them."
    >
      <LegalDocument
        lastUpdated="April 11, 2026"
        intro={`This Cookie Policy supplements the ${SITE_CONFIG.name} Privacy Policy and applies to visitors on the web.`}
        sections={sections}
      />
    </PageShell>
  )
}
