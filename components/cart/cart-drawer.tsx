'use client'

import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/lib/store/cart-store'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

type CartDrawerProps = {
  children?: React.ReactNode
}

export function CartDrawer({ children }: CartDrawerProps) {
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const getTotalPrice = useCartStore((state) => state.getTotalPrice())
  const getTotalItems = useCartStore((state) => state.getTotalItems())

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children || (
          <button
            className="touch-target flex items-center justify-center cursor-pointer hover:text-accent transition-colors relative"
            aria-label="Giỏ hàng"
          >
            <ShoppingCart className="h-5 w-5" />
            {getTotalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                {getTotalItems > 9 ? '9+' : getTotalItems}
              </span>
            )}
          </button>
        )}
      </SheetTrigger>

      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Giỏ hàng ({getTotalItems} sản phẩm)
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
                >
                  {/* Image */}
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col">
                    <h3 className="text-sm font-medium line-clamp-2 mb-1 text-foreground">
                      {item.name}
                    </h3>
                    
                    {/* Variants */}
                    {item.variant && (
                      <div className="flex items-center gap-2 mb-2">
                        {item.variant.size && (
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                            {item.variant.size}
                          </span>
                        )}
                        {item.variant.color && (
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                            {item.variant.color}
                          </span>
                        )}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mt-auto">
                      <p className="text-sm font-semibold text-accent">
                        {item.price.toLocaleString('vi-VN')}đ
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            if (item.quantity === 1) {
                              removeItem(item.id)
                            } else {
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          }}
                          className="flex items-center justify-center w-8 h-8 rounded-full border border-border hover:bg-muted active:scale-95 transition-all cursor-pointer"
                          aria-label="Giảm số lượng"
                        >
                          {item.quantity === 1 ? (
                            <Trash2 className="h-3.5 w-3.5 text-destructive" />
                          ) : (
                            <Minus className="h-3.5 w-3.5" />
                          )}
                        </button>

                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex items-center justify-center w-8 h-8 rounded-full border border-border hover:bg-muted active:scale-95 transition-all cursor-pointer"
                          aria-label="Tăng số lượng"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-destructive/10 hover:text-destructive active:scale-95 transition-all cursor-pointer self-start"
                    aria-label="Xóa sản phẩm"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-border pt-4 space-y-3">
              {/* Subtotal */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Tạm tính</span>
                <span className="text-lg font-bold text-foreground">
                  {getTotalPrice.toLocaleString('vi-VN')}đ
                </span>
              </div>

              {/* Free Shipping Progress */}
              {getTotalPrice < 300000 ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Miễn phí vận chuyển</span>
                    <span className="font-medium text-foreground">
                      {getTotalPrice.toLocaleString('vi-VN')} / 300.000đ
                    </span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent transition-all duration-300"
                      style={{ width: `${Math.min((getTotalPrice / 300000) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Mua thêm <span className="font-semibold text-foreground">{(300000 - getTotalPrice).toLocaleString('vi-VN')}đ</span> để được miễn phí ship
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs text-success bg-success/10 px-3 py-2 rounded-lg">
                  <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium">Đơn hàng được miễn phí vận chuyển</span>
                </div>
              )}

              {/* Checkout Button */}
              <Button
                asChild
                className="w-full"
                size="lg"
              >
                <Link href="/checkout">
                  Thanh toán • {getTotalPrice.toLocaleString('vi-VN')}đ
                </Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

function EmptyCart() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
        <ShoppingCart className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Giỏ hàng trống</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm">
        Bạn chưa có sản phẩm nào trong giỏ hàng. Khám phá các sản phẩm tuyệt vời của chúng tôi!
      </p>
      <Button asChild>
        <Link href="/products">
          Khám phá sản phẩm
        </Link>
      </Button>
    </div>
  )
}
