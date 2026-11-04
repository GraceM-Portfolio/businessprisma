import { createClient } from '@/lib/supabase/server'
import NewArticleClient from './NewArticleClient'

export const dynamic = 'force-dynamic'

export default async function NewArticlePage() {
  const supabase = await createClient()
  const { data: categories } = await supabase.from('categories').select('*').order('name')
  
  return <NewArticleClient categories={categories || []} />
}