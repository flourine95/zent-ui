# Men's Fashion Vietnam - Design System
## Complete Design System for Vietnamese E-commerce (Men's Basics & Essentials)

**Target Audience:** Vietnamese men 18-35, urban, value quality + minimalism  
**Brand Values:** Clean, minimal, trustworthy, modern, sustainable  
**Mobile-First:** 70% traffic from mobile devices

---

## A. Style & Pattern Selection

### Primary Pattern: Minimal Single Column
- **Focus:** Single CTA focus, large typography, generous whitespace
- **Layout:** Mobile-first, no navigation clutter
- **Conversion Strategy:** Clear hierarchy, one primary action per screen
- **Sections:** Hero → Description → Benefits (max 3) → CTA → Footer

### Primary Style: Trust & Authority + Minimalism
- **Visual Language:** Clean, Swiss-inspired minimalism
- **Trust Elements:** Certificates, badges, customer reviews, security indicators
- **Product Cards:** Soft UI Evolution (subtle shadows, gentle gradients)
- **Performance:** ⚡ Excellent | **Accessibility:** ✓ WCAG AAA

### Avoid (Anti-patterns)
- ❌ Playful/childish design elements
- ❌ Hidden credentials or trust signals
- ❌ AI purple/pink gradients
- ❌ Brutalism, Cyberpunk, Y2K aesthetics
- ❌ Aggressive pop-ups (Vietnamese users dislike)
- ❌ Cluttered navigation

---

## B. Color Palette (OKLCH + Semantic Tokens)

### Base Colors (Light Mode)
```css
/* Primary - Deep Neutral Black */
--color-primary: oklch(0.15 0 0);           /* #171717 */
--color-primary-foreground: oklch(1 0 0);   /* #FFFFFF */

/* Secondary - Charcoal Gray */
--color-secondary: oklch(0.30 0 0);         /* #404040 */
--color-secondary-foreground: oklch(1 0 0); /* #FFFFFF */

/* Accent - Premium Gold (CTA) */
--color-accent: oklch(0.72 0.12 85);        /* #D4AF37 */
--color-accent-foreground: oklch(0.15 0 0); /* #171717 */

/* Background & Surface */
--color-background: oklch(1 0 0);           /* #FFFFFF */
--color-foreground: oklch(0.15 0 0);        /* #171717 */
--color-card: oklch(0.98 0 0);              /* #FAFAFA */
--color-card-foreground: oklch(0.15 0 0);   /* #171717 */

/* Muted (Secondary Text, Disabled States) */
--color-muted: oklch(0.95 0 0);             /* #F5F5F5 */
--color-muted-foreground: oklch(0.45 0 0);  /* #737373 */

/* Border */
--color-border: oklch(0.90 0 0);            /* #E5E5E5 */
--color-input: oklch(0.90 0 0);             /* #E5E5E5 */

/* Destructive (Errors, Remove) */
--color-destructive: oklch(0.55 0.22 25);   /* #DC2626 */
--color-destructive-foreground: oklch(1 0 0); /* #FFFFFF */

/* Success (Free Shipping, In Stock) */
--color-success: oklch(0.60 0.15 145);      /* #16A34A */
--color-success-foreground: oklch(1 0 0);   /* #FFFFFF */

/* Warning (Low Stock, COD) */
--color-warning: oklch(0.70 0.15 75);       /* #F59E0B */
--color-warning-foreground: oklch(0.15 0 0); /* #171717 */
```

### Dark Mode Colors
```css
/* Primary - Light Gray */
--color-primary: oklch(0.95 0 0);           /* #F5F5F5 */
--color-primary-foreground: oklch(0.15 0 0); /* #171717 */

/* Secondary - Medium Gray */
--color-secondary: oklch(0.70 0 0);         /* #A3A3A3 */
--color-secondary-foreground: oklch(0.15 0 0); /* #171717 */

/* Accent - Softer Gold */
--color-accent: oklch(0.75 0.10 85);        /* #E5C158 */
--color-accent-foreground: oklch(0.15 0 0); /* #171717 */

/* Background & Surface */
--color-background: oklch(0.12 0 0);        /* #0A0A0A */
--color-foreground: oklch(0.95 0 0);        /* #F5F5F5 */
--color-card: oklch(0.15 0 0);              /* #171717 */
--color-card-foreground: oklch(0.95 0 0);   /* #F5F5F5 */

/* Muted */
--color-muted: oklch(0.20 0 0);             /* #262626 */
--color-muted-foreground: oklch(0.60 0 0);  /* #A3A3A3 */

/* Border */
--color-border: oklch(0.25 0 0);            /* #404040 */
--color-input: oklch(0.25 0 0);             /* #404040 */

/* Destructive, Success, Warning - Same as light mode */
```

