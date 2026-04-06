'use client'

import { motion } from 'framer-motion'
import { 
  FileText, 
  Search, 
  MessageCircle, 
  Bell,
  Users,
  FolderOpen
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface EmptyStateProps {
  icon?: React.ElementType
  title: string
  description: string
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
}

export function EmptyState({ icon: Icon = FolderOpen, title, description, action }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mb-6 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action && (
        action.href ? (
          <Button asChild>
            <Link href={action.href}>{action.label}</Link>
          </Button>
        ) : (
          <Button onClick={action.onClick}>{action.label}</Button>
        )
      )}
    </motion.div>
  )
}

export function NoArticlesFound() {
  return (
    <EmptyState
      icon={FileText}
      title="No articles found"
      description="We couldn't find any articles matching your criteria. Try adjusting your filters or search terms."
      action={{ label: 'Browse All Articles', href: '/articles' }}
    />
  )
}

export function NoListingsFound() {
  return (
    <EmptyState
      icon={FileText}
      title="Nothing to show here"
      description="Try the article library or search the archive for stories and topics."
      action={{ label: 'Browse articles', href: '/articles' }}
    />
  )
}

export function NoAdsFound() {
  return (
    <EmptyState
      icon={FileText}
      title="Nothing to show here"
      description="Try the article library or search the archive for stories and topics."
      action={{ label: 'Browse articles', href: '/articles' }}
    />
  )
}

export function NoSearchResults() {
  return (
    <EmptyState
      icon={Search}
      title="No results found"
      description="Your search didn't match any content. Try using different keywords or checking your spelling."
    />
  )
}

export function NoComments() {
  return (
    <EmptyState
      icon={MessageCircle}
      title="No comments yet"
      description="Be the first to share your thoughts! Start a conversation by leaving a comment."
      action={{ label: 'Write a Comment', onClick: () => {} }}
    />
  )
}

export function NoSavedItems() {
  return (
    <EmptyState
      icon={FileText}
      title="No saved articles"
      description="Articles you save will appear here. Browse the library and save pieces to read later."
      action={{ label: 'Browse articles', href: '/articles' }}
    />
  )
}

export function NoNotifications() {
  return (
    <EmptyState
      icon={Bell}
      title="No notifications"
      description="You're all caught up! New notifications about your activity will appear here."
    />
  )
}

export function NoFollowers() {
  return (
    <EmptyState
      icon={Users}
      title="No followers yet"
      description="Share your profile and create engaging content to build your following."
      action={{ label: 'Share Profile', onClick: () => {} }}
    />
  )
}
