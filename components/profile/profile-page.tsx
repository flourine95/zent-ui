'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { User, Package, MapPin, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

type Tab = 'info' | 'orders' | 'addresses' | 'settings'

type Order = {
  id: string
  date: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  items: number
}

type Address = {
  id: string
  name: string
  phone: string
  address: string
  city: string
  district: string
  ward: string
  isDefault: boolean
}

const mockOrders: Order[] = [
  { id: 'ORD-001', date: '2024-02-20', status: 'delivered', total: 850000, items: 2 },
  { id: 'ORD-002', date: '2024-02-15', status: 'shipped', total: 450000, items: 1 },
  { id: 'ORD-003', date: '2024-02-10', status: 'processing', total: 1200000, items: 3 },
]

const mockAddresses: Address[] = [
  {
    id: 'ADDR-001',
    name: 'Nguyễn Văn A',
    phone: '0912345678',
    address: '123 Đường ABC',
    city: 'Hà Nội',
    district: 'Ba Đình',
    ward: 'Ngọc Hà',
    isDefault: true,
  },
]

const statusLabels: Record<Order['status'], string> = {
  pending: 'Chờ xác nhận',
  processing: 'Đang xử lý',
  shipped: 'Đang giao',
  delivered: 'Đã giao',
  cancelled: 'Đã hủy',
}

const statusColors: Record<Order['status'], string> = {
  pending: 'bg-warning/10 text-warning',
  processing: 'bg-accent/10 text-accent-foreground',
  shipped: 'bg-accent/20 text-accent-foreground',
  delivered: 'bg-success/10 text-success',
  cancelled: 'bg-destructive/10 text-destructive',
}

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>('info')

  const tabs = useMemo(
    () => [
      { id: 'info' as Tab, label: 'Thông tin cá nhân', icon: User },
      { id: 'orders' as Tab, label: 'Đơn hàng', icon: Package },
      { id: 'addresses' as Tab, label: 'Địa chỉ', icon: MapPin },
      { id: 'settings' as Tab, label: 'Cài đặt', icon: Settings },
    ],
    []
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <h1 className="text-h1-mobile md:text-h1">Tài khoản</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Quản lý thông tin và đơn hàng của bạn
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors border-l-2',
                      activeTab === tab.id
                        ? 'border-accent text-foreground bg-muted/50'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="flex-1 text-left">{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'info' && <InfoTab />}
            {activeTab === 'orders' && <OrdersTab orders={mockOrders} />}
            {activeTab === 'addresses' && <AddressesTab addresses={mockAddresses} />}
            {activeTab === 'settings' && <SettingsTab />}
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoTab() {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-h3 mb-6">Thông tin cá nhân</h2>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Họ và tên</Label>
            <Input id="fullName" defaultValue="Nguyễn Văn A" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Số điện thoại</Label>
            <Input id="phone" type="tel" defaultValue="0912345678" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" defaultValue="nguyenvana@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="birthday">Ngày sinh</Label>
          <Input id="birthday" type="date" />
        </div>
        <Separator />
        <div className="flex justify-end gap-3">
          <Button variant="outline">Hủy</Button>
          <Button>Lưu thay đổi</Button>
        </div>
      </form>
    </div>
  )
}

function OrdersTab({ orders }: { orders: Order[] }) {
  return (
    <div className="space-y-4">
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-h3 mb-6">Đơn hàng của bạn</h2>
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Bạn chưa có đơn hàng nào</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold">{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.date).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                  <span
                    className={cn(
                      'px-3 py-1 rounded-full text-xs font-medium',
                      statusColors[order.status]
                    )}
                  >
                    {statusLabels[order.status]}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {order.items} sản phẩm
                  </p>
                  <p className="font-semibold text-accent">
                    {order.total.toLocaleString('vi-VN')}đ
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function AddressesTab({ addresses }: { addresses: Address[] }) {
  return (
    <div className="space-y-4">
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-h3">Địa chỉ giao hàng</h2>
          <Button size="sm">Thêm địa chỉ</Button>
        </div>
        {addresses.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-4">Bạn chưa có địa chỉ nào</p>
            <Button>Thêm địa chỉ mới</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="border border-border rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold">{address.name}</p>
                      {address.isDefault && (
                        <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-full font-medium">
                          Mặc định
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{address.phone}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Sửa
                  </Button>
                </div>
                <p className="text-sm">
                  {address.address}, {address.ward}, {address.district}, {address.city}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function SettingsTab() {
  const [orderNotifications, setOrderNotifications] = useState(true)
  const [promotionNotifications, setPromotionNotifications] = useState(true)

  return (
    <div className="space-y-4">
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-h3 mb-6">Đổi mật khẩu</h2>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
            <Input id="currentPassword" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">Mật khẩu mới</Label>
            <Input id="newPassword" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
            <Input id="confirmPassword" type="password" />
          </div>
          <Separator />
          <div className="flex justify-end gap-3">
            <Button variant="outline">Hủy</Button>
            <Button>Đổi mật khẩu</Button>
          </div>
        </form>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-h3 mb-4">Thông báo</h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <Label htmlFor="order-notifications" className="font-medium cursor-pointer">
                Email thông báo đơn hàng
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Nhận thông báo về trạng thái đơn hàng
              </p>
            </div>
            <Switch
              id="order-notifications"
              checked={orderNotifications}
              onCheckedChange={setOrderNotifications}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <Label htmlFor="promotion-notifications" className="font-medium cursor-pointer">
                Email khuyến mãi
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Nhận thông tin về ưu đãi và sản phẩm mới
              </p>
            </div>
            <Switch
              id="promotion-notifications"
              checked={promotionNotifications}
              onCheckedChange={setPromotionNotifications}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
