'use client'

import { ArrowUpDown } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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
      <p className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{resultCount}</span> sản phẩm
      </p>
      
      <div className="flex items-center gap-2">
        <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-[200px] h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="end">
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
