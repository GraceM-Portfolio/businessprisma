'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useUser } from '@/lib/hooks/useUser'
import Link from 'next/link'

export default function CommentSection({ articleId }: { articleId: string }) {
  const supabase = createClient()
  const { user } = useUser()
  const [comments, setComments] = useState<any[]>([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchComments = async () => {
      const { data } = await supabase
        .from('comments')
        .select('*, profiles(full_name)')
        .eq('article_id', articleId)
        .eq('is_approved', true)
        .order('created_at', { ascending: true })
      
      setComments(data || [])
      setLoading(false)
    }

    fetchComments()
  }, [articleId, supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !user) return

    setSubmitting(true)
    const { error } = await supabase.from('comments').insert({
      article_id: articleId,
      user_id: user.id,
      content: newComment,
      is_approved: false
    })

    if (error) {
      alert(error.message)
    } else {
      alert('Comment submitted! It will appear once approved by an editor.')
      setNewComment('')
    }
    setSubmitting(false)
  }

  return (
    <div className="mt-20 pt-10 border-t border-neutral-200">
      <h3 className="font-editorial text-2xl font-bold mb-8">Comments ({comments.length})</h3>
      
      <div className="space-y-6 mb-12">
        {loading ? (
          <p className="text-neutral-500 text-sm animate-pulse">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-neutral-500 text-sm">No comments yet. Be the first to share your thoughts.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-white p-6 border border-neutral-100">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm">{comment.profiles?.full_name || 'Anonymous'}</span>
                <span className="text-xs text-neutral-400">
                  {new Date(comment.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-neutral-700 text-sm leading-relaxed">{comment.content}</p>
            </div>
          ))
        )}
      </div>

      <div className="bg-[#f4f4f0] p-6 border border-neutral-200">
        <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] mb-4">Leave a Comment</h4>
        {user ? (
          <form onSubmit={handleSubmit}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              rows={4}
              className="w-full border border-neutral-300 p-4 text-sm focus:outline-none focus:border-black bg-white mb-4"
              required
            />
            <button
              type="submit"
              disabled={submitting}
              className="bg-black text-white px-6 py-3 text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#a51f27] transition-colors disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Comment'}
            </button>
            <p className="text-[10px] text-neutral-500 mt-3">Comments are moderated and will appear after approval.</p>
          </form>
        ) : (
          <p className="text-sm text-neutral-600">
            Please <Link href="/login" className="text-[#a51f27] underline font-bold">log in</Link> to leave a comment.
          </p>
        )}
      </div>
    </div>
  )
}
