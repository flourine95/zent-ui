# Component Documentation

## Layout Components

### Header
**File:** `components/layout/header.tsx`  
**Type:** Client Component

Sticky navigation header with mobile and desktop layouts.

**Features:**
- Sticky positioning with backdrop blur
- Mobile hamburger menu
- Desktop navigation (Sản phẩm, Bộ sưu tập, Về chúng tôi)
- Search, theme toggle, account, cart icons
- Cart badge with item count
- Touch-optimized (44x44px minimum)

**Usage:**
```tsx
import { Header } from '@/components/layout/header'

<Header />
```

---

### Footer
**File:** `components/layout/footer.tsx`  
**Type:** Server Component

Comprehensive footer with links and trust indicators.

**Sections:**
- Brand info with social links
- Product categories
- Support links
- Contact information
- Trust badges (shipping, returns, COD)
- Copyright

**Usage:**
```tsx
import { Footer } from '@/components/layout/footer'

<Footer />
```

---

### Theme Toggle
**File:** `components/theme-toggle.tsx`  
**Type:** Client Component

Dark/light mode toggle with smooth transitions.

**Features:**
- Hydration-safe (prevents flash)
- Smooth icon transitions
- Accessible with aria-label
- Uses next-themes

**Usage:**
```tsx
import { ThemeToggle } from '@/components/theme-toggle'

<ThemeToggle />
```

---

## Product Components

### ProductCard (Compound Component)
**File:** `components/product/product-card.tsx`  
**Type:** Client Component

Flexible product card using compound component pattern.

**Sub-components:**
- `ProductCard.Provider` - Context provider
- `ProductCard.Frame` - Wrapper with hover effects
- `ProductCard.Image` - Image with badges
- `ProductCard.Content` - Content wrapper
- `ProductCard.Title` - Product name
- `ProductCard.Rating` - Star rating
- `ProductCard.Price` - Price display
- `ProductCard.AddToCart` - Add to cart button
- `ProductCard.Footer` - Layout for price + actions

**Props (Provider):**
```tsx
type ProductCardData = {
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
```

**Basic Usage:**
```tsx
<ProductCard.Provider product={productData}>
  <ProductCard.Frame href={`/products/${product.id}`}>
    <ProductCard.Image />
    <ProductCard.Content>
      <ProductCard.Title />
      <ProductCard.Rating />
      <ProductCard.Footer>
        <ProductCard.Price />
        <ProductCard.AddToCart onAddToCart={handleAddToCart} />
      </ProductCard.Footer>
    </ProductCard.Content>
  </ProductCard.Frame>
</ProductCard.Provider>
```

**Minimal Usage:**
```tsx
<ProductCard.Provider product={productData}>
  <ProductCard.Frame>
    <ProductCard.Image />
    <ProductCard.Content>
      <ProductCard.Title />
      <ProductCard.Price />
    </ProductCard.Content>
  </ProductCard.Frame>
</ProductCard.Provider>
```

**Custom Layout:**
```tsx
<ProductCard.Provider product={productData}>
  <ProductCard.Frame className="flex flex-row">
    <ProductCard.Image className="w-1/3" />
    <ProductCard.Content className="w-2/3">
      <ProductCard.Title />
      <ProductCard.Rating />
      <ProductCard.Price />
      <ProductCard.AddToCart />
    </ProductCard.Content>
  </ProductCard.Frame>
</ProductCard.Provider>
```

---

## Home Page Sections

### Hero Section
**File:** `components/home/hero-section.tsx`  
**Type:** Server Component

Large hero section with CTA buttons.

**Features:**
- Display typography
- Dual CTA buttons (primary + secondary)
- Trust indicators
- Decorative gradient background
- Mobile-responsive

**Usage:**
```tsx
import { HeroSection } from '@/components/home/hero-section'

<HeroSection />
```

---

### Features Section
**File:** `components/home/features-section.tsx`  
**Type:** Server Component

4-column feature grid with icons.

**Features:**
- Free shipping
- Easy returns
- Secure payment (COD)
- 24/7 support

**Usage:**
```tsx
import { FeaturesSection } from '@/components/home/features-section'

<FeaturesSection />
```

---

### Featured Products
**File:** `components/home/featured-products.tsx`  
**Type:** Client Component

Product grid with featured items.

**Props:**
```tsx
type FeaturedProductsProps = {
  products: ProductCardData[]
  onAddToCart?: (productId: string) => void
}
```

**Features:**
- Responsive grid (2/3/4 columns)
- Section header with "View all" link
- Uses ProductCard compound component
- Mobile "View all" button

**Usage:**
```tsx
import { FeaturedProducts } from '@/components/home/featured-products'

<FeaturedProducts 
  products={products} 
  onAddToCart={handleAddToCart} 
/>
```

---

### Categories Section
**File:** `components/home/categories-section.tsx`  
**Type:** Server Component

