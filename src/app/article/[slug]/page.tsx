import Image from 'next/image'
import Link from 'next/link'
import { createPublicClient } from '@/lib/supabase/public'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import PremiumGate from '@/components/PremiumGate'
import CommentSection from '@/components/CommentSection'

export const dynamic = 'force-dynamic'
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80'

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = createPublicClient()

  // 1. Fetch the article
  const { data: article } = await supabase
    .from('articles')
    .select('*, categories(name, slug), profiles(full_name)')
    .eq('slug', slug)
    .eq('is_published', true)
    .is('deleted_at', null)
    .single()

  if (!article) notFound()

  // 2. Check for Premium Access
  let hasAccess = !article.is_premium
  
  if (article.is_premium) {
    try {
      const authClient = await createClient()
      const { data: { user } } = await authClient.auth.getUser()
      
      if (user) {
        const { data: profile } = await authClient
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single()
        
        if (profile?.role === 'premium_user' || profile?.role === 'admin') {
          hasAccess = true
        }
      }
    } catch (e) {
      // If not logged in, hasAccess remains false
    }
  }

  // 3. Fetch Related Articles
  const { data: related } = await supabase
    .from('articles')
    .select('*, categories(name)')
    .eq('category_id', article.category_id)
    .neq('id', article.id)
    .eq('is_published', true)
    .is('deleted_at', null)
    .limit(3)

  // Create a text preview for the paywall
  const previewText = article.content?.replace(/<[^>]*>/g, '').substring(0, 400) + '...'

  return (
    <main className="min-h-screen bg-[#fafaf8]">
      
      {/* Article Header */}
      <header className="mx-auto max-w-4xl px-6 pt-20 pb-12 text-center">
        <Link 
          href={`/category/${article.categories?.slug}`}
          className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#a51f27] hover:text-black transition-colors"
        >
          {article.categories?.name}
        </Link>
        <h1 className="font-editorial mt-6 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          {article.title}
        </h1>
        <p className="mt-8 text-[13px] font-bold uppercase tracking-[0.1em] text-neutral-500">
          By {article.profiles?.full_name || 'Afrihue Editorial'} · {new Date(article.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </header>

      {/* Hero Image */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 mb-16">
        <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden bg-neutral-900">
          <Image
            src={article.cover_image || FALLBACK_IMAGE}
            alt={article.title}
            fill
            priority
            unoptimized
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/10 pointer-events-none mix-blend-multiply"></div>
        </div>
      </div>

      {/* Article Body */}
      <article className="mx-auto max-w-2xl px-6 pb-24">
        
        {/* Excerpt */}
        {article.excerpt && (
          <p className="font-editorial text-2xl leading-relaxed text-neutral-800 mb-12 border-l-2 border-[#a51f27] pl-6">
            {article.excerpt}
          </p>
        )}

        {/* Content (Gated or Unlocked) */}
        {hasAccess ? (
          <>
            <div 
              className="prose prose-lg prose-neutral max-w-none prose-headings:font-editorial prose-headings:font-bold prose-a:text-[#a51f27]"
              dangerouslySetInnerHTML={{ __html: article.content }} 
            />
            <CommentSection articleId={article.id} />
          </>
        ) : (
          <PremiumGate previewText={previewText} />
        )}
      </article>

      {/* Related Stories */}
      {related && related.length > 0 && (
        <section className="bg-black text-white py-20">
          <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#a51f27] mb-10">
              More in {article.categories?.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((item) => (
                <Link key={item.id} href={`/article/${item.slug}`} className="group">
                  <div className="relative aspect-[4/3] mb-5 overflow-hidden bg-neutral-900">
                    <Image
                      src={item.cover_image || FALLBACK_IMAGE}
                      alt={item.title}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                  </div>
                  <h3 className="font-editorial text-2xl font-bold leading-tight group-hover:text-[#e85a5a] transition-colors">
                    {item.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
