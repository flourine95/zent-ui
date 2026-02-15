import { HeroSection } from '@/components/home/hero-section'
import { FeaturedProductsSection } from '@/components/home/featured-products-section'
import { CategoriesSection } from '@/components/home/categories-section'
import { FeaturesSection } from '@/components/home/features-section'
import type { ProductCardData } from '@/components/product/product-card'

// Placeholder image data URL
const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI0U1RTVFNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic3lzdGVtLXVpLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNzM3MzczIj5Qcm9kdWN0IEltYWdlPC90ZXh0Pjwvc3ZnPg=='

// Mock data - replace with actual data fetching
const featuredProducts: ProductCardData[] = [
  {
    id: '1',
    name: 'Áo thun nam basic trắng',
    price: 299000,
    originalPrice: 399000,
    image: PLACEHOLDER_IMAGE,
    rating: 4.5,
    reviewCount: 1234,
    inStock: true,
    freeShipping: true,
  },
  {
    id: '2',
    name: 'Áo polo nam cao cấp',
    price: 399000,
    image: PLACEHOLDER_IMAGE,
    rating: 4.8,
    reviewCount: 856,
    inStock: true,
    freeShipping: true,
  },
  {
    id: '3',
    name: 'Quần jean nam slim fit',
    price: 599000,
    originalPrice: 799000,
    image: PLACEHOLDER_IMAGE,
    rating: 4.6,
    reviewCount: 2341,
    inStock: true,
    freeShipping: true,
  },
  {
    id: '4',
    name: 'Áo sơ mi nam trắng',
    price: 449000,
    image: PLACEHOLDER_IMAGE,
    rating: 4.7,
    reviewCount: 1567,
    inStock: true,
    freeShipping: true,
  },
  {
    id: '5',
    name: 'Quần kaki nam',
    price: 499000,
    image: PLACEHOLDER_IMAGE,
    rating: 4.5,
    reviewCount: 987,
    inStock: true,
    freeShipping: true,
  },
  {
    id: '6',
    name: 'Áo thun polo basic',
    price: 349000,
    image: PLACEHOLDER_IMAGE,
    rating: 4.4,
    reviewCount: 654,
    inStock: true,
    freeShipping: true,
  },
  {
    id: '7',
    name: 'Quần short nam',
    price: 299000,
    image: PLACEHOLDER_IMAGE,
    rating: 4.3,
    reviewCount: 432,
    inStock: false,
    freeShipping: false,
  },
  {
    id: '8',
    name: 'Áo khoác bomber',
    price: 799000,
    originalPrice: 999000,
    image: PLACEHOLDER_IMAGE,
    rating: 4.9,
    reviewCount: 3210,
    inStock: true,
    freeShipping: true,
  },
]

const categories = [
  {
    id: '1',
    name: 'Áo thun',
    slug: 'ao-thun',
    image: PLACEHOLDER_IMAGE,
    productCount: 156,
  },
  {
    id: '2',
    name: 'Áo polo',
    slug: 'ao-polo',
    image: PLACEHOLDER_IMAGE,
    productCount: 89,
  },
  {
    id: '3',
    name: 'Quần',
    slug: 'quan',
    image: PLACEHOLDER_IMAGE,
    productCount: 234,
  },
  {
    id: '4',
    name: 'Phụ kiện',
    slug: 'phu-kien',
    image: PLACEHOLDER_IMAGE,
    productCount: 67,
  },
]

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <FeaturedProductsSection products={featuredProducts} />
      <CategoriesSection categories={categories} />
    </main>
  )
}
