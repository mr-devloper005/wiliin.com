import Link from 'next/link'
import { FileText, Building2, LayoutGrid, Tag, Image as ImageIcon, User } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { getTasksForShell } from '@/config/site.ui'

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

const footerLinks = {
  platform: getTasksForShell().map((task) => ({
      name: task.label,
      href: task.route,
      icon: taskIcons[task.key] || LayoutGrid,
    })),
  company: [
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ],
  resources: [
    { name: 'Help Center', href: '/help' },

  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Cookies', href: '/cookies' },
    { name: 'Licenses', href: '/licenses' },
  ],
}

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-gradient-to-b from-muted/50 to-background">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-muted-foreground/30"
        aria-hidden
      />
      <div className="site-container max-w-[var(--container-site)] py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-start gap-4">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-border bg-card p-1.5 shadow-[var(--shadow-card)]">
                <img
                  src="/favicon.png?v=20260401"
                  alt={`${SITE_CONFIG.name} logo`}
                  width="44"
                  height="44"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <span className="block font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-foreground">
                  {SITE_CONFIG.name}
                </span>
                <span className="mt-1 block text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  {siteContent.footer.tagline}
                </span>
              </div>
            </Link>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Articles</h3>
            <ul className="mt-5 space-y-3">
              {footerLinks.platform.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="flex items-center gap-2 text-sm text-muted-foreground transition duration-[var(--duration-fast)] ease-[var(--ease-editorial)] hover:text-primary">
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Company</h3>
            <ul className="mt-5 space-y-3">
              {footerLinks.company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-muted-foreground transition duration-[var(--duration-fast)] ease-[var(--ease-editorial)] hover:text-primary">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Resources</h3>
            <ul className="mt-5 space-y-3">
              {footerLinks.resources.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-muted-foreground transition duration-[var(--duration-fast)] ease-[var(--ease-editorial)] hover:text-primary">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Legal</h3>
            <ul className="mt-5 space-y-3">
              {footerLinks.legal.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-muted-foreground transition duration-[var(--duration-fast)] ease-[var(--ease-editorial)] hover:text-primary">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-border pt-8">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
            &copy; {SITE_CONFIG.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
