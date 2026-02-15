'use client'

import { ProductCard, type ProductCardData } from '@/components/product/product-card'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart-store'
import { toast } from 'sonner'

type FeaturedProductsSectionProps = {
  products: ProductCardData[]
}

export function FeaturedProductsSection({ products }: FeaturedProductsSectionProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
      
      // Show success toast
      toast.success('Đã thêm vào giỏ hàng', {
        description: product.name,
      })
    }
  }

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <div className="space-y-2">
            <h2 className="text-h2-mobile md:text-h2 text-foreground">Sản phẩm nổi bật</h2>
            <p className="text-sm text-muted-foreground">
              Những sản phẩm được yêu thích nhất
            </p>
          </div>
          <Link
            href="/products"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/90 transition-colors cursor-pointer"
          >
            Xem tất cả
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard.Provider key={product.id} product={product}>
              <ProductCard.Frame href={`/products/${product.id}`}>
                <ProductCard.Image />
                <ProductCard.Content className="p-4">
                  <ProductCard.Title />
                  <ProductCard.Rating />
                  <ProductCard.Footer>
                    <ProductCard.Price />
                    <ProductCard.AddToCart onAddToCart={handleAddToCart} />
                  </ProductCard.Footer>
                </ProductCard.Content>
              </ProductCard.Frame>
            </ProductCard.Provider>
          ))}
        </div>

        {/* Mobile "View all" button */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href="/products"
            className="h-10 px-6 bg-transparent text-foreground border-2 border-border rounded-full transition-all hover:bg-muted hover:border-foreground active:scale-[0.98] cursor-pointer inline-flex items-center gap-2 font-medium"
          >
            Xem tất cả sản phẩm
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
