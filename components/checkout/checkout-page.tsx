'use client'

import { useState, useMemo } from 'react'
import { useCartStore } from '@/lib/store/cart-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Package, Truck, CreditCard } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

type PaymentMethod = 'cod' | 'bank-transfer' | 'momo'
type ShippingMethod = 'standard' | 'express'

export function CheckoutPage() {
  const router = useRouter()
  const items = useCartStore((state) => state.items)
  const getTotalPrice = useCartStore((state) => state.getTotalPrice())
  const clearCart = useCartStore((state) => state.clearCart)

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod')
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>('standard')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const shippingFee = useMemo(() => {
    if (getTotalPrice >= 300000) return 0
    return shippingMethod === 'express' ? 50000 : 30000
  }, [getTotalPrice, shippingMethod])

  const totalAmount = getTotalPrice + shippingFee

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast.success('Đặt hàng thành công!', {
      description: 'Chúng tôi sẽ liên hệ với bạn sớm nhất.',
    })

    clearCart()
    setIsSubmitting(false)
    router.push('/')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-h2 mb-2">Giỏ hàng trống</h2>
          <p className="text-muted-foreground mb-6">
            Bạn chưa có sản phẩm nào để thanh toán
          </p>
          <Button asChild>
            <Link href="/products">Khám phá sản phẩm</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Tiếp tục mua sắm
          </Link>
          <h1 className="text-h1-mobile md:text-h1 mt-4">Thanh toán</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Info */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-h3 mb-4">Thông tin khách hàng</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Họ và tên *</Label>
                    <Input id="fullName" required placeholder="Nguyễn Văn A" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại *</Label>
                    <Input id="phone" type="tel" required placeholder="0912345678" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="email@example.com" />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-h3 mb-4">Địa chỉ giao hàng</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Địa chỉ *</Label>
                    <Input id="address" required placeholder="Số nhà, tên đường" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Tỉnh/Thành phố *</Label>
                      <Input id="city" required placeholder="Hà Nội" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="district">Quận/Huyện *</Label>
                      <Input id="district" required placeholder="Ba Đình" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ward">Phường/Xã *</Label>
                      <Input id="ward" required placeholder="Ngọc Hà" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="note">Ghi chú</Label>
                    <Input id="note" placeholder="Ghi chú thêm (tùy chọn)" />
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-h3 mb-4">Phương thức vận chuyển</h2>
                <RadioGroup value={shippingMethod} onValueChange={(value) => setShippingMethod(value as ShippingMethod)}>
                  <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Truck className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Giao hàng tiêu chuẩn</p>
                            <p className="text-sm text-muted-foreground">3-5 ngày làm việc</p>
                          </div>
                        </div>
                        <span className="font-semibold">
                          {getTotalPrice >= 300000 ? 'Miễn phí' : '30.000đ'}
                        </span>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Truck className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Giao hàng nhanh</p>
                            <p className="text-sm text-muted-foreground">1-2 ngày làm việc</p>
                          </div>
                        </div>
                        <span className="font-semibold">
                          {getTotalPrice >= 300000 ? 'Miễn phí' : '50.000đ'}
                        </span>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Payment Method */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-h3 mb-4">Phương thức thanh toán</h2>
                <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
                  <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Thanh toán khi nhận hàng (COD)</p>
                          <p className="text-sm text-muted-foreground">Thanh toán bằng tiền mặt khi nhận hàng</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                    <Label htmlFor="bank-transfer" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Chuyển khoản ngân hàng</p>
                          <p className="text-sm text-muted-foreground">Chuyển khoản trước khi giao hàng</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                <h2 className="text-h3 mb-4">Đơn hàng</h2>
                
                {/* Items */}
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-semibold">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                        {item.variant && (
                          <p className="text-xs text-muted-foreground">
                            {item.variant.size} • {item.variant.color}
                          </p>
                        )}
                        <p className="text-sm font-semibold text-accent mt-1">
                          {item.price.toLocaleString('vi-VN')}đ
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                {/* Summary */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tạm tính</span>
                    <span className="font-medium">{getTotalPrice.toLocaleString('vi-VN')}đ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phí vận chuyển</span>
                    <span className="font-medium">
                      {shippingFee === 0 ? 'Miễn phí' : `${shippingFee.toLocaleString('vi-VN')}đ`}
                    </span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold">Tổng cộng</span>
                  <span className="text-xl font-bold text-accent">
                    {totalAmount.toLocaleString('vi-VN')}đ
                  </span>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? 'Đang xử lý...' : 'Đặt hàng'}
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Bằng cách đặt hàng, bạn đồng ý với{' '}
                  <Link href="/terms" className="text-accent hover:underline">
                    Điều khoản dịch vụ
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
