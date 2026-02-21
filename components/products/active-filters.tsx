'use client'

import { X } from 'lucide-react'
import type { FilterState } from './product-filters'
import {Button} from "@/components/ui/button";

type ActiveFiltersProps = {
  filters: FilterState
  onRemoveFilter: (key: keyof FilterState, value?: string) => void
  onClearAll: () => void
  categories: Array<{ id: string; name: string; slug: string }>
  availableColors: Array<{ name: string; value: string; hex: string }>
  priceRange: [number, number]
}

export function ActiveFilters({
  filters,
  onRemoveFilter,
  onClearAll,
  categories,
  availableColors,
  priceRange,
}: ActiveFiltersProps) {
  const activeFilters: Array<{ key: keyof FilterState; value?: string; label: string }> = []

  // Search
  if (filters.search) {
    activeFilters.push({
      key: 'search',
      label: `Tìm kiếm: "${filters.search}"`,
    })
  }

  // Price Range
  if (filters.priceRange[0] !== priceRange[0] || filters.priceRange[1] !== priceRange[1]) {
    activeFilters.push({
      key: 'priceRange',
      label: `Giá: ${filters.priceRange[0].toLocaleString('vi-VN')}₫ - ${filters.priceRange[1].toLocaleString('vi-VN')}₫`,
    })
  }

  // Categories
  filters.categories.forEach((slug) => {
    const category = categories.find((c) => c.slug === slug)
    if (category) {
      activeFilters.push({
        key: 'categories',
        value: slug,
        label: category.name,
      })
    }
  })

  // Sizes
  filters.sizes.forEach((size) => {
    activeFilters.push({
      key: 'sizes',
      value: size,
      label: `Size: ${size}`,
    })
  })

  // Colors
  filters.colors.forEach((colorValue) => {
    const color = availableColors.find((c) => c.value === colorValue)
    if (color) {
      activeFilters.push({
        key: 'colors',
        value: colorValue,
        label: color.name,
      })
    }
  })

  // In Stock
  if (filters.inStock) {
    activeFilters.push({
      key: 'inStock',
      label: 'Còn hàng',
    })
  }

  // Free Shipping
  if (filters.freeShipping) {
    activeFilters.push({
      key: 'freeShipping',
      label: 'Miễn phí vận chuyển',
    })
  }

  if (activeFilters.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2 p-4 bg-muted/50 rounded-lg border border-border">
      <span className="text-sm font-medium text-muted-foreground">Đang lọc:</span>
      
      {activeFilters.map((filter, index) => (
        <button
          key={`${filter.key}-${filter.value || ''}-${index}`}
          onClick={() => onRemoveFilter(filter.key, filter.value)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-background border border-border rounded-full text-sm font-medium hover:border-primary hover:bg-primary/5 transition-all group"
        >
          <span>{filter.label}</span>
          <X className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
        </button>
      ))}

      {activeFilters.length > 1 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="h-8 text-xs ml-auto"
        >
          Xóa tất cả
        </Button>
      )}
    </div>
  )
}
