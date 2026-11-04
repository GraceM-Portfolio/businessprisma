import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch real stats from Supabase
  const [articlesRes, draftsRes, issuesRes, trashRes] = await Promise.all([
    supabase.from('articles').select('*', { count: 'exact', head: true }).is('deleted_at', null),
    supabase.from('articles').select('*', { count: 'exact', head: true }).eq('is_published', false).is('deleted_at', null),
    supabase.from('issues').select('*', { count: 'exact', head: true }),
    supabase.from('articles').select('*', { count: 'exact', head: true }).not('deleted_at', 'is', null),
  ])

  const totalArticles = articlesRes.count || 0
  const totalDrafts = draftsRes.count || 0
  const totalIssues = issuesRes.count || 0
  const totalTrash = trashRes.count || 0

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
        <div>
          <h1 className="font-editorial text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-neutral-500">Welcome back. Here is an overview of Afrihue.</p>
        </div>
        <Link 
          href="/admin/articles/new"
          className="bg-[#a51f27] text-white px-6 py-3 text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-black transition-colors whitespace-nowrap"
        >
          + New Article
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        
        {/* Total Articles */}
        <Link href="/admin/articles" className="bg-white p-6 border border-neutral-200 hover:border-black transition-colors block group">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-500 mb-2 group-hover:text-black transition-colors">
            Total Articles
          </p>
          <p className="font-editorial text-5xl font-bold">{totalArticles}</p>
        </Link>

        {/* Drafts */}
        <Link href="/admin/articles" className="bg-white p-6 border border-neutral-200 hover:border-black transition-colors block group">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-500 mb-2 group-hover:text-black transition-colors">
            Unpublished Drafts
          </p>
          <p className="font-editorial text-5xl font-bold">{totalDrafts}</p>
        </Link>

        {/* Issues */}
        <Link href="/admin/issues" className="bg-white p-6 border border-neutral-200 hover:border-black transition-colors block group">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-500 mb-2 group-hover:text-black transition-colors">
            Magazine Issues
          </p>
          <p className="font-editorial text-5xl font-bold">{totalIssues}</p>
        </Link>

        {/* Trash */}
        <Link href="/admin/articles/trash" className="bg-white p-6 border border-neutral-200 hover:border-black transition-colors block group">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-500 mb-2 group-hover:text-black transition-colors">
            Recently Deleted
          </p>
          <p className="font-editorial text-5xl font-bold text-neutral-400 group-hover:text-[#a51f27] transition-colors">
            {totalTrash}
          </p>
        </Link>

      </div>

      {/* Quick Actions / Recent Activity could go here */}
      <div className="bg-white p-8 border border-neutral-200">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-500 mb-6">
          Quick Links
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/admin/articles" className="flex items-center justify-between p-4 bg-[#fafaf8] hover:bg-neutral-100 transition-colors border border-transparent hover:border-neutral-200">
            <span className="text-sm font-medium">Manage All Articles</span>
            <span className="text-neutral-400">→</span>
          </Link>
          <Link href="/admin/issues/new" className="flex items-center justify-between p-4 bg-[#fafaf8] hover:bg-neutral-100 transition-colors border border-transparent hover:border-neutral-200">
            <span className="text-sm font-medium">Upload New Issue</span>
            <span className="text-neutral-400">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}