import FilterSidebar from "@/components/FilterSidebar";
import ProductCard from "@/components/ProductCard";
import { Code2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

// ADD THIS LINE HERE:
export const dynamic = 'force-dynamic';

export default async function StackPage() {
  const supabase = createClient();
  
  // Fetch only Stack products
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('is_published', true)
    .or('tags.cs.{"Starter Kit"},tags.cs.{"UI Kit"},tags.cs.{"Components"}');

  // ... (rest of the code stays exactly the same)
