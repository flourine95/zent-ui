'use client'

import { ArrowUpDown, ChevronDown } from 'lucide-react'

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'name-asc' | 'name-desc'

type ProductSortProps = {
  value: SortOption
  onChange: (value: SortOption) => void
  resultCount: number
}

const sortOptions: Array<{ value: SortOption; label: string }> = [
  { value: 'default', label: 'Mặc định' },
  { value: 'newest', label: 'Mới nhất' },
  { value: 'price-asc', label: 'Giá: Thấp đến cao' },
  { value: 'price-desc', label: 'Giá: Cao đến thấp' },
  { value: 'rating', label: 'Đánh giá cao nhất' },
  { value: 'name-asc', label: 'Tên: A-Z' },
  { value: 'name-desc', label: 'Tên: Z-A' },
]

export function ProductSort({ value, onChange, resultCount }: ProductSortProps) {
  return (
    <div className="flex items-center gap-4">
      <p className="text-sm text-muted-foreground whitespace-nowrap">
        <span className="font-medium text-foreground">{resultCount}</span> sản phẩm
      </p>
      
      <div className="flex items-center gap-2">
        <ArrowUpDown className="h-4 w-4 text-muted-foreground shrink-0" />
        <div className="relative">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value as SortOption)}
            className="select-custom"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        </div>
      </div>
    </div>
  )
}
