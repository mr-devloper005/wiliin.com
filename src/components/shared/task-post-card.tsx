import { ContentImage } from "@/components/shared/content-image";
import Link from "next/link";
import { ExternalLink, FileText, Mail, MapPin, Tag } from "lucide-react";
import type { SitePost } from "@/lib/site-connector";
import { CATEGORY_OPTIONS, normalizeCategory } from "@/lib/categories";
import type { TaskKey } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type ListingContent = {
  location?: string;
  category?: string;
  description?: string;
  email?: string;
};

const stripHtml = (value?: string | null) =>
  (value || "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<\/?[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const getExcerpt = (value?: string | null, maxLength = 140) => {
  const text = stripHtml(value);
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
};

const getContent = (post: SitePost): ListingContent => {
  const content = post.content && typeof post.content === "object" ? post.content : {};
  return content as ListingContent;
};

const getImageUrl = (post: SitePost, content: ListingContent) => {
  const media = Array.isArray(post.media) ? post.media : [];
  const mediaUrl = media[0]?.url;
  if (mediaUrl) return mediaUrl;

  const contentAny = content as Record<string, unknown>;
  const contentImage = typeof contentAny.image === "string" ? contentAny.image : null;
  if (contentImage) return contentImage;

  const contentImages = Array.isArray(contentAny.images) ? contentAny.images : [];
  const firstImage = contentImages.find((value) => typeof value === "string");
  if (firstImage) return firstImage as string;

  const contentLogo = typeof contentAny.logo === "string" ? contentAny.logo : null;
  if (contentLogo) return contentLogo;

  return "/placeholder.svg?height=640&width=960";
};

