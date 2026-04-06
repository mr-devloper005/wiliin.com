"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  FileText,
  MessageSquare,
  Heart,
  Eye,
  TrendingUp,
  TrendingDown,
  Plus,
  ArrowRight,
  Calendar,
  Bell,
  Settings,
  ChevronRight,
  MoreHorizontal,
  Edit,
  Trash2,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NavbarShell } from "@/components/shared/navbar-shell"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { loadFromStorage, storageKeys } from "@/lib/local-storage"
import type { Article } from "@/types"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"

const recentActivity = [
  {
    id: 1,
    type: "comment",
    user: "Sarah Wilson",
    action: "commented on your article",
    target: "Building Modern Web Apps",
    time: "5 min ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    type: "like",
    user: "Mike Chen",
    action: "highlighted a passage in",
    target: "Designing for Readability",
    time: "15 min ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    type: "follow",
    user: "Emily Johnson",
    action: "saved your draft",
    target: "Weekend notes",
    time: "1 hour ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const viewWeights = [0.14, 0.12, 0.15, 0.13, 0.16, 0.14, 0.16]
const viewDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

export default function DashboardPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [storedArticles, setStoredArticles] = useState<Article[]>([])

  const loadDashboardData = () => {
    setStoredArticles(loadFromStorage<Article[]>(storageKeys.articles, []))
  }

  useEffect(() => {
    loadDashboardData()
    const handleStorage = (event: StorageEvent) => {
      if (!event.key || !event.key.startsWith("nexus-")) return
      loadDashboardData()
    }
    const handleProfileUpdate = () => loadDashboardData()
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        loadDashboardData()
      }
    }
    window.addEventListener("storage", handleStorage)
    window.addEventListener("nexus-profile-updated", handleProfileUpdate)
    document.addEventListener("visibilitychange", handleVisibility)
    return () => {
      window.removeEventListener("storage", handleStorage)
      window.removeEventListener("nexus-profile-updated", handleProfileUpdate)
      document.removeEventListener("visibilitychange", handleVisibility)
    }
  }, [])

  const userArticles = useMemo(
    () => (user ? storedArticles.filter((article) => article.author.id === user.id) : []),
    [storedArticles, user]
  )
  const totalViews = useMemo(
    () => userArticles.reduce((sum, article) => sum + (article.views || 0), 0),
    [userArticles]
  )
  const totalLikes = useMemo(
    () => userArticles.reduce((sum, article) => sum + (article.likes || 0), 0),
    [userArticles]
  )
  const totalComments = useMemo(
    () => userArticles.reduce((sum, article) => sum + (article.commentsCount || 0), 0),
    [userArticles]
  )

  const statsData = useMemo(
    () => [
      {
        title: "Total Views",
        value: totalViews.toLocaleString(),
        change: "Live",
        trend: "up",
        icon: Eye,
      },
      {
        title: "Total Likes",
        value: totalLikes.toLocaleString(),
        change: "Live",
        trend: "up",
        icon: Heart,
      },
      {
        title: "Comments",
        value: totalComments.toLocaleString(),
        change: "Live",
        trend: totalComments > 0 ? "up" : "down",
        icon: MessageSquare,
      },
      {
        title: "Followers",
        value: (user?.followers ?? 0).toLocaleString(),
        change: "Live",
        trend: "up",
        icon: TrendingUp,
      },
    ],
    [totalComments, totalLikes, totalViews, user]
  )

  const viewsData = useMemo(() => {
    const total = totalViews || 0
    const distributed = viewWeights.map((weight) => Math.round(total * weight))
    const diff = total - distributed.reduce((sum, value) => sum + value, 0)
    if (diff !== 0) {
      distributed[distributed.length - 1] += diff
    }
    return viewDays.map((name, index) => ({ name, views: distributed[index] || 0 }))
  }, [totalViews])

  const contentData = useMemo(() => [{ name: "Articles", count: userArticles.length }], [userArticles.length])

  const myContent = useMemo(
    () =>
      userArticles.map((article) => ({
        id: article.id,
        title: article.title,
        status: article.status ?? "published",
        views: article.views ?? 0,
        likes: article.likes ?? 0,
        date: new Date(article.publishedAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      })),
    [userArticles]
  )

  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />

      <div className="site-container max-w-[var(--container-site)] py-10 sm:py-12 lg:py-14">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-8 border-b border-border/70 pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="kicker-rule" aria-hidden />
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.26em] text-muted-foreground">
              Writer&apos;s desk
            </p>
            <h1 className="mt-3 text-balance font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Dashboard
            </h1>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Welcome back, {user?.name || "User"}! Here&apos;s how your writing is performing.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="icon" asChild className="rounded-xl border-border/80 shadow-[var(--shadow-sm)]">
              <Link href="/dashboard/notifications">
                <Bell className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild className="rounded-xl border-border/80 shadow-[var(--shadow-sm)]">
              <Link href="/settings">
                <Settings className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild className="rounded-full px-5 shadow-[var(--shadow-sm)]">
              <Link href="/dashboard/articles/new">
                <Plus className="mr-2 h-4 w-4" />
                New article
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {statsData.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-[var(--radius-editorial)] border border-border/80 bg-card/90 p-6 shadow-[var(--shadow-sm)]"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/60 bg-muted/40">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <Badge
                  variant="secondary"
                  className={
                    stat.trend === "up"
                      ? "bg-green-500/10 text-green-500"
                      : "bg-red-500/10 text-red-500"
                  }
                >
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {stat.change}
                </Badge>
              </div>
              <p className="text-2xl font-bold tracking-tight text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
          {/* Left Column - Charts & Content */}
          <div className="space-y-10 lg:col-span-2">
            {/* Views Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-[var(--radius-editorial-lg)] border border-border/80 bg-card/90 p-6 shadow-[var(--shadow-md)] sm:p-8"
            >
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-foreground">
                    Views Overview
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Your content performance this week
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() =>
                    toast({
                      title: "Date range applied",
                      description: "Showing performance for this week.",
                    })
                  }
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  This Week
                </Button>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={viewsData}>
                    <defs>
                      <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="var(--primary)"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--primary)"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="views"
                      stroke="var(--primary)"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorViews)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Articles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="overflow-hidden rounded-[var(--radius-editorial-lg)] border border-border/80 bg-card/90 shadow-[var(--shadow-md)]"
            >
              <div className="border-b border-border/60 bg-muted/25 px-6 py-6 sm:px-8">
                <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-foreground">
                  My articles
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Drafts and published pieces tied to your account.
                </p>
              </div>

              <div className="p-6 sm:p-8 sm:pt-6">
                <div className="space-y-3">
                  {myContent.map((article) => (
                      <div
                        key={article.id}
                        className="flex items-center justify-between rounded-[var(--radius-editorial)] border border-transparent bg-muted/35 p-4 transition-colors hover:border-border/60 hover:bg-muted/55"
                      >
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground truncate">
                            {article.title}
                          </h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <span>{article.date}</span>
                            <span>{article.views} views</span>
                            <span>{article.likes} likes</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 ml-4">
                          <Badge
                            variant={
                              article.status === "published"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {article.status}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/articles/${article.id}/edit`}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/articles/${article.id}`}>
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  View
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/articles/${article.id}/edit`}>
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                <Button variant="outline" className="mt-6 w-full rounded-full" asChild>
                    <Link href="/dashboard/articles">
                      View all articles
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Activity & Quick Actions */}
          <div className="space-y-10">
            {/* Content Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-[var(--radius-editorial-lg)] border border-border/80 bg-card/90 p-6 shadow-[var(--shadow-md)]"
            >
              <h2 className="mb-4 font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-foreground">
                Article count
              </h2>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={contentData} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis
                      type="category"
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                      width={80}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar
                      dataKey="count"
                      fill="var(--primary)"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-[var(--radius-editorial-lg)] border border-border/80 bg-card/90 p-6 shadow-[var(--shadow-md)]"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-foreground">
                  Recent Activity
                </h2>
                <Button variant="ghost" size="sm" asChild className="rounded-full">
                  <Link href="/dashboard/notifications">View all</Link>
                </Button>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={activity.avatar} alt={activity.user} />
                      <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">
                        <span className="font-medium">{activity.user}</span>{" "}
                        {activity.action}
                        {activity.target && (
                          <span className="font-medium"> {activity.target}</span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="rounded-[var(--radius-editorial-lg)] border border-border/80 bg-card/90 p-6 shadow-[var(--shadow-md)]"
            >
              <h2 className="mb-4 font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-foreground">
                Quick Actions
              </h2>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start rounded-xl border-border/80" asChild>
                  <Link href="/dashboard/articles/new">
                    <FileText className="mr-3 h-4 w-4" />
                    Write new article
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-xl border-border/80" asChild>
                  <Link href="/articles">
                    <ArrowRight className="mr-3 h-4 w-4" />
                    View public articles
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

