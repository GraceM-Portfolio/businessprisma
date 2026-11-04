'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function EditArticleClient({ article, categories }: { article: any, categories: any[] }) {
  const router = useRouter()
  const supabase = createClient()

  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  
  const [formData, setFormData] = useState({
    title: article.title,
    excerpt: article.excerpt || '',
    content: article.content || '',
    category_id: article.category_id || '',
    is_premium: article.is_premium,
    is_published: article.is_published,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let coverUrl = article.cover_image

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `${Date.now()}.${fileExt}`
        const { error: uploadError } = await supabase.storage.from('covers').upload(fileName, imageFile)
        if (uploadError) throw uploadError
        const { data: { publicUrl } } = supabase.storage.from('covers').getPublicUrl(fileName)
        coverUrl = publicUrl
      }

      const { error: dbError } = await supabase
        .from('articles')
        .update({
          title: formData.title,
          excerpt: formData.excerpt,
          content: formData.content,
          cover_image: coverUrl,
          category_id: formData.category_id,
          is_premium: formData.is_premium,
          is_published: formData.is_published,
          ...(formData.is_published && !article.is_published ? { published_at: new Date().toISOString() } : {})
        })
        .eq('id', article.id)

      if (dbError) throw dbError

      router.push('/admin/articles')
      router.refresh()
      
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <h1 className="font-editorial text-3xl sm:text-4xl font-bold">Edit Article</h1>
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-500 bg-neutral-200 px-3 py-1 w-fit">
          ID: {article.id.split('-')[0]}...
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-5 sm:p-8 border border-neutral-200">
        
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.1em] mb-2">Article Title</label>
          <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full border border-neutral-300 p-3 text-lg focus:outline-none focus:border-black font-editorial" />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.1em] mb-2">Short Excerpt</label>
          <textarea required rows={3} value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-black" />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.1em] mb-2">Full Content (HTML allowed)</label>
          <textarea required rows={10} value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="w-full border border-neutral-300 p-3 text-sm font-mono focus:outline-none focus:border-black" />
        </div>

        {/* Mobile responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.1em] mb-2">Category</label>
            <select required value={formData.category_id} onChange={(e) => setFormData({ ...formData, category_id: e.target.value })} className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-black bg-white">
              <option value="" disabled>Select a category</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.1em] mb-2">Cover Image</label>
            <div className="flex items-center gap-4">
              {article.cover_image && (
                <div className="relative h-12 w-12 shrink-0 overflow-hidden border border-neutral-200">
                  <Image src={article.cover_image} alt="Current" fill className="object-cover" />
                </div>
              )}
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="w-full border border-neutral-300 p-2 text-sm" />
            </div>
            <p className="text-[10px] text-neutral-500 mt-2">Leave empty to keep the current image.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 border-t border-neutral-200 pt-6">
          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
            <input type="checkbox" checked={formData.is_premium} onChange={(e) => setFormData({ ...formData, is_premium: e.target.checked })} className="accent-[#a51f27] h-4 w-4" />
            Premium Article (Paywall)
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
            <input type="checkbox" checked={formData.is_published} onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })} className="accent-black h-4 w-4" />
            Published
          </label>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button type="button" onClick={() => router.back()} className="w-full bg-neutral-200 text-black py-4 text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-neutral-300 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="w-full bg-black text-white py-4 text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#a51f27] transition-colors disabled:opacity-50">
            {loading ? 'Saving Changes...' : 'Update Article'}
          </button>
        </div>
      </form>
    </div>
  )
}