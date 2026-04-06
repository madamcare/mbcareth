import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { categories } from "@/lib/data"

const categoryIcons: Record<string, string> = {
  "skins-addon": "/images/skinsaddon.png",
  "addons": "/images/addons.png",
  "resource-packs": "/images/resourcepacks.png",
  "premium-addons": "/images/premiumaddon.png",
  "cosmetics": "/images/cosmetics.png",
  "giveaway": "/images/giveaway.png",
}

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background bg-[url('/images/bg-pattern.jpg')] bg-cover bg-fixed bg-center">
      <div className="min-h-screen bg-background/90">
        <Header />
        <main className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-primary md:text-4xl">หมวดหมู่</h1>
              <p className="text-sm text-muted-foreground">All Categories</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {categories.map((category) => {
                const icon = categoryIcons[category.id]
                return (
                  <Link
                    key={category.id}
                    href={`/categories/${category.id}`}
                    className="group relative overflow-hidden rounded-2xl border-2 border-primary/50 bg-gradient-to-br from-secondary to-background p-8 transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/20"
                  >
                    <div className="flex items-center gap-6">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-primary/20">
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
                        <h2 className="text-2xl font-bold text-primary truncate">{category.name}</h2>
                        <p className="text-lg text-muted-foreground truncate">{category.nameTh}</p>
                      </div>
                    </div>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground">
                      ดูสินค้า
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}
