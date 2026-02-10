import CheckIcon from '@/components/ui/CheckIcon';
import { experience } from '@/data/experience';
import { workflowPhases, designPrinciples } from '@/data/workflow';

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* About Section */}
      <section className="px-8 py-16 lg:px-16 lg:py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About</h1>
          
          <div className="prose prose-gray prose-lg max-w-none">
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Product Design Leader with 11+ years of experience designing product systems 
              that stay coherent as complexity increases.
            </p>

            <p>
              I work on system-level product design problems: unifying fragmented SaaS platforms, 
              scaling design and delivery infrastructure, and integrating AI in ways that enhance 
              human judgment.
            </p>

            <p>
              My focus is on building durable foundations that allow teams and products to evolve 
              without losing clarity.
            </p>

            <h2>Professional Journey</h2>
            
            <p>
              Over the past decade, I&apos;ve led design transformations at companies ranging from 
              payment platforms to enterprise communication systems. My work has resulted in 
              measurable impact: 16x productivity increases, platforms serving 300M+ messages monthly, 
              and design systems adopted across entire organizations.
            </p>

            <h2>Approach</h2>

            <p>
              I believe in starting with systems thinking, moving fast through iteration, and 
              letting data inform (not dictate) decisions. My work combines strategic thinking 
              with hands-on execution—from research and architecture to implementation and measurement.
            </p>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="border-t border-gray-200 px-8 py-16 lg:px-16 lg:py-24">
        <div className="max-w-3xl">
          <div className="mb-12">
            <h2 className="mb-3 text-3xl font-bold text-gray-900">My Workflow</h2>
            <p className="text-gray-600">
              A human-centered approach to solving complex problems
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            {workflowPhases.map((phase) => (
              <div key={phase.step}>
                <div className="mb-3 text-4xl font-bold text-gray-200">{phase.step}</div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{phase.title}</h3>
                <p className="text-sm text-gray-600">{phase.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-lg border border-gray-200 p-8">
            <h3 className="mb-6 text-lg font-semibold text-gray-900">Design Principles</h3>
            <ul className="space-y-4">
              {designPrinciples.map((principle, index) => (
                <li key={index} className="flex items-start text-sm">
                  <CheckIcon className="mr-3 mt-0.5 h-5 w-5 shrink-0 text-gray-900" />
                  <span className="text-gray-700">
                    <strong>{principle.title}</strong> {principle.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="border-t border-gray-200 px-8 py-16 lg:px-16 lg:py-24">
        <div className="max-w-3xl">
          <div className="mb-12">
            <h2 className="mb-3 text-3xl font-bold text-gray-900">Experience</h2>
            <p className="text-gray-600">
              10+ years building impactful design solutions
            </p>
          </div>

          <div className="space-y-12">
            {experience.map((job, index) => (
              <div key={index} className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-gray-200">
                <div className="absolute -left-1 top-0 h-2 w-2 rounded-full bg-gray-900"></div>
                <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">{job.company}</h3>
                  <span className="text-sm text-gray-500">{job.period}</span>
                </div>
                <p className="mb-2 text-sm font-medium text-gray-700">{job.role}</p>
                <p className="mb-4 text-sm text-gray-600">{job.description}</p>
                <ul className="space-y-1">
                  {job.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-600">
                      <CheckIcon className="mr-2 mt-0.5 h-4 w-4 shrink-0 text-gray-900" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
