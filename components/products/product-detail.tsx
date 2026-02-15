'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/lib/store/cart-store'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Star, ShoppingCart, Truck, RefreshCw, Shield, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type Color = {
  name: string
  value: string
  hex: string
}

type Product = {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  images: string[]
  rating: number
  reviewCount: number
  inStock: boolean
  freeShipping: boolean
  description: string
  features: string[]
  sizes: string[]
  colors: Color[]
}

type ProductDetailClientProps = {
  product: Product
}

export function ProductDetail({ product }: ProductDetailClientProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<Color>(product.colors[0])
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Vui lòng chọn size')
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      variant: {
        size: selectedSize,
        color: selectedColor.name,
      },
    })

    toast.success('Đã thêm vào giỏ hàng', {
      description: `${product.name} - ${selectedColor.name} / ${selectedSize}`,
    })
  }

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Quay lại sản phẩm
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted group">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover cursor-zoom-in"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                onClick={() => setIsPreviewOpen(true)}
              />
              {discount > 0 && (
                <div className="absolute top-4 right-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  -{discount}%
                </div>
              )}
              
              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                    aria-label="Ảnh trước"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                    aria-label="Ảnh tiếp theo"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
              
              {/* Image Counter */}
              {product.images.length > 1 && (
                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium">
                  {selectedImage + 1} / {product.images.length}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={cn(
                    'relative aspect-square overflow-hidden rounded-lg bg-muted transition-all',
                    selectedImage === idx
                      ? 'border-[3px] border-accent'
                      : 'border-2 border-transparent hover:border-border'
                  )}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Image Preview Modal */}
          {isPreviewOpen && (
            <div 
              className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setIsPreviewOpen(false)}
            >
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:bg-muted transition-colors"
                aria-label="Đóng"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="relative w-full max-w-4xl aspect-square" onClick={(e) => e.stopPropagation()}>
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
                
                {/* Navigation in Preview */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePrevImage()
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center hover:bg-muted transition-colors"
                      aria-label="Ảnh trước"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleNextImage()
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center hover:bg-muted transition-colors"
                      aria-label="Ảnh tiếp theo"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                    
                    {/* Counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-background border border-border text-sm font-medium">
                      {selectedImage + 1} / {product.images.length}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title & Rating */}
            <div>
              <h1 className="text-h1-mobile md:text-h1 text-foreground mb-3">
                {product.name}
              </h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'h-5 w-5',
                        i < Math.floor(product.rating)
                          ? 'fill-warning text-warning'
                          : 'fill-muted text-muted'
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount.toLocaleString('vi-VN')} đánh giá)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-foreground">
                {product.price.toLocaleString('vi-VN')}đ
              </span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {product.originalPrice.toLocaleString('vi-VN')}đ
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Color Selector */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Màu sắc: <span className="font-normal text-muted-foreground">{selectedColor.name}</span>
              </h3>
              <div className="flex items-center gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      'w-10 h-10 rounded-full transition-all',
                      selectedColor.value === color.value
                        ? 'border-[3px] border-accent scale-110'
                        : 'border-2 border-border hover:border-muted-foreground'
                    )}
                    style={{ backgroundColor: color.hex }}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Kích thước: {selectedSize && <span className="font-normal text-muted-foreground">{selectedSize}</span>}
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      'min-w-[3rem] px-4 py-2 rounded-full border-2 text-sm font-medium transition-all',
                      selectedSize === size
                        ? 'border-accent bg-accent text-accent-foreground'
                        : 'border-border hover:border-muted-foreground'
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Số lượng</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full border border-border hover:bg-muted transition-colors flex items-center justify-center"
                  aria-label="Giảm số lượng"
                >
                  -
                </button>
                <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full border border-border hover:bg-muted transition-colors flex items-center justify-center"
                  aria-label="Tăng số lượng"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-5 w-5" />
                {product.inStock ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                Mua ngay
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                  <Truck className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Miễn phí vận chuyển</p>
                  <p className="text-xs text-muted-foreground">Đơn từ 300k</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Đổi trả dễ dàng</p>
                  <p className="text-xs text-muted-foreground">Trong 30 ngày</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Thanh toán COD</p>
                  <p className="text-xs text-muted-foreground">An toàn, tiện lợi</p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="pt-6 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground mb-3">Thông tin sản phẩm</h3>
              <ul className="space-y-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-accent mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
