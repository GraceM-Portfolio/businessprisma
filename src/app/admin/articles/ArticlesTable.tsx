'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react'

export default function ArticlesTable({ initialArticles }: { initialArticles: any[] }) {
  const [articles, setArticles] = useState(initialArticles)
  const supabase = createClient()

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to move this article to the trash?')) return
    
    setArticles(articles.filter(a => a.id !== id))
    
    const { error } = await supabase
      .from('articles')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id)
      
    if (error) {
      alert(error.message)
      window.location.reload()
    }
  }

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    setArticles(articles.map(a => a.id === id ? { ...a, is_published: !currentStatus } : a))
    
    const { error } = await supabase
      .from('articles')
      .update({ is_published: !currentStatus })
      .eq('id', id)
      
    if (error) {
      alert(error.message)
      window.location.reload()
    }
  }

  return (
    <div className="overflow-x-auto w-full">
      <div className="bg-white border border-neutral-200 min-w-[700px]">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#fafaf8] border-b border-neutral-200 text-[10px] font-bold uppercase tracking-[0.1em] text-neutral-500">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {articles.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-neutral-500">
                  No articles found.
                </td>
              </tr>
            ) : (
              articles.map((article) => (
                <tr key={article.id} className="hover:bg-[#fafaf8] transition-colors">
                  <td className="px-6 py-4 font-medium max-w-xs truncate">{article.title}</td>
                  <td className="px-6 py-4 text-neutral-500">{article.categories?.name || '—'}</td>
                  <td className="px-6 py-4">
                    {article.is_published ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-green-50 text-green-700 border border-green-200">
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-yellow-50 text-yellow-700 border border-yellow-200">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-3">
                    <Link href={`/article/${article.slug}`} target="_blank" className="p-2 text-neutral-400 hover:text-black transition-colors" title="View Live">
                      <Eye size={16} />
                    </Link>
                    <Link href={`/admin/articles/edit/${article.id}`} className="p-2 text-neutral-400 hover:text-black transition-colors" title="Edit">
                      <Edit size={16} />
                    </Link>
                    <button onClick={() => handleTogglePublish(article.id, article.is_published)} className="p-2 text-neutral-400 hover:text-yellow-600 transition-colors" title={article.is_published ? "Unpublish" : "Publish"}>
                      {article.is_published ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button onClick={() => handleDelete(article.id)} className="p-2 text-neutral-400 hover:text-red-600 transition-colors" title="Move to Trash">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}