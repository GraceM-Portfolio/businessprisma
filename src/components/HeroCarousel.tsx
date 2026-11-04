'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200'

export default function HeroCarousel({ articles }: { articles: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % articles.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length)

  useEffect(() => {
    if (articles.length <= 1) return

    const interval = setInterval(() => {
      nextSlide()
    }, 6000)

    return () => clearInterval(interval)
  }, [articles.length])

  if (!articles || articles.length === 0) return null

  const hero = articles[currentIndex]

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      {/* Image Section */}
      <div className="relative h-[460px] overflow-hidden bg-black sm:h-[520px] lg:h-[600px]">
        {articles.map((article, i) => (
          <div 
            key={article.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <Image
              src={article.cover_image || FALLBACK_IMAGE}
              alt={article.title}
              fill
              priority={i === 0}
              unoptimized
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover object-[center_18%] hero-editorial-filter"
            />
          </div>
        ))}
      </div>

      {/* Text Section */}
      <div className="relative flex flex-col justify-center bg-white px-8 py-14 sm:px-12 lg:px-16 xl:px-20">
        <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#a51f27]">
          Cover Story
        </p>

        <div key={hero.id} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="font-editorial mb-6 max-w-[520px] text-[52px] font-bold uppercase leading-[0.88] tracking-[-0.03em] sm:text-[64px] lg:text-[clamp(60px,5.8vw,80px)]">
            {hero.title}
          </h1>

          {hero.excerpt && (
            <p className="mb-8 max-w-[320px] text-[15px] font-normal leading-[1.7] text-black">
              {hero.excerpt}
            </p>
          )}

          <Link
            href={`/article/${hero.slug}`}
            className="group inline-flex w-fit items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] text-[#a51f27]"
          >
            <span className="border-b border-[#a51f27] pb-[1px]">
              Read the story
            </span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Navigation & Pagination */}
        <div className="mt-12 flex w-full items-end justify-between lg:absolute lg:bottom-10 lg:right-10 lg:mt-0 lg:w-auto lg:flex-col lg:items-end lg:justify-start lg:gap-6">
          
          {/* Arrows */}
          <div className="flex gap-2 order-1 lg:order-none">
            <button 
              onClick={prevSlide}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 transition-colors hover:bg-black hover:text-white"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
            <button 
              onClick={nextSlide}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 transition-colors hover:bg-black hover:text-white"
            >
              <ChevronRight size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Numbers: Always Vertical */}
          <div className="flex flex-col items-center gap-2 text-[13px] font-bold text-black order-2 lg:order-none">
            <span className="text-[#a51f27]">{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="h-6 w-px bg-neutral-300" />
            <span>{String(articles.length).padStart(2, '0')}</span>
          </div>
          
        </div>
      </div>
    </section>
  )
}