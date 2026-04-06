"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Mail, Lock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"
import { SITE_CONFIG } from "@/lib/site-config"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    try {
      await login(email, password)
      router.push("/settings")
    } catch {
      setError("Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-[minmax(0,1.05fr)_minmax(0,420px)]">
        <div className="relative hidden flex-col justify-between overflow-hidden border-r border-border/70 bg-gradient-to-br from-muted/50 via-background to-secondary/30 p-10 lg:flex xl:p-14">
          <div
            className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-primary/15 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
            aria-hidden
          />
          <Link
            href="/"
            className="relative text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground transition duration-[var(--duration-fast)] ease-[var(--ease-editorial)] hover:text-foreground"
          >
            ← Back to site
          </Link>
          <div className="relative max-w-md">
            <div className="kicker-rule" aria-hidden />
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              {SITE_CONFIG.name}
            </p>
            <p className="mt-6 font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight tracking-tight text-foreground xl:text-5xl">
              Sign in to pick up your reading and drafts.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {SITE_CONFIG.description}
            </p>
          </div>
          <p className="relative text-xs text-muted-foreground">Editorial account access</p>
        </div>

        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md rounded-[var(--radius-editorial-lg)] border border-border/80 bg-card/95 p-8 shadow-[var(--shadow-lg)] backdrop-blur-sm sm:p-10"
          >
            <div className="mb-8 lg:hidden">
              <Link
                href="/"
                className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
              >
                ← Home
              </Link>
            </div>

            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Sign in
            </div>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-foreground">
              Welcome back
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Use your email to access your profile settings.
            </p>

            {error && (
              <div className="mt-5 rounded-xl border border-destructive/25 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="h-11 w-full rounded-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <p className="mt-8 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-semibold text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
