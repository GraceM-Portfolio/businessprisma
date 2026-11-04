'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200'

export default function Carousel({ 
  articles, 
  title, 
  linkText, 
  linkHref,
  isSelectedStories = false 
}: { 
  articles: any[], 
  title: string, 
  linkText: string, 
  linkHref: string,
  isSelectedStories?: boolean 
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Arrow Navigation
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef
      const scrollAmount = current.clientWidth * 0.8
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  // Timed Auto-Scroll
  useEffect(() => {
    if (isHovered) return

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { current } = scrollRef
        const isAtEnd = current.scrollLeft + current.clientWidth >= current.scrollWidth - 10
        
        if (isAtEnd) {
          current.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          scroll('right')
        }
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [isHovered])

  const selectedSizeClasses = [
    'w-[85vw] sm:w-[45vw] lg:w-auto h-[420px] lg:col-span-3 lg:h-[460px]',
    'w-[50vw] sm:w-[30vw] lg:w-auto h-[360px] lg:col-span-2 lg:h-[380px]',
    'w-[60vw] sm:w-[35vw] lg:w-auto h-[460px] lg:col-span-2 lg:h-[480px]',
    'w-[70vw] sm:w-[40vw] lg:w-auto h-[400px] lg:col-span-3 lg:h-[420px]',
    'w-[65vw] sm:w-[35vw] lg:w-auto h-[380px] lg:col-span-2 lg:h-[400px]',
  ]

  return (
    <section 
      className="bg-[#fafaf8] py-14 sm:py-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
        
        {/* Header with Arrows */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-black">
            {title}
          </h2>
          
          <div className="flex items-center gap-6">
            <Link href={linkHref} className="text-[11px] font-medium uppercase tracking-[0.14em] text-black transition-colors hover:text-[#a51f27]">
              {linkText}
            </Link>
            
            <div className="flex gap-2 lg:hidden">
              <button onClick={() => scroll('left')} className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 transition-colors hover:bg-black hover:text-white">
                <ChevronLeft size={16} />
              </button>
              <button onClick={() => scroll('right')} className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 transition-colors hover:bg-black hover:text-white">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={scrollRef}
          className={`no-scrollbar flex items-start snap-x snap-mandatory scroll-smooth overflow-x-auto pb-6 ${
            isSelectedStories 
              ? '-mx-6 gap-3 px-6 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-12 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0' 
              : '-mx-6 gap-5 px-6 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-7 lg:overflow-visible lg:px-0 lg:pb-0'
          }`}
        >
          {articles.map((article, i) => {
            const isRedBlock = isSelectedStories && i === 2

            if (!isSelectedStories) {
              return (
                <Link
                  key={article.id}
                  href={`/article/${article.slug}`}
                  className="group block w-[85vw] flex-none snap-start sm:w-[45vw] lg:w-auto"
                >
                  <div className="relative mb-5 aspect-[5/4] overflow-hidden bg-neutral-100">
                    <Image
                      src={article.cover_image || FALLBACK_IMAGE}
                      alt={article.title}
                      fill
                      unoptimized
                      sizes="(max-width: 639px) 78vw, (max-width: 1023px) 45vw, 33vw"
                      // 👇 This line applies the filter to index 1 (Card 2) 👇
                      className={`object-cover transition-transform duration-700 group-hover:scale-[1.03] ${i === 1 ? 'hero-editorial-filter' : ''}`}
                    />
                    <span className="font-editorial absolute left-4 top-4 text-[32px] font-bold leading-none text-[#a51f27]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#a51f27]">
                    {article.categories?.name || 'Culture'}
                  </p>
                  <h3 className="font-editorial mb-2.5 text-[20px] font-bold leading-[1.15] text-black transition-colors group-hover:text-[#a51f27]">
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="mb-3 line-clamp-2 text-[13px] font-normal leading-[1.55] text-black">
                      {article.excerpt}
                    </p>
                  )}
                </Link>
              )
            }

            return (
              <Link
                key={article.id}
                href={`/article/${article.slug}`}
                className={`group relative block flex-none snap-start overflow-hidden ${
                  selectedSizeClasses[i]
                } ${isRedBlock ? 'bg-[#a51f27]' : 'bg-neutral-100'}`}
              >
                {isRedBlock ? (
                  <div className="flex h-full flex-col p-4 text-white sm:p-6">
                    <span className="font-editorial text-[42px] font-bold leading-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.18em]">
                      {article.categories?.name || 'Culture'}
                    </p>
                    <h3 className="font-editorial mt-2 text-[18px] font-bold leading-[1.15] sm:text-[22px]">
                      {article.title}
                    </h3>
                    <div className="relative mt-auto aspect-[3/4] w-full overflow-hidden">
                      <Image
                        src={article.cover_image || FALLBACK_IMAGE}
                        alt={article.title}
                        fill
                        unoptimized
                        sizes="(max-width: 639px) 60vw, 18vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <Image
                      src={article.cover_image || FALLBACK_IMAGE}
                      alt={article.title}
                      fill
                      unoptimized
                      sizes="(max-width: 639px) 70vw, (max-width: 1023px) 40vw, 20vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                    <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
                      <span className="font-editorial text-[36px] font-bold leading-none text-[#a51f27]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                      <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.16em]">
                        {article.categories?.name || 'Culture'}
                      </p>
                      <h3 className="font-editorial text-[17px] font-bold leading-[1.15] sm:text-[19px]">
                        {article.title}
                      </h3>
                    </div>
                  </>
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}