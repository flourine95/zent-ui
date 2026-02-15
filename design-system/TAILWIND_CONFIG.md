# Tailwind CSS 4.x Configuration Guide
## Men's Fashion Vietnam - Zent UI

This document explains the Tailwind CSS 4.x configuration implemented in `app/globals.css` based on the design system.

---

## Overview

Tailwind CSS 4.x uses a CSS-first configuration approach. All configuration is done directly in CSS using the `@theme inline` directive, eliminating the need for a separate `tailwind.config.js` file.

**Key Features:**
- OKLCH color space for better perceptual uniformity
- Vietnamese-optimized typography (Be Vietnam Pro + Noto Sans)
- Mobile-first design with touch-optimized utilities
- Full light/dark mode support via next-themes
- Design system tokens mapped to Tailwind utilities

---

## File Structure

```
app/
  globals.css          # Main configuration file
design-system/
  MASTER.md           # Complete design system
  TAILWIND_CONFIG.md  # This file
```

---

## Color System

### Semantic Color Tokens

All colors use OKLCH format for consistent perceptual brightness across hues.

#### Light Mode
```css
--primary: oklch(0.15 0 0)              /* Deep black #171717 */
--secondary: oklch(0.30 0 0)            /* Charcoal gray #404040 */
--accent: oklch(0.72 0.12 85)           /* Premium gold #D4AF37 */
--background: oklch(1 0 0)              /* Pure white #FFFFFF */
--foreground: oklch(0.15 0 0)           /* Deep black #171717 */
--muted: oklch(0.95 0 0)                /* Light gray #F5F5F5 */
--border: oklch(0.90 0 0)               /* Border gray #E5E5E5 */
--success: oklch(0.60 0.15 145)         /* Green #16A34A */
--warning: oklch(0.70 0.15 75)          /* Amber #F59E0B */
--destructive: oklch(0.55 0.22 25)      /* Red #DC2626 */
```

#### Dark Mode
```css
--primary: oklch(0.95 0 0)              /* Light gray #F5F5F5 */
--secondary: oklch(0.70 0 0)            /* Medium gray #A3A3A3 */
--accent: oklch(0.75 0.10 85)           /* Softer gold #E5C158 */
--background: oklch(0.12 0 0)           /* Near black #0A0A0A */
--foreground: oklch(0.95 0 0)           /* Light gray #F5F5F5 */
--muted: oklch(0.20 0 0)                /* Dark gray #262626 */
--border: oklch(0.25 0 0)               /* Border gray #404040 */
```

### Usage in Components

```tsx
// Use semantic tokens directly
<div className="bg-primary text-primary-foreground">
  Primary button
</div>

<div className="bg-accent text-accent-foreground">
  CTA button (Gold)
</div>

<div className="bg-card border-border">
  Product card
</div>

<span className="text-muted-foreground">
  Secondary text
</span>
```

### E-commerce Specific Colors

```tsx
// Success - Free shipping, In stock
<span className="badge-success">Miễn phí ship</span>

// Warning - COD, Low stock
<span className="badge-warning">Thanh toán khi nhận hàng</span>

// Destructive - Out of stock, Errors
<span className="text-destructive">Hết hàng</span>
```

---

## Typography System

### Font Families

```css
--font-heading: 'Be Vietnam Pro'  /* Headings, product names */
--font-body: 'Noto Sans'          /* Body text, descriptions */
--font-mono: 'JetBrains Mono'     /* Code, SKUs */
```

**Vietnamese Character Support:** ✓ ă ơ ư â ê ô đ Ă Ơ Ư Â Ê Ô Đ

### Loading Fonts

Add to `app/layout.tsx`:

