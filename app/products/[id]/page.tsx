import { ProductDetail } from '@/components/products/product-detail'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  
  // In real app, fetch product data
  const product = mockProducts.find((p) => p.id === id)
  
  if (!product) {
    return {
      title: 'Không tìm thấy sản phẩm - Zent',
    }
  }

  return {
    title: `${product.name} - Zent`,
    description: product.description,
  }
}

// Mock data - replace with actual data fetching
const mockProducts = [
  {
    id: '1',
    name: 'Áo thun nam basic trắng',
    price: 299000,
    originalPrice: 399000,
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    rating: 4.5,
    reviewCount: 1234,
    inStock: true,
    freeShipping: true,
    description: 'Áo thun nam basic chất liệu cotton 100%, thoáng mát, thấm hút mồ hôi tốt. Thiết kế tối giản, dễ phối đồ.',
    features: [
      'Chất liệu: Cotton 100%',
      'Form: Regular fit',
      'Xuất xứ: Việt Nam',
      'Hướng dẫn bảo quản: Giặt máy ở nhiệt độ thường',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Trắng', value: 'white', hex: '#FFFFFF' },
      { name: 'Đen', value: 'black', hex: '#000000' },
      { name: 'Xám', value: 'gray', hex: '#9CA3AF' },
    ],
  },
]

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params
  const product = mockProducts.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} />
}
