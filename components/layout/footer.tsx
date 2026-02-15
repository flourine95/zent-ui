import Link from 'next/link'
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12 md:py-16">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-h3 font-semibold">Zent</h3>
            <p className="text-sm text-muted-foreground">
              Thời trang nam tối giản, chất lượng cao. Phong cách hiện đại cho người đàn ông Việt.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="https://facebook.com"
                className="touch-target flex items-center justify-center hover:text-accent transition-colors cursor-pointer"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://instagram.com"
                className="touch-target flex items-center justify-center hover:text-accent transition-colors cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Sản phẩm</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/products/ao-thun"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors cursor-pointer"
                >
                  Áo thun
                </Link>
              </li>
              <li>
                <Link
                  href="/products/ao-polo"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors cursor-pointer"
                >
                  Áo polo
                </Link>
              </li>
              <li>
                <Link
                  href="/products/quan"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors cursor-pointer"
                >
                  Quần
                </Link>
              </li>
              <li>
                <Link
                  href="/products/phu-kien"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors cursor-pointer"
                >
                  Phụ kiện
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Hỗ trợ</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/shipping"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors cursor-pointer"
                >
                  Chính sách vận chuyển
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors cursor-pointer"
                >
                  Đổi trả hàng
                </Link>
              </li>
              <li>
                <Link
                  href="/size-guide"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors cursor-pointer"
                >
                  Hướng dẫn chọn size
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors cursor-pointer"
                >
                  Câu hỏi thường gặp
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Liên hệ</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">1900 xxxx</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">support@zent.vn</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Hà Nội, Việt Nam
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust badges */}
        <div className="border-t border-border py-8">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-success/10 flex items-center justify-center">
                <svg className="h-4 w-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm text-muted-foreground">Miễn phí vận chuyển</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-success/10 flex items-center justify-center">
                <svg className="h-4 w-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm text-muted-foreground">Đổi trả 30 ngày</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-warning/10 flex items-center justify-center">
                <svg className="h-4 w-4 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-sm text-muted-foreground">Thanh toán COD</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border py-6">
          <p className="text-center text-sm text-muted-foreground">
            © 2026 Zent. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  )
}
