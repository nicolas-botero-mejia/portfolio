export default function ExperimentsPage() {
  return (
    <div className="bg-white">
      <section className="px-8 py-16 lg:px-16 lg:py-24">
        <div className="max-w-5xl">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Experiments</h1>
            <p className="text-lg text-gray-600">
              Design explorations, code experiments, and interactive prototypes
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-12 text-center">
            <p className="text-gray-500 mb-4">No experiments yet.</p>
            <p className="text-sm text-gray-400">
              Coming soon: Design explorations, code experiments, and prototypes
            </p>
          </div>

          {/* TODO: Implement when content is added
          <div className="space-y-8">
            - Fetch from experiments/design/, experiments/code/, experiments/prototypes/
            - Display with type badges (Design, Code, Prototype)
            - Add demo/github links
            - Use same card pattern as work page
          </div>
          */}
        </div>
      </section>
    </div>
  );
}
