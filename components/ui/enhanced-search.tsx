import { useState, useRef, useEffect } from "react"
import { Search, X, Filter } from "lucide-react"
import { Input } from "./input"
import { Button } from "./button"
import { cn } from "@/lib/utils"

interface SearchResult {
  id: string
  title: string
  description?: string
  type: string
  url: string
}

interface EnhancedSearchProps {
  placeholder?: string
  onSearch?: (query: string) => void
  onFilter?: () => void
  results?: SearchResult[]
  onResultClick?: (result: SearchResult) => void
  className?: string
  showFilters?: boolean
}

export function EnhancedSearch({
  placeholder = "Search...",
  onSearch,
  onFilter,
  results = [],
  onResultClick,
  className,
  showFilters = true
}: EnhancedSearchProps) {
  const [query, setQuery] = useState("")
  const [showResults, setShowResults] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    onSearch?.(searchQuery)
    setShowResults(searchQuery.length > 0)
  }

  const handleClear = () => {
    setQuery("")
    setShowResults(false)
    onSearch?.("")
    inputRef.current?.focus()
  }

  const handleResultClick = (result: SearchResult) => {
    onResultClick?.(result)
    setShowResults(false)
    setQuery("")
  }

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          ref={inputRef}
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query.length > 0 && setShowResults(true)}
          className="pl-10 pr-20"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          {query && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-6 w-6 p-0"
            >
              <X className="w-3 h-3" />
            </Button>
          )}
          {showFilters && onFilter && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onFilter}
              className="h-6 w-6 p-0"
            >
              <Filter className="w-3 h-3" />
            </Button>
          )}
        </div>
      </div>

      {showResults && results.length > 0 && (
        <div
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-50 max-h-64 overflow-y-auto"
        >
          {results.map((result) => (
            <div
              key={result.id}
              className="p-3 hover:bg-muted cursor-pointer border-b last:border-b-0"
              onClick={() => handleResultClick(result)}
            >
              <div className="font-medium text-sm">{result.title}</div>
              {result.description && (
                <div className="text-xs text-muted-foreground mt-1">
                  {result.description}
                </div>
              )}
              <div className="text-xs text-primary mt-1 capitalize">
                {result.type}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
