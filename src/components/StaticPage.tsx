import { ReactNode } from 'react'

export default function StaticPage({ title, subtitle, children }: { title: string, subtitle: string, children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#fafaf8] pb-24">
      <header className="bg-black text-white py-24 px-6 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#a51f27] mb-4">{subtitle}</p>
        <h1 className="font-editorial text-5xl sm:text-7xl font-bold uppercase tracking-tight">{title}</h1>
      </header>
      <div className="mx-auto max-w-3xl px-6 mt-16 prose prose-lg prose-headings:font-editorial prose-headings:font-bold prose-a:text-[#a51f27]">
        {children}
      </div>
    </main>
  )
}