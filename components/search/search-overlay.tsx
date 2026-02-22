"use client"

import { useState, useEffect, useCallback } from "react"
import { Search, X, Clock, TrendingUp, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface SearchResult {
  id: string
  title: string
  description: string
  category: string
  thumbnail: string
  time: string
  url: string
  price?: number
}

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("zent-recent-searches")
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  const performSearch = useCallback((searchQuery: string, category: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setIsSearching(true)

    setTimeout(() => {
      const mockResults: SearchResult[] = [
        {
          id: "1",
          title: "Áo thun Premium Cotton",
          description: "Áo thun cotton cao cấp, thoáng mát, form regular fit",
          category: "Áo thun",
          thumbnail: "/placeholder.svg",
          time: "Mới nhất",
          url: "/products/1",
          price: 299000,
        },
        {
          id: "2",
          title: "Quần jean Slim Fit",
          description: "Quần jean co giãn nhẹ, form slim fit hiện đại",
          category: "Quần jean",
          thumbnail: "/placeholder.svg",
          time: "Phổ biến",
          url: "/products/2",
          price: 450000,
        },
        {
          id: "3",
          title: "Áo khoác Bomber",
          description: "Áo khoác bomber phong cách streetwear",
          category: "Áo khoác",
          thumbnail: "/placeholder.svg",
          time: "Bán chạy",
          url: "/products/3",
          price: 650000,
        },
        {
          id: "4",
          title: "Áo sơ mi Oxford",
          description: "Áo sơ mi Oxford chất liệu cao cấp, phù hợp công sở",
          category: "Áo sơ mi",
          thumbnail: "/placeholder.svg",
          time: "Mới về",
          url: "/products/4",
          price: 380000,
        },
        {
          id: "5",
          title: "Túi đeo chéo da",
          description: "Túi đeo chéo da thật, thiết kế tối giản",
          category: "Phụ kiện",
          thumbnail: "/placeholder.svg",
          time: "Hot",
          url: "/products/5",
          price: 520000,
        },
      ]

      const filtered =
        category === "all"
          ? mockResults
          : mockResults.filter((r) => r.category.toLowerCase() === category.toLowerCase())

      setResults(filtered)
      setIsSearching(false)
    }, 500)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query, selectedCategory)
    }, 300)

    return () => clearTimeout(timer)
  }, [query, selectedCategory, performSearch])

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    if (searchQuery.trim() && !recentSearches.includes(searchQuery)) {
      const updated = [searchQuery, ...recentSearches].slice(0, 5)
      setRecentSearches(updated)
      localStorage.setItem("zent-recent-searches", JSON.stringify(updated))
    }
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem("zent-recent-searches")
  }

  const categories = [
    { id: "all", label: "Tất cả" },
    { id: "ao-thun", label: "Áo thun" },
    { id: "quan-jean", label: "Quần jean" },
    { id: "ao-khoac", label: "Áo khoác" },
    { id: "ao-so-mi", label: "Áo sơ mi" },
    { id: "phu-kien", label: "Phụ kiện" },
  ]

  const popularSearches = ["Áo thun", "Quần jean", "Áo khoác", "Áo sơ mi", "Phụ kiện"]

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md animate-in fade-in duration-200">
      <div className="container mx-auto px-4 pt-20 pb-8 h-full overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          {/* Search Input */}
          <div className="flex items-center gap-3 border-b-2 border-accent pb-4 mb-8">
            <Search className="h-6 w-6 text-accent flex-shrink-0" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="flex-1 bg-transparent text-xl outline-none placeholder:text-muted-foreground"
              autoFocus
            />
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-full transition-colors"
              aria-label="Đóng tìm kiếm"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 mb-8 pb-6 border-b border-border overflow-x-auto scrollbar-hide">
            <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-4 py-2 text-sm rounded-full whitespace-nowrap transition-all",
                  selectedCategory === cat.id
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "border border-border hover:bg-muted hover:border-accent/50"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Results */}
          {query && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2 text-muted-foreground uppercase tracking-wide">
                <Search className="h-4 w-4" />
                Kết quả tìm kiếm {results.length > 0 && `(${results.length})`}
              </h3>

              {isSearching ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-4 animate-pulse">
                      <div className="w-20 h-20 bg-muted rounded-lg flex-shrink-0" />
                      <div className="flex-1 space-y-3">
                        <div className="h-4 bg-muted rounded w-3/4" />
                        <div className="h-3 bg-muted rounded w-full" />
                        <div className="h-3 bg-muted rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-3">
                  {results.map((result) => (
                    <Link
                      key={result.id}
                      href={result.url}
                      onClick={onClose}
                      className="flex gap-4 p-4 rounded-xl hover:bg-muted/50 transition-all group border border-transparent hover:border-border"
                    >
                      <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                        <Image
                          src={result.thumbnail}
                          alt={result.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-accent font-medium">{result.category}</span>
                          <span className="text-xs text-muted-foreground">• {result.time}</span>
                        </div>
                        <h4 className="font-semibold text-base mb-1 line-clamp-1 group-hover:text-accent transition-colors">
                          {result.title}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                          {result.description}
                        </p>
                        {result.price && (
                          <p className="text-base font-bold text-accent">
                            {result.price.toLocaleString("vi-VN")}đ
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
                  <p className="text-muted-foreground">
                    Không tìm thấy kết quả cho <span className="font-semibold">"{query}"</span>
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Recent Searches */}
          {!query && recentSearches.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold flex items-center gap-2 text-muted-foreground uppercase tracking-wide">
                  <Clock className="h-4 w-4" />
                  Tìm kiếm gần đây
                </h3>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Xóa tất cả
                </button>
              </div>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setQuery(search)}
                    className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg hover:bg-muted transition-colors group"
                  >
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="flex-1 text-sm">{search}</span>
                    <Search className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Searches */}
          {!query && (
            <div>
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2 text-muted-foreground uppercase tracking-wide">
                <TrendingUp className="h-4 w-4" />
                Tìm kiếm phổ biến
              </h3>
              <div className="flex flex-wrap gap-3">
                {popularSearches.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-5 py-2.5 text-sm border border-border rounded-full hover:bg-muted hover:border-accent transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
