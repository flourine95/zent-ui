# State Management - Zustand

## Tổng quan

Zent UI sử dụng **Zustand** để quản lý state toàn cục (global state). Zustand được chọn vì:

✅ **Nhẹ** - Chỉ ~1KB (gzipped)  
✅ **Đơn giản** - API rất dễ hiểu, không boilerplate  
✅ **TypeScript** - Type-safe 100%  
✅ **Performance** - Không re-render không cần thiết  
✅ **DevTools** - Hỗ trợ Redux DevTools  
✅ **Persist** - Built-in localStorage/sessionStorage  

---

## Cài đặt

```bash
pnpm add zustand
```

---

## Cart Store

### File: `lib/store/cart-store.ts`

Store quản lý giỏ hàng với localStorage persistence.

### Types

```typescript
export type CartItem = {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

type CartStore = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}
```

### Features

**Persist to localStorage:**
- Key: `cart-storage`
- Tự động save/load khi refresh page
- Hydration-safe (không bị flash)

**Auto-merge items:**
- Nếu thêm sản phẩm đã có → tăng quantity
- Nếu sản phẩm mới → thêm vào array

---

## Cách sử dụng

### 1. Thêm sản phẩm vào giỏ

```tsx
'use client'

import { useCartStore } from '@/lib/store/cart-store'

function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  return (
    <button onClick={handleAddToCart}>
      Thêm vào giỏ
    </button>
  )
}
```

### 2. Hiển thị số lượng items

```tsx
'use client'

import { useCartStore } from '@/lib/store/cart-store'

function CartBadge() {
  const totalItems = useCartStore((state) => state.getTotalItems())

  return (
    <span className="badge">
      {totalItems}
    </span>
  )
}
```

### 3. Hiển thị danh sách giỏ hàng

```tsx
'use client'

import { useCartStore } from '@/lib/store/cart-store'

function CartDrawer() {
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const getTotalPrice = useCartStore((state) => state.getTotalPrice())

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.price.toLocaleString('vi-VN')}đ</p>
          
          {/* Quantity controls */}
          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
            -
          </button>
          <span>{item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
            +
          </button>
          
          {/* Remove button */}
          <button onClick={() => removeItem(item.id)}>
            Xóa
          </button>
        </div>
      ))}
      
      <div>
        Tổng: {getTotalPrice.toLocaleString('vi-VN')}đ
      </div>
    </div>
  )
}
```

### 4. Xóa toàn bộ giỏ hàng

```tsx
'use client'

import { useCartStore } from '@/lib/store/cart-store'

function CheckoutPage() {
  const clearCart = useCartStore((state) => state.clearCart)

  const handleCheckout = async () => {
    // Process payment...
    
    // Clear cart after successful payment
    clearCart()
  }

  return (
    <button onClick={handleCheckout}>
      Thanh toán
    </button>
  )
}
```

---

## Selector Pattern (Performance)

### ❌ Không tốt - Re-render khi bất kỳ state nào thay đổi

```tsx
function Component() {
  const store = useCartStore() // Subscribe to entire store
  return <div>{store.items.length}</div>
}
```

### ✅ Tốt - Chỉ re-render khi items thay đổi

```tsx
function Component() {
  const items = useCartStore((state) => state.items) // Subscribe to items only
  return <div>{items.length}</div>
}
```

### ✅ Tốt hơn - Chỉ re-render khi length thay đổi

```tsx
function Component() {
  const itemCount = useCartStore((state) => state.items.length)
  return <div>{itemCount}</div>
}
```

### ✅ Tốt nhất - Dùng computed value

```tsx
function Component() {
  const totalItems = useCartStore((state) => state.getTotalItems())
  return <div>{totalItems}</div>
}
```

---

## Multiple Stores

Zustand khuyến khích tạo nhiều stores nhỏ thay vì 1 store lớn.

### User Store

```typescript
// lib/store/user-store.ts
import { create } from 'zustand'

type User = {
  id: string
  name: string
  email: string
}

type UserStore = {
  user: User | null
  setUser: (user: User) => void
  logout: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}))
```

### Wishlist Store

```typescript
// lib/store/wishlist-store.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type WishlistStore = {
  items: string[] // Product IDs
  addItem: (id: string) => void
  removeItem: (id: string) => void
  isInWishlist: (id: string) => boolean
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (id) =>
        set((state) => ({
          items: state.items.includes(id) ? state.items : [...state.items, id],
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item !== id),
        })),
      isInWishlist: (id) => get().items.includes(id),
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
```

---

## DevTools

Để debug Zustand store với Redux DevTools:

```typescript
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set, get) => ({
        // ... store implementation
      }),
      { name: 'cart-storage' }
    ),
    { name: 'CartStore' } // Tên hiển thị trong DevTools
  )
)
```

---

## Server Components vs Client Components

### ❌ Không thể dùng Zustand trong Server Components

```tsx
// app/page.tsx (Server Component)
import { useCartStore } from '@/lib/store/cart-store'

export default function Page() {
  const items = useCartStore((state) => state.items) // ❌ Error!
  return <div>{items.length}</div>
}
```

