import Image from 'next/image'
import Link from 'next/link'
import { createPublicClient } from '@/lib/supabase/public'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200'

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = createPublicClient()

  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!category) notFound()

  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .eq('category_id', category.id)
    .eq('is_published', true)
    .is('deleted_at', null) // 👈 Ignore trashed articles
    .order('published_at', { ascending: false })

  return (
    <main className="min-h-screen bg-[#fafaf8] pb-24">
      {/* Category Header */}
      <header className="bg-black text-white py-24 px-6 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#a51f27] mb-4">
          Archive
        </p>
        <h1 className="font-editorial text-6xl sm:text-8xl font-bold uppercase tracking-tight">
          {category.name}
        </h1>
      </header>

      {/* Articles Grid */}
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12 mt-16">
        {!articles || articles.length === 0 ? (
          <p className="text-center text-neutral-500 py-20">No stories published in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, i) => (
              <Link key={article.id} href={`/article/${article.slug}`} className="group block">
                <div className="relative mb-6 aspect-[4/5] overflow-hidden bg-neutral-100">
                  <Image
                    src={article.cover_image || FALLBACK_IMAGE}
                    alt={article.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <span className="font-editorial absolute left-5 top-5 text-[40px] font-bold leading-none text-[#a51f27]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#a51f27]">
                  {category.name}
                </p>
                <h3 className="font-editorial mb-3 text-2xl font-bold leading-[1.15] text-black transition-colors group-hover:text-[#a51f27]">
                  {article.title}
                </h3>
                {article.excerpt && (
                  <p className="line-clamp-2 text-[14px] leading-relaxed text-neutral-600">
                    {article.excerpt}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}