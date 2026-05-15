'use client'

import Link from 'next/link'
import { ChevronDown, FileText, LayoutGrid, LogOut, Plus, Settings, User, Building2, Tag, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/lib/auth-context'
import { type TaskKey } from '@/lib/site-config'
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

export function NavbarAuthControls() {
  const { logout } = useAuth()
  const shellTasks = getTasksForShell()

  return (
    <>
      {shellTasks.length === 1 ? (
        <Button
          size="sm"
          asChild
          className="hidden h-10 gap-1 rounded-full bg-primary px-4 text-primary-foreground shadow-[var(--shadow-card)] hover:bg-primary/90 sm:flex"
        >
          <Link href={`/create/${shellTasks[0].key}`}>
            <Plus className="h-4 w-4" />
            New {shellTasks[0].label.replace(/s$/i, '')}
          </Link>
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              className="hidden h-10 gap-1 rounded-full bg-primary px-4 text-primary-foreground shadow-[var(--shadow-card)] hover:bg-primary/90 sm:flex"
            >
              <Plus className="h-4 w-4" />
              Create
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 border-border bg-popover">
            {shellTasks.map((task) => {
              const Icon = taskIcons[task.key] || LayoutGrid
              return (
                <DropdownMenuItem key={task.key} asChild>
                  <Link href={`/create/${task.key}`}>
                    <Icon className="mr-2 h-4 w-4" />
                    Create {task.label}
                  </Link>
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="rounded-full">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 border-border bg-popover">
          <DropdownMenuItem asChild>
            <Link href="/dashboard/saved">
              <FileText className="mr-2 h-4 w-4" />
              Saved articles
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout} className="text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
