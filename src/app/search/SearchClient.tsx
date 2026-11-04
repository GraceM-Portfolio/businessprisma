'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import Image from 'next/image'
import { Search } from 'lucide-react'

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200'

export default function SearchClient({ initialQuery }: { initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  
  const supabase = createClient()

  useEffect(() => {
    const searchArticles = async () => {
      if (!query.trim()) {
        setResults([])
        setHasSearched(false)
        return
      }

      setLoading(true)
      setHasSearched(true)
      
      const { data, error } = await supabase
        .from('articles')
        .select('*, categories(name)')
        .eq('is_published', true)
        .is('deleted_at', null)
        // 👈 Searches Title OR Excerpt only (much faster)
        .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%`)
        .order('published_at', { ascending: false })
      
      if (error) {
        console.error("Search error:", error)
      } else {
        setResults(data || [])
      }
      setLoading(false)
    }

    // 400ms debounce
    const delayDebounceFn = setTimeout(() => {
      searchArticles()
    }, 400)

    return () => clearTimeout(delayDebounceFn)
  }, [query, supabase])

  return (
    <main className="min-h-screen bg-[#fafaf8] pb-24">
      <header className="bg-black text-white py-20 px-6 text-center">
        <h1 className="font-editorial text-5xl sm:text-7xl font-bold uppercase tracking-tight mb-8">
          Search
        </h1>
        
        <div className="max-w-2xl mx-auto relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stories..."
            className="w-full bg-transparent border-b-2 border-neutral-600 py-4 pl-12 pr-24 text-xl text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#a51f27]"
            autoFocus
          />
          <Search size={24} className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-500" />
          
          {loading && (
            <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-widest text-[#a51f27] animate-pulse">
              Searching...
            </span>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12 mt-16">
        {!loading && hasSearched && results.length === 0 && (
          <div className="text-center py-20">
            <p className="font-editorial text-2xl mb-2">No results found for &quot;{query}&quot;</p>
            <p className="text-neutral-500 text-sm">Try searching for a different keyword or browse our categories.</p>
          </div>
        )}

        {!loading && !hasSearched && (
          <div className="text-center py-20">
            <p className="text-neutral-500">Start typing to explore the archive.</p>
          </div>
        )}

        {results.length > 0 && (
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-8 border-b border-neutral-200 pb-4">
              {results.length} {results.length === 1 ? 'Story' : 'Stories'} found
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {results.map((article) => (
                <Link key={article.id} href={`/article/${article.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 mb-4">
                    <Image
                      src={article.cover_image || FALLBACK_IMAGE}
                      alt={article.title}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#a51f27]">
                    {article.categories?.name}
                  </p>
                  <h3 className="font-editorial text-2xl font-bold leading-tight group-hover:text-[#a51f27] transition-colors">
                    {article.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