### Tailwind Semantic Token Mapping
```typescript
// tailwind.config.ts
colors: {
  primary: 'hsl(var(--color-primary))',
  secondary: 'hsl(var(--color-secondary))',
  accent: 'hsl(var(--color-accent))',
  background: 'hsl(var(--color-background))',
  foreground: 'hsl(var(--color-foreground))',
  card: 'hsl(var(--color-card))',
  muted: 'hsl(var(--color-muted))',
  border: 'hsl(var(--color-border))',
  destructive: 'hsl(var(--color-destructive))',
  success: 'hsl(var(--color-success))',
  warning: 'hsl(var(--color-warning))',
}
```

---

## C. Typography Scale

### Font Families
```css
/* Headings - Be Vietnam Pro (Vietnamese optimized) */
--font-heading: 'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Body - Noto Sans (Multilingual, accessible) */
--font-body: 'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Monospace - For codes, SKUs */
--font-mono: 'JetBrains Mono', 'Courier New', monospace;
```

### Google Fonts Import
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&family=Noto+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Type Scale (Mobile-First)
```css
/* Display - Hero headlines */
--text-display: 2.5rem;      /* 40px */
--text-display-line: 1.1;
--text-display-weight: 700;
--text-display-mobile: 2rem; /* 32px */

/* H1 - Page titles */
--text-h1: 2rem;             /* 32px */
--text-h1-line: 1.2;
--text-h1-weight: 700;
--text-h1-mobile: 1.75rem;   /* 28px */

/* H2 - Section headers */
--text-h2: 1.5rem;           /* 24px */
--text-h2-line: 1.3;
--text-h2-weight: 600;
--text-h2-mobile: 1.25rem;   /* 20px */

/* H3 - Product names */
--text-h3: 1.25rem;          /* 20px */
--text-h3-line: 1.4;
--text-h3-weight: 600;
--text-h3-mobile: 1.125rem;  /* 18px */

/* Body Large - Descriptions */
--text-body-lg: 1.125rem;    /* 18px */
--text-body-lg-line: 1.6;
--text-body-lg-weight: 400;

/* Body - Default text */
--text-body: 1rem;           /* 16px */
--text-body-line: 1.6;
--text-body-weight: 400;

/* Body Small - Meta info */
--text-body-sm: 0.875rem;    /* 14px */
--text-body-sm-line: 1.5;
--text-body-sm-weight: 400;

/* Caption - Labels, hints */
--text-caption: 0.75rem;     /* 12px */
--text-caption-line: 1.4;
--text-caption-weight: 400;

/* Price - Product pricing */
--text-price: 1.5rem;        /* 24px */
--text-price-line: 1.2;
--text-price-weight: 700;
--text-price-mobile: 1.25rem; /* 20px */

/* Button Text */
--text-button: 1rem;         /* 16px */
--text-button-line: 1;
--text-button-weight: 500;
```

### Vietnamese Character Support
✓ Supports: ă ơ ư â ê ô đ Ă Ơ Ư Â Ê Ô Đ  
✓ Optimized for Vietnamese diacritics  
✓ Fast loading with `display=swap`

---

## D. Spacing Scale (8px Base System)

```css
/* Base unit: 8px */
--space-0: 0;
--space-1: 0.25rem;  /* 4px  - Tight spacing */
--space-2: 0.5rem;   /* 8px  - Base unit */
--space-3: 0.75rem;  /* 12px - Small gaps */
--space-4: 1rem;     /* 16px - Default spacing */
--space-5: 1.5rem;   /* 24px - Medium spacing */
--space-6: 2rem;     /* 32px - Large spacing */
--space-8: 3rem;     /* 48px - Section spacing */
--space-10: 4rem;    /* 64px - Major sections */
--space-12: 6rem;    /* 96px - Hero spacing */

/* Component-specific */
--space-card-padding: var(--space-6);        /* 32px */
--space-card-padding-mobile: var(--space-4); /* 16px */
--space-section: var(--space-10);            /* 64px */
--space-section-mobile: var(--space-8);      /* 48px */
```

