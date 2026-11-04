'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react' // 👈 Import icons

export default function LoginClient() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  
  // 👈 State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false) 

  const router = useRouter()
  const supabase = createClient()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) {
        setMessage(error.message)
      } else {
        setMessage('Check your email for the confirmation link!')
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        setMessage(error.message)
      } else {
        // 👈 Redirect to homepage instead of account
        router.push('/')
        router.refresh()
      }
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#fafaf8] flex">
      
      {/* Left Side: Image (Hidden on mobile) */}
      <div className="hidden lg:block lg:w-1/2 relative bg-black">
        <img 
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80" 
          alt="Afrihue Editorial" 
          className="w-full h-full object-cover hero-editorial-filter opacity-80"
        />
        <div className="absolute bottom-12 left-12 text-white">
          <h2 className="font-editorial text-4xl font-bold max-w-sm leading-tight">
            A celebration of African fashion and culture.
          </h2>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-12">
        <div className="w-full max-w-md">
          
          <Link href="/" className="block text-center mb-12">
            <span className="font-editorial text-4xl font-bold tracking-tight">Afrihue</span>
            <span className="block text-[10px] font-bold tracking-[0.4em] uppercase mt-1 text-neutral-500">Magazine</span>
          </Link>

          <h1 className="font-editorial text-4xl font-bold text-center mb-2">
            {mode === 'login' ? 'Welcome Back' : 'Join Afrihue'}
          </h1>
          <p className="text-center text-neutral-500 mb-8 text-sm">
            {mode === 'login' 
              ? 'Log in to access your premium content.' 
              : 'Create an account to save stories and subscribe.'}
          </p>

          {message && (
            <div className={`p-4 mb-6 text-sm border ${message.includes('Check') ? 'border-green-500 text-green-700 bg-green-50' : 'border-red-500 text-red-700 bg-red-50'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleAuth} className="flex flex-col gap-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-neutral-500 mb-2">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full border border-neutral-300 bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#a51f27]"
                />
              </div>
            )}
            
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-neutral-500 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-neutral-300 bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#a51f27]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-neutral-500 mb-2">Password</label>
              
              {/* 👈 Password Input with Eye Toggle 👈 */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-neutral-300 bg-white pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-[#a51f27]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full bg-black text-white py-4 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors hover:bg-[#a51f27] disabled:opacity-50"
            >
              {loading ? 'Processing...' : mode === 'login' ? 'Log In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-neutral-500">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setMessage('') }}
              className="font-bold text-black hover:text-[#a51f27] underline"
            >
              {mode === 'login' ? 'Sign up' : 'Log in'}
            </button>
          </div>

        </div>
      </div>
    </main>
  )
}