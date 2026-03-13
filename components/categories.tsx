import { ArrowRight, Settings, Package } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { categories } from "@/lib/data"

const categoryIcons: Record<string, string> = {
  "skins-addon": "/images/skinsaddon.png",
  "addons": "/images/addons.png",
  "resource-packs": "/images/resourcepacks.png",
  "premium-addons": "/images/premiumaddon.png",
}

export function Categories() {
  return (
    <section id="categories" className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-primary md:text-3xl">หมวดหมู่แนะนำ</h2>
            <p className="text-sm text-muted-foreground">Category Recommended</p>
          </div>
          <Link
            href="/categories"
            className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            เลือกดูทั้งหมด
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {categories.map((category) => {
            const icon = categoryIcons[category.id]
            return (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="group relative flex items-center justify-between overflow-hidden rounded-2xl border-2 border-red-500/50 bg-gradient-to-r from-red-600/20 to-red-900/20 p-4 md:p-6 transition-all hover:scale-[1.02] hover:border-primary min-h-[100px]"
              >
                <div className="flex items-center gap-4">
                  <div className="relative flex h-14 w-14 md:h-16 md:w-16 shrink-0 items-center justify-center rounded-xl bg-secondary overflow-visible">
                    <Image
                      src={icon || "/images/default.png"}
                      alt={category.name}
                      width={56}
                      height={56}
                      className="object-contain rounded-lg"
                      style={{ width: '56px', height: '56px' }}
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg md:text-2xl font-bold text-foreground truncate">{category.name}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground truncate">{category.nameTh}</p>
                  </div>
                </div>
                <div className="hidden sm:block rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100 shrink-0">
                  ดูสินค้า
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
