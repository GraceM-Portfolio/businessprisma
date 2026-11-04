import FilterSidebar from "@/components/FilterSidebar";
import ProductCard from "@/components/ProductCard";
import { PenTool, ArrowRight } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

// ADD THIS LINE HERE:
export const dynamic = 'force-dynamic';

export default async function PrismaPage() {
  const supabase = createClient();
  
  // Fetch only Prisma products
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('is_published', true)
    .or('tags.cs.{"3D Revamp"},tags.cs.{"Planner"},tags.cs.{"Journal"},tags.cs.{"Coloring Book"}');

  // ... (rest of the code stays exactly the same)
