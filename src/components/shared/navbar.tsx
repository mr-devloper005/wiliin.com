'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu, X, User, FileText, Building2, LayoutGrid, Tag, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { siteContent } from '@/config/site.content'
import { getTasksForShell } from '@/config/site.ui'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  const navigation = useMemo(() => getTasksForShell().filter((task) => task.key !== 'profile'), [])
  const primaryNavigation = navigation.slice(0, 5)

  const mobileNavigation = navigation.map((task) => ({
    name: task.label,
    href: task.route,
    icon: taskIcons[task.key] || LayoutGrid,
  }))

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/88 backdrop-blur-xl transition-colors duration-[var(--duration-normal)] ease-[var(--ease-editorial)] relative">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent"
        aria-hidden
      />
      <nav className="site-container flex h-[4.5rem] max-w-[var(--container-site)] items-center justify-between gap-3 xl:gap-5">
        <div className="flex min-w-0 flex-1 items-center gap-4 lg:gap-8">
          <Link href="/" className="group flex shrink-0 items-center gap-3 whitespace-nowrap pr-2">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-card p-1.5 shadow-[var(--shadow-sm)] transition-shadow duration-[var(--duration-fast)] ease-[var(--ease-editorial)] group-hover:shadow-[var(--shadow-card)]">
              <img
                src="/favicon.png?v=20260401"
                alt={`${SITE_CONFIG.name} logo`}
                width="48"
                height="48"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="min-w-0 hidden sm:block">
              <span className="block truncate font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-foreground">
                {SITE_CONFIG.name}
              </span>
              <span className="hidden text-[10px] uppercase tracking-[0.28em] text-muted-foreground sm:block">
                {siteContent.navbar.tagline}
              </span>
            </div>
          </Link>

          <div className="hidden min-w-0 flex-1 items-center gap-1 overflow-hidden xl:flex">
            {primaryNavigation.map((task) => {
              const Icon = taskIcons[task.key] || LayoutGrid
              const isActive = pathname.startsWith(task.route)
              return (
                <Link
                  key={task.key}
                  href={task.route}
                  className={cn(
                    'flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors duration-[var(--duration-fast)] ease-[var(--ease-editorial)] whitespace-nowrap',
                    isActive
                      ? 'bg-primary/14 text-foreground shadow-[var(--shadow-sm)] ring-1 ring-primary/25'
                      : 'text-muted-foreground hover:bg-primary/[0.07] hover:text-foreground'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{task.label}</span>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="hidden rounded-full text-muted-foreground hover:bg-primary/[0.06] hover:text-primary md:flex"
          >
            <Link href="/search">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>

          {isAuthenticated ? (
            <NavbarAuthControls />
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="ghost" size="sm" asChild className="rounded-full px-4 text-muted-foreground hover:bg-primary/[0.06] hover:text-primary">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild className="rounded-full bg-accent px-5 text-accent-foreground hover:bg-accent/90">
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-muted-foreground hover:bg-primary/[0.06] hover:text-primary lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="border-t border-border bg-background/98 lg:hidden">
          <div className="space-y-2 px-4 py-4">
            <Link
              href="/search"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mb-3 flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground"
            >
              <Search className="h-4 w-4" />
              Search the site
            </Link>

            {mobileNavigation.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors duration-[var(--duration-fast)] ease-[var(--ease-editorial)]',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-primary/[0.06] hover:text-primary'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}

            {!isAuthenticated ? (
              <div className="grid gap-2 pt-3 sm:grid-cols-2">
                <Button variant="outline" asChild className="rounded-full border-border bg-card">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href="/register">Get Started</Link>
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </header>
  )
}
