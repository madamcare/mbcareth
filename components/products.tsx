import { ArrowRight, Package } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getRecommendedProducts } from "@/lib/data"
import { ProductName } from "@/components/product-name"

export function Products() {
  const products = getRecommendedProducts()
  
  return (
    <section id="products" className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-primary md:text-3xl">สินค้าแนะนำ</h2>
            <p className="text-sm text-muted-foreground">Product Recommended</p>
          </div>
          <Link
            href="/categories"
            className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            เลือกดูทั้งหมด
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
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
      </div>
    </section>
  )
}
