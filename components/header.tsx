"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Home, Grid3X3, Mail, Menu, X } from "lucide-react"

const navItems = [
  { label: "หน้าหลัก", href: "/", icon: Home },
  { label: "หมวดหมู่", href: "/categories", icon: Grid3X3 },
  { label: "ติดต่อ", href: "/contact", icon: Mail },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="MineBit Store Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="text-xl font-bold text-foreground">MineBit Store</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={toggleMenu}
            className="flex md:hidden rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-primary transition-colors"
            aria-label={isMenuOpen ? "ปิดเมนู" : "เปิดเมนู"}
            aria-expanded={isMenuOpen}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile Slide Down Menu - Below header */}
      <div
        className={`md:hidden fixed top-16 left-0 right-0 z-40 transition-all duration-300 ease-out ${isMenuOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
          }`}
      >
        {/* Menu items with semi-transparent background */}
        <nav className="flex flex-col bg-background/95 backdrop-blur-xl border-b border-border">
          {navItems.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={closeMenu}
              className={`flex items-center gap-4 px-6 py-4 text-lg font-medium text-foreground border-b border-border/20 hover:bg-secondary/30 transition-all duration-300 ${isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
                }`}
              style={{
                transitionDelay: isMenuOpen ? `${index * 50}ms` : "0ms",
              }}
            >
              <item.icon className="h-5 w-5 text-primary" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Backdrop overlay - click to close */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 top-16 z-30 bg-black/40"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </>
  )
}
