"use client"

import { useState, useMemo } from "react"
import { Search, Tag } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { categories, products } from "@/lib/data"
import { parseProductNameWithIcon } from "@/lib/utils"
import Link from "next/link"

export default function PriceListPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const filteredProductsByCategory = useMemo(() => {
    const query = searchQuery.toLowerCase().trim()
    
    return categories.map((category) => {
      const categoryProducts = products
        .filter((product) => product.categoryId === category.id)
        .filter((product) => {
          if (!query) return true
          const { name } = parseProductNameWithIcon(product.name)
          return name.toLowerCase().includes(query)
        })
      
      return {
        ...category,
        products: categoryProducts,
      }
    }).filter((category) => category.products.length > 0)
  }, [searchQuery])

  const totalProducts = filteredProductsByCategory.reduce(
    (sum, cat) => sum + cat.products.length,
    0
  )

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {
          }
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Tag className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">ราคาสินค้า</h1>
            </div>
            <p className="text-muted-foreground">รายการราคาสินค้าทั้งหมด แยกตามหมวดหมู่</p>
          </div>

          {
          }
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="ค้นหาสินค้า..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-border bg-secondary/50 py-3 pl-10 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              พบ {totalProducts} รายการ
            </p>
          </div>

          {
          }
          <div className="space-y-8">
            {filteredProductsByCategory.map((category) => (
              <div key={category.id} className="rounded-xl border border-border bg-card overflow-hidden">
                {
                }
                <div className="bg-primary/10 border-b border-border px-4 py-3">
                  <h2 className="text-lg font-bold text-primary">
                    {category.name} - {category.nameTh}
                  </h2>
                </div>

                {
                }
                <div className="divide-y divide-border">
                  {category.products.map((product) => {
                    const { name } = parseProductNameWithIcon(product.name)
                    const hasDiscount = product.originalPrice && product.originalPrice > product.price
                    
                    return (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="flex items-center justify-between px-4 py-3 hover:bg-secondary/30 transition-colors"
                      >
                        <span className="text-foreground">{name}</span>
                        <div className="flex items-center gap-2">
                          {hasDiscount && (
                            <span className="text-sm text-muted-foreground line-through">
                              {product.originalPrice?.toLocaleString()} ฿
                            </span>
                          )}
                          <span className={`font-bold ${product.price === 0 ? "text-green-500" : "text-primary"}`}>
                            {product.price === 0 ? "ฟรี" : `${product.price.toLocaleString()} ฿`}
                          </span>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}

            {
            }
            {filteredProductsByCategory.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">ไม่พบสินค้าที่ค้นหา</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
