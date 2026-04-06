import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const notifications = [
  { id: 1, title: 'New comment', detail: 'Someone replied to your latest article.', time: '2 hours ago' },
  { id: 2, title: 'Draft reminder', detail: 'Your weekend essay draft was auto-saved.', time: '5 hours ago' },
  { id: 3, title: 'Article published', detail: 'Your piece is now live in the library.', time: '1 day ago' },
]

export default function DashboardNotificationsPage() {
  return (
    <PageShell
      title="Notifications"
      description="Stay updated on your activity and community engagement."
      actions={
        <Button variant="outline" asChild>
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      }
    >
      <div className="grid gap-4">
        {notifications.map((note) => (
          <Card key={note.id} className="border-border bg-card">
            <CardContent className="p-6">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">{note.time}</div>
              <h2 className="mt-2 text-lg font-semibold text-foreground">{note.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{note.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  )
}
