import Image from 'next/image'
import Link from 'next/link'

const CATEGORIES = ['Fashion', 'Beauty', 'Culture', 'Music', 'Art', 'Film']
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80'

export default function Footer() {
  return (
    <>
    

      {/* ========== FOOTER ========== */}
      <footer className="border-t border-neutral-800 bg-[#080808] text-white">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-x-6 gap-y-10 px-5 py-12 sm:px-8 md:grid-cols-12 lg:px-[60px]">
          
          {/* Brand */}
          <div className="col-span-2 md:col-span-4">
            <Link href="/" className="font-editorial text-3xl leading-none tracking-[-0.04em]">
              Afrihue
            </Link>
            <p className="mt-4 max-w-[240px] text-sm leading-[1.6] text-neutral-400">
              A celebration of African fashion, culture, and the avant-garde.
            </p>
            <div className="mt-6 flex gap-5 text-sm">
              {[
                ['Instagram', 'IG'],
                ['Facebook', 'f'],
                ['X', 'X'],
                ['Pinterest', 'P'],
              ].map(([label, symbol]) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="transition-colors hover:text-[#c54a50]"
                >
                  {symbol}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="md:col-span-2">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">
              Explore
            </h4>
            <ul className="space-y-3 text-sm text-neutral-300">
              {CATEGORIES.map((item) => (
                <li key={item}>
                  <Link href={`/category/${item.toLowerCase()}`} className="transition-colors hover:text-[#c54a50]">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div className="md:col-span-2">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">
              Info
            </h4>
            <ul className="space-y-3 text-sm text-neutral-300">
              {['About', 'Contact', 'Advertise', 'Magazine', 'Careers'].map((item) => (
                <li key={item}>
                  <Link href="#" className="transition-colors hover:text-[#c54a50]">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-2">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">
              Legal
            </h4>
            <ul className="space-y-3 text-sm text-neutral-300">
              {['Privacy Policy', 'Terms of Use', 'Cookie Policy', 'Accessibility'].map((item) => (
                <li key={item}>
                  <Link href="#" className="transition-colors hover:text-[#c54a50]">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Latest Issue Thumbnail */}
          <div className="col-span-2 md:col-span-2">
            <div className="relative mb-4 aspect-square max-w-[140px] overflow-hidden border border-neutral-800">
              <Image
                src={FALLBACK_IMAGE}
                alt="Latest issue of Afrihue Magazine"
                fill
                unoptimized
                sizes="140px"
                className="object-cover"
              />
              
              {/* Red Tint Overlay */}
              <div className="absolute inset-0 bg-[#a51f27] mix-blend-multiply opacity-60 pointer-events-none"></div>
              
              {/* Vignette Overlay */}
              <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.9)] pointer-events-none"></div>
            </div>
            <Link href="/issues" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] transition-colors hover:text-[#c54a50]">
              Latest issue →
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-neutral-800 px-5 py-4 text-center text-xs uppercase tracking-[0.06em] text-neutral-600">
          © {new Date().getFullYear()} Afrihue Magazine. All rights reserved.
        </div>
      </footer>
    </>
  )
}