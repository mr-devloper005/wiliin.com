import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteContent } from '@/config/site.content'

export function CTASection() {
  return (
    <section className="editorial-section-y pb-24 pt-8 sm:pb-28">
      <div className="site-container max-w-[var(--container-site)]">
        <div className="relative overflow-hidden rounded-[2rem] border border-[#605b51]/40 bg-gradient-to-br from-[#454040] via-[#3d3a35] to-[#605b51] p-8 text-[#e6f082] shadow-[var(--shadow-editorial)] sm:p-12 lg:p-16">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'radial-gradient(ellipse 70% 50% at 80% 20%, rgba(216,211,101,0.35), transparent 55%)',
            }}
          />

          <div className="relative mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e6f082]/25 bg-[#454040]/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#d8d365] backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-[#e6f082]" />
              {siteContent.cta.badge}
            </div>

            <h2 className="text-balance text-3xl font-semibold text-[#e6f082] sm:text-4xl lg:text-5xl">
              {siteContent.cta.title}
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#e6f082]/75 sm:text-lg">
              {siteContent.cta.description}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                asChild
                className="h-12 rounded-full bg-[#d8d365] px-7 text-sm font-semibold text-[#454040] hover:bg-[#d8d365]/90"
              >
                <Link href={siteContent.cta.primaryCta.href}>
                  {siteContent.cta.primaryCta.label}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-12 rounded-full border-[#e6f082]/45 bg-transparent px-7 text-sm font-semibold text-[#e6f082] hover:bg-[#605b51]/50"
              >
                <Link href={siteContent.cta.secondaryCta.href}>{siteContent.cta.secondaryCta.label}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
