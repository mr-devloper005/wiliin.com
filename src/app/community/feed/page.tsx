import { TaskListPage } from '@/components/tasks/task-list-page'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'

export const revalidate = 3

export const generateMetadata = () =>
  buildPageMetadata({
    path: '/community/feed',
    title: `Community feed | ${SITE_CONFIG.name}`,
    description: `Browse public updates, local shout-outs, and discussion threads on ${SITE_CONFIG.name}.`,
  })

export default async function CommunityFeedPage({ searchParams }: { searchParams?: Promise<{ category?: string }> }) {
  const resolvedSearchParams = await searchParams;
  return <TaskListPage task="social" category={resolvedSearchParams?.category} />
}
