type PlaceholderImageProps = {
  width: number
  height: number
  text?: string
  className?: string
}

export function PlaceholderImage({ width, height, text, className }: PlaceholderImageProps) {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="#E5E5E5"/>
      <text
        x="50%"
        y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        font-family="system-ui, sans-serif"
        font-size="14"
        fill="#737373"
      >${text || `${width}×${height}`}</text>
    </svg>
  `
  
  const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
  
  return dataUrl
}

// Generate placeholder for product images
export const PLACEHOLDER_PRODUCT = PlaceholderImage({ 
  width: 400, 
  height: 400, 
  text: 'Product Image' 
})

// Generate placeholder for category images
export const PLACEHOLDER_CATEGORY = PlaceholderImage({ 
  width: 400, 
  height: 400, 
  text: 'Category' 
})
