import { HeroSection } from '@/components/home/hero-section'
import { FeaturedProductsSection } from '@/components/home/featured-products-section'
import { CategoriesSection } from '@/components/home/categories-section'
import { FeaturesSection } from '@/components/home/features-section'
import type { ProductCardData } from '@/components/product/product-card'

// Mock data - replace with actual data fetching
const featuredProducts: ProductCardData[] = [
  {
    id: '1',
    name: 'Áo thun nam basic trắng',
    price: 299000,
    originalPrice: 399000,
    image: '/placeholder.svg',
    rating: 4.5,
    reviewCount: 1234,
    inStock: true,
    freeShipping: true,
  },
  {
    id: '2',
    name: 'Áo polo nam cao cấp',
    price: 399000,
    image: '/placeholder.svg',
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
    image: '/placeholder.svg',
    rating: 4.6,
    reviewCount: 2341,
    inStock: true,
    freeShipping: true,
  },
  {
    id: '4',
    name: 'Áo sơ mi nam trắng',
    price: 449000,
    image: '/placeholder.svg',
    rating: 4.7,
    reviewCount: 1567,
    inStock: true,
    freeShipping: true,
  },
  {
    id: '5',
    name: 'Quần kaki nam',
    price: 499000,
    image: '/placeholder.svg',
    rating: 4.5,
    reviewCount: 987,
    inStock: true,
    freeShipping: true,
  },
  {
    id: '6',
    name: 'Áo thun polo basic',
    price: 349000,
    image: '/placeholder.svg',
    rating: 4.4,
    reviewCount: 654,
    inStock: true,
    freeShipping: true,
  },
  {
    id: '7',
    name: 'Quần short nam',
    price: 299000,
    image: '/placeholder.svg',
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
    image: '/placeholder.svg',
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
    image: '/placeholder.svg',
    productCount: 156,
  },
  {
    id: '2',
    name: 'Áo polo',
    slug: 'ao-polo',
    image: '/placeholder.svg',
    productCount: 89,
  },
  {
    id: '3',
    name: 'Quần',
    slug: 'quan',
    image: '/placeholder.svg',
    productCount: 234,
  },
  {
    id: '4',
    name: 'Phụ kiện',
    slug: 'phu-kien',
    image: '/placeholder.svg',
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
