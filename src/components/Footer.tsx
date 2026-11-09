import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-green text-brand-cream py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        <div className="col-span-2 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 bg-brand-cream rounded flex items-center justify-center">
              <div className="w-3 h-3 border-2 border-brand-green rotate-45"></div>
            </div>
            <span className="font-sans font-bold text-xl tracking-tight text-brand-cream">stackprisma</span>
          </div>
          <p className="text-brand-cream/60 text-sm mb-6">Build. Design. Create.</p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4 text-brand-cream">Shop</h4>
          <ul className="space-y-2 text-sm text-brand-cream/60">
            <li><Link href="/stack" className="hover:text-brand-cream transition-colors">Stack</Link></li>
            <li><Link href="/prisma" className="hover:text-brand-cream transition-colors">Prisma</Link></li>
            <li><Link href="/bundles" className="hover:text-brand-cream transition-colors">Bundles</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-brand-cream">Support</h4>
          <ul className="space-y-2 text-sm text-brand-cream/60">
            <li><Link href="/help" className="hover:text-brand-cream transition-colors">Help Center</Link></li>
            <li><Link href="/contact" className="hover:text-brand-cream transition-colors">Contact</Link></li>
            {/* THIS IS THE FIXED LINE */}
            <li><Link href="/terms" className="hover:text-brand-cream transition-colors">Terms & Privacy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-brand-cream">Join our newsletter</h4>
          <p className="text-xs text-brand-cream/60 mb-3">Get updates on new products, special offers and creative inspiration.</p>
          <div className="flex bg-brand-cream/10 rounded-full p-1 border border-brand-cream/20">
            <input type="email" placeholder="Your email address" className="bg-transparent border-none outline-none text-sm px-4 py-2 w-full text-brand-cream placeholder:text-brand-cream/40" />
            <button className="bg-brand-cream text-brand-green p-2 rounded-full hover:bg-brand-peach transition-colors"><ArrowRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-brand-cream/10 text-xs text-brand-cream/40">
        © {new Date().getFullYear()} StackPrisma. All rights reserved.
      </div>
    </footer>
  );
}
