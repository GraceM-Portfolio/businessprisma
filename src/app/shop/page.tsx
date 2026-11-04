'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'

// Mock data (Will be replaced by Supabase products later)
const PRODUCTS = [
  { id: 1, name: 'Afrihue Issue 01: Obsession', type: 'Physical', price: 'KES 3,500', image: 'https://images.unsplash.com/photo-1583241800698-9c2e0d1c8e1e?w=800' },
  { id: 2, name: 'Afrihue Issue 01: Obsession', type: 'Digital', price: 'KES 1,500', image: 'https://images.unsplash.com/photo-1583241800698-9c2e0d1c8e1e?w=800' },
  { id: 3, name: 'Afrihue Issue 02: Avant-Garde', type: 'Physical', price: 'KES 3,500', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800' },
  { id: 4, name: 'Afrihue Issue 02: Avant-Garde', type: 'Digital', price: 'KES 1,500', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800' },
  { id: 5, name: 'Afrihue Tote Bag (Black)', type: 'Merch', price: 'KES 2,000', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800' },
  { id: 6, name: 'Afrihue Tote Bag (Cream)', type: 'Merch', price: 'KES 2,000', image: 'https://images.unsplash.com/photo-1597484662317-9bd7bdda2907?w=800' },
]

const FILTERS = ['All', 'Physical', 'Digital', 'Merch']

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filteredProducts = PRODUCTS.filter(
    (product) => activeFilter === 'All' || product.type === activeFilter
  )

  return (
    <main className="min-h-screen bg-[#fafaf8] pb-24">
      
      {/* Shop Header */}
      <header className="bg-black text-white py-20 px-6 text-center border-b border-neutral-800">
        <h1 className="font-editorial text-5xl sm:text-7xl font-bold uppercase tracking-tight mb-4">
          The Shop
        </h1>
        <p className="text-neutral-400 max-w-md mx-auto">
          Collect physical copies, download digital editions, or browse exclusive merchandise.
        </p>
      </header>

      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12 mt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Filters */}
          <aside className="lg:w-64 shrink-0">
            <div className="flex items-center gap-2 mb-6 border-b border-neutral-200 pb-4">
              <SlidersHorizontal size={16} />
              <h2 className="text-[11px] font-bold uppercase tracking-[0.15em]">Filter By</h2>
            </div>
            
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0">
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`text-left text-[13px] font-bold uppercase tracking-[0.1em] px-4 py-3 border transition-colors whitespace-nowrap ${
                    activeFilter === filter 
                      ? 'bg-black text-white border-black' 
                      : 'bg-transparent text-neutral-500 border-transparent hover:text-black hover:border-neutral-300'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-400 border-b border-neutral-200 pb-4">
              <span>Showing {filteredProducts.length} items</span>
            </div>

            {filteredProducts.length === 0 ? (
              <p className="text-neutral-500 py-12">No products found in this category.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="group flex flex-col">
                    
                    {/* Product Image */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-5">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      
                      {/* Hover Add to Cart Overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <button className="w-full bg-black text-white py-3 text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-[#a51f27] transition-colors">
                          Add to Cart
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="font-editorial text-lg font-bold text-black leading-tight mb-1 group-hover:text-[#a51f27] transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400">
                          {product.type}
                        </p>
                      </div>
                      <p className="font-medium text-sm whitespace-nowrap">{product.price}</p>
                    </div>
                    
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
