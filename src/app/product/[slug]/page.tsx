import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, ShieldCheck, Download } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import AddToCartButton from "@/components/AddToCartButton"; // We will make this next

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await the params for Next.js 15
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const supabase = await createClient();
  
  // Fetch the single product by slug
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-serif mb-4">Product not found</h1>
        <Link href="/shop" className="text-brand-green hover:underline">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-brand-charcoal/60 hover:text-brand-charcoal mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image */}
        <div className="aspect-square relative rounded-3xl overflow-hidden bg-brand-light border border-brand-charcoal/5">
          {product.image_url ? (
            <Image src={product.image_url} alt={product.title} fill className="object-cover" priority />
          ) : (
             <div className="absolute inset-0 flex items-center justify-center text-brand-charcoal/20">No Image</div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          {product.tags && product.tags[0] && (
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-brand-green text-brand-cream mb-4 w-max">
              {product.tags[0]}
            </div>
          )}
          
          <h1 className="text-4xl lg:text-5xl font-serif mb-4 text-brand-charcoal">{product.title}</h1>
          <p className="text-2xl font-semibold text-brand-green mb-6">${product.price}</p>
          
          <p className="text-brand-charcoal/70 text-lg mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-4 mb-8">
            {product.format && product.format.map((format: string) => (
              <div key={format} className="flex items-center gap-3 text-sm font-medium text-brand-charcoal/80">
                <Check className="w-5 h-5 text-brand-green" /> Includes {format} files
              </div>
            ))}
            <div className="flex items-center gap-3 text-sm font-medium text-brand-charcoal/80">
              <Download className="w-5 h-5 text-brand-green" /> Instant digital download
            </div>
            <div className="flex items-center gap-3 text-sm font-medium text-brand-charcoal/80">
              <ShieldCheck className="w-5 h-5 text-brand-green" /> Secure checkout & lifetime access
            </div>
          </div>

          {/* We need a client component for the Add to Cart button to access the Context */}
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