Category cards with images.

**Props:**
```tsx
type Category = {
  id: string
  name: string
  slug: string
  image: string
  productCount: number
}

type CategoriesSectionProps = {
  categories: Category[]
}
```

**Features:**
- Responsive grid (2/4 columns)
- Image overlay with gradient
- Product count display
- Links to filtered product pages

**Usage:**
```tsx
import { CategoriesSection } from '@/components/home/categories-section'

<CategoriesSection categories={categories} />
```

---

## Component Patterns

### Compound Components

ProductCard follows the compound component pattern from Vercel best practices:

**Benefits:**
- No boolean prop proliferation
- Explicit composition
- Flexible layouts
- Shared context via React 19 `use()` hook

**Pattern:**
```tsx
// Provider shares state
<Component.Provider value={data}>
  {/* Compose exactly what you need */}
  <Component.Frame>
    <Component.PartA />
    <Component.PartB />
  </Component.Frame>
</Component.Provider>
```

### Server vs Client Components

**Server Components (default):**
- HeroSection
- FeaturesSection
- CategoriesSection
- Footer

**Client Components ('use client'):**
- Header (interactive navigation)
- ThemeToggle (uses hooks)
- ProductCard (interactive, uses context)
- FeaturedProducts (event handlers)

### Styling Patterns

**Semantic Tokens:**
```tsx
// Use design system tokens
className="bg-accent text-accent-foreground"
className="text-muted-foreground"
className="border-border"
```

**Responsive:**
```tsx
// Mobile-first
className="text-h1-mobile md:text-h1"
className="px-4 md:px-6 lg:px-8"
className="grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
```

**Touch Targets:**
```tsx
// Minimum 44x44px
className="touch-target px-6 py-3"
className="min-h-[44px] min-w-[44px]"
```

**Transitions:**
```tsx
// Smooth hover effects
className="transition-colors duration-200 hover:bg-accent/90"
className="transition-shadow duration-200 hover:shadow-soft-hover"
className="transition-all duration-200 hover:-translate-y-0.5"
```

---

## Accessibility

All components follow WCAG AAA standards:

**Keyboard Navigation:**
- All interactive elements are keyboard accessible
- Focus states visible with outline-accent
- Logical tab order

**Touch Targets:**
- Minimum 44x44px on all buttons/links
- 8px spacing between touch targets
- `touch-action: manipulation` to remove tap delay

**ARIA:**
- Icon buttons have aria-label
- Images have alt text
- Semantic HTML (nav, header, footer, main)

**Motion:**
- Respects `prefers-reduced-motion`
- Smooth transitions (150-300ms)
- No infinite decorative animations

---

## Performance

**Images:**
- Next.js Image component with proper sizing
- Responsive sizes attribute
- Priority loading for above-fold images
- SVG placeholders (no external requests)

**Fonts:**
- `next/font` with display: swap
- Preconnect to Google Fonts
- Vietnamese subset optimization

**Code Splitting:**
- Client components marked with 'use client'
- Server components by default
- Ready for dynamic imports

---

## TypeScript

All components are fully typed:

**Props:**
```tsx
type ComponentProps = {
  required: string
  optional?: number
  children: ReactNode
  className?: string
}
```

**Strict Mode:**
- No `any` types
- Explicit return types
- Proper null checks

---

## Testing Checklist

Before using components in production:

- [ ] Test in light and dark modes
- [ ] Test at 375px, 768px, 1024px, 1440px
- [ ] Verify keyboard navigation
- [ ] Check touch target sizes (44x44px min)
- [ ] Verify Vietnamese characters render correctly
- [ ] Test with screen reader
- [ ] Check color contrast (4.5:1 min)
- [ ] Verify hover/focus states
- [ ] Test on iOS Safari and Chrome Mobile
- [ ] Check performance with Lighthouse

---

## Common Issues

**Hydration Mismatch:**
- ThemeToggle uses `mounted` state to prevent mismatch
- Always check for client-side only code

**Image Optimization:**
- Use Next.js Image component
- Provide proper sizes attribute
- Use priority for above-fold images

**Touch Targets:**
- Always use `touch-target` class or min-h-[44px]
- Add `cursor-pointer` to clickable elements
- Use `touch-spacing` (gap-2) between targets

**Dark Mode:**
- Test all components in both modes
- Use semantic tokens (bg-primary, text-foreground)
- Avoid hardcoded colors

---

## Future Enhancements

**ProductCard:**
- Quick view modal
- Wishlist button
- Size/color selector
- Compare functionality

**Header:**
- Mega menu for categories
- Search autocomplete
- Cart preview drawer
- User account dropdown

**Footer:**
- Newsletter signup
- Payment method logos
- Language selector
- Store locator

---

**Last Updated:** February 15, 2026  
**Version:** 1.0.0