### ✅ Phải dùng trong Client Components

```tsx
// components/cart-badge.tsx
'use client'

import { useCartStore } from '@/lib/store/cart-store'

export function CartBadge() {
  const totalItems = useCartStore((state) => state.getTotalItems())
  return <span>{totalItems}</span>
}
```

```tsx
// app/page.tsx (Server Component)
import { CartBadge } from '@/components/cart-badge'

export default function Page() {
  return (
    <div>
      <CartBadge /> {/* ✅ OK */}
    </div>
  )
}
```

---

## So sánh với các giải pháp khác

### Zustand vs Redux Toolkit

| Feature | Zustand | Redux Toolkit |
|---------|---------|---------------|
| Bundle size | ~1KB | ~12KB |
| Boilerplate | Rất ít | Trung bình |
| Learning curve | Dễ | Khó |
| TypeScript | Tốt | Tốt |
| DevTools | Có | Có |
| Middleware | Có | Có |
| **Recommend** | ✅ Cho app nhỏ/vừa | Cho app lớn, phức tạp |

### Zustand vs React Context

| Feature | Zustand | React Context |
|---------|---------|---------------|
| Performance | Tốt (selector) | Kém (re-render toàn bộ) |
| Boilerplate | Ít | Nhiều (Provider, Consumer) |
| Persist | Built-in | Phải tự implement |
| DevTools | Có | Không |
| **Recommend** | ✅ Cho global state | Cho component state |

### Zustand vs Jotai/Recoil

| Feature | Zustand | Jotai/Recoil |
|---------|---------|--------------|
| Approach | Store-based | Atom-based |
| Learning curve | Dễ | Trung bình |
| Bundle size | ~1KB | ~3KB |
| Community | Lớn | Nhỏ hơn |
| **Recommend** | ✅ Đơn giản hơn | Cho derived state phức tạp |

---

## Best Practices

### 1. Tách stores theo domain

```
lib/store/
  cart-store.ts      # Cart logic
  user-store.ts      # User authentication
  wishlist-store.ts  # Wishlist
  ui-store.ts        # UI state (modals, drawers)
```

### 2. Dùng selectors

```tsx
// ❌ Bad
const store = useCartStore()

// ✅ Good
const items = useCartStore((state) => state.items)
```

### 3. Computed values trong store

```typescript
// ✅ Good - Computed trong store
getTotalPrice: () => {
  const state = get()
  return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
}

// ❌ Bad - Computed trong component
const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)
```

### 4. Actions nên pure functions

```typescript
// ✅ Good
addItem: (item) => set((state) => ({
  items: [...state.items, item]
}))

// ❌ Bad - Side effects
addItem: (item) => {
  console.log('Adding item') // Side effect
  fetch('/api/cart', { method: 'POST' }) // Side effect
  set((state) => ({ items: [...state.items, item] }))
}
```

### 5. Async actions

```typescript
type CartStore = {
  items: CartItem[]
  isLoading: boolean
  error: string | null
  fetchCart: () => Promise<void>
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  isLoading: false,
  error: null,
  
  fetchCart: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('/api/cart')
      const data = await response.json()
      set({ items: data.items, isLoading: false })
    } catch (error) {
      set({ error: error.message, isLoading: false })
    }
  },
}))
```

---

## Testing

```typescript
import { renderHook, act } from '@testing-library/react'
import { useCartStore } from '@/lib/store/cart-store'

describe('CartStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useCartStore.setState({ items: [] })
  })

  it('should add item to cart', () => {
    const { result } = renderHook(() => useCartStore())
    
    act(() => {
      result.current.addItem({
        id: '1',
        name: 'Test Product',
        price: 100000,
        image: '/test.jpg',
        quantity: 1,
      })
    })
    
    expect(result.current.items).toHaveLength(1)
    expect(result.current.getTotalItems()).toBe(1)
  })

  it('should merge items with same id', () => {
    const { result } = renderHook(() => useCartStore())
    
    const item = {
      id: '1',
      name: 'Test Product',
      price: 100000,
      image: '/test.jpg',
      quantity: 1,
    }
    
    act(() => {
      result.current.addItem(item)
      result.current.addItem(item)
    })
    
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(2)
  })
})
```

---

## Migration từ Context API

### Before (Context API)

```tsx
// context/cart-context.tsx
const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState<CartItem[]>([])
  
  const addItem = (item: CartItem) => {
    setItems((prev) => [...prev, item])
  }
  
  return (
    <CartContext.Provider value={{ items, addItem }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
```

### After (Zustand)

```tsx
// lib/store/cart-store.ts
import { create } from 'zustand'

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
}))
```

**Lợi ích:**
- Không cần Provider wrapper
- Không re-render toàn bộ tree
- Ít code hơn
- Type-safe hơn

---

## Resources

- **Docs:** https://zustand.docs.pmnd.rs/
- **GitHub:** https://github.com/pmndrs/zustand
- **Examples:** https://github.com/pmndrs/zustand/tree/main/examples

---

**Last Updated:** February 15, 2026  
**Version:** 1.0.0
