'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function NewArticleClient({ categories }: { categories: any[] }) {
  const router = useRouter()
  const supabase = createClient()

  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category_id: '',
    is_premium: false,
    is_published: false,
  })

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let coverUrl = ''

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `${Date.now()}.${fileExt}`
        const { error: uploadError } = await supabase.storage.from('covers').upload(fileName, imageFile)
        if (uploadError) throw uploadError
        const { data: { publicUrl } } = supabase.storage.from('covers').getPublicUrl(fileName)
        coverUrl = publicUrl
      }

      const { error: dbError } = await supabase.from('articles').insert({
        title: formData.title,
        slug: generateSlug(formData.title),
        excerpt: formData.excerpt,
        content: formData.content,
        cover_image: coverUrl,
        category_id: formData.category_id,
        is_premium: formData.is_premium,
        is_published: formData.is_published,
        published_at: new Date().toISOString(),
      })

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
      <h1 className="font-editorial text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">Write New Article</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-5 sm:p-8 border border-neutral-200">
        
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.1em] mb-2">Article Title</label>
          <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full border border-neutral-300 p-3 text-lg focus:outline-none focus:border-black font-editorial" placeholder="e.g. The Future of African Fashion" />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.1em] mb-2">Short Excerpt</label>
          <textarea required rows={3} value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-black" placeholder="A brief summary of the article..." />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.1em] mb-2">Full Content (HTML)</label>
          <textarea required rows={10} value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="w-full border border-neutral-300 p-3 text-sm font-mono focus:outline-none focus:border-black" placeholder="<p>Write your paragraphs here...</p>" />
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
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="w-full border border-neutral-300 p-2 text-sm" />
          </div>
        </div>

        <div className="flex flex-wrap gap-6 border-t border-neutral-200 pt-6">
          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
            <input type="checkbox" checked={formData.is_premium} onChange={(e) => setFormData({ ...formData, is_premium: e.target.checked })} className="accent-[#a51f27] h-4 w-4" />
            Premium Article (Paywall)
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
            <input type="checkbox" checked={formData.is_published} onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })} className="accent-black h-4 w-4" />
            Publish Immediately
          </label>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-black text-white py-4 text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#a51f27] transition-colors disabled:opacity-50">
          {loading ? 'Saving...' : 'Save Article'}
        </button>
      </form>
    </div>
  )
}