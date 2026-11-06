import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, ShieldCheck, Download, FileText } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import AddToCartButton from "@/components/AddToCartButton";

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const supabase = await createClient();
  
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .single();

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-brand-cream">
        <h1 className="text-3xl font-serif mb-4 text-brand-charcoal">Product not found</h1>
        <Link href="/prisma" className="text-brand-green hover:underline">Return to Prisma</Link>
      </div>
    );
  }

  return (
    <div className="bg-brand-cream min-h-screen text-brand-charcoal py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/prisma" className="inline-flex items-center gap-2 text-sm text-brand-charcoal/60 hover:text-brand-charcoal mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Prisma Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Image */}
          <div className="aspect-[4/5] relative rounded-2xl overflow-hidden bg-white border border-brand-charcoal/10 shadow-sm">
            {product.image_url ? (
              <Image src={product.image_url} alt={product.title} fill className="object-cover" priority />
            ) : (
               <div className="absolute inset-0 flex items-center justify-center text-brand-charcoal/20">No Image</div>
            )}
          </div>

          {/* Right: Details */}
          <div className="flex flex-col justify-center">
            {product.tags && product.tags[0] && (
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-brand-peach text-brand-charcoal mb-4 w-max">
                {product.tags[0]}
              </div>
            )}
            
            <h1 className="text-4xl lg:text-5xl font-serif mb-4 text-brand-charcoal leading-tight">{product.title}</h1>
            <p className="text-2xl font-semibold text-brand-green mb-6">${product.price}</p>
            
            <p className="text-brand-charcoal/70 text-lg mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* What's Included */}
            {product.includes && product.includes.length > 0 && (
              <div className="mb-8 p-6 bg-white rounded-xl border border-brand-charcoal/5">
                <h3 className="font-semibold text-sm uppercase tracking-wider text-brand-charcoal mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> What's Included
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.includes.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-brand-charcoal/80">
                      <Check className="w-4 h-4 text-brand-green mt-0.5 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Info Badges */}
            <div className="space-y-3 mb-10">
              {product.format && (
                <div className="flex items-center gap-3 text-sm font-medium text-brand-charcoal/80">
                  <FileText className="w-5 h-5 text-brand-green" /> Format: {product.format.join(", ")}
                </div>
              )}
              <div className="flex items-center gap-3 text-sm font-medium text-brand-charcoal/80">
                <Download className="w-5 h-5 text-brand-green" /> Instant digital download
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-brand-charcoal/80">
                <ShieldCheck className="w-5 h-5 text-brand-green" /> Secure checkout & lifetime access
              </div>
            </div>

            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
