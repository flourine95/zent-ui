'use client'

import { createContext, use, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

// Product card context for compound components
type ProductCardContextValue = {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating?: number
  reviewCount?: number
  inStock: boolean
  freeShipping: boolean
}

const ProductCardContext = createContext<ProductCardContextValue | null>(null)

// Provider component
type ProductCardProviderProps = {
  children: ReactNode
  product: ProductCardContextValue
}

function ProductCardProvider({ children, product }: ProductCardProviderProps) {
  return (
    <ProductCardContext value={product}>
      {children}
    </ProductCardContext>
  )
}

// Frame component
type ProductCardFrameProps = {
  children: ReactNode
  className?: string
  href?: string
}

function ProductCardFrame({ children, className, href }: ProductCardFrameProps) {
  const baseClasses = cn(
    'group cursor-pointer rounded-lg border border-border bg-card p-4',
    'shadow-soft hover:shadow-soft-hover',
    'transition-smooth',
    'hover:-translate-y-0.5 hover:border-primary',
    'focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2',
    className
  )

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    )
  }

  return <div className={baseClasses}>{children}</div>
}

// Image component
type ProductCardImageProps = {
  className?: string
  priority?: boolean
}

function ProductCardImage({ className, priority = false }: ProductCardImageProps) {
  const product = use(ProductCardContext)
  if (!product) throw new Error('ProductCardImage must be used within ProductCard.Provider')

  return (
    <div className={cn('relative aspect-square overflow-hidden rounded-lg mb-4', className)}>
      <Image
        src={product.image}
        alt={product.name}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        priority={priority}
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />
      {product.freeShipping && (
        <div className="absolute top-2 right-2 badge-success">
          Miễn phí ship
        </div>
      )}
      {!product.inStock && (
        <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
          <span className="badge-muted">Hết hàng</span>
        </div>
      )}
    </div>
  )
}

// Content wrapper
type ProductCardContentProps = {
  children: ReactNode
  className?: string
}

function ProductCardContent({ children, className }: ProductCardContentProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {children}
    </div>
  )
}

// Title component
type ProductCardTitleProps = {
  className?: string
}

function ProductCardTitle({ className }: ProductCardTitleProps) {
  const product = use(ProductCardContext)
  if (!product) throw new Error('ProductCardTitle must be used within ProductCard.Provider')

  return (
    <h3 className={cn('text-h3-mobile md:text-h3 line-clamp-2 text-foreground', className)}>
      {product.name}
    </h3>
  )
}

// Rating component
type ProductCardRatingProps = {
  className?: string
}

function ProductCardRating({ className }: ProductCardRatingProps) {
  const product = use(ProductCardContext)
  if (!product) throw new Error('ProductCardRating must be used within ProductCard.Provider')

  if (!product.rating || !product.reviewCount) return null

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              'h-4 w-4',
              i < Math.floor(product.rating!)
                ? 'fill-warning text-warning'
                : 'fill-muted text-muted'
            )}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">
        ({product.reviewCount.toLocaleString('vi-VN')} đánh giá)
      </span>
    </div>
  )
}

// Price component
type ProductCardPriceProps = {
  className?: string
}

function ProductCardPrice({ className }: ProductCardPriceProps) {
  const product = use(ProductCardContext)
  if (!product) throw new Error('ProductCardPrice must be used within ProductCard.Provider')

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="text-price-mobile md:text-price text-foreground">
        {product.price.toLocaleString('vi-VN')}đ
      </span>
      {product.originalPrice && product.originalPrice > product.price && (
        <span className="text-sm text-muted-foreground line-through">
          {product.originalPrice.toLocaleString('vi-VN')}đ
        </span>
      )}
    </div>
  )
}

// Add to cart button
type ProductCardAddToCartProps = {
  className?: string
  onAddToCart?: (productId: string) => void
  compact?: boolean
}

function ProductCardAddToCart({ className, onAddToCart, compact = false }: ProductCardAddToCartProps) {
  const product = use(ProductCardContext)
  if (!product) throw new Error('ProductCardAddToCart must be used within ProductCard.Provider')

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onAddToCart?.(product.id)
  }

  if (compact) {
    return (
      <button
        onClick={handleClick}
        disabled={!product.inStock}
        className={cn(
          'flex items-center justify-center w-10 h-10',
          'bg-accent text-accent-foreground',
          'rounded-full shadow-sm',
          'transition-all',
          'hover:bg-accent/90 active:scale-95',
          'focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2',
          'disabled:opacity-60 disabled:cursor-not-allowed',
          'cursor-pointer',
          className
        )}
        aria-label={`Thêm ${product.name} vào giỏ hàng`}
      >
        <ShoppingCart className="h-4 w-4" />
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      disabled={!product.inStock}
      className={cn(
        'h-10 px-6',
        'bg-accent text-accent-foreground',
        'rounded-full shadow-sm',
        'transition-all',
        'hover:bg-accent/90 active:scale-95',
        'focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2',
        'disabled:opacity-60 disabled:cursor-not-allowed',
        'flex items-center justify-center gap-2',
        'cursor-pointer',
        className
      )}
      aria-label={`Thêm ${product.name} vào giỏ hàng`}
    >
      <ShoppingCart className="h-4 w-4" />
      <span className="text-sm font-medium">Thêm</span>
    </button>
  )
}

// Footer component for price and actions
type ProductCardFooterProps = {
  children: ReactNode
  className?: string
}

function ProductCardFooter({ children, className }: ProductCardFooterProps) {
  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      {children}
    </div>
  )
}

// Export as compound component
export const ProductCard = {
  Provider: ProductCardProvider,
  Frame: ProductCardFrame,
  Image: ProductCardImage,
  Content: ProductCardContent,
  Title: ProductCardTitle,
  Rating: ProductCardRating,
  Price: ProductCardPrice,
  AddToCart: ProductCardAddToCart,
  Footer: ProductCardFooter,
}

// Export type for external use
export type { ProductCardContextValue as ProductCardData }
