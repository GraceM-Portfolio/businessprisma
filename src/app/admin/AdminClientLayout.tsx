'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function AdminClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [mounted, setMounted] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    setMounted(true)
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session) {
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', session.user.id).single()
        if (profile?.role === 'admin' || profile?.role === 'editor') {
          setIsAdmin(true)
        }
      }
      setLoading(false)
    }
    checkAdmin()
  }, [supabase])

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-[#f4f4f0] flex items-center justify-center">
        <p className="font-editorial text-2xl animate-pulse">Verifying Access...</p>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#f4f4f0] flex flex-col items-center justify-center">
        <h1 className="font-editorial text-4xl font-bold mb-4">Access Denied</h1>
        <p className="text-neutral-500 mb-8">You do not have administrator privileges, or your session expired.</p>
        <Link href="/login" className="bg-black text-white px-8 py-3 text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#a51f27]">
          Log In Again
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f4f4f0]">
      <header className="bg-black text-white px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-0 z-50">
        <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-start">
          <span className="font-editorial text-2xl font-bold">Afrihue CMS</span>
          <Link href="/" className="text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-400 hover:text-white transition-colors sm:hidden">View Site ↗</Link>
        </div>
        
        <nav className="flex gap-6 text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-400 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <Link href="/admin" className="hover:text-white transition-colors whitespace-nowrap">Dashboard</Link>
          <Link href="/admin/articles" className="hover:text-white transition-colors whitespace-nowrap">Articles</Link>
          <Link href="/admin/issues" className="hover:text-white transition-colors whitespace-nowrap">Issues</Link>
        </nav>

        <Link href="/" className="hidden sm:block text-[11px] font-bold uppercase tracking-[0.15em] hover:text-[#a51f27] transition-colors shrink-0">View Site ↗</Link>
      </header>

      <main className="max-w-[1400px] mx-auto py-8 sm:py-12 px-4 sm:px-6">
        {children}
      </main>
    </div>
  )
}