import Image from 'next/image'
import Link from 'next/link'
import { createPublicClient } from '@/lib/supabase/public'
import Carousel from '@/components/Carousel'
import HeroCarousel from '@/components/HeroCarousel'

export const dynamic = 'force-dynamic'

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80'
const CATEGORIES = ['Fashion', 'Beauty', 'Culture', 'Music', 'Art', 'Film']

export default async function HomePage() {
  const supabase = createPublicClient()

  const { data: articles, error } = await supabase
    .from('articles')
    .select('*, categories(name, slug)')
    .eq('is_published', true)
    .is('deleted_at', null) // 👈 Ignore trashed articles
    .order('published_at', { ascending: false })

  if (error) console.error('Unable to load homepage articles:', error.message)

  const list = articles || []
  
  const heroArticles = list.slice(0, 5)
  const featured = list[5] || list[0]
  const featuredSidebar = list.slice(6, 9)
  const latest = list.slice(9, 12)
  const selected = list.slice(12, 17)

  return (
    <main className="min-h-screen bg-[#fafaf8] text-[#0a0a0a]">
      
      {/* HERO CAROUSEL */}
      <HeroCarousel articles={heroArticles} />

      {/* FEATURED */}
      {featured && (
        <section className="bg-black text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Text Column */}
            <div className="flex flex-col justify-center border-b border-neutral-800 px-8 py-12 sm:px-10 lg:col-span-3 lg:border-b-0 lg:border-r lg:px-10 lg:py-14">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#a51f27]">
                Featured
              </p>
              <h2 className="font-editorial mb-5 text-[34px] font-bold leading-[0.92] tracking-tight">
                OBSESSION
                <br />
                ISSUE
              </h2>
              <p className="mb-7 max-w-[220px] text-[13px] font-normal leading-[1.65] text-white">
                A visual manifesto exploring desire, identity, and the power of
                self-expression.
              </p>
              <Link
                href="/issues"
                className="w-fit text-[11px] font-bold uppercase tracking-[0.16em] text-[#a51f27] transition-colors hover:text-white"
              >
                Explore the Archive
              </Link>
            </div>

            {/* Center Image Column with Bottom Left Red Overlay */}
            <div className="relative min-h-[340px] overflow-hidden sm:min-h-[420px] lg:col-span-6 lg:min-h-[400px]">
              <Image
                src={featured.cover_image || FALLBACK_IMAGE}
                alt={featured.title}
                fill
                unoptimized
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover object-center"
              />
              {/* Bottom Left Red Overlay Box */}
              <div className="absolute bottom-[15%] left-[15%] h-[55%] w-[55%] bg-[#b5121b] mix-blend-multiply opacity-80 pointer-events-none"></div>
            </div>

            {/* Right Sidebar Column */}
            <div className="flex flex-col justify-center gap-8 px-8 py-10 sm:px-10 lg:col-span-3 lg:gap-9 lg:px-9 lg:py-12">
              {featuredSidebar.map((item) => (
                <div key={item.id}>
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#a51f27]">
                    {item.categories?.name || 'Culture'}
                  </p>
                  <Link
                    href={`/article/${item.slug}`}
                    className="font-editorial block text-[17px] font-bold leading-[1.2] transition-colors hover:text-[#e85a5a]"
                  >
                    {item.title}
                  </Link>
                </div>
              ))}
            </div>
            
          </div>
        </section>
      )}

      {/* LATEST CAROUSEL */}
      {latest.length > 0 && (
        <Carousel 
          articles={latest} 
          title="Latest" 
          linkText="View all" 
          linkHref="/category/fashion" 
        />
      )}

      {/* CATEGORY STRIP */}
      <section className="bg-black py-8 text-white">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-center gap-x-10 gap-y-8 px-6 sm:gap-x-16 sm:px-8 lg:gap-x-24 lg:px-12">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat}
              href={`/category/${cat.toLowerCase()}`}
              className="group flex flex-col items-start transition-colors hover:text-[#e85a5a]"
            >
              <span className="font-editorial mb-1 text-[22px] font-bold leading-none text-[#a51f27]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-editorial text-[14px] font-bold uppercase tracking-[0.06em]">
                {cat}
              </span>
              <span className="mt-1 text-[11px] opacity-60 transition-opacity group-hover:opacity-100">
                ↗
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* SELECTED STORIES CAROUSEL */}
      {selected.length > 0 && (
        <Carousel 
          articles={selected} 
          title="Selected Stories" 
          linkText="View all stories" 
          linkHref="/category/culture" 
          isSelectedStories={true}
        />
      )}

    </main>
  )
}