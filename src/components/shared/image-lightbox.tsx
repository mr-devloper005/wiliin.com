"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { ContentImage } from "@/components/shared/content-image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type ImageLightboxProps = {
  src: string;
  alt: string;
  triggerClassName?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  fill?: boolean;
  width?: number;
  height?: number;
  label?: string;
};

export function ImageLightbox({
  src,
  alt,
  triggerClassName,
  imageClassName,
  sizes,
  priority,
  quality = 82,
  fill = true,
  width = 1600,
  height = 1000,
  label = "Open image preview",
}: ImageLightboxProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            "group relative block h-full w-full cursor-zoom-in overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4",
            triggerClassName
          )}
          aria-label={label}
        >
          <ContentImage
            src={src}
            alt={alt}
            fill={fill}
            sizes={sizes}
            priority={priority}
            quality={quality}
            className={cn(
              "object-cover transition duration-500 ease-[var(--ease-editorial)] group-hover:scale-[1.02]",
              imageClassName
            )}
            intrinsicWidth={width}
            intrinsicHeight={height}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent px-4 py-4 text-left text-white">
            <span className="text-xs font-semibold uppercase tracking-[0.2em]">View photo</span>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="max-w-[min(96vw,1200px)] border-border/60 bg-background/95 p-3 shadow-[var(--shadow-editorial)] backdrop-blur"
      >
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        <Button
          type="button"
          variant="secondary"
          size="icon"
          className="absolute right-4 top-4 z-10 rounded-full"
          onClick={() => setOpen(false)}
          aria-label="Close image preview"
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="relative max-h-[85vh] min-h-[280px] overflow-hidden rounded-[calc(var(--radius-editorial-lg)-0.25rem)] bg-black">
          <ContentImage
            src={src}
            alt={alt}
            fill
            sizes="96vw"
            quality={88}
            className="object-contain"
            intrinsicWidth={width}
            intrinsicHeight={height}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
