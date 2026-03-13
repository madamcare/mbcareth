"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Package, Play } from "lucide-react"
import { cn } from "@/lib/utils"

export type MediaItem = {
  type: "image" | "youtube"
  url: string
}

interface ProductImageGalleryProps {
  media: MediaItem[]
  productName: string
}

// Extract YouTube video ID from various URL formats
function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([^&\s]+)/,
    /(?:youtu\.be\/)([^?\s]+)/,
    /(?:youtube\.com\/embed\/)([^?\s]+)/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

function YouTubeEmbed({ url, title }: { url: string; title: string }) {
  const videoId = getYouTubeVideoId(url)

  if (!videoId) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-secondary">
        <p className="text-muted-foreground">ไม่สามารถโหลดวิดีโอได้</p>
      </div>
    )
  }

  return (
    <iframe
      src={`https://www.youtube.com/embed/${videoId}`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="absolute inset-0 h-full w-full"
    />
  )
}

// Thumbnail Gallery Component with touch swipe support
function ThumbnailGallery({
  media,
  currentIndex,
  setCurrentIndex,
  productName
}: {
  media: MediaItem[]
  currentIndex: number
  setCurrentIndex: (index: number) => void
  productName: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return
    e.preventDefault()
    const x = e.pageX - containerRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    containerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return
    const x = e.touches[0].pageX - containerRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    containerRef.current.scrollLeft = scrollLeft - walk
  }

  return (
    <div
      ref={containerRef}
      className="flex gap-2 overflow-x-scroll no-scrollbar cursor-grab active:cursor-grabbing select-none touch-pan-x"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {media.map((item, index) => (
        <button
          key={index}
          onClick={() => !isDragging && setCurrentIndex(index)}
          className={cn(
            "relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all",
            currentIndex === index
              ? "border-primary ring-2 ring-primary ring-offset-2 ring-offset-background"
              : "border-border hover:border-primary/50"
          )}
          aria-label={`ดู${item.type === "youtube" ? "วิดีโอ" : "รูป"}ที่ ${index + 1}`}
        >
          {item.type === "youtube" ? (
            <div className="flex h-full w-full items-center justify-center bg-secondary">
              <Play className="h-6 w-6 text-primary" />
            </div>
          ) : (
            <Image
              src={item.url}
              alt={`${productName} - thumbnail ${index + 1}`}
              fill
              className="object-cover"
              sizes="64px"
            />
          )}
        </button>
      ))}
    </div>
  )
}

export function ProductImageGallery({ media, productName }: ProductImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!media || media.length === 0) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-2xl border-2 border-primary/50 bg-gradient-to-br from-secondary to-background lg:aspect-square">
        <div className="absolute inset-0 flex items-center justify-center">
          <Package className="h-32 w-32 text-muted-foreground/30" />
        </div>
      </div>
    )
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1))
  }

  const currentMedia = media[currentIndex]

  return (
    <div className="space-y-4">
      {/* Main Media Display */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-primary/50 bg-secondary">
        <div className="relative aspect-video lg:aspect-square">
          {currentMedia.type === "youtube" ? (
            <YouTubeEmbed url={currentMedia.url} title={productName} />
          ) : (
            <Image
              src={currentMedia.url}
              alt={`${productName} - รูปที่ ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          )}
        </div>

        {/* Navigation Arrows */}
        {media.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              aria-label="รูปก่อนหน้า"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              aria-label="รูปถัดไป"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        {/* Media Counter */}
        {media.length > 1 && (
          <div className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 rounded-full bg-background/80 px-3 py-1 text-sm text-foreground">
            {currentIndex + 1} / {media.length}
          </div>
        )}
      </div>

      {/* Thumbnail Gallery - Hidden on mobile, shown on md and up */}
      {media.length > 1 && (
        <div className="hidden md:block">
          <ThumbnailGallery
            media={media}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            productName={productName}
          />
        </div>
      )}
    </div>
  )
}
