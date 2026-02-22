'use client'

import { useState, useMemo, useCallback, useTransition } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ProductCard, type ProductCardData } from '@/components/product/product-card'
import { useCartStore } from '@/lib/store/cart-store'
import { toast } from 'sonner'
import { useDeferredValue } from 'react'

// Mock data - replace with real API
const MOCK_PRODUCTS: ProductCardData[] = [
  {
    id: '1',
    name: 'Áo thun Premium Cotton',
    price: 299000,
    image: '/images/products/ao-thun-1.jpg',
    category: 'ao-thun',
    colors: [
      { name: 'Đen', value: 'black', hex: '#000000' },
      { name: 'Trắng', value: 'white', hex: '#FFFFFF' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    freeShipping: true,
  },
  // Add more mock products as needed
]

export function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isPending, startTransition] = useTransition()
  const deferredQuery = useDeferredValue(searchQuery)
  
  const addItem = useCartStore((state) => state.addItem)
  const [productSelections, setProductSelections] = useState<Record<string, { color?: string; size?: string }>>({})

  const handleColorSelect = useCallback((productId: string, colorValue: string) => {
    setProductSelections((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        color: colorValue,
      },
    }))
  }, [])

  const handleSizeSelect = useCallback((productId: string, size: string) => {
    setProductSelections((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        size,
      },
    }))

    const product = MOCK_PRODUCTS.find((p) => p.id === productId)
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
  }, [productSelections, addItem])

  // Filter products based on deferred query
  const filteredProducts = useMemo(() => {
    if (!deferredQuery.trim()) return []
    
    const query = deferredQuery.toLowerCase()
    return MOCK_PRODUCTS.filter((product) =>
      product.name.toLowerCase().includes(query) ||
      (product.category && product.category.toLowerCase().includes(query))
    )
  }, [deferredQuery])

  const handleSearchChange = (value: string) => {
    startTransition(() => {
      setSearchQuery(value)
    })
  }

  const handleClear = () => {
    setSearchQuery('')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <h1 className="text-h1-mobile md:text-h1 mb-6">Tìm kiếm</h1>
          
          {/* Search Input */}
          <div className="max-w-2xl relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 pr-10 h-12 text-base"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
                aria-label="Xóa tìm kiếm"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 md:px-6 py-8">
        {!searchQuery.trim() ? (
          <div className="text-center py-16">
            <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-h2 mb-2">Tìm kiếm sản phẩm</h2>
            <p className="text-muted-foreground">
              Nhập từ khóa để tìm kiếm sản phẩm bạn muốn
            </p>
          </div>
        ) : isPending ? (
          <div className="text-center py-16">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            <p className="text-muted-foreground mt-4">Đang tìm kiếm...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-2">
              Không tìm thấy sản phẩm nào cho "{searchQuery}"
            </p>
            <p className="text-sm text-muted-foreground">
              Thử tìm kiếm với từ khóa khác
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-6">
              Tìm thấy <span className="font-medium text-foreground">{filteredProducts.length}</span> sản phẩm
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => {
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
          </>
        )}
      </div>
    </div>
  )
}
