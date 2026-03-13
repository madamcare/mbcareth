import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Parse product name to extract icon: "ชื่อสินค้า </images/aminatedicon/file.gif>" -> { name, iconUrl }
export function parseProductNameWithIcon(name: string): { name: string; iconUrl: string | null } {
  const match = name.match(/^(.+?)\s*<(\/images\/aminatedicon\/[^>]+\.(png|jpg|jpeg|gif))>$/i)
  if (match) {
    return { name: match[1].trim(), iconUrl: match[2] }
  }
  return { name, iconUrl: null }
}