### Tailwind Spacing Mapping
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

---

## E. Border Radius Scale

```css
--radius-none: 0;
--radius-sm: 0.25rem;   /* 4px  - Subtle rounding */
--radius-md: 0.5rem;    /* 8px  - Default cards/buttons */
--radius-lg: 0.75rem;   /* 12px - Product cards */
--radius-xl: 1rem;      /* 16px - Large cards */
--radius-2xl: 1.5rem;   /* 24px - Hero sections */
--radius-full: 9999px;  /* Pills, avatars */
```

### Component Usage
- **Buttons:** `rounded-md` (8px)
- **Product Cards:** `rounded-lg` (12px)
- **Input Fields:** `rounded-md` (8px)
- **Badges:** `rounded-full` (pill shape)
- **Images:** `rounded-lg` (12px)
- **Modals:** `rounded-xl` (16px)

---

## F. Shadow Scale

```css
/* Subtle shadows for minimalist design */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);

/* Soft UI Evolution - Product cards */
--shadow-soft: 0 2px 8px 0 rgb(0 0 0 / 0.08);
--shadow-soft-hover: 0 8px 16px 0 rgb(0 0 0 / 0.12);

/* Inner shadow for inputs */
--shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
```

### Component Usage
- **Product Cards (Default):** `shadow-soft`
- **Product Cards (Hover):** `shadow-soft-hover`
- **Buttons (Primary):** `shadow-md`
- **Dropdowns:** `shadow-lg`
- **Modals:** `shadow-xl`
- **Input Fields:** `shadow-inner`

---

## G. Transition & Animation Specs

### Timing Functions
```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
```

### Duration Scale
```css
--duration-fast: 150ms;    /* Quick feedback */
--duration-normal: 200ms;  /* Default transitions */
--duration-slow: 300ms;    /* Smooth animations */
--duration-slower: 500ms;  /* Page transitions */
```

### Common Transitions
```css
/* Hover states */
.transition-hover {
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Color changes */
.transition-colors {
  transition: color 150ms, background-color 150ms, border-color 150ms;
}

/* Shadow changes */
.transition-shadow {
  transition: box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Transform (use sparingly) */
.transition-transform {
  transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Animation Guidelines
- ✓ Use for loading indicators only
- ✓ Respect `prefers-reduced-motion`
- ✓ Keep duration under 300ms for interactions
- ✗ No infinite decorative animations
- ✗ No scale transforms that shift layout
- ✗ No continuous bounce/pulse on icons

```css
/* Respect user preferences */
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

## H. Component State Specifications

### Button States
```css
/* Primary Button */
.btn-primary {
  /* Default */
  background: var(--color-accent);
  color: var(--color-accent-foreground);
  border: 2px solid transparent;
  cursor: pointer;
  
  /* Hover */
  &:hover {
    background: oklch(0.68 0.12 85); /* Darker gold */
    box-shadow: var(--shadow-md);
  }
  
  /* Focus (keyboard navigation) */
  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
  
  /* Active (pressed) */
  &:active {
    transform: translateY(1px);
    box-shadow: var(--shadow-sm);
  }
  
  /* Disabled */
  &:disabled {
    background: var(--color-muted);
    color: var(--color-muted-foreground);
    cursor: not-allowed;
    opacity: 0.6;
  }
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: var(--color-foreground);
  border: 2px solid var(--color-border);
  
  &:hover {
    background: var(--color-muted);
    border-color: var(--color-foreground);
  }
}
```

### Product Card States
```css
.product-card {
  /* Default */
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-soft);
  cursor: pointer;
  transition: all 200ms var(--ease-out);
  
  /* Hover */
  &:hover {
    box-shadow: var(--shadow-soft-hover);
    transform: translateY(-2px);
    border-color: var(--color-primary);
  }
  
  /* Focus */
  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
  
  /* Active */
  &:active {
    transform: translateY(0);
  }
}
```

