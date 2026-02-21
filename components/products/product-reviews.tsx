'use client'

import { useState, useMemo } from 'react'
import { Star, ThumbsUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type Review = {
  id: string
  userName: string
  rating: number
  date: string
  comment: string
  helpful: number
  verified: boolean
}

type ProductReviewsProps = {
  reviews: Review[]
  averageRating: number
  totalReviews: number
}

type FilterOption = 'all' | '5' | '4' | '3' | '2' | '1' | 'verified'

export function ProductReviews({ reviews, averageRating, totalReviews }: ProductReviewsProps) {
  const [filterBy, setFilterBy] = useState<FilterOption>('all')
  const [sortBy, setSortBy] = useState<'newest' | 'helpful'>('newest')

  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => Math.floor(r.rating) === star).length
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0
    return { star, count, percentage }
  })

  // Filter and sort reviews
  const filteredAndSortedReviews = useMemo(() => {
    let filtered = reviews

    // Filter by rating or verified
    if (filterBy === 'verified') {
      filtered = filtered.filter((r) => r.verified)
    } else if (filterBy !== 'all') {
      const rating = parseInt(filterBy)
      filtered = filtered.filter((r) => Math.floor(r.rating) === rating)
    }

    // Sort
    const sorted = [...filtered]
    if (sortBy === 'helpful') {
      sorted.sort((a, b) => b.helpful - a.helpful)
    }
    // 'newest' is default order

    return sorted
  }, [reviews, filterBy, sortBy])

  const verifiedCount = reviews.filter((r) => r.verified).length

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Overall Rating */}
        <div className="flex flex-col items-center justify-center p-6 bg-muted rounded-lg">
          <div className="text-5xl font-bold text-foreground mb-2">
            {averageRating.toFixed(1)}
          </div>
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'h-5 w-5',
                  i < Math.floor(averageRating)
                    ? 'fill-warning text-warning'
                    : 'fill-muted-foreground/20 text-muted-foreground/20'
                )}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            {totalReviews.toLocaleString('vi-VN')} đánh giá
          </p>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {ratingDistribution.map(({ star, count, percentage }) => (
            <button
              key={star}
              onClick={() => setFilterBy(star.toString() as FilterOption)}
              className={cn(
                'w-full flex items-center gap-3 p-2 rounded-lg transition-colors',
                filterBy === star.toString() ? 'bg-muted' : 'hover:bg-muted/50'
              )}
            >
              <div className="flex items-center gap-1 w-16">
                <span className="text-sm font-medium">{star}</span>
                <Star className="h-3 w-3 fill-warning text-warning" />
              </div>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-warning transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground w-12 text-right">
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={filterBy === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterBy('all')}
            className="rounded-full"
          >
            Tất cả ({totalReviews})
          </Button>
          <Button
            variant={filterBy === 'verified' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterBy('verified')}
            className="rounded-full"
          >
            Đã mua hàng ({verifiedCount})
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sắp xếp:</span>
          <Button
            variant={sortBy === 'newest' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('newest')}
            className="rounded-full"
          >
            Mới nhất
          </Button>
          <Button
            variant={sortBy === 'helpful' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('helpful')}
            className="rounded-full"
          >
            Hữu ích nhất
          </Button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">
          {filteredAndSortedReviews.length} đánh giá
        </h3>
        {filteredAndSortedReviews.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Không có đánh giá nào</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAndSortedReviews.map((review) => (
              <div
                key={review.id}
                className="p-6 border border-border rounded-lg space-y-3"
              >
                {/* User & Rating */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground">
                        {review.userName}
                      </span>
                      {review.verified && (
                        <span className="text-xs px-2 py-0.5 bg-success/10 text-success rounded-full">
                          Đã mua hàng
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              'h-4 w-4',
                              i < Math.floor(review.rating)
                                ? 'fill-warning text-warning'
                                : 'fill-muted text-muted'
                            )}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {review.date}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Comment */}
                <p className="text-sm text-foreground leading-relaxed">
                  {review.comment}
                </p>

                {/* Helpful */}
                <div className="flex items-center gap-2 pt-2">
                  <Button variant="ghost" size="sm" className="h-8 gap-2 rounded-full">
                    <ThumbsUp className="h-3 w-3" />
                    <span className="text-xs">Hữu ích ({review.helpful})</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
