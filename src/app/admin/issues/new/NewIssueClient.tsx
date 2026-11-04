'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function NewIssueClient() {
  const router = useRouter()
  const supabase = createClient()

  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    release_date: new Date().toISOString().split('T')[0], // Today's date
    is_print: true,
    is_digital: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let coverUrl = ''

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `issue-${Date.now()}.${fileExt}`
        const { error: uploadError } = await supabase.storage.from('covers').upload(fileName, imageFile)
        if (uploadError) throw uploadError
        const { data: { publicUrl } } = supabase.storage.from('covers').getPublicUrl(fileName)
        coverUrl = publicUrl
      }

      const { error: dbError } = await supabase.from('issues').insert({
        title: formData.title,
        description: formData.description,
        release_date: formData.release_date,
        is_print: formData.is_print,
        is_digital: formData.is_digital,
        cover_image: coverUrl,
      })

      if (dbError) throw dbError

      router.push('/admin/issues')
      router.refresh()
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-editorial text-4xl font-bold mb-8">Create New Issue</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 border border-neutral-200">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.1em] mb-2">Issue Title</label>
          <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full border border-neutral-300 p-3 text-lg font-editorial focus:outline-none focus:border-black" placeholder="e.g. Issue 01: Obsession" />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-[0.1em] mb-2">Description</label>
          <textarea required rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-black" placeholder="A brief summary of the issue..." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.1em] mb-2">Release Date</label>
            <input type="date" required value={formData.release_date} onChange={(e) => setFormData({ ...formData, release_date: e.target.value })} className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-black" />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.1em] mb-2">Cover Image</label>
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="w-full border border-neutral-300 p-2 text-sm" />
          </div>
        </div>

        <div className="flex gap-8 border-t border-neutral-200 pt-6">
          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
            <input type="checkbox" checked={formData.is_print} onChange={(e) => setFormData({ ...formData, is_print: e.target.checked })} className="accent-black h-4 w-4" />
            Print Edition Available
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
            <input type="checkbox" checked={formData.is_digital} onChange={(e) => setFormData({ ...formData, is_digital: e.target.checked })} className="accent-black h-4 w-4" />
            Digital Edition Available
          </label>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-black text-white py-4 text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#a51f27] transition-colors disabled:opacity-50">
          {loading ? 'Saving...' : 'Publish Issue'}
        </button>
      </form>
    </div>
  )
}