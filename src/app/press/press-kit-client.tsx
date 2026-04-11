'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import type { PressAsset, PressCoverage } from '@/types'

export function PressKitClient({
  assets,
  coverage,
}: {
  assets: PressAsset[]
  coverage: PressCoverage[]
}) {
  const { toast } = useToast()
  const [activeAssetId, setActiveAssetId] = useState<string | null>(null)
  const activeAsset = assets.find((asset) => asset.id === activeAssetId)

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <Card className="border-border/80 bg-gradient-to-br from-card via-card to-muted/20 shadow-[var(--shadow-card)] lg:col-span-7">
          <CardContent className="space-y-6 p-6 sm:p-8">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary">Media kit</p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-foreground">
                Logos, screenshots, and story angles
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Download approved brand assets and product imagery. Everything here is cleared for editorial and broadcast
                use with attribution to Wiliin.
              </p>
            </div>
            <div className="space-y-3">
              {assets.map((asset) => (
                <div
                  key={asset.id}
                  className="rounded-xl border border-border/70 bg-secondary/30 px-4 py-4 transition hover:border-primary/20"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{asset.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{asset.description}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary">{asset.fileType}</Badge>
                      <Button size="sm" variant="outline" onClick={() => setActiveAssetId(asset.id)}>
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        onClick={() =>
                          toast({
                            title: 'Download started',
                            description: `${asset.title} is downloading.`,
                          })
                        }
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4 lg:col-span-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">Coverage</p>
          <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-foreground">
            Recent mentions
          </h3>
          {coverage.map((item) => (
            <Card
              key={item.id}
              className="border-border/80 bg-card/80 transition duration-[var(--duration-fast)] hover:border-primary/15 hover:shadow-md"
            >
              <CardContent className="p-5">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/80">{item.outlet}</div>
                <p className="mt-2 text-sm font-medium leading-snug text-foreground">{item.headline}</p>
                <p className="mt-2 text-xs text-muted-foreground">{item.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={Boolean(activeAsset)} onOpenChange={() => setActiveAssetId(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{activeAsset?.title}</DialogTitle>
          </DialogHeader>
          {activeAsset?.previewUrl ? (
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border bg-muted">
              <Image src={activeAsset.previewUrl} alt={activeAsset.title} fill className="object-cover" />
            </div>
          ) : null}
          <p className="text-sm text-muted-foreground">{activeAsset?.description}</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActiveAssetId(null)}>
              Close
            </Button>
            <Button
              onClick={() =>
                toast({
                  title: 'Download started',
                  description: `${activeAsset?.title} is downloading.`,
                })
              }
            >
              Download {activeAsset?.fileType}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
