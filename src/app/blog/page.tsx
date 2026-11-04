"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Mock Data for Blog Posts
const mockPosts = [
  { id: 1, title: "Designing for Developers: Why UI Kits Matter", category: "Stack", desc: "Exploring how pre-built components save time without sacrificing quality.", date: "Oct 24, 2026" },
  { id: 2, title: "5 Ways to Warm Up a Minimalist Living Room", category: "Prisma", desc: "Simple, elegant changes you can make this weekend to make your space feel cozy.", date: "Oct 20, 2026" },
  { id: 3, title: "The Future of Next.js App Router", category: "Stack", desc: "What the latest updates mean for your production builds and routing.", date: "Oct 15, 2026" },
  { id: 4, title: "Choosing the Right Palette for Your Home Office", category: "Prisma", desc: "Colors that boost productivity and look beautiful on camera.", date: "Oct 12, 2026" },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = mockPosts.filter(post => 
    activeCategory === "All" ? true : post.category === activeCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-serif mb-4">The Journal</h1>
        <p className="text-brand-charcoal/60 text-lg max-w-2xl mx-auto">Thoughts on design, development, and creating beautiful digital spaces.</p>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center gap-2 mb-12">
        {["All", "Stack", "Prisma"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat 
                ? "bg-brand-green text-brand-cream" 
                : "bg-brand-light text-brand-charcoal hover:bg-brand-charcoal/10"
            }`}
          >
            {cat === "All" ? "All Articles" : `${cat} Insights`}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <Link href={`/blog/${post.id}`} key={post.id} className="group flex flex-col">
            <div className="aspect-[16/9] bg-brand-light rounded-2xl mb-4 overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center text-brand-charcoal/20 bg-[#e5e2d9]">Cover Image</div>
            </div>
            <div className="text-xs font-bold tracking-widest text-brand-charcoal/50 uppercase mb-2">{post.category}</div>
            <h2 className="text-2xl font-serif mb-2 group-hover:text-brand-green transition-colors line-clamp-2">{post.title}</h2>
            <p className="text-brand-charcoal/60 line-clamp-2 mb-4 flex-grow">{post.desc}</p>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-sm text-brand-charcoal/50">{post.date}</span>
              <span className="text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">Read <ArrowRight className="w-4 h-4" /></span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
