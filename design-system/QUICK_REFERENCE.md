# Quick Reference Card
## Men's Fashion Vietnam - Tailwind Utilities

---

## Colors

```tsx
// Primary (Black/White)
bg-primary text-primary-foreground

// Accent (Gold CTA)
bg-accent text-accent-foreground

// Muted (Secondary text)
text-muted-foreground bg-muted

// Borders
border-border

// Success (Free shipping)
badge-success

// Warning (COD)
badge-warning

// Destructive (Errors)
text-destructive
```

---

## Typography

```tsx
// Headings (Be Vietnam Pro)
text-display          // 40px hero
text-h1              // 32px page title
text-h2              // 24px section
text-h3              // 20px product name

// Mobile variants
text-display-mobile  // 32px
text-h1-mobile      // 28px
text-h2-mobile      // 20px
text-h3-mobile      // 18px

// Body (Noto Sans)
text-base           // 16px default
text-body-lg        // 18px large
text-sm             // 14px small
text-xs             // 12px caption

// Price
text-price          // 24px
text-price-mobile   // 20px
```

---

## Spacing (8px base)

```tsx
gap-2   // 8px  - Touch spacing
gap-4   // 16px - Default
gap-6   // 24px - Medium
gap-8   // 32px - Large

p-4     // 16px - Mobile card
p-6     // 24px - Desktop card
py-12   // 48px - Section mobile
py-16   // 64px - Section desktop
```

---

## Border Radius

```tsx
rounded-md    // 8px  - Buttons, inputs
rounded-lg    // 12px - Product cards
rounded-xl    // 16px - Modals
rounded-full  // Pill - Badges
```

---

## Shadows

```tsx
shadow-soft              // Product card default
shadow-soft-hover        // Product card hover
shadow-md               // Buttons
shadow-lg               // Dropdowns
shadow-xl               // Modals
shadow-inner            // Inputs
```

---

## Transitions

```tsx
transition-colors duration-200    // Color changes
transition-shadow duration-200    // Shadow changes
transition-hover                  // All properties
hover:-translate-y-0.5           // Subtle lift
```

---

## Mobile Touch

```tsx
touch-target              // min-h-[44px] min-w-[44px]
touch-spacing            // gap-2 (8px)
cursor-pointer           // Always on clickable
```

---

## Responsive

```tsx
// Mobile-first
text-h1-mobile md:text-h1
px-4 md:px-6 lg:px-8
grid-cols-2 md:grid-cols-3 lg:grid-cols-4

// Visibility
hidden md:block          // Desktop only
block md:hidden          // Mobile only
```

---

## Common Patterns

### Primary Button
```tsx
className="
  touch-target px-6 py-3
  bg-accent text-accent-foreground
  rounded-md shadow-md
  transition-colors duration-200
  hover:bg-accent/90
  cursor-pointer
"
```

### Product Card
```tsx
className="
  cursor-pointer rounded-lg
  border border-border bg-card
  p-4 md:p-6
  shadow-soft hover:shadow-soft-hover
  transition-all duration-200
  hover:-translate-y-0.5
"
```

### Input Field
```tsx
className="
  w-full px-4 py-3
  bg-background border-2 border-input
  rounded-md shadow-inner
  focus:border-accent focus:ring-4 focus:ring-accent/10
"
```

### Badge
```tsx
<span className="badge-success">Miễn phí ship</span>
<span className="badge-warning">COD</span>
```

---

## Vietnamese Text

```tsx
<h1 className="text-h1">
  Thời trang nam tối giản
</h1>

<p className="text-muted-foreground">
  Cotton 100%, thoáng mát
</p>

<span className="text-price">
  299.000đ
</span>
```

---

## Dark Mode

```tsx
// Automatic via next-themes
// Colors adapt automatically
// Test both modes before delivery
```

---

## Checklist

- [ ] cursor-pointer on clickable
- [ ] touch-target on buttons
- [ ] transition on hover states
- [ ] focus-visible for keyboard
- [ ] Test 375px, 768px, 1024px
- [ ] Test light + dark mode
- [ ] Vietnamese chars (ă ơ ư â ê ô đ)
- [ ] No emojis as icons
- [ ] No scale transforms
- [ ] 4.5:1 contrast ratio
