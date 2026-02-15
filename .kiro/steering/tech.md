---
inclusion: always
---

# Zent UI - Technical Guidelines

## Tech Stack

- Next.js 16.1.6 (App Router) + React 19.2.3
- TypeScript 5.x (strict mode)
- Tailwind CSS 4.x with CSS variables (OKLCH color space)
- shadcn/ui (New York style) + Radix UI primitives
- Lucide React icons
- React Hook Form + Zod validation
- next-themes for dark mode
- Zustand for state management
- Package manager: `pnpm`

## Critical Path Aliases

Always use these TypeScript path aliases:
- `@/components` - components directory
- `@/lib` - lib directory  
- `@/hooks` - hooks directory
- `@/ui` - components/ui directory

## React 19 Rules

NEVER use `forwardRef` - React 19 forwards refs automatically. Use `ref` prop directly on function components.

```tsx
// ✅ Correct - React 19 pattern
function Component({ className, ref, ...props }: ComponentProps) {
  return <element ref={ref} className={cn(variants({ className }))} {...props} />
}

// ❌ Wrong - Don't use forwardRef
const Component = forwardRef<HTMLElement, ComponentProps>((props, ref) => { ... })
```

## Component Architecture

All components MUST follow shadcn/ui patterns:

1. Use `class-variance-authority` (CVA) for variants
2. Use `cn()` from `@/lib/utils` for className merging
3. Support `asChild` prop via Radix Slot for composition
4. Include data attributes: `data-slot`, `data-variant`, `data-size`
5. Accept `className` prop for style overrides

```tsx
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const variants = cva("base-classes", {
  variants: {
    variant: { default: "...", destructive: "..." },
    size: { default: "...", sm: "...", lg: "..." }
  },
  defaultVariants: { variant: "default", size: "default" }
})

type ComponentProps = React.ComponentProps<"button"> & VariantProps<typeof variants>

function Component({ className, variant, size, ...props }: ComponentProps) {
  return (
    <button
      className={cn(variants({ variant, size, className }))}
      {...props}
    />
  )
}
```

## Styling Rules

### Tailwind CSS 4.x Syntax

- Use `@import "tailwindcss"` (NOT `@tailwind` directives)
- Define CSS variables in `@theme inline` block
- Custom dark mode: `@custom-variant dark (&:is(.dark *))`
- Use semantic tokens: `bg-primary`, `text-foreground`, `border-border`

### Color System

- OKLCH color space for perceptual uniformity
- Semantic names: `primary`, `secondary`, `muted`, `accent`, `destructive`
- Chart colors: `chart-1` through `chart-5`
- CSS variables support light/dark modes automatically

### Dark Mode Requirements

- Class-based dark mode via next-themes
- ALL components MUST support both light and dark variants
- Use `dark:` prefix for dark mode utilities
- Test color contrast in both modes before delivery

## TypeScript Standards

- Strict mode enabled - no exceptions
- Use `type` for props, `interface` for extensible contracts
- Use `React.ComponentProps<"element">` for native element props
- Use `VariantProps<typeof variants>` for CVA variant types
- NEVER use `any` - use `unknown` with type guards

## Naming Conventions

- Components: `PascalCase` (Button.tsx, AlertDialog.tsx)
- Component files: `PascalCase` (Button.tsx)
- Utility files: `kebab-case` (use-mobile.ts, cart-store.ts)
- Functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- CSS variables: `kebab-case` with semantic prefixes

## Import Order

1. React and Next.js imports
2. Third-party libraries
3. Local components and utilities
4. Types and interfaces
5. Styles (if any)

## Performance Requirements

- Use `next/image` for ALL images with explicit width/height
- Implement Suspense boundaries for loading states
- Lazy load heavy components with `dynamic` imports
- Optimize fonts with `next/font`

## Accessibility Requirements

- All interactive elements MUST be keyboard accessible
- Use semantic HTML elements
- Include ARIA attributes when semantic HTML insufficient
- Focus states MUST be visible (use ring utilities)
- Support `prefers-reduced-motion` for animations

## Form Patterns

- Use React Hook Form for form state
- Validate with Zod schemas via `@hookform/resolvers`
- Use Field component from `@/ui/field` for consistent layouts
- Provide clear, actionable error messages

## State Management

Use Zustand for global state (cart, user, wishlist, UI state):

```tsx
// lib/store/cart-store.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type CartStore = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  getTotalItems: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
      removeItem: (id) => set((state) => ({ items: state.items.filter(i => i.id !== id) })),
      getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
```

**Usage in Client Components:**

```tsx
'use client'

import { useCartStore } from '@/lib/store/cart-store'

function Component() {
  // ✅ Use selector pattern for performance
  const totalItems = useCartStore((state) => state.getTotalItems())
  const addItem = useCartStore((state) => state.addItem)
  
  // ❌ Don't subscribe to entire store
  // const store = useCartStore()
  
  return <div>{totalItems}</div>
}
```

**Store Organization:**
- `lib/store/cart-store.ts` - Shopping cart
- `lib/store/user-store.ts` - User authentication
- `lib/store/wishlist-store.ts` - Wishlist
- `lib/store/ui-store.ts` - UI state (modals, drawers)

**Rules:**
- ONLY use in Client Components (mark with `'use client'`)
- Use selector pattern to prevent unnecessary re-renders
- Use `persist` middleware for localStorage/sessionStorage
- Keep stores small and domain-specific
- Computed values should be in the store, not components

## Common Utilities

### cn() - ClassName Utility

```tsx
import { cn } from "@/lib/utils"

<div className={cn("base-classes", condition && "conditional", className)} />
```

Combines `clsx` and `tailwind-merge` for optimal className handling.

## Development Commands

- `pnpm dev` - Start dev server (http://localhost:3000)
- `pnpm build` - Production build
- `pnpm lint` - Run ESLint

## Code Quality Checklist

Before completing any component work, verify:

- [ ] No `forwardRef` usage (React 19)
- [ ] Uses CVA for variants
- [ ] Supports `className` prop override
- [ ] Works in both light and dark modes
- [ ] Keyboard accessible with visible focus states
- [ ] TypeScript strict mode passes
- [ ] Uses path aliases (@/components, @/lib, etc.)
- [ ] Follows shadcn/ui patterns
- [ ] Responsive on mobile, tablet, desktop
- [ ] Uses semantic color tokens (not hardcoded colors)