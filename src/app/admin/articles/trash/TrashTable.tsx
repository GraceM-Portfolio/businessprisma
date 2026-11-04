'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { RotateCcw, Trash2, AlertTriangle } from 'lucide-react'

export default function TrashTable({ initialArticles }: { initialArticles: any[] }) {
  const [articles, setArticles] = useState(initialArticles)
  const supabase = createClient()

  const handleRestore = async (id: string) => {
    setArticles(articles.filter(a => a.id !== id))
    await supabase.from('articles').update({ deleted_at: null }).eq('id', id)
  }

  const handlePermanentDelete = async (id: string) => {
    if (!confirm('Are you sure? This will permanently delete the article from the database forever.')) return
    
    setArticles(articles.filter(a => a.id !== id))
    await supabase.from('articles').delete().eq('id', id)
  }

  if (articles.length === 0) {
    return (
      <div className="bg-white border border-neutral-200 p-12 text-center text-neutral-500">
        <Trash2 size={40} className="mx-auto mb-4 opacity-20" />
        <p>The trash is empty.</p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-neutral-200 overflow-hidden">
      <div className="bg-red-50 border-b border-red-100 p-4 flex items-center gap-3 text-red-700 text-sm">
        <AlertTriangle size={18} />
        <p>Items in the trash are not visible to readers and will be permanently deleted after 30 days.</p>
      </div>
      <table className="w-full text-left text-sm">
        <thead className="bg-[#fafaf8] border-b border-neutral-200 text-[10px] font-bold uppercase tracking-[0.1em] text-neutral-500">
          <tr>
            <th className="px-6 py-4">Title</th>
            <th className="px-6 py-4">Deleted On</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {articles.map((article) => (
            <tr key={article.id} className="hover:bg-[#fafaf8] transition-colors text-neutral-500">
              <td className="px-6 py-4 font-medium max-w-xs truncate">{article.title}</td>
              <td className="px-6 py-4">{new Date(article.deleted_at).toLocaleDateString()}</td>
              <td className="px-6 py-4 text-right flex items-center justify-end gap-3">
                <button 
                  onClick={() => handleRestore(article.id)} 
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-green-600 hover:text-green-800 transition-colors"
                >
                  <RotateCcw size={14} /> Restore
                </button>
                <button 
                  onClick={() => handlePermanentDelete(article.id)} 
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-red-600 hover:text-red-800 transition-colors"
                >
                  <Trash2 size={14} /> Delete Forever
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}