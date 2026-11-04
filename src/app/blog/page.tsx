import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-5xl mb-4">The Journal</h1>
        <p className="text-brand-charcoal/60 text-lg max-w-2xl">Thoughts on design, development, and creating beautiful digital spaces.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Replace with Supabase Data */}
        {[1, 2, 3].map((post) => (
          <Link href={`/blog/designing-for-developers`} key={post} className="group">
            <div className="aspect-[16/9] bg-brand-light rounded-2xl mb-4 overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center text-brand-charcoal/20 bg-[#e5e2d9]">Cover Image</div>
            </div>
            <div className="text-xs font-bold tracking-widest text-brand-charcoal/50 uppercase mb-2">Design</div>
            <h2 className="text-2xl font-serif mb-2 group-hover:text-brand-green transition-colors">Designing for Developers: Why UI Kits Matter</h2>
            <p className="text-brand-charcoal/60 line-clamp-2 mb-4">Exploring how pre-built components save time without sacrificing quality.</p>
            <span className="text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">Read Article <ArrowRight className="w-4 h-4" /></span>
          </Link>
        ))}
      </div>
    </div>
  );
}
