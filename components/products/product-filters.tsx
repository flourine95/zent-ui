'use client'

import { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { Search, X, SlidersHorizontal, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { PriceRangeSlider } from './price-range-slider'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

export type FilterState = {
  search: string
  priceRange: [number, number]
  categories: string[]
  sizes: string[]
  colors: string[]
  inStock: boolean
  freeShipping: boolean
}

type ProductFiltersProps = {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  categories: Array<{ id: string; name: string; slug: string }>
  availableSizes: string[]
  availableColors: Array<{ name: string; value: string; hex: string }>
  priceRange: [number, number]
  resultCount: number
}

export function ProductFilters({
  filters,
  onFiltersChange,
  categories,
  availableSizes,
  availableColors,
  priceRange,
  resultCount,
}: ProductFiltersProps) {
  const [searchValue, setSearchValue] = useState<string>(filters.search)
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [openSections, setOpenSections] = useState({
    price: true,
    category: true,
    size: true,
    color: true,
    other: true,
  })

  // Debounced search
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      if (searchValue !== filters.search) {
        onFiltersChange({ ...filters, search: searchValue })
      }
    }, 300)

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [searchValue, filters, onFiltersChange])

  const handlePriceRangeChange = useCallback(
    (newRange: [number, number]) => {
      onFiltersChange({ ...filters, priceRange: newRange })
    },
    [filters, onFiltersChange]
  )

  const updateFilter = useCallback(
    <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
      onFiltersChange({ ...filters, [key]: value })
    },
    [filters, onFiltersChange]
  )

  const toggleArrayFilter = useCallback(
    <K extends keyof Pick<FilterState, 'categories' | 'sizes' | 'colors'>>(
      key: K,
      value: string
    ) => {
      const current = filters[key] as string[]
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
      updateFilter(key, updated as FilterState[K])
    },
    [filters, updateFilter]
  )

  const activeFilterCount = useMemo(() => {
    let count = 0
    if (filters.search) count++
    if (filters.priceRange[0] !== priceRange[0] || filters.priceRange[1] !== priceRange[1]) count++
    count += filters.categories.length
    count += filters.sizes.length
    count += filters.colors.length
    if (filters.inStock) count++
    if (filters.freeShipping) count++
    return count
  }, [filters, priceRange])

  const clearAllFilters = useCallback(() => {
    onFiltersChange({
      search: '',
      priceRange,
      categories: [],
      sizes: [],
      colors: [],
      inStock: false,
      freeShipping: false,
    })
    setSearchValue('')
  }, [onFiltersChange, priceRange])

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <Collapsible
        open={openSections.price}
        onOpenChange={(open) => setOpenSections((prev) => ({ ...prev, price: open }))}
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 hover:text-foreground transition-colors">
          <h3 className="text-sm font-semibold">Khoảng giá</h3>
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openSections.price ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <PriceRangeSlider
            min={priceRange[0]}
            max={priceRange[1]}
            value={filters.priceRange}
            onChange={handlePriceRangeChange}
          />
        </CollapsibleContent>
      </Collapsible>

      <div className="border-t border-border" />

      {/* Categories */}
      <Collapsible
        open={openSections.category}
        onOpenChange={(open) => setOpenSections((prev) => ({ ...prev, category: open }))}
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 hover:text-foreground transition-colors">
          <h3 className="text-sm font-semibold">Danh mục</h3>
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openSections.category ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-3">
          {categories.filter((c) => c.slug !== 'all').map((category) => (
            <label
              key={category.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <Checkbox
                checked={filters.categories.includes(category.slug)}
                onCheckedChange={() => toggleArrayFilter('categories', category.slug)}
              />
              <span className="text-sm group-hover:text-foreground transition-colors">
                {category.name}
              </span>
            </label>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <div className="border-t border-border" />

      {/* Sizes */}
      <Collapsible
        open={openSections.size}
        onOpenChange={(open) => setOpenSections((prev) => ({ ...prev, size: open }))}
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 hover:text-foreground transition-colors">
          <h3 className="text-sm font-semibold">Kích thước</h3>
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openSections.size ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <div className="flex flex-wrap gap-2">
            {availableSizes.map((size) => (
              <button
                key={size}
                onClick={() => toggleArrayFilter('sizes', size)}
                className={cn(
                  'min-w-12 px-4 py-2 rounded-full border-2 text-sm font-medium transition-all',
                  filters.sizes.includes(size)
                    ? 'border-accent bg-accent text-accent-foreground'
                    : 'border-border hover:border-muted-foreground'
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="border-t border-border" />

      {/* Colors */}
      <Collapsible
        open={openSections.color}
        onOpenChange={(open) => setOpenSections((prev) => ({ ...prev, color: open }))}
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 hover:text-foreground transition-colors">
          <h3 className="text-sm font-semibold">Màu sắc</h3>
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openSections.color ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <div className="flex flex-wrap gap-2">
            {availableColors.map((color) => (
              <button
                key={color.value}
                onClick={() => toggleArrayFilter('colors', color.value)}
                className={cn(
                  'w-10 h-10 rounded-full transition-all',
                  filters.colors.includes(color.value)
                    ? 'border-[3px] border-accent scale-110'
                    : 'border-2 border-border hover:border-muted-foreground'
                )}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={color.name}
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="border-t border-border" />

      {/* Other Filters */}
      <Collapsible
        open={openSections.other}
        onOpenChange={(open) => setOpenSections((prev) => ({ ...prev, other: open }))}
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 hover:text-foreground transition-colors">
          <h3 className="text-sm font-semibold">Khác</h3>
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openSections.other ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <Checkbox
              checked={filters.inStock}
              onCheckedChange={(checked) => updateFilter('inStock', !!checked)}
            />
            <span className="text-sm group-hover:text-foreground transition-colors">
              Còn hàng
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <Checkbox
              checked={filters.freeShipping}
              onCheckedChange={(checked) => updateFilter('freeShipping', !!checked)}
            />
            <span className="text-sm group-hover:text-foreground transition-colors">
              Miễn phí vận chuyển
            </span>
          </label>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          type="search"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="pl-9 pr-10 h-11"
        />
        {searchValue && (
          <button
            onClick={() => setSearchValue('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Xóa tìm kiếm"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full justify-between h-11">
              <span className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Bộ lọc
                {activeFilterCount > 0 && (
                  <span className="flex items-center justify-center min-w-5 h-5 px-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </span>
              <span className="text-sm text-muted-foreground">
                {resultCount} sản phẩm
              </span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Bộ lọc</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
              {activeFilterCount > 0 && (
                <Button
                  variant="outline"
                  onClick={clearAllFilters}
                  className="w-full mt-6"
                >
                  Xóa tất cả bộ lọc
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-semibold">Bộ lọc</h2>
            {activeFilterCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="h-8 text-xs"
              >
                Xóa tất cả
              </Button>
            )}
          </div>
          <FilterContent />
        </div>
      </div>
    </div>
  )
}
