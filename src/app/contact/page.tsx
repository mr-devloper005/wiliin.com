"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Clock3, FileText } from "lucide-react";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { SITE_CONFIG } from "@/lib/site-config";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  return (
    <PageShell
      title="Contact"
      description={`Reach the ${SITE_CONFIG.name} team for support, partnerships, or media queries.`}
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
                toast({
                  title: "Message sent",
                  description: `Thanks for reaching out to ${SITE_CONFIG.name}. We will reply soon.`,
                });
              }}
            >
              <div>
                <label className="text-sm font-medium text-foreground">Name</label>
                <Input className="mt-2" placeholder="Jane Doe" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input className="mt-2" placeholder="you@example.com" type="email" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Message</label>
                <Textarea className="mt-2 min-h-[140px]" placeholder="Tell us how we can help" />
              </div>
              <Button type="submit">Send Message</Button>
              {submitted && (
                <p className="text-sm text-muted-foreground">
                  Thanks! We will reply within two business days.
                </p>
              )}
            </form>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <Badge variant="secondary">Help</Badge>
            <h3 className="mt-2 text-lg font-semibold text-foreground">How we handle inquiries</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Share a few details in your message and our team will route it quickly.
            </p>

            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3">
                <Clock3 className="mt-0.5 h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Response window</p>
                  <p className="text-sm text-muted-foreground">Most replies arrive within 1-2 business days.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="mt-0.5 h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Helpful details</p>
                  <p className="text-sm text-muted-foreground">
                    Include your goal, page URL, and screenshots when relevant.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Fastest path</p>
                  <p className="text-sm text-muted-foreground">
                    Use the form for all requests and we will route to support, partnerships, or press.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button variant="outline" asChild>
                <Link href="/help">Visit Help Center</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
