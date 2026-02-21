'use client'

import { useState } from 'react'
import { ProductCard, type ProductCardData } from '@/components/product/product-card'
import { useCartStore } from '@/lib/store/cart-store'
import { toast } from 'sonner'

type SuggestedProductsProps = {
  products: ProductCardData[]
  title?: string
}

export function SuggestedProducts({ products, title = 'Sản phẩm gợi ý' }: SuggestedProductsProps) {
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
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
    </div>
  )
}
