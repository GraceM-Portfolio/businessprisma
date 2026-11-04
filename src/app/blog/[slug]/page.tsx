import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BlogPostPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-brand-charcoal/60 hover:text-brand-charcoal mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Journal
      </Link>
      
      <div className="mb-8">
        <div className="text-xs font-bold tracking-widest text-brand-charcoal/50 uppercase mb-4">Design</div>
        <h1 className="text-4xl lg:text-5xl mb-6 leading-tight">Designing for Developers: Why UI Kits Matter</h1>
        <div className="flex items-center gap-4 text-sm text-brand-charcoal/60">
          <span>By Admin</span>
          <span>•</span>
          <span>Oct 24, 2026</span>
        </div>
      </div>

      <div className="aspect-video bg-brand-light rounded-2xl mb-10 w-full" />

      <div className="prose prose-lg prose-stone max-w-none">
        <p className="text-lg leading-relaxed text-brand-charcoal/80 mb-6">
          In the fast-paced world of web development, building from scratch every single time is a luxury few can afford. This is where premium UI kits and starter templates come into play.
        </p>
        <p className="text-lg leading-relaxed text-brand-charcoal/80 mb-6">
          By leveraging thoughtfully designed components, developers can focus on the complex business logic while ensuring the frontend remains polished, accessible, and highly responsive.
        </p>
        <h2 className="text-2xl font-serif mt-10 mb-4">The Anatomy of a Great Starter Kit</h2>
        <p className="text-lg leading-relaxed text-brand-charcoal/80">
          A great kit doesn't just give you buttons and cards. It provides a cohesive design system, typed components (like TypeScript), and seamless integration with modern frameworks like Next.js.
        </p>
      </div>
    </div>
  );
}
