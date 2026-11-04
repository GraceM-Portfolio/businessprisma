import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function AdminIssuesPage() {
  const supabase = await createClient()

  const { data: issues } = await supabase
    .from('issues')
    .select('*')
    .order('release_date', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-editorial text-4xl font-bold mb-2">Magazine Issues</h1>
          <p className="text-neutral-500">Manage your print and digital editions.</p>
        </div>
        <Link 
          href="/admin/issues/new"
          className="bg-black text-white px-6 py-3 text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#a51f27] transition-colors"
        >
          + New Issue
        </Link>
      </div>

      <div className="overflow-x-auto">
        <div className="bg-white border border-neutral-200 min-w-[600px]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#fafaf8] border-b border-neutral-200 text-[10px] font-bold uppercase tracking-[0.1em] text-neutral-500">
              <tr>
                <th className="px-6 py-4">Cover</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Release Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {!issues || issues.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-neutral-500">No issues found.</td>
                </tr>
              ) : (
                issues.map((issue) => (
                  <tr key={issue.id} className="hover:bg-[#fafaf8] transition-colors">
                    <td className="px-6 py-4">
                      {issue.cover_image ? (
                        <div className="relative h-12 w-12 border border-neutral-200">
                          <Image src={issue.cover_image} alt={issue.title} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="h-12 w-12 bg-neutral-100 flex items-center justify-center text-[10px] text-neutral-400">No Img</div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium">{issue.title}</td>
                    <td className="px-6 py-4 text-neutral-500">{new Date(issue.release_date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-[0.1em] text-[#a51f27]">
                      <Link href={`/issues/${issue.id}`} target="_blank" className="hover:text-black">View</Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}