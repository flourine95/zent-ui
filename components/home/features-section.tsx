import { Truck, RefreshCw, Shield, Headphones } from 'lucide-react'

const features = [
  {
    icon: Truck,
    title: 'Miễn phí vận chuyển',
    description: 'Cho đơn hàng từ 300.000đ trên toàn quốc',
  },
  {
    icon: RefreshCw,
    title: 'Đổi trả dễ dàng',
    description: 'Đổi trả trong vòng 30 ngày nếu không hài lòng',
  },
  {
    icon: Shield,
    title: 'Thanh toán an toàn',
    description: 'Hỗ trợ COD và các phương thức thanh toán phổ biến',
  },
  {
    icon: Headphones,
    title: 'Hỗ trợ 24/7',
    description: 'Đội ngũ tư vấn nhiệt tình, sẵn sàng hỗ trợ',
  },
]

export function FeaturesSection() {
  return (
    <section className="py-12 md:py-16 border-y border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center space-y-3"
              >
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-base font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
