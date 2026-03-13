import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Package, ChevronRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductName } from "@/components/product-name"
import { getCategoryById, getProductsByCategory } from "@/lib/data"

interface PageProps {
  params: Promise<{ categoryId: string }>
}

export default async function CategoryPage({ params }: PageProps) {
  const { categoryId } = await params
  const category = getCategoryById(categoryId)
  
  if (!category) {
    notFound()
  }
  
  const products = getProductsByCategory(categoryId)
  
  return (
    <div className="min-h-screen bg-background bg-[url('/images/bg-pattern.jpg')] bg-cover bg-fixed bg-center">
      <div className="min-h-screen bg-background/90">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">หน้าหลัก</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/categories" className="hover:text-primary">หมวดหมู่</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{category.name}</span>
          </nav>
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary md:text-4xl">{category.name}</h1>
            <p className="text-muted-foreground">{category.nameTh}</p>
          </div>
          
          {products.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group overflow-hidden rounded-2xl border-2 border-primary/50 bg-card transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/20"
                >
                  <div className="relative aspect-video bg-gradient-to-br from-secondary to-background">
                    {product.media && product.media.length > 0 && product.media[0].type === "image" ? (
                      <Image
                        src={product.media[0].url}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Package className="h-16 w-16 text-muted-foreground/30" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 text-lg font-bold text-foreground">
                        <ProductName name={product.name} iconSize={18} />
                      </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm text-muted-foreground">ราคา :</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {product.originalPrice} บาท
                        </span>
                      )}
                      <span className="text-lg font-bold text-primary">{product.price} บาท</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <Package className="mb-4 h-16 w-16 text-muted-foreground/50" />
              <p className="text-lg text-muted-foreground">ยังไม่มีสินค้าในหมวดหมู่นี้</p>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </div>
  )
}
