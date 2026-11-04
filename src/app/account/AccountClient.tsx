'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function AccountClient() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [mounted, setMounted] = useState(false)
  
  const supabase = createClient()

  useEffect(() => {
    setMounted(true)
    const getData = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session) {
        setUser(session.user)
        const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()
        setProfile(data)
      }
      setLoading(false)
    }

    getData()
  }, [supabase])

  // Prevent hydration mismatch
  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-[#fafaf8] flex items-center justify-center">
        <p className="font-editorial text-2xl animate-pulse">Loading Profile...</p>
      </div>
    )
  }

  // If not logged in, show a message instead of force-redirecting
  if (!user) {
    return (
      <div className="min-h-screen bg-[#fafaf8] flex flex-col items-center justify-center">
        <h1 className="font-editorial text-4xl font-bold mb-4">Not Logged In</h1>
        <p className="text-neutral-500 mb-8">Please log in to view your profile.</p>
        <Link href="/login" className="bg-black text-white px-8 py-3 text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#a51f27]">
          Go to Login
        </Link>
      </div>
    )
  }

  const isPremium = profile?.role === 'premium_user' || profile?.role === 'admin'

  return (
    <main className="min-h-screen bg-[#fafaf8] py-20 px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 border-b border-neutral-200 pb-8 flex justify-between items-end">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#a51f27] mb-2">Reader Dashboard</p>
            <h1 className="font-editorial text-5xl font-bold tracking-tight">Welcome, {profile?.full_name?.split(' ')[0] || 'Reader'}.</h1>
          </div>
          <button onClick={async () => { await supabase.auth.signOut(); window.location.href='/'; }} className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#a51f27] border border-[#a51f27] px-4 py-2 hover:bg-[#a51f27] hover:text-white transition-colors">
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 border border-neutral-200">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-500 mb-6">Account Details</h2>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-neutral-500 mb-1">Email Address</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-neutral-500 mb-1">Member Since</p>
                <p className="font-medium">{new Date(user.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-black text-white p-8 border border-black relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#a51f27] mix-blend-multiply opacity-40 blur-2xl pointer-events-none"></div>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400 mb-6 relative z-10">Membership</h2>
            <div className="relative z-10">
              <p className="font-editorial text-3xl font-bold mb-2">{isPremium ? 'Premium Member' : 'Free Reader'}</p>
              <p className="text-sm text-neutral-400 mb-8">{isPremium ? 'You have unlimited access.' : 'You currently have access to free articles only.'}</p>
              {!isPremium && (
                <Link href="/subscribe" className="inline-block bg-[#a51f27] text-white px-6 py-3 text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-white hover:text-black transition-colors">
                  Upgrade to Premium
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}