### Input Field States
```css
.input-field {
  /* Default */
  background: var(--color-background);
  border: 2px solid var(--color-input);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-inner);
  
  /* Focus */
  &:focus {
    border-color: var(--color-accent);
    outline: none;
    box-shadow: 0 0 0 3px oklch(0.72 0.12 85 / 0.1);
  }
  
  /* Error */
  &[aria-invalid="true"] {
    border-color: var(--color-destructive);
  }
  
  /* Disabled */
  &:disabled {
    background: var(--color-muted);
    cursor: not-allowed;
    opacity: 0.6;
  }
}
```

### Badge States
```css
/* Free Shipping Badge */
.badge-success {
  background: var(--color-success);
  color: var(--color-success-foreground);
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  font-size: var(--text-caption);
  font-weight: 600;
}

/* COD Available Badge */
.badge-warning {
  background: var(--color-warning);
  color: var(--color-warning-foreground);
}

/* Out of Stock Badge */
.badge-muted {
  background: var(--color-muted);
  color: var(--color-muted-foreground);
}
```

---

## I. Mobile-First Specifications

### Touch Targets (CRITICAL)
```css
/* Minimum touch target size */
.touch-target {
  min-height: 44px;
  min-width: 44px;
}

/* Touch spacing */
.touch-spacing {
  gap: 8px; /* Minimum 8px between touch targets */
}

/* Tailwind classes */
.btn-mobile {
  @apply min-h-[44px] min-w-[44px] px-6 py-3;
}
```

### Responsive Breakpoints
```css
/* Mobile First */
/* xs: 0-639px    - Default styles */
/* sm: 640px+     - Large phones */
/* md: 768px+     - Tablets */
/* lg: 1024px+    - Desktops */
/* xl: 1280px+    - Large desktops */
/* 2xl: 1536px+   - Extra large */
```

### Mobile Optimizations
```css
/* Prevent pull-to-refresh where not needed */
body {
  overscroll-behavior-y: contain;
}

/* Remove tap delay */
button, a {
  touch-action: manipulation;
}

/* Optimize font rendering on mobile */
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
```

### Sticky Elements
```css
/* Sticky header */
.header-sticky {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--color-background);
  border-bottom: 1px solid var(--color-border);
}

/* Sticky CTA bar (mobile) */
.cta-sticky-mobile {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 40;
  padding: 1rem;
  background: var(--color-background);
  border-top: 1px solid var(--color-border);
  box-shadow: var(--shadow-lg);
}
```

### Swipe Gestures
- ✓ Vertical scroll as primary navigation
- ✓ Horizontal swipe for image galleries only
- ✗ Avoid horizontal swipe on main content (conflicts with system gestures)

---

## J. Vietnamese E-commerce Trust Elements

### COD (Cash on Delivery)
```html
<!-- Prominent COD badge -->
<div class="badge-warning">
  <svg><!-- Cash icon --></svg>
  <span>Thanh toán khi nhận hàng</span>
</div>
```

### Free Shipping
```html
<!-- Free shipping threshold -->
<div class="badge-success">
  <svg><!-- Truck icon --></svg>
  <span>Miễn phí vận chuyển đơn từ 300k</span>
</div>
```

### Easy Returns
```html
<!-- Return policy -->
<div class="trust-badge">
  <svg><!-- Return icon --></svg>
  <span>Đổi trả trong 30 ngày</span>
</div>
```

### Customer Reviews
```html
<!-- Star rating + review count -->
<div class="rating">
  <div class="stars">★★★★★</div>
  <span class="review-count">(1,234 đánh giá)</span>
</div>
```

### Security Badges
- SSL certificate indicator
- Payment method logos (Visa, Mastercard, Momo, ZaloPay)
- Verified seller badge

---

## K. Anti-patterns to Avoid

### Design Anti-patterns
- ❌ Emojis as UI icons (use SVG: Lucide, Heroicons)
- ❌ Scale transforms on hover (causes layout shift)
- ❌ Aggressive pop-ups (Vietnamese users hate)
- ❌ Hidden trust signals
- ❌ Playful/childish design
- ❌ AI purple/pink gradients
- ❌ Brutalism, Cyberpunk, Y2K aesthetics

