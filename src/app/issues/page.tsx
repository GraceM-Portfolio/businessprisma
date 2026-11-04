import Image from 'next/image'
import Link from 'next/link'

export default function IssuesPage() {
  // Mock data - we will connect to Supabase later
  const issues = [
    { id: 1, title: 'Issue 01', theme: 'Obsession', date: 'October 2026', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800' },
    { id: 2, title: 'Issue 02', theme: 'The Avant-Garde', date: 'January 2027', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800' },
  ]

  return (
    <main className="min-h-screen bg-black text-white pb-24">
      <header className="py-24 px-6 text-center">
        <h1 className="font-editorial text-5xl sm:text-8xl font-bold uppercase tracking-tight mb-6">
          The Archive
        </h1>
        <p className="text-neutral-400 max-w-lg mx-auto">Explore the complete collection of Afrihue print and digital editions.</p>
      </header>

      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          {issues.map((issue) => (
            <div key={issue.id} className="group relative">
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900 border border-neutral-800">
                <Image
                  src={issue.image}
                  alt={issue.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03] opacity-80 group-hover:opacity-100"
                />
                {/* Red Overlay Effect */}
                <div className="absolute inset-0 bg-[#a51f27] mix-blend-multiply opacity-20 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none"></div>
              </div>
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#a51f27] mb-1">{issue.date}</p>
                  <h2 className="font-editorial text-4xl font-bold">{issue.title}: {issue.theme}</h2>
                </div>
                <Link href={`/issues/${issue.id}`} className="bg-white text-black h-12 w-12 flex items-center justify-center rounded-full hover:bg-[#a51f27] hover:text-white transition-colors">
                  →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}