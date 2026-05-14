"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { SITE_CONFIG } from "@/lib/site-config";
import { ContactLeadForm } from "@/components/shared/contact-lead-form";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const supportEmail =
    process.env.NEXT_PUBLIC_CONTACT_SUPPORT_EMAIL?.trim() || `support@${SITE_CONFIG.domain}`;
  const partnershipsEmail =
    process.env.NEXT_PUBLIC_CONTACT_PARTNERS_EMAIL?.trim() || `partners@${SITE_CONFIG.domain}`;
  const pressEmail =
    process.env.NEXT_PUBLIC_CONTACT_PRESS_EMAIL?.trim() || `press@${SITE_CONFIG.domain}`;

  const contactOptions = useMemo(
    () => [
      { title: "Support", detail: supportEmail, tag: "Email" },
      { title: "Partnerships", detail: partnershipsEmail, tag: "Business" },
      { title: "Press", detail: pressEmail, tag: "Media" },
    ],
    [partnershipsEmail, pressEmail, supportEmail]
  );

  return (
    <PageShell
      title="Contact"
      description={`Reach the ${SITE_CONFIG.name} team for support, partnerships, or media queries.`}
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <ContactLeadForm />
          </CardContent>
        </Card>
        <div className="space-y-4">
          {contactOptions.map((option) => (
            <Card key={option.title} className="border-border bg-card">
              <CardContent className="p-6">
                <Badge variant="secondary">{option.tag}</Badge>
                <h3 className="mt-2 text-lg font-semibold text-foreground">{option.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{option.detail}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button asChild size="sm">
                    <Link href={`mailto:${option.detail}`}>
                      <Mail className="mr-2 h-4 w-4" />
                      Email {option.title}
                    </Link>
                  </Button>
                  <Link
                    href={`mailto:${option.detail}`}
                    className="inline-flex items-center text-sm font-medium text-foreground underline-offset-4 hover:underline"
                  >
                    {option.detail}
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
