'use client'

import { useState } from 'react'
import { ProductCard, type ProductCardData } from '@/components/product/product-card'
import { useCartStore } from '@/lib/store/cart-store'
import { toast } from 'sonner'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type FeaturedProductsSectionProps = {
  products: ProductCardData[]
}

export function FeaturedProductsSection({ products }: FeaturedProductsSectionProps) {
  const [productSelections, setProductSelections] = useState<Record<string, { color?: string; size?: string }>>({})
  const addItem = useCartStore((state) => state.addItem)

  const handleColorSelect = (productId: string, colorValue: string) => {
    setProductSelections((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        color: colorValue,
      },
    }))
  }

  const handleSizeSelect = (productId: string, size: string) => {
    setProductSelections((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        size,
      },
    }))

    // Auto add to cart when size is selected
    const product = products.find((p) => p.id === productId)
    if (product) {
      const selectedColor = productSelections[productId]?.color || product.colors?.[0]?.value
      const colorName = product.colors?.find((c) => c.value === selectedColor)?.name || 'Mặc định'

      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        variant: {
          size,
          color: colorName,
        },
      })

      toast.success('Đã thêm vào giỏ hàng', {
        description: `${product.name} - ${colorName} / ${size}`,
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
          {products.map((product) => {
            const selection = productSelections[product.id] || {}
            return (
              <ProductCard.Provider 
                key={product.id} 
                product={{
                  ...product,
                  selectedColor: selection.color || product.colors?.[0]?.value,
                  selectedSize: selection.size,
                  onColorSelect: (colorValue) => handleColorSelect(product.id, colorValue),
                  onSizeSelect: (size) => handleSizeSelect(product.id, size),
                }}
              >
                <ProductCard.Frame href={`/products/${product.id}`}>
                  <ProductCard.Image />
                  <ProductCard.Content>
                    <ProductCard.Colors />
                    <ProductCard.Title />
                    <ProductCard.Price />
                  </ProductCard.Content>
                </ProductCard.Frame>
              </ProductCard.Provider>
            )
          })}
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
