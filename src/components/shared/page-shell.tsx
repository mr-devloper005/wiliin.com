'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export function PageShell({
  title,
  description,
  actions,
  children,
}: {
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <main>
        <section className="relative border-b border-border/80 bg-gradient-to-b from-muted/40 via-background to-background">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
            aria-hidden
          />
          <div className="site-container max-w-[var(--container-wide)] py-12 sm:py-14 lg:py-16">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="kicker-rule" aria-hidden />
                <h1 className="mt-5 text-balance font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  {title}
                </h1>
                {description && (
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{description}</p>
                )}
              </div>
              {actions && <div className="flex w-full flex-wrap gap-3 lg:w-auto lg:justify-end">{actions}</div>}
            </div>
          </div>
        </section>
        <section className="site-container max-w-[var(--container-wide)] py-10 sm:py-12 lg:py-14">
          {children}
        </section>
      </main>
      <Footer />
    </div>
  )
}
