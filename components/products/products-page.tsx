'use client'

import { useState, useMemo, useCallback } from 'react'
import { ProductCard, type ProductCardData } from '@/components/product/product-card'
import { useCartStore } from '@/lib/store/cart-store'
import { toast } from 'sonner'
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductFilters, type FilterState } from './product-filters'
import { ActiveFilters } from './active-filters'
import { ProductSort, type SortOption } from './product-sort'

type Category = {
  id: string
  name: string
  slug: string
}

type ProductsPageClientProps = {
  products: ProductCardData[]
  categories: Category[]
}

const ITEMS_PER_PAGE_OPTIONS = [9, 12, 24, 48] as const

export function ProductsPage({ products, categories }: ProductsPageClientProps) {
  const addItem = useCartStore((state) => state.addItem)
  const [itemsPerPage, setItemsPerPage] = useState<number>(12)
  
  // Calculate price range from products
  const priceRange = useMemo<[number, number]>(() => {
    const prices = products.map((p) => p.price)
    return [Math.min(...prices), Math.max(...prices)]
  }, [products])

  // Extract unique sizes and colors
  const { availableSizes, availableColors } = useMemo(() => {
    const sizesSet = new Set<string>()
    const colorsMap = new Map<string, { name: string; value: string; hex: string }>()

    products.forEach((product) => {
      product.sizes?.forEach((size) => sizesSet.add(size))
      product.colors?.forEach((color) => {
        if (!colorsMap.has(color.value)) {
          colorsMap.set(color.value, color)
        }
      })
    })

    return {
      availableSizes: Array.from(sizesSet).sort(),
      availableColors: Array.from(colorsMap.values()),
    }
  }, [products])

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    priceRange,
    categories: [],
    sizes: [],
    colors: [],
    inStock: false,
    freeShipping: false,
  })
  const [sortBy, setSortBy] = useState<SortOption>('default')
  const [currentPage, setCurrentPage] = useState(1)
  const [productSelections, setProductSelections] = useState<Record<string, { color?: string; size?: string }>>({})

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

  const handleRemoveFilter = useCallback(
    (key: keyof FilterState, value?: string) => {
      if (key === 'search') {
        setFilters((prev) => ({ ...prev, search: '' }))
      } else if (key === 'priceRange') {
        setFilters((prev) => ({ ...prev, priceRange }))
      } else if (key === 'inStock' || key === 'freeShipping') {
        setFilters((prev) => ({ ...prev, [key]: false }))
      } else if (value && (key === 'categories' || key === 'sizes' || key === 'colors')) {
        setFilters((prev) => ({
          ...prev,
          [key]: prev[key].filter((v) => v !== value),
        }))
      }
      setCurrentPage(1)
    },
    [priceRange]
  )

  const handleClearAllFilters = useCallback(() => {
    setFilters({
      search: '',
      priceRange,
      categories: [],
      sizes: [],
      colors: [],
      inStock: false,
      freeShipping: false,
    })
    setCurrentPage(1)
  }, [priceRange])

  const handleFiltersChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }, [])

  const handleSortChange = useCallback((sort: SortOption) => {
    setSortBy(sort)
    setCurrentPage(1)
  }, [])

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products

    // Search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchLower)
      )
    }

    // Price range
    filtered = filtered.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    )

    // Categories
    if (filters.categories.length > 0) {
      filtered = filtered.filter((p) => p.category && filters.categories.includes(p.category))
    }

    // Sizes
    if (filters.sizes.length > 0) {
      filtered = filtered.filter((p) =>
        p.sizes?.some((size) => filters.sizes.includes(size))
      )
    }

    // Colors
    if (filters.colors.length > 0) {
      filtered = filtered.filter((p) =>
        p.colors?.some((color) => filters.colors.includes(color.value))
      )
    }

    // In stock
    if (filters.inStock) {
      filtered = filtered.filter((p) => p.inStock)
    }

    // Free shipping
    if (filters.freeShipping) {
      filtered = filtered.filter((p) => p.freeShipping)
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
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name, 'vi'))
        break
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name, 'vi'))
        break
      case 'newest':
        // In real app, sort by createdAt
        break
      default:
        break
    }

    return sorted
  }, [products, filters, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <h1 className="text-h1-mobile md:text-h1 text-foreground mb-2">Sản phẩm</h1>
          <p className="text-sm text-muted-foreground">
            Khám phá bộ sưu tập thời trang nam tối giản
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-24">
              <ProductFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                categories={categories}
                availableSizes={availableSizes}
                availableColors={availableColors}
                priceRange={priceRange}
                resultCount={filteredAndSortedProducts.length}
              />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0 flex flex-col">
            {/* Active Filters */}
            <ActiveFilters
              filters={filters}
              onRemoveFilter={handleRemoveFilter}
              onClearAll={handleClearAllFilters}
              categories={categories}
              availableColors={availableColors}
              priceRange={priceRange}
            />

            {/* Sort and Items Per Page */}
            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <ProductSort
                value={sortBy}
                onChange={handleSortChange}
                resultCount={filteredAndSortedProducts.length}
              />
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground whitespace-nowrap">Hiển thị:</span>
                <div className="relative">
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value))
                      setCurrentPage(1)
                    }}
                    className="select-custom"
                  >
                    {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option} sản phẩm
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1 flex flex-col min-h-150">
              {currentProducts.length === 0 ? (
                <div className="text-center py-16 mt-8">
                  <p className="text-muted-foreground mb-4">Không tìm thấy sản phẩm nào</p>
                  <Button onClick={handleClearAllFilters}>Xóa bộ lọc</Button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mt-6">
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
                  <div className="flex flex-col items-center gap-4 py-12 mt-auto border-t border-border">
                    {totalPages > 1 ? (
                      <>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="rounded-full"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>

                          <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
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
                                    className="w-10 h-10 rounded-full"
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
                            className="rounded-full"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>

                        <p className="text-sm text-muted-foreground">
                          Trang {currentPage} / {totalPages} • {filteredAndSortedProducts.length} sản phẩm
                        </p>
                      </>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Hiển thị {filteredAndSortedProducts.length} sản phẩm
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
