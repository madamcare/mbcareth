"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

const heroImages = [
  "/images/hero-banner.jpg",
  "/images/mb-banner2.png",
]

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (heroImages.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000) 

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative w-full">
      <div className="container mx-auto px-2 py-4 sm:px-4 sm:py-6">
        <div className="relative aspect-[16/9] sm:aspect-[16/7] md:aspect-[16/6] w-full overflow-hidden rounded-xl sm:rounded-2xl border-2 sm:border-4 border-primary/50">
          {}
          {heroImages.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={`MineBit Store Banner ${index + 1}`}
              fill
              className={`object-cover transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              priority={index === 0}
            />
          ))}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 px-3 sm:px-6 py-4 sm:py-0">
            <h1
              className="mb-1 sm:mb-2 text-xl sm:text-3xl md:text-5xl lg:text-7xl font-bold text-primary text-balance text-center"
              style={{
                textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, -3px 0 0 #000, 3px 0 0 #000, 0 -3px 0 #000, 0 3px 0 #000'
              }}
            >
              MineBit Store
            </h1>
            <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-white text-center px-2 sm:px-4 leading-relaxed">
              แอดออนคุณภาพสมราคา ไม่ใช่เพียงสินค้าราคาตลาดนัดทั่วไป
            </p>
            <div className="mt-3 sm:mt-6 pb-1 flex flex-col gap-2 sm:gap-4 sm:flex-row w-full sm:w-auto px-4 sm:px-0">
              <Link
                href="/all-products"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-4 sm:px-8 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                ดูสินค้าทั้งหมด
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center justify-center rounded-lg border border-primary bg-black/50 px-4 sm:px-8 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-primary/20"
              >
                หมวดหมู่สินค้า
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