export function TaskPostCard({
  post,
  href,
  taskKey,
  compact,
  visualVariant = "default",
  collectionLabel,
}: {
  post: SitePost;
  href: string;
  taskKey?: TaskKey;
  compact?: boolean;
  /** Gallery / museum row — tighter hierarchy, document-forward (homepage carousels) */
  visualVariant?: "default" | "gallery";
  /** Shown as “Part of …” in gallery mode */
  collectionLabel?: string;
}) {
  const content = getContent(post);
  const image = getImageUrl(post, content);
  const rawCategory = content.category || post.tags?.[0] || "Post";
  const normalizedCategory = normalizeCategory(rawCategory);
  const category =
    CATEGORY_OPTIONS.find((item) => item.slug === normalizedCategory)?.name || rawCategory;

  const variant = taskKey || "listing";
  const isArticleCard = variant === "article";
  const isBookmarkVariant = variant === "sbm" || variant === "social";
  const imageAspect =
    variant === "image"
      ? "aspect-[4/5]"
      : variant === "article"
        ? "aspect-[16/10]"
        : variant === "pdf"
          ? "aspect-[4/5]"
          : variant === "classified"
            ? "aspect-[16/11]"
            : "aspect-[4/3]";

  const altText = `${post.title} ${category} ${variant === "listing" ? "business listing" : variant} image`;
  const imageSizes =
    variant === "article"
      ? "(max-width: 640px) 90vw, (max-width: 1024px) 48vw, 420px"
      : variant === "image"
        ? "(max-width: 640px) 82vw, (max-width: 1024px) 34vw, 320px"
        : "(max-width: 640px) 85vw, (max-width: 1024px) 42vw, 340px";

  if (visualVariant === "gallery" && isArticleCard && !isBookmarkVariant) {
    return (
      <Link
        href={href}
        className="group flex h-full flex-col border border-border/80 bg-card text-left shadow-none transition duration-[var(--duration-fast)] ease-[var(--ease-editorial)] hover:border-primary/35 hover:bg-muted/25"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <ContentImage
            src={image}
            alt={altText}
            fill
            sizes={imageSizes}
            quality={78}
            className="object-cover grayscale-[0.08] transition duration-500 ease-[var(--ease-editorial)] group-hover:grayscale-0"
            intrinsicWidth={960}
            intrinsicHeight={1280}
          />
        </div>
        <div className="flex flex-1 flex-col border-t border-border/60 px-3 py-4 sm:px-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Article</p>
          <h3 className="mt-2 line-clamp-4 font-[family-name:var(--font-display)] text-[0.95rem] font-semibold leading-snug tracking-tight text-foreground sm:text-base">
            {post.title}
          </h3>
          {collectionLabel ? (
            <p className="mt-3 text-xs leading-snug">
              <span className="text-muted-foreground">Part of </span>
              <span className="font-medium text-primary underline underline-offset-[3px]">{collectionLabel}</span>
            </p>
          ) : null}
        </div>
      </Link>
    );
  }

  if (isBookmarkVariant) {
    return (
      <Link
        href={href}
        className="group flex h-full flex-row items-start gap-4 overflow-hidden rounded-[1.75rem] border border-border bg-card p-5 shadow-[var(--shadow-card)] transition duration-[var(--duration-normal)] ease-[var(--ease-editorial)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-editorial)]"
      >
        <div className="mt-1 rounded-full bg-primary/10 p-2.5 text-primary transition duration-[var(--duration-fast)] ease-[var(--ease-editorial)] group-hover:bg-primary group-hover:text-primary-foreground">
          <ExternalLink className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              <Tag className="h-3.5 w-3.5" />
              {category}
            </span>
            {content.location ? (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                {content.location}
              </span>
            ) : null}
          </div>
          <h3 className="mt-3 line-clamp-2 text-lg font-semibold leading-snug text-foreground group-hover:text-primary">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-7 text-muted-foreground">
            {getExcerpt(content.description || post.summary, compact ? 120 : 180) || "Explore this bookmark."}
          </p>
          {content.email ? (
            <div className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Mail className="h-3.5 w-3.5" />
              {content.email}
            </div>
          ) : null}
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[var(--radius-editorial-lg)] border border-border bg-card shadow-[var(--shadow-md)] transition duration-[var(--duration-normal)] ease-[var(--ease-editorial)] hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[var(--shadow-lg)]",
        isArticleCard && "bg-gradient-to-b from-card via-card to-muted/35 ring-1 ring-border/50"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-muted",
          imageAspect,
          isArticleCard && "mx-4 mt-4 rounded-xl border border-border/60 shadow-inner",
          !isArticleCard && "rounded-t-[var(--radius-editorial-lg)]"
        )}
      >
        <ContentImage
          src={image}
          alt={altText}
          fill
          sizes={imageSizes}
          quality={75}
          className="object-cover transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:scale-[1.03]"
          intrinsicWidth={960}
          intrinsicHeight={720}
        />
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-foreground/45 via-transparent to-transparent opacity-80",
            isArticleCard && "from-foreground/35 opacity-70"
          )}
        />
        <span
          className={cn(
            "absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-black/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md",
            isArticleCard && "left-5 top-5 bg-black/45"
          )}
        >
          <Tag className="h-3.5 w-3.5" />
          {category}
        </span>
        {variant === "pdf" && (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-card/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground shadow-sm">
            <FileText className="h-3.5 w-3.5" />
            PDF
          </span>
        )}
      </div>
      <div className={cn("flex flex-1 flex-col", compact ? "py-4" : "p-6", isArticleCard && "px-6 pb-6 pt-4")}>
        {isArticleCard ? (
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary/90">Article</span>
        ) : null}
        <h3
          className={cn(
            "line-clamp-2 font-semibold leading-snug text-foreground",
            isArticleCard ? "mt-2 text-[1.35rem] font-[family-name:var(--font-display)] tracking-tight" : "text-lg"
          )}
        >
          {post.title}
        </h3>
        <p
          className={cn(
            "mt-3 text-sm leading-7 text-muted-foreground",
            isArticleCard ? "line-clamp-4" : "line-clamp-3"
          )}
        >
          {getExcerpt(content.description || post.summary) || "Explore this post."}
        </p>
        <div className="mt-auto pt-4">
          {content.location && (
            <div className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {content.location}
            </div>
          )}
          {content.email && (
            <div className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Mail className="h-3.5 w-3.5" />
              {content.email}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
