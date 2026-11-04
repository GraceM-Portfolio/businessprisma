import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import EditArticleClient from './EditArticleClient'

export const dynamic = 'force-dynamic'

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch the article to edit
  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !article) {
    notFound()
  }

  // Fetch categories for the dropdown
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  return <EditArticleClient article={article} categories={categories || []} />
}