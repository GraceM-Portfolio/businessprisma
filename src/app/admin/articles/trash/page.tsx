import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import TrashTable from './TrashTable'

export const dynamic = 'force-dynamic'

export default async function TrashPage() {
  const supabase = await createClient()

  // Fetch ONLY deleted articles
  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .not('deleted_at', 'is', null)
    .order('deleted_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-editorial text-4xl font-bold mb-2">Recently Deleted</h1>
          <p className="text-neutral-500">Articles here will be permanently deleted after 30 days.</p>
        </div>
        <Link 
          href="/admin/articles"
          className="bg-black text-white px-6 py-3 text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#a51f27] transition-colors"
        >
          ← Back to Articles
        </Link>
      </div>

      <TrashTable initialArticles={articles || []} />
    </div>
  )
}