import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'
import { SectionLabel } from '@/components/marketing/marketing-blocks'

export async function generateMetadata() {
  return buildPageMetadata({
    path: '/licenses',
    title: `Open source | ${SITE_CONFIG.name}`,
    description: `Notices for third-party software included in ${SITE_CONFIG.name}.`,
  })
}

const licenses = [
  { name: 'Next.js', license: 'MIT', holder: 'Vercel, Inc.' },
  { name: 'React', license: 'MIT', holder: 'Meta Platforms, Inc.' },
  { name: 'Tailwind CSS', license: 'MIT', holder: 'Tailwind Labs Inc.' },
  { name: 'Radix UI', license: 'MIT', holder: 'WorkOS' },
  { name: 'Lucide', license: 'ISC', holder: 'Lucide Contributors' },
  { name: 'date-fns', license: 'MIT', holder: 'Sasha Koss & Lesha Koss' },
  { name: 'Zod', license: 'MIT', holder: 'Colin McDonnell' },
  { name: 'Framer Motion', license: 'MIT', holder: 'Framer BV' },
  { name: 'Embla Carousel', license: 'MIT', holder: 'David Jerleke' },
  { name: 'Recharts', license: 'MIT', holder: 'Recharts Group' },
  { name: 'cmdk', license: 'MIT', holder: 'Paco Coursey' },
  { name: 'Sonner', license: 'MIT', holder: 'Emil Kowalski' },
  { name: 'Vaul', license: 'MIT', holder: 'Emil Kowalski' },
  { name: 'class-variance-authority', license: 'Apache-2.0', holder: 'Joe Bell' },
  { name: 'clsx', license: 'MIT', holder: 'Luke Edwards' },
  { name: 'tailwind-merge', license: 'MIT', holder: 'Dany Castillo' },
  { name: '@vercel/analytics', license: 'MPL-2.0', holder: 'Vercel, Inc.' },
]

export default function LicensesPage() {
  return (
    <PageShell
      title="Open source notices"
      description="We stand on the shoulders of extraordinary open source projects. Below are the primary libraries shipped in our web client as of April 2026."
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <Card className="border-border/80">
          <CardContent className="p-0">
            <div className="grid grid-cols-[1.4fr_0.7fr_1.2fr] gap-0 border-b border-border/80 bg-muted/40 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:px-6">
              <span>Package</span>
              <span>License</span>
              <span className="hidden sm:block">Copyright holder</span>
            </div>
            <ul className="divide-y divide-border/70">
              {licenses.map((row) => (
                <li key={row.name} className="grid grid-cols-1 gap-2 px-4 py-4 sm:grid-cols-[1.4fr_0.7fr_1.2fr] sm:items-center sm:px-6">
                  <span className="text-sm font-medium text-foreground">{row.name}</span>
                  <span className="text-sm text-muted-foreground">{row.license}</span>
                  <span className="text-sm text-muted-foreground sm:block">{row.holder}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="border-primary/20 bg-gradient-to-b from-primary/5 to-card lg:sticky lg:top-28">
          <CardContent className="space-y-4 p-6">
            <SectionLabel>Attribution</SectionLabel>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Full license texts ship inside deployed node_modules for each dependency. If you need a consolidated PDF for
              compliance reviews, email{' '}
              <Link className="text-primary underline-offset-4 hover:underline" href={`mailto:legal@${SITE_CONFIG.domain}`}>
                legal@{SITE_CONFIG.domain}
              </Link>
              .
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Unsplash photography used in demos retains its photographer license. Replace placeholder media before production
              launches.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
