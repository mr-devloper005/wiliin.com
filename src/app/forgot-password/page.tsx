"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SITE_CONFIG } from "@/lib/site-config"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-[minmax(0,1.05fr)_minmax(0,420px)]">
        <div className="relative hidden flex-col justify-between overflow-hidden border-r border-border/70 bg-gradient-to-b from-muted/40 via-background to-secondary/20 p-10 lg:flex xl:p-14">
          <div
            className="pointer-events-none absolute inset-x-0 top-24 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent"
            aria-hidden
          />
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            {SITE_CONFIG.name}
          </p>
          <div className="max-w-md">
            <div className="kicker-rule" aria-hidden />
            <p className="mt-8 font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight tracking-tight text-foreground xl:text-[2.75rem]">
              Reset access without losing your place.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              We&apos;ll email a secure link. Your drafts and saved pieces stay untouched.
            </p>
          </div>
          <p className="text-xs text-muted-foreground">Secure link · expires after use</p>
        </div>

        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md rounded-[var(--radius-editorial-lg)] border border-border/80 bg-card/95 p-8 shadow-[var(--shadow-lg)] backdrop-blur-sm sm:p-10"
          >
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground transition hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to login
            </Link>

            {!isSubmitted ? (
              <>
                <h1 className="mt-8 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-foreground">
                  Reset your password
                </h1>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Enter your email address and we&apos;ll send you a link to reset your password.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="h-11 w-full rounded-full" disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send reset link"}
                  </Button>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15">
                  <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-foreground">
                  Check your email
                </h1>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  We&apos;ve sent a password reset link to <strong className="text-foreground">{email}</strong>
                </p>
                <Button asChild variant="outline" className="mt-8 w-full rounded-full border-border/80">
                  <Link href="/login">Back to login</Link>
                </Button>
                <p className="mt-6 text-sm text-muted-foreground">
                  Didn&apos;t receive the email?{" "}
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="font-semibold text-primary hover:underline"
                  >
                    Try again
                  </button>
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
