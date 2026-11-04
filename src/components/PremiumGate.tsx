import Link from 'next/link'

export default function PremiumGate({ previewText }: { previewText: string }) {
  return (
    <div className="relative mt-12">
      {/* Blurred preview of the text */}
      <div className="prose prose-lg max-w-none text-neutral-600 blur-[4px] select-none pointer-events-none opacity-50">
        <p>{previewText}</p>
      </div>

      {/* Gradient fade effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fafaf8] to-[#fafaf8]"></div>

      {/* The Paywall Card */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a51f27] mb-3">
          Premium Story
        </span>
        <h3 className="font-editorial text-3xl font-bold mb-4">
          Unlock the full story.
        </h3>
        <p className="text-neutral-600 text-sm max-w-sm mb-8">
          Subscribe to Afrihue to read exclusive stories, access digital issues, and support independent African journalism.
        </p>
        <Link
          href="/subscribe"
          className="bg-[#a51f27] text-white px-8 py-4 text-[11px] font-bold uppercase tracking-[0.16em] transition-all duration-300 hover:bg-black hover:shadow-[0_0_15px_rgba(165,31,39,0.5)]"
        >
          Become a Member
        </Link>
        <p className="mt-4 text-xs text-neutral-500">
          Already a member? <Link href="/login" className="underline hover:text-black">Log in</Link>
        </p>
      </div>
    </div>
  )
}