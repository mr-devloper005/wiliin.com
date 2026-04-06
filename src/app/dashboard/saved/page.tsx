'use client'

import { useEffect, useMemo, useState } from 'react'
import { PageShell } from '@/components/shared/page-shell'
import { ArticleCard } from '@/components/shared/cards'
import { mockArticles } from '@/data/mock-data'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Article } from '@/types'
import { loadFromStorage, saveToStorage, storageKeys } from '@/lib/local-storage'

export default function DashboardSavedPage() {
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>([])
  const [storedArticles, setStoredArticles] = useState<Article[]>([])

  useEffect(() => {
    setSavedArticleIds(loadFromStorage<string[]>(storageKeys.articleSaves, []))
    setStoredArticles(loadFromStorage<Article[]>(storageKeys.articles, []))
  }, [])

  const allArticles = useMemo(() => {
    const map = new Map<string, Article>()
    storedArticles.forEach((article) => map.set(article.id, article))
    mockArticles.forEach((article) => {
      if (!map.has(article.id)) {
        map.set(article.id, article)
      }
    })
    return Array.from(map.values())
  }, [storedArticles])

  const savedArticles = allArticles.filter((article) => savedArticleIds.includes(article.id))

  const handleRemoveSavedArticle = (id: string) => {
    const nextIds = savedArticleIds.filter((savedId) => savedId !== id)
    setSavedArticleIds(nextIds)
    saveToStorage(storageKeys.articleSaves, nextIds)
  }

  return (
    <PageShell
      title="Saved articles"
      description="Stories you have saved for later reading."
    >
      <div className="space-y-8">
        {savedArticles.length === 0 ? (
          <p className="text-sm text-muted-foreground">No saved articles yet.</p>
        ) : (
          <>
            <div className="grid gap-4">
              {savedArticles.map((article) => (
                <Card key={article.id} className="border-border bg-card">
                  <CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{article.title}</p>
                      <p className="text-xs text-muted-foreground">{article.category}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <a href={`/articles/${article.slug}`}>Open</a>
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRemoveSavedArticle(article.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {savedArticles.map((article) => (
                <ArticleCard key={`card-${article.id}`} article={article} />
              ))}
            </div>
          </>
        )}
      </div>
    </PageShell>
  )
}
