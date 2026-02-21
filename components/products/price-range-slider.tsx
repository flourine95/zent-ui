'use client'

import { memo, useState, useCallback } from 'react'
import { Input } from '@/components/ui/input'

type PriceRangeSliderProps = {
  min: number
  max: number
  value: [number, number]
  onChange: (value: [number, number]) => void
}

export const PriceRangeSlider = memo(function PriceRangeSlider({
  min,
  max,
  value,
  onChange,
}: PriceRangeSliderProps) {
  const [localValue, setLocalValue] = useState(value)

  const handleMinChange = useCallback((newMin: number) => {
    const adjustedMin = Math.min(newMin, localValue[1])
    setLocalValue([adjustedMin, localValue[1]])
  }, [localValue])

  const handleMaxChange = useCallback((newMax: number) => {
    const adjustedMax = Math.max(newMax, localValue[0])
    setLocalValue([localValue[0], adjustedMax])
  }, [localValue])

  const handleMinRelease = useCallback(() => {
    onChange(localValue)
  }, [localValue, onChange])

  const handleMaxRelease = useCallback(() => {
    onChange(localValue)
  }, [localValue, onChange])

  const handleInputChange = useCallback((index: 0 | 1, inputValue: number) => {
    const newValue: [number, number] = [...localValue]
    newValue[index] = inputValue
    
    if (index === 0 && inputValue > newValue[1]) {
      newValue[1] = inputValue
    } else if (index === 1 && inputValue < newValue[0]) {
      newValue[0] = inputValue
    }
    
    setLocalValue(newValue)
    onChange(newValue)
  }, [localValue, onChange])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Input
          type="number"
          value={localValue[0]}
          onChange={(e) => handleInputChange(0, Number(e.target.value))}
          className="h-9"
          placeholder="Từ"
        />
        <span className="text-muted-foreground">-</span>
        <Input
          type="number"
          value={localValue[1]}
          onChange={(e) => handleInputChange(1, Number(e.target.value))}
          className="h-9"
          placeholder="Đến"
        />
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">
            Từ: {localValue[0].toLocaleString('vi-VN')}₫
          </label>
          <input
            type="range"
            min={min}
            max={max}
            step={10000}
            value={localValue[0]}
            onChange={(e) => handleMinChange(Number(e.target.value))}
            onMouseUp={handleMinRelease}
            onTouchEnd={handleMinRelease}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:bg-muted [&::-webkit-slider-runnable-track]:rounded-lg [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:active:cursor-grabbing [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background [&::-moz-range-track]:h-2 [&::-moz-range-track]:bg-muted [&::-moz-range-track]:rounded-lg [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:active:cursor-grabbing [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-background [&::-moz-range-thumb]:shadow-md"
          />
        </div>
        
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">
            Đến: {localValue[1].toLocaleString('vi-VN')}₫
          </label>
          <input
            type="range"
            min={min}
            max={max}
            step={10000}
            value={localValue[1]}
            onChange={(e) => handleMaxChange(Number(e.target.value))}
            onMouseUp={handleMaxRelease}
            onTouchEnd={handleMaxRelease}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:bg-muted [&::-webkit-slider-runnable-track]:rounded-lg [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:active:cursor-grabbing [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background [&::-moz-range-track]:h-2 [&::-moz-range-track]:bg-muted [&::-moz-range-track]:rounded-lg [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:active:cursor-grabbing [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-background [&::-moz-range-thumb]:shadow-md"
          />
        </div>
      </div>
    </div>
  )
})
