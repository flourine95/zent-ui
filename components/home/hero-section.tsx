import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center py-16 md:py-24 lg:py-32 space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
            <span className="text-sm font-medium text-accent">Bộ sưu tập mới</span>
          </div>

          {/* Heading */}
          <h1 className="text-display-mobile md:text-display max-w-4xl">
            Thời trang nam tối giản
            <br />
            <span className="text-accent">Phong cách hiện đại</span>
          </h1>

          {/* Description */}
          <p className="text-body-lg text-muted-foreground max-w-2xl">
            Chất lượng cao, thiết kế tối giản, phù hợp với người đàn ông Việt hiện đại.
            Miễn phí vận chuyển cho đơn hàng từ 300.000đ.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 touch-spacing">
            <Link
              href="/products"
              className="touch-target px-8 py-4 bg-accent text-accent-foreground rounded-md shadow-md transition-colors duration-200 hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 cursor-pointer inline-flex items-center gap-2 font-medium"
            >
              Khám phá ngay
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/collections"
              className="touch-target px-8 py-4 bg-transparent text-foreground border-2 border-border rounded-md transition-colors duration-200 hover:bg-muted hover:border-foreground focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 cursor-pointer inline-flex items-center gap-2 font-medium"
            >
              Xem bộ sưu tập
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 pt-8">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-muted-foreground">Miễn phí vận chuyển</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-muted-foreground">Đổi trả 30 ngày</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-sm text-muted-foreground">Thanh toán COD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 h-[500px] w-[500px] rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
      </div>
    </section>
  )
}