### UX Anti-patterns
- ❌ Hover-only interactions (doesn't work on touch)
- ❌ Touch targets smaller than 44x44px
- ❌ Tightly packed clickable elements (< 8px gap)
- ❌ Infinite decorative animations
- ❌ Horizontal swipe on main content
- ❌ Same large images on all devices
- ❌ Default keyboard for number inputs

### Code Anti-patterns
- ❌ Using `var()` wrapper for theme colors (use `bg-primary` directly)
- ❌ Mixing different container widths
- ❌ Inconsistent button sizes
- ❌ Icon buttons without `aria-label`
- ❌ No `cursor-pointer` on clickable elements
- ❌ Missing focus states for keyboard navigation

---

## L. Pre-Delivery Checklist

### Visual Quality
- [ ] No emojis used as icons (use Lucide/Heroicons SVG)
- [ ] All icons from consistent icon set
- [ ] Hover states don't cause layout shift
- [ ] Use theme colors directly (`bg-primary`) not `var()` wrapper
- [ ] Product images optimized (WebP format, multiple sizes)

### Interaction
- [ ] All clickable elements have `cursor-pointer`
- [ ] Hover states provide clear visual feedback
- [ ] Transitions are smooth (150-300ms)
- [ ] Focus states visible for keyboard navigation
- [ ] Touch targets minimum 44x44px
- [ ] Minimum 8px gap between touch targets

### Light/Dark Mode
- [ ] Light mode text contrast 4.5:1 minimum
- [ ] Glass/transparent elements visible in light mode
- [ ] Borders visible in both modes
- [ ] Test both modes before delivery
- [ ] Product images work in both themes

### Layout & Responsive
- [ ] Mobile-first approach (test 375px first)
- [ ] Responsive at 375px, 768px, 1024px, 1440px
- [ ] No horizontal scroll on mobile
- [ ] Sticky elements have proper spacing
- [ ] Content doesn't hide behind fixed elements

### Accessibility
- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] Color is not the only indicator
- [ ] `prefers-reduced-motion` respected
- [ ] Keyboard navigation works
- [ ] ARIA labels on icon buttons

### Vietnamese E-commerce
- [ ] COD badge prominent
- [ ] Free shipping threshold visible
- [ ] Easy returns policy displayed
- [ ] Customer reviews/ratings shown
- [ ] Security badges present
- [ ] Vietnamese character support tested (ă ơ ư â ê ô đ)

---

## M. Implementation Example

### Product Card Component
```tsx
<div className="product-card group cursor-pointer rounded-lg border border-border bg-card p-4 shadow-soft transition-all duration-200 hover:shadow-soft-hover hover:-translate-y-0.5 hover:border-primary">
  {/* Image */}
  <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
    <img 
      src="/product.webp" 
      alt="Áo thun nam basic"
      className="object-cover w-full h-full"
    />
    {/* Badge */}
    <div className="absolute top-2 right-2 badge-success">
      Miễn phí ship
    </div>
  </div>
  
  {/* Content */}
  <h3 className="text-h3 font-heading font-semibold mb-2 text-foreground">
    Áo thun nam basic
  </h3>
  
  <p className="text-body-sm text-muted-foreground mb-3">
    Cotton 100%, thoáng mát
  </p>
  
  {/* Rating */}
  <div className="flex items-center gap-2 mb-3">
    <div className="flex text-warning">
      ★★★★★
    </div>
    <span className="text-caption text-muted-foreground">
      (1,234 đánh giá)
    </span>
  </div>
  
  {/* Price */}
  <div className="flex items-center justify-between">
    <span className="text-price font-bold text-foreground">
      299.000đ
    </span>
    <button className="btn-primary min-h-[44px] px-6 py-2 rounded-md">
      Thêm vào giỏ
    </button>
  </div>
</div>
```

---

## N. Resources

### Design Tools
- **Figma:** Use OKLCH color picker plugin
- **Icons:** Lucide React, Heroicons
- **Fonts:** Google Fonts (Be Vietnam Pro + Noto Sans)

### Testing Tools
- **Contrast Checker:** WebAIM Contrast Checker
- **Mobile Testing:** Chrome DevTools (375px, 768px, 1024px)
- **Accessibility:** axe DevTools, WAVE
- **Performance:** Lighthouse, PageSpeed Insights

### Documentation
- **Tailwind CSS:** https://tailwindcss.com/docs
- **shadcn/ui:** https://ui.shadcn.com
- **OKLCH Colors:** https://oklch.com
- **Vietnamese Typography:** https://fonts.google.com/?subset=vietnamese

---

**Last Updated:** February 15, 2026  
**Version:** 1.0.0  
**Maintained by:** Zent UI Team
