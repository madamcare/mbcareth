import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronRight, MessageCircle, ExternalLink } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductImageGallery } from "@/components/product-image-gallery"
import { ProductName } from "@/components/product-name"
import { getProductById, getCategoryById } from "@/lib/data"
import { parseProductNameWithIcon } from "@/lib/utils"

// Parse feature text to extract link: "ข้อความ <URL>" -> { text, url }
function parseFeatureWithLink(feature: string): { text: string; url: string | null } {
  const match = feature.match(/^(.+?)\s*<(https?:\/\/[^>]+)>$/)
  if (match) {
    return { text: match[1].trim(), url: match[2] }
  }
  return { text: feature, url: null }
}

interface PageProps {
  params: Promise<{ productId: string }>
}

export default async function ProductPage({ params }: PageProps) {
  const { productId } = await params
  const product = getProductById(productId)

  if (!product) {
    notFound()
  }

  const category = getCategoryById(product.categoryId)

  return (
    <div className="min-h-screen bg-background bg-[url('/images/bg-pattern.jpg')] bg-cover bg-fixed bg-center">
      <div className="min-h-screen bg-background/90">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">หน้าหลัก</Link>
            <ChevronRight className="h-4 w-4" />
            {category && (
              <>
                <Link href={`/categories/${category.id}`} className="hover:text-primary">{category.name}</Link>
                <ChevronRight className="h-4 w-4" />
              </>
            )}
            <span className="text-foreground">{parseProductNameWithIcon(product.name).name}</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-2">
            <ProductImageGallery
              media={product.media || []}
              productName={product.name}
            />

            <div className="min-w-0 w-full">
              <h1 className="mb-2 text-xl font-bold text-foreground sm:text-2xl md:text-3xl break-words [overflow-wrap:anywhere]">
                สินค้า : <ProductName name={product.name} iconSize={28} />
              </h1>

              <div className="mb-6 border-b border-border pb-4">
                <p className="text-lg text-primary">รายละเอียดสินค้า</p>
              </div>

              <div className="mb-6">
                <p className="text-muted-foreground whitespace-pre-wrap break-words [overflow-wrap:anywhere]">{product.description}</p>
              </div>

              {product.features && product.features.length > 0 && (
                <div className="mb-6">
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => {
                      const { text, url } = parseFeatureWithLink(feature)
                      return (
                        <li key={index} className="flex items-start gap-2 text-muted-foreground">
                          <span className="text-primary shrink-0">[+]</span>
                          <span className="break-words [overflow-wrap:anywhere]">
                            {text}
                            {url && (
                              <>
                                {" "}
                                <Link
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-primary hover:underline"
                                >
                                  (คลิก)
                                  <ExternalLink className="h-3 w-3" />
                                </Link>
                              </>
                            )}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}

              <div className="mb-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-lg text-muted-foreground">ราคา :</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {product.originalPrice} บาท
                  </span>
                )}
                <span className="text-2xl font-bold text-primary">{product.price} บาท</span>
              </div>

              <Link
                href="https://discord.gg/DztQe9Rv49"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-lg font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <MessageCircle className="h-5 w-5" />
                ติดต่อสั่งซื้อ
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}