```tsx
import { Be_Vietnam_Pro, Noto_Sans } from 'next/font/google'

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['vietnamese', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

const notoSans = Noto_Sans({
  subsets: ['vietnamese', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={`${beVietnamPro.variable} ${notoSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

### Typography Utilities

```tsx
// Display - Hero headlines
<h1 className="text-display md:text-display">
  Thời trang nam tối giản
</h1>

// H1 - Page titles
<h1 className="text-h1-mobile md:text-h1">
  Bộ sưu tập mới
</h1>

// H2 - Section headers
<h2 className="text-h2-mobile md:text-h2">
  Sản phẩm nổi bật
</h2>

// H3 - Product names
<h3 className="text-h3-mobile md:text-h3">
  Áo thun nam basic
</h3>

// Body text
<p className="text-base">
  Cotton 100%, thoáng mát, thấm hút mồ hôi tốt
</p>

// Large body
<p className="text-body-lg">
  Miễn phí vận chuyển cho đơn hàng từ 300.000đ
</p>

// Small text
<span className="text-sm text-muted-foreground">
  Còn 5 sản phẩm
</span>

// Price
<span className="text-price-mobile md:text-price">
  299.000đ
</span>
```

---

## Spacing System

### Base Unit: 8px

```
p-1  = 4px   | gap-1  = 4px
p-2  = 8px   | gap-2  = 8px   ← Base unit
p-3  = 12px  | gap-3  = 12px
p-4  = 16px  | gap-4  = 16px  ← Default
p-6  = 24px  | gap-6  = 24px
p-8  = 32px  | gap-8  = 32px
p-12 = 48px  | gap-12 = 48px
p-16 = 64px  | gap-16 = 64px
```

### Component Spacing

```tsx
// Product card
<div className="p-4 md:p-6 space-y-4">
  {/* Card content */}
</div>

// Section spacing
<section className="py-12 md:py-16 px-4 md:px-6">
  {/* Section content */}
</section>

// Touch spacing (minimum 8px between touch targets)
<div className="flex gap-2 touch-spacing">
  <button>Button 1</button>
  <button>Button 2</button>
</div>
```

---

## Border Radius

```css
--radius-none: 0
--radius-sm: 0.25rem    /* 4px  - Subtle */
--radius-md: 0.5rem     /* 8px  - Buttons, inputs */
--radius-lg: 0.75rem    /* 12px - Product cards */
--radius-xl: 1rem       /* 16px - Large cards */
--radius-2xl: 1.5rem    /* 24px - Hero sections */
--radius-full: 9999px   /* Pills, badges */
```

### Usage

```tsx
// Buttons
<button className="rounded-md">Thêm vào giỏ</button>

// Product cards
<div className="rounded-lg">Product card</div>

// Badges
<span className="rounded-full">Miễn phí ship</span>

// Images
<img className="rounded-lg" />

// Modals
<div className="rounded-xl">Modal content</div>
```

---

## Shadow System

### Shadow Scale

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1)
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1)
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1)
--shadow-soft: 0 2px 8px 0 rgb(0 0 0 / 0.08)
--shadow-soft-hover: 0 8px 16px 0 rgb(0 0 0 / 0.12)
--shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05)
```

### Usage

```tsx
// Product cards (default)
<div className="shadow-soft hover:shadow-soft-hover transition-shadow">
  Product card
</div>

// Buttons
<button className="shadow-md">Primary button</button>

// Dropdowns
<div className="shadow-lg">Dropdown menu</div>

// Modals
<div className="shadow-xl">Modal</div>

// Input fields
<input className="shadow-inner" />
```

---

## Transitions & Animations

### Duration Scale

```css
--duration-fast: 150ms      /* Quick feedback */
--duration-normal: 200ms    /* Default transitions */
--duration-slow: 300ms      /* Smooth animations */
--duration-slower: 500ms    /* Page transitions */
```

### Easing Functions

```css
--ease-in: cubic-bezier(0.4, 0, 1, 1)
--ease-out: cubic-bezier(0, 0, 0.2, 1)
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
--ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1)
```

### Usage

```tsx
// Hover transitions
<div className="transition-hover hover:shadow-soft-hover">
  Hover me
</div>

// Color transitions
<button className="transition-colors duration-200 hover:bg-accent">
  Button
</button>

// Shadow transitions
<div className="transition-shadow duration-200 hover:shadow-lg">
  Card
</div>

// Transform (use sparingly)
<div className="transition-transform duration-200 hover:-translate-y-0.5">
  Lift on hover
</div>
```

### Reduced Motion Support

Automatically respects user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Mobile-First Utilities

### Touch Targets

```tsx
// Minimum 44x44px touch targets
<button className="touch-target px-6 py-3">
  Mobile-friendly button
</button>

// Touch spacing (8px minimum)
<div className="flex touch-spacing">
  <button>Button 1</button>
  <button>Button 2</button>
</div>
```

### Responsive Breakpoints

```
xs:  0-639px    (default, mobile-first)
sm:  640px+     (large phones)
md:  768px+     (tablets)
lg:  1024px+    (desktops)
xl:  1280px+    (large desktops)
2xl: 1536px+    (extra large)
```

### Responsive Patterns

```tsx
// Typography
<h1 className="text-h1-mobile md:text-h1">
  Responsive heading
</h1>

// Spacing
<div className="px-4 md:px-6 lg:px-8">
  Responsive padding
</div>

// Grid
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  Product grid
</div>

// Visibility
<div className="hidden md:block">
  Desktop only
</div>

<div className="block md:hidden">
  Mobile only
</div>
```

---

## Component Examples

### Primary Button

```tsx
<button className="
  touch-target
  px-6 py-3
  bg-accent text-accent-foreground
  rounded-md
  shadow-md
  transition-colors duration-200
  hover:bg-accent/90
  focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2
  active:translate-y-px
  disabled:opacity-60 disabled:cursor-not-allowed
  cursor-pointer
">
  Thêm vào giỏ
</button>
```

### Product Card

```tsx
<div className="
  group
  cursor-pointer
  rounded-lg
  border border-border
  bg-card
  p-4 md:p-6
  shadow-soft
  transition-all duration-200
  hover:shadow-soft-hover
  hover:-translate-y-0.5
  hover:border-primary
  focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2
