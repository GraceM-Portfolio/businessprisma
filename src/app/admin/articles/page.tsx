import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import ArticlesTable from './ArticlesTable'

export const dynamic = 'force-dynamic'

export default async function AdminArticlesPage() {
  const supabase = await createClient()

  const { data: articles } = await supabase
    .from('articles')
    .select('*, categories(name)')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-editorial text-4xl font-bold mb-2">Articles</h1>
          <p className="text-neutral-500">Manage your published stories and drafts.</p>
        </div>
        <Link 
          href="/admin/articles/new"
          className="bg-black text-white px-6 py-3 text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#a51f27] transition-colors"
        >
          + New Article
        </Link>
      </div>

      <ArticlesTable initialArticles={articles || []} />
    </div>
  )
}