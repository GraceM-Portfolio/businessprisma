import Link from 'next/link'

const categories = [
  { name: 'Fashion', slug: 'fashion' },
  { name: 'Beauty', slug: 'beauty' },
  { name: 'Culture', slug: 'culture' },
  { name: 'Music', slug: 'music' },
  { name: 'Art', slug: 'art' },
  { name: 'Film', slug: 'film' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
      <div className="max-w-[1500px] mx-auto px-6 h-16 flex items-center justify-between relative">
        <nav className="hidden lg:flex items-center gap-8 nav-link text-neutral-700">
          {categories.map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`} className="hover:text-[#c8102e] transition-colors">
              {c.name}
            </Link>
          ))}
        </nav>

        <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-center">
          <span className="font-serif-display text-[26px] leading-none block">Noiré</span>
          <span className="block text-[8px] tracking-[0.4em] uppercase mt-1 text-neutral-500">
            Magazine
          </span>
        </Link>

        <div className="flex items-center gap-6 nav-link text-neutral-700">
          <Link href="/search" className="hover:text-[#c8102e] transition-colors">
            Search
          </Link>
          <Link href="/login" className="hover:text-[#c8102e] transition-colors">
            Menu
          </Link>
        </div>
      </div>
    </header>
  )
}