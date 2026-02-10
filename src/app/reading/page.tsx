export default function ReadingPage() {
  return (
    <div className="bg-white">
      <section className="px-8 py-16 lg:px-16 lg:py-24">
        <div className="max-w-5xl">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Reading</h1>
            <p className="text-lg text-gray-600">
              Book notes, article summaries, and reading reflections
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-12 text-center">
            <p className="text-gray-500 mb-4">No reading content yet.</p>
            <p className="text-sm text-gray-400">
              Coming soon: Book notes and article summaries
            </p>
          </div>

          {/* TODO: Implement when content is added
          <div className="space-y-8">
            - Fetch from reading/books/, reading/articles/
            - Display with type badges (Book, Article)
            - Add ratings for books
            - Add author/source information
            - Link to original sources
          </div>
          */}
        </div>
      </section>
    </div>
  );
}
