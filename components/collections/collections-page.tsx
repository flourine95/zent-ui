import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type Collection = {
  id: string
  name: string
  description: string
  image: string
  itemCount: number
  slug: string
}

const COLLECTIONS: Collection[] = [
  {
    id: '1',
    name: 'Essentials',
    description: 'Những món đồ cơ bản không thể thiếu trong tủ đồ',
    image: '/images/collections/essentials.jpg',
    itemCount: 24,
    slug: 'essentials',
  },
  {
    id: '2',
    name: 'Office Wear',
    description: 'Phong cách lịch lãm cho môi trường công sở',
    image: '/images/collections/office.jpg',
    itemCount: 18,
    slug: 'office-wear',
  },
  {
    id: '3',
    name: 'Weekend Casual',
    description: 'Thoải mái và năng động cho ngày cuối tuần',
    image: '/images/collections/casual.jpg',
    itemCount: 32,
    slug: 'weekend-casual',
  },
  {
    id: '4',
    name: 'Summer Collection',
    description: 'Bộ sưu tập mùa hè thoáng mát',
    image: '/images/collections/summer.jpg',
    itemCount: 28,
    slug: 'summer',
  },
  {
    id: '5',
    name: 'Premium Line',
    description: 'Dòng sản phẩm cao cấp với chất liệu đặc biệt',
    image: '/images/collections/premium.jpg',
    itemCount: 16,
    slug: 'premium',
  },
  {
    id: '6',
    name: 'Accessories',
    description: 'Phụ kiện hoàn thiện phong cách',
    image: '/images/collections/accessories.jpg',
    itemCount: 20,
    slug: 'accessories',
  },
]

export function CollectionsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-display-mobile md:text-display mb-4">
              Bộ sưu tập
            </h1>
            <p className="text-body-lg text-muted-foreground">
              Khám phá các bộ sưu tập được tuyển chọn kỹ lưỡng, 
              phù hợp với mọi phong cách và dịp sử dụng.
            </p>
          </div>
        </div>
      </div>

      {/* Collections Grid */}
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {COLLECTIONS.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="group block"
            >
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-muted mb-4">
                {/* Placeholder for image */}
                <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted-foreground/20" />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Item count badge */}
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-medium">{collection.itemCount} sản phẩm</span>
                </div>

                {/* Arrow icon on hover */}
                <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>

              <div>
                <h3 className="text-h3 mb-2 group-hover:text-accent transition-colors">
                  {collection.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {collection.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="border-t border-border bg-muted/50">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-h1-mobile md:text-h1 mb-4">
              Không tìm thấy bộ sưu tập phù hợp?
            </h2>
            <p className="text-muted-foreground mb-8">
              Khám phá toàn bộ sản phẩm của chúng tôi
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center h-11 px-8 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Xem tất cả sản phẩm
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
