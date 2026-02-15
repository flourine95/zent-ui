import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

type Category = {
  id: string
  name: string
  slug: string
  image: string
  productCount: number
}

type CategoriesSectionProps = {
  categories: Category[]
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="text-center mb-8 md:mb-12 space-y-2">
          <h2 className="text-h2-mobile md:text-h2">Danh mục sản phẩm</h2>
          <p className="text-sm text-muted-foreground">
            Khám phá bộ sưu tập đa dạng của chúng tôi
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg bg-card border border-border shadow-soft hover:shadow-soft-hover transition-all duration-200 hover:-translate-y-0.5">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1">
                  <h3 className="text-base md:text-lg font-semibold text-foreground">
                    {category.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {category.productCount} sản phẩm
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
