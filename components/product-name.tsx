"use client"

import Image from "next/image"
import { parseProductNameWithIcon } from "@/lib/utils"

interface ProductNameProps {
  name: string
  className?: string
  iconSize?: number
}

export function ProductName({ name, className = "", iconSize = 20 }: ProductNameProps) {
  const { name: displayName, iconUrl } = parseProductNameWithIcon(name)

  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span>{displayName}</span>
      {iconUrl && (
        <Image
          src={iconUrl}
          alt=""
          width={iconSize}
          height={iconSize}
          className="inline-block object-contain"
          unoptimized // Required for GIF animations
        />
      )}
    </span>
  )
}
