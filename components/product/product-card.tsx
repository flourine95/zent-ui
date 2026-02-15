'use client'

import { createContext, use, type ReactNode, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

// Product card context for compound components
type ProductCardContextValue = {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  hoverImage?: string
  rating?: number
  reviewCount?: number
  inStock: boolean
  freeShipping: boolean
  category?: string
  colors?: Array<{ name: string; value: string; hex: string }>
  sizes?: string[]
  badge?: string
  selectedColor?: string
  selectedSize?: string
  onColorSelect?: (colorValue: string) => void
  onSizeSelect?: (size: string) => void
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
    'group block overflow-hidden rounded-lg bg-card',
    'transition-all duration-300',
    'hover:shadow-lg',
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

// Image component with hover effect
type ProductCardImageProps = {
  className?: string
  priority?: boolean
}

function ProductCardImage({ className, priority = false }: ProductCardImageProps) {
  const product = use(ProductCardContext)
  const [isHovered, setIsHovered] = useState(false)
  
  if (!product) throw new Error('ProductCardImage must be used within ProductCard.Provider')

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div 
      className={cn('relative aspect-[3/4] overflow-hidden bg-muted', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Image */}
      <Image
        src={isHovered && product.hoverImage ? product.hoverImage : product.image}
        alt={product.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        priority={priority}
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />
      
      {/* Top Badge */}
      {product.badge && (
        <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-xs font-semibold">
          {product.badge}
        </div>
      )}
      
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
          -{discount}%
        </div>
      )}
      
      {/* Glass Overlay with Sizes - Show on hover */}
      {product.sizes && product.sizes.length > 0 && (
        <div className={cn(
          'absolute inset-x-0 bottom-0 h-2/5',
          'bg-gradient-to-t from-background/95 via-background/80 to-transparent backdrop-blur-sm',
          'flex flex-col items-center justify-end pb-4 px-3 gap-2',
          'transition-all duration-300',
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        )}>
          <p className="text-xs font-medium text-foreground">Thêm nhanh vào giỏ hàng</p>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  product.onSizeSelect?.(size)
                }}
                className={cn(
                  'px-3 py-1.5 border-2 rounded-full text-xs font-medium transition-all',
                  product.selectedSize === size
                    ? 'border-accent bg-accent text-accent-foreground'
                    : 'bg-background border-border hover:border-accent hover:bg-accent/10'
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Out of Stock Overlay */}
      {!product.inStock && (
        <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
          <span className="bg-muted text-muted-foreground px-4 py-2 rounded-full text-sm font-semibold">
            Hết hàng
          </span>
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
    <div className={cn('p-3 space-y-2', className)}>
      {children}
    </div>
  )
}

// Color swatches with tooltip
type ProductCardColorsProps = {
  className?: string
  max?: number
}

function ProductCardColors({ className, max = 5 }: ProductCardColorsProps) {
  const product = use(ProductCardContext)
  if (!product) throw new Error('ProductCardColors must be used within ProductCard.Provider')

  if (!product.colors || product.colors.length === 0) return null

  const displayColors = product.colors.slice(0, max)
  const remainingCount = product.colors.length - max

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      {displayColors.map((color) => (
        <button
          key={color.value}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            product.onColorSelect?.(color.value)
          }}
          className="relative group/color"
        >
          <div
            className={cn(
              'w-5 h-5 rounded-full transition-all',
              product.selectedColor === color.value
                ? 'border-[3px] border-accent scale-110'
                : 'border-2 border-border hover:border-muted-foreground hover:scale-110'
            )}
            style={{ backgroundColor: color.hex }}
          />
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-2 py-1 bg-foreground text-background text-xs rounded-full whitespace-nowrap opacity-0 group-hover/color:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg">
            {color.name}
          </div>
        </button>
      ))}
      {remainingCount > 0 && (
        <span className="text-xs text-muted-foreground">
          +{remainingCount}
        </span>
      )}
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
    <h3 className={cn('text-sm font-medium text-foreground line-clamp-2 leading-snug', className)}>
      {product.name}
    </h3>
  )
}

// Price component with discount
type ProductCardPriceProps = {
  className?: string
}

function ProductCardPrice({ className }: ProductCardPriceProps) {
  const product = use(ProductCardContext)
  if (!product) throw new Error('ProductCardPrice must be used within ProductCard.Provider')

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className={cn('flex items-center gap-2 flex-wrap', className)}>
      <span className="text-base font-bold text-foreground">
        {product.price.toLocaleString('vi-VN')}đ
      </span>
      {product.originalPrice && (
        <>
          <span className="text-sm text-muted-foreground line-through">
            {product.originalPrice.toLocaleString('vi-VN')}đ
          </span>
          {discount > 0 && (
            <span className="text-xs font-semibold text-destructive">
              -{discount}%
            </span>
          )}
        </>
      )}
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
  Colors: ProductCardColors,
  Price: ProductCardPrice,
}

// Export type for external use
export type { ProductCardContextValue as ProductCardData }