">
  {/* Image */}
  <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
    <img 
      src="/product.webp" 
      alt="Áo thun nam basic"
      className="object-cover w-full h-full"
    />
    <div className="absolute top-2 right-2 badge-success">
      Miễn phí ship
    </div>
  </div>
  
  {/* Content */}
  <h3 className="text-h3-mobile md:text-h3 mb-2">
    Áo thun nam basic
  </h3>
  
  <p className="text-sm text-muted-foreground mb-3">
    Cotton 100%, thoáng mát
  </p>
  
  {/* Price */}
  <div className="flex items-center justify-between">
    <span className="text-price-mobile md:text-price">
      299.000đ
    </span>
    <button className="touch-target px-4 py-2 bg-accent text-accent-foreground rounded-md">
      Mua ngay
    </button>
  </div>
</div>
```

### Input Field

```tsx
<input
  type="text"
  className="
    w-full
    px-4 py-3
    bg-background
    border-2 border-input
    rounded-md
    shadow-inner
    transition-colors duration-200
    focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10
    disabled:bg-muted disabled:cursor-not-allowed disabled:opacity-60
    placeholder:text-muted-foreground
  "
  placeholder="Tìm kiếm sản phẩm..."
/>
```

### Badge Components

```tsx
// Success badge
<span className="badge-success">
  Miễn phí ship
</span>

// Warning badge (COD)
<span className="badge-warning">
  Thanh toán khi nhận hàng
</span>

// Muted badge
<span className="badge-muted">
  Hết hàng
</span>
```

---

## Dark Mode Implementation

### Setup in Layout

```tsx
import { ThemeProvider } from 'next-themes'

export default function RootLayout({ children }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Theme Toggle

```tsx
'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="touch-target p-2 rounded-md hover:bg-muted transition-colors"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
    </button>
  )
}
```

---

## Best Practices

### Do's ✓

1. **Use semantic tokens directly**
   ```tsx
   <div className="bg-primary text-primary-foreground">
   ```

2. **Mobile-first responsive design**
   ```tsx
   <div className="text-h1-mobile md:text-h1">
   ```

3. **Touch-friendly targets**
   ```tsx
   <button className="touch-target min-h-[44px] min-w-[44px]">
   ```

4. **Smooth transitions**
   ```tsx
   <div className="transition-colors duration-200">
   ```

5. **Proper focus states**
   ```tsx
   <button className="focus-visible:outline-2 focus-visible:outline-accent">
   ```

### Don'ts ✗

1. **Don't use var() wrapper**
   ```tsx
   // Bad
   <div style={{ background: 'var(--accent)' }}>
   
   // Good
   <div className="bg-accent">
   ```

2. **Don't use scale transforms on hover**
   ```tsx
   // Bad - causes layout shift
   <div className="hover:scale-105">
   
   // Good
   <div className="hover:-translate-y-0.5">
   ```

3. **Don't use emojis as icons**
   ```tsx
   // Bad
   <span>🚀</span>
   
   // Good
   <Rocket className="h-5 w-5" />
   ```

4. **Don't forget cursor-pointer**
   ```tsx
   // Bad
   <div onClick={handleClick}>
   
   // Good
   <div onClick={handleClick} className="cursor-pointer">
   ```

5. **Don't use tiny touch targets**
   ```tsx
   // Bad
   <button className="w-6 h-6">
   
   // Good
   <button className="touch-target min-h-[44px] min-w-[44px]">
   ```

---

## Testing Checklist

### Visual Testing
- [ ] Test in light mode
- [ ] Test in dark mode
- [ ] Verify color contrast (4.5:1 minimum)
- [ ] Check Vietnamese characters render correctly
- [ ] Verify all icons are SVG (no emojis)

### Responsive Testing
- [ ] Test at 375px (mobile)
- [ ] Test at 768px (tablet)
- [ ] Test at 1024px (desktop)
- [ ] Test at 1440px (large desktop)
- [ ] No horizontal scroll on any breakpoint

### Interaction Testing
- [ ] All clickable elements have cursor-pointer
- [ ] Touch targets minimum 44x44px
- [ ] Hover states provide visual feedback
- [ ] Focus states visible for keyboard navigation
- [ ] Transitions smooth (150-300ms)

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] ARIA labels on icon buttons
- [ ] Color not the only indicator
- [ ] Reduced motion respected

---

## Resources

- **Tailwind CSS 4.x Docs:** https://tailwindcss.com/docs
- **OKLCH Color Picker:** https://oklch.com
- **Google Fonts:** https://fonts.google.com
- **Lucide Icons:** https://lucide.dev
- **next-themes:** https://github.com/pacocoursey/next-themes

---

**Last Updated:** February 15, 2026  
**Version:** 1.0.0  
**Maintained by:** Zent UI Team
