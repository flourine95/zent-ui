'use client'

import { Search, Menu, User } from 'lucide-react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import { CartDrawer } from '@/components/cart/cart-drawer'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Mobile menu */}
          <button
            className="touch-target flex items-center justify-center md:hidden cursor-pointer"
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <span className="text-h3 font-semibold">Zent</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/products"
              className="text-sm font-medium text-foreground hover:text-accent transition-colors cursor-pointer"
            >
              Sản phẩm
            </Link>
            <Link
              href="/collections"
              className="text-sm font-medium text-foreground hover:text-accent transition-colors cursor-pointer"
            >
              Bộ sưu tập
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-foreground hover:text-accent transition-colors cursor-pointer"
            >
              Về chúng tôi
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 touch-spacing">
            <button
              className="touch-target flex items-center justify-center cursor-pointer hover:text-accent transition-colors"
              aria-label="Tìm kiếm"
            >
              <Search className="h-5 w-5" />
            </button>

            <ThemeToggle />

            <button
              className="touch-target flex items-center justify-center cursor-pointer hover:text-accent transition-colors"
              aria-label="Tài khoản"
            >
              <User className="h-5 w-5" />
            </button>

            <CartDrawer />
          </div>
        </div>
      </div>
    </header>
  )
}
