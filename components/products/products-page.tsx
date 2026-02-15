'use client'

import { useState, useMemo } from 'react'
import { ProductCard, type ProductCardData } from '@/components/product/product-card'
import { useCartStore } from '@/lib/store/cart-store'
import { toast } from 'sonner'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Category = {
  id: string
  name: string
  slug: string
}

type ProductsPageClientProps = {
  products: ProductCardData[]
  categories: Category[]
}

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating' | 'newest'

const ITEMS_PER_PAGE = 12

export function ProductsPage({ products, categories }: ProductsPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState<SortOption>('default')
  const [currentPage, setCurrentPage] = useState(1)
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

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    // Sort
    const sorted = [...filtered]
    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case 'newest':
        // In real app, sort by createdAt
        break
      default:
        break
    }

    return sorted
  }, [products, selectedCategory, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug)
    setCurrentPage(1)
  }

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort)
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <h1 className="text-h1-mobile md:text-h1 text-foreground mb-2">Sản phẩm</h1>
          <p className="text-sm text-muted-foreground">
            {filteredAndSortedProducts.length} sản phẩm
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Categories */}
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-sm font-semibold text-foreground mb-4">Danh mục</h3>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.slug)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category.slug
                          ? 'bg-accent text-accent-foreground font-medium'
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-sm font-semibold text-foreground mb-4">Sắp xếp</h3>
                <div className="space-y-1">
                  <button
                    onClick={() => handleSortChange('default')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      sortBy === 'default'
                        ? 'bg-accent text-accent-foreground font-medium'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    Mặc định
                  </button>
                  <button
                    onClick={() => handleSortChange('price-asc')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      sortBy === 'price-asc'
                        ? 'bg-accent text-accent-foreground font-medium'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    Giá thấp đến cao
                  </button>
                  <button
                    onClick={() => handleSortChange('price-desc')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      sortBy === 'price-desc'
                        ? 'bg-accent text-accent-foreground font-medium'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    Giá cao đến thấp
                  </button>
                  <button
                    onClick={() => handleSortChange('rating')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      sortBy === 'rating'
                        ? 'bg-accent text-accent-foreground font-medium'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    Đánh giá cao nhất
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filters - Horizontal Scroll */}
            <div className="lg:hidden mb-6 space-y-4">
              {/* Categories */}
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground mb-2 px-1">DANH MỤC</h3>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.slug)}
                      className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                        selectedCategory === category.slug
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-card border border-border text-foreground hover:border-accent'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground mb-2 px-1">SẮP XẾP</h3>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  <button
                    onClick={() => handleSortChange('default')}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                      sortBy === 'default'
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-card border border-border text-foreground hover:border-accent'
                    }`}
                  >
                    Mặc định
                  </button>
                  <button
                    onClick={() => handleSortChange('price-asc')}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                      sortBy === 'price-asc'
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-card border border-border text-foreground hover:border-accent'
                    }`}
                  >
                    Giá ↑
                  </button>
                  <button
                    onClick={() => handleSortChange('price-desc')}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                      sortBy === 'price-desc'
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-card border border-border text-foreground hover:border-accent'
                    }`}
                  >
                    Giá ↓
                  </button>
                  <button
                    onClick={() => handleSortChange('rating')}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                      sortBy === 'rating'
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-card border border-border text-foreground hover:border-accent'
                    }`}
                  >
                    Đánh giá
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {currentProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">Không tìm thấy sản phẩm nào</p>
                <Button onClick={() => handleCategoryChange('all')}>
                  Xem tất cả sản phẩm
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {currentProducts.map((product) => {
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

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                        // Show first, last, current, and adjacent pages
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <Button
                              key={page}
                              variant={currentPage === page ? 'default' : 'outline'}
                              size="icon"
                              onClick={() => setCurrentPage(page)}
                              className="w-10"
                            >
                              {page}
                            </Button>
                          )
                        } else if (page === currentPage - 2 || page === currentPage + 2) {
                          return (
                            <span key={page} className="px-2 text-muted-foreground">
                              ...
                            </span>
                          )
                        }
                        return null
                      })}
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

