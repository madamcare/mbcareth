import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Categories } from "@/components/categories"
import { Products } from "@/components/products"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background bg-[url('/images/bg-pattern.jpg')] bg-cover bg-fixed bg-center">
      <div className="min-h-screen bg-background/90">
        <Header />
        <main>
          <Hero />
          <Categories />
          <Products />
        </main>
        <Footer />
      </div>
    </div>
  )
}
