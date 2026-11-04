'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Search } from 'lucide-react'
import { useUser } from '@/lib/hooks/useUser'

const CATEGORIES = ['Fashion', 'Beauty', 'Culture', 'Music', 'Art', 'Film']

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, profile, loading } = useUser()

  const isAdmin = profile?.role === 'admin' || profile?.role === 'editor'

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-neutral-200">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 sm:px-8 lg:px-12 relative">
          
          <nav className="hidden lg:flex items-center gap-6 text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-700">
            {CATEGORIES.map((item) => (
              <Link key={item} href={`/category/${item.toLowerCase()}`} className="hover:text-[#a51f27] transition-colors">
                {item}
              </Link>
            ))}
          </nav>

          <button 
            className="lg:hidden p-2 -ml-2 text-black hover:text-[#a51f27] transition-colors z-10"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-center">
            <span className="font-editorial text-[26px] sm:text-[28px] font-bold tracking-tight leading-none block">Afrihue</span>
            <span className="block text-[8px] sm:text-[9px] font-bold tracking-[0.4em] uppercase mt-1 text-neutral-500">Magazine</span>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6 text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-700">
            <Link href="/search" className="hidden lg:flex items-center gap-2 hover:text-[#a51f27]">
              <Search size={14} strokeWidth={1.5} /> Search
            </Link>
            <Link href="/shop" className="hidden lg:block hover:text-[#a51f27]">Shop</Link>
            <Link href="/issues" className="hidden lg:block hover:text-[#a51f27]">Archive</Link>
            
            {!loading && (
              <Link href={user ? '/account' : '/login'} className="hidden lg:block hover:text-[#a51f27]">
                {user ? 'Profile' : 'Log In'}
              </Link>
            )}
            {!loading && isAdmin && (
              <Link href="/admin" className="hidden lg:block border border-[#a51f27] text-[#a51f27] px-3 py-1.5 hover:bg-[#a51f27] hover:text-white transition-all">
                Admin
              </Link>
            )}
            <Link href="/search" className="sm:hidden p-2 -mr-2 hover:text-[#a51f27]">
              <Search size={20} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] bg-[#fafaf8] flex flex-col p-6 sm:p-8 overflow-y-auto">
          <div className="flex items-center justify-between mb-10 shrink-0">
            <span className="font-editorial text-3xl font-bold">Afrihue</span>
            <button onClick={() => setIsOpen(false)} className="p-2 -mr-2">
              <X size={28} strokeWidth={1.5} />
            </button>
          </div>
          
          <nav className="flex flex-col gap-10 relative z-10">
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">Explore</span>
              {CATEGORIES.map((item) => (
                <Link key={item} href={`/category/${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="font-editorial text-3xl font-bold uppercase tracking-tight">
                  {item}
                </Link>
              ))}
              <Link href="/search" onClick={() => setIsOpen(false)} className="flex items-center gap-3 mt-4 text-neutral-500">
                <Search size={24} strokeWidth={1.5} />
                <span className="font-sans text-xl font-medium tracking-[0.1em] uppercase">Search</span>
              </Link>
            </div>

            <div className="flex flex-col gap-4 border-t border-neutral-200 pt-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">Discover</span>
              <Link href="/shop" onClick={() => setIsOpen(false)} className="font-editorial text-3xl font-bold uppercase tracking-tight">The Shop</Link>
              <Link href="/issues" onClick={() => setIsOpen(false)} className="font-editorial text-3xl font-bold uppercase tracking-tight">Issue Archive</Link>
            </div>
          </nav>

          <div className="mt-auto border-t border-neutral-300 pt-8 flex flex-col gap-5 shrink-0 relative z-10">
            {loading ? (
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-neutral-400 text-center animate-pulse">Loading Profile...</p>
            ) : user ? (
              <Link href="/account" onClick={() => setIsOpen(false)} className="text-[12px] font-bold uppercase tracking-[0.2em] flex items-center justify-between">
                My Profile <span>→</span>
              </Link>
            ) : (
              <Link href="/login" onClick={() => setIsOpen(false)} className="text-[12px] font-bold uppercase tracking-[0.2em] flex items-center justify-between">
                Log In / Sign Up <span>→</span>
              </Link>
            )}

            {!loading && isAdmin && (
              <Link href="/admin" onClick={() => setIsOpen(false)} className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#a51f27] border border-[#a51f27] p-3 text-center">
                Admin Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  )
}