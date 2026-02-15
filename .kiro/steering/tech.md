---
inclusion: always
---
---
inclusion: always
---

# Zent UI - Technical Guidelines

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **React**: 19.2.3 (with React 19 features)
- **TypeScript**: 5.x (strict mode enabled)
- **Styling**: Tailwind CSS 4.x with CSS variables
- **UI Components**: shadcn/ui (New York style) + Radix UI primitives
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Theme**: next-themes for dark mode support

## Project Structure

```
app/              # Next.js App Router pages
components/ui/    # shadcn/ui components
lib/              # Utility functions
hooks/            # Custom React hooks
public/           # Static assets
```

## Path Aliases

Use TypeScript path aliases consistently:
- `@/components` → components directory
- `@/lib` → lib directory
- `@/hooks` → hooks directory
- `@/ui` → components/ui directory

## Component Conventions

### shadcn/ui Components

- All UI components use class-variance-authority (CVA) for variant management
- Use `cn()` utility from `@/lib/utils` for className merging
- Components support `asChild` prop pattern via Radix Slot for composition
- Include data attributes for variant tracking: `data-slot`, `data-variant`, `data-size`

### Component Structure

```tsx
// Use React 19 features - no forwardRef needed
function Component({ className, ...props }: ComponentProps) {
  return (
    <element
      className={cn(componentVariants({ variant, size, className }))}
      {...props}
    />
  )
}
```

### React 19 Patterns

- **No forwardRef**: React 19 automatically forwards refs
- Use `ref` prop directly on function components
- Leverage improved JSX transform (`jsx: "react-jsx"`)

## Styling Guidelines

### Tailwind CSS 4.x

- Use `@import "tailwindcss"` syntax (not @tailwind directives)
- CSS variables defined in `@theme inline` block
- Custom dark mode variant: `@custom-variant dark (&:is(.dark *))`
- Use semantic color tokens: `bg-primary`, `text-foreground`, `border-border`

### Color System

- Use OKLCH color space for better perceptual uniformity
- CSS variables for theme colors (supports light/dark modes)
- Semantic naming: `primary`, `secondary`, `muted`, `accent`, `destructive`
- Chart colors: `chart-1` through `chart-5`

### Dark Mode

- Class-based dark mode via next-themes
- All components must support both light and dark variants
- Test color contrast in both modes
- Use `dark:` prefix for dark mode utilities

## TypeScript Standards

- **Strict mode enabled**: All type checks enforced
- Use `type` for props, `interface` for extensible contracts
- Prefer `React.ComponentProps<"element">` for native element props
- Use `VariantProps<typeof variants>` for CVA variant types
- No `any` types - use `unknown` and type guards instead

## Code Style

### Naming Conventions

- Components: PascalCase (`Button`, `AlertDialog`)
- Files: kebab-case for utilities, PascalCase for components
- Functions: camelCase
- Constants: UPPER_SNAKE_CASE for true constants
- CSS variables: kebab-case with semantic prefixes

### Import Order

1. React and Next.js imports
2. Third-party libraries
3. Local components and utilities
4. Types and interfaces
5. Styles

### Component Props

- Destructure props with defaults
- Use rest spread for forwarding props
- Type props explicitly with TypeScript
- Support `className` for style overrides

## Performance Patterns

- Use `next/image` for all images with proper sizing
- Implement proper loading states with Suspense boundaries
- Lazy load heavy components with dynamic imports
- Optimize font loading with `next/font`

## Accessibility

- All interactive elements must be keyboard accessible
- Use semantic HTML elements
- Include proper ARIA attributes when needed
- Focus states must be visible (ring utilities)
- Support `prefers-reduced-motion`

## Form Handling

- Use React Hook Form for form state management
- Validate with Zod schemas via `@hookform/resolvers`
- Provide clear error messages
- Use Field component for consistent form layouts

## Testing & Quality

- Run `pnpm lint` before committing
- ESLint configured with Next.js recommended rules
- TypeScript strict mode catches type errors
- Test components in both light and dark modes

## Common Utilities

### `cn()` Function

Combines clsx and tailwind-merge for optimal className handling:

```tsx
import { cn } from "@/lib/utils"

<div className={cn("base-classes", conditional && "conditional-classes", className)} />
```

### CVA Variants

Define component variants with class-variance-authority:

```tsx
const variants = cva("base-classes", {
  variants: {
    variant: { default: "...", destructive: "..." },
    size: { default: "...", sm: "...", lg: "..." }
  },
  defaultVariants: { variant: "default", size: "default" }
})
```

## Dependencies Management

- Use `pnpm` as package manager
- Keep dependencies up to date
- Prefer peer dependencies for shared libraries
- Check bundle size impact of new dependencies

## Build & Development

- `pnpm dev` - Start development server
- `pnpm build` - Production build
- `pnpm lint` - Run ESLint
- Development server runs on http://localhost:3000

## Best Practices

1. **Component Composition**: Prefer composition over prop drilling
2. **Type Safety**: Leverage TypeScript for compile-time safety
3. **Accessibility First**: Build with a11y in mind from the start
4. **Performance**: Optimize images, fonts, and bundle size
5. **Consistency**: Follow shadcn/ui patterns for new components
6. **Dark Mode**: Always test both light and dark themes
7. **Responsive Design**: Mobile-first approach with Tailwind breakpoints