import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'
import { mockPressAssets, mockPressCoverage } from '@/data/mock-data'
import { PressKitClient } from './press-kit-client'

export async function generateMetadata() {
  return buildPageMetadata({
    path: '/press',
    title: 'Press & media',
    description: `Brand assets, product imagery, and press contacts for ${SITE_CONFIG.name}—the listing-first platform for local business discovery.`,
    openGraphTitle: `Press & media | ${SITE_CONFIG.name}`,
    openGraphDescription: `Download logos, UI captures, and read recent coverage of ${SITE_CONFIG.name}.`,
  })
}

export default function PressPage() {
  return (
    <PageShell
      title="Press room"
      description="Story beats, downloadable assets, and a quick snapshot of how Wiliin fits into the future of local discovery."
      actions={
        <>
          <Button variant="outline" asChild>
            <Link href={`mailto:press@${SITE_CONFIG.domain}`}>Email press</Link>
          </Button>
          <Button asChild>
            <Link href="/contact">Partner inquiries</Link>
          </Button>
        </>
      }
    >
      <PressKitClient assets={mockPressAssets} coverage={mockPressCoverage} />
    </PageShell>
  )
}
