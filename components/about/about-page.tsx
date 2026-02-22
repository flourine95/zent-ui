import { Package, Truck, Shield, Heart } from 'lucide-react'

export function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-display-mobile md:text-display mb-6">
              Về Zent
            </h1>
            <p className="text-body-lg text-muted-foreground">
              Chúng tôi tin rằng thời trang nam không cần phức tạp. 
              Zent mang đến những sản phẩm tối giản, chất lượng cao, 
              phù hợp với phong cách hiện đại của người đàn ông Việt.
            </p>
          </div>
        </div>
      </div>

      {/* Story */}
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-h1-mobile md:text-h1 mb-4">Câu chuyện của chúng tôi</h2>
              <p className="text-muted-foreground mb-4">
                Zent ra đời từ mong muốn tạo ra một thương hiệu thời trang nam 
                thực sự hiểu và phục vụ cho người đàn ông Việt Nam hiện đại.
              </p>
              <p className="text-muted-foreground">
                Chúng tôi tập trung vào chất lượng, thiết kế tối giản và sự thoải mái, 
                giúp bạn tự tin trong mọi hoàn cảnh - từ công sở đến cuối tuần.
              </p>
            </div>
            <div className="aspect-square bg-muted rounded-lg" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="aspect-square bg-muted rounded-lg order-2 md:order-1" />
            <div className="order-1 md:order-2">
              <h2 className="text-h1-mobile md:text-h1 mb-4">Triết lý của chúng tôi</h2>
              <p className="text-muted-foreground mb-4">
                "Less is more" - Ít nhưng chất lượng. Chúng tôi không theo đuổi 
                xu hướng nhất thời, mà tạo ra những sản phẩm vượt thời gian.
              </p>
              <p className="text-muted-foreground">
                Mỗi sản phẩm được chọn lọc kỹ lưỡng về chất liệu, thiết kế và 
                quy trình sản xuất để đảm bảo bạn nhận được giá trị tốt nhất.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-muted/50 border-y border-border">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
          <h2 className="text-h1-mobile md:text-h1 text-center mb-12">
            Giá trị cốt lõi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <Package className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-h3 mb-2">Chất lượng</h3>
              <p className="text-sm text-muted-foreground">
                Chất liệu cao cấp, bền đẹp theo thời gian
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <Truck className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-h3 mb-2">Giao hàng nhanh</h3>
              <p className="text-sm text-muted-foreground">
                Miễn phí vận chuyển, giao hàng toàn quốc
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-h3 mb-2">Đổi trả dễ dàng</h3>
              <p className="text-sm text-muted-foreground">
                Chính sách đổi trả trong 30 ngày
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <Heart className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-h3 mb-2">Tận tâm</h3>
              <p className="text-sm text-muted-foreground">
                Hỗ trợ khách hàng 24/7, luôn lắng nghe
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-h1-mobile md:text-h1 mb-4">
            Sẵn sàng khám phá?
          </h2>
          <p className="text-muted-foreground mb-8">
            Tìm hiểu bộ sưu tập của chúng tôi và trải nghiệm sự khác biệt
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="inline-flex items-center justify-center h-11 px-8 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Khám phá sản phẩm
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center h-11 px-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Liên hệ chúng tôi
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
