'use client'

import { ArrowUpDown } from 'lucide-react'

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
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="h-9 pl-3 pr-9 rounded-md border border-input bg-background text-sm shadow-xs transition-colors hover:bg-accent/50 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus:border-ring cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px_16px] bg-[right_8px_center] bg-no-repeat [&:focus]:bg-background"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
