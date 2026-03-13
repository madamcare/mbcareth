"use client"

import { Volume2 } from "lucide-react"

interface AnnouncementProps {
  message: string
}

export function Announcement({ message }: AnnouncementProps) {
  return (
    <div className="relative flex items-center overflow-hidden bg-primary py-3">
      <div className="flex items-center gap-3 px-4">
        <div className="flex items-center gap-2 rounded-lg bg-background px-4 py-1.5 text-sm font-semibold text-primary">
          <Volume2 className="h-4 w-4" />
          ประกาศ
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          <span className="mx-8 text-sm font-medium text-primary-foreground">{message}</span>
          <span className="mx-8 text-sm font-medium text-primary-foreground">{message}</span>
          <span className="mx-8 text-sm font-medium text-primary-foreground">{message}</span>
        </div>
      </div>
    </div>
  )
}
