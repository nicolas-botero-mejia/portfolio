export default function WritingPage() {
  return (
    <div className="bg-white">
      <section className="px-8 py-16 lg:px-16 lg:py-24">
        <div className="max-w-5xl">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Writing</h1>
            <p className="text-lg text-gray-600">
              Articles, thoughts, and curated quotes with personal reflections
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-12 text-center">
            <p className="text-gray-500 mb-4">No writing content yet.</p>
            <p className="text-sm text-gray-400">
              Coming soon: Blog posts, thoughts, and curated quotes
            </p>
          </div>

          {/* TODO: Implement when content is added
          <div className="space-y-8">
            - Fetch from writing/posts/, writing/thoughts/, writing/quotes/
            - Display with type badges (Post, Thought, Quote)
            - Add publish dates
            - Show excerpts for posts
            - Format quotes differently from posts
          </div>
          */}
        </div>
      </section>
    </div>
  );
}
