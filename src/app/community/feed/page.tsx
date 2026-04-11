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

export default function CommunityFeedPage({ searchParams }: { searchParams?: { category?: string } }) {
  return <TaskListPage task="social" category={searchParams?.category} />
}
