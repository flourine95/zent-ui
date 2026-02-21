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
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
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
    reviews: [
      {
        id: '1',
        userName: 'Nguyễn Văn A',
        rating: 5,
        date: '15/02/2026',
        comment: 'Sản phẩm rất tốt, chất liệu mềm mại, thoáng mát. Mình rất hài lòng với sản phẩm này.',
        helpful: 24,
        verified: true,
      },
      {
        id: '2',
        userName: 'Trần Thị B',
        rating: 4,
        date: '10/02/2026',
        comment: 'Áo đẹp, form chuẩn. Tuy nhiên màu trắng hơi trong nên cần mặc áo lót bên trong.',
        helpful: 12,
        verified: true,
      },
      {
        id: '3',
        userName: 'Lê Văn C',
        rating: 5,
        date: '05/02/2026',
        comment: 'Chất lượng tốt, giá cả hợp lý. Sẽ ủng hộ shop lâu dài.',
        helpful: 8,
        verified: false,
      },
    ],
    suggestedProducts: [
      {
        id: '2',
        name: 'Áo polo nam cao cấp',
        price: 399000,
        image: '/placeholder.svg',
        hoverImage: '/placeholder.svg',
        rating: 4.8,
        reviewCount: 856,
        inStock: true,
        freeShipping: true,
        sizes: ['M', 'L', 'XL', 'XXL'],
        colors: [
          { name: 'Xanh navy', value: 'navy', hex: '#1E3A8A' },
          { name: 'Đen', value: 'black', hex: '#000000' },
        ],
      },
      {
        id: '3',
        name: 'Quần jean nam slim fit',
        price: 599000,
        originalPrice: 799000,
        image: '/placeholder.svg',
        hoverImage: '/placeholder.svg',
        rating: 4.6,
        reviewCount: 2341,
        inStock: true,
        freeShipping: true,
        badge: 'HOT',
        sizes: ['29', '30', '31', '32'],
        colors: [
          { name: 'Xanh đậm', value: 'dark-blue', hex: '#1E40AF' },
          { name: 'Đen', value: 'black', hex: '#000000' },
        ],
      },
      {
        id: '4',
        name: 'Áo sơ mi nam trắng',
        price: 449000,
        image: '/placeholder.svg',
        hoverImage: '/placeholder.svg',
        rating: 4.7,
        reviewCount: 1567,
        inStock: true,
        freeShipping: true,
        sizes: ['S', 'M', 'L', 'XL'],
        colors: [
          { name: 'Trắng', value: 'white', hex: '#FFFFFF' },
          { name: 'Xanh nhạt', value: 'light-blue', hex: '#DBEAFE' },
        ],
      },
      {
        id: '5',
        name: 'Quần kaki nam',
        price: 499000,
        image: '/placeholder.svg',
        hoverImage: '/placeholder.svg',
        rating: 4.5,
        reviewCount: 987,
        inStock: true,
        freeShipping: true,
        sizes: ['29', '30', '31', '32'],
        colors: [
          { name: 'Be', value: 'beige', hex: '#D4C5B9' },
          { name: 'Xanh rêu', value: 'olive', hex: '#84A98C' },
        ],
      },
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
