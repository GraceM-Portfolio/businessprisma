export default function StaticPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[60vh]">
      <h1 className="text-4xl lg:text-5xl mb-8 font-serif">{title}</h1>
      <div className="prose prose-stone max-w-none text-brand-charcoal/80 leading-relaxed">
        {children}
      </div>
    </div>
  );
}
