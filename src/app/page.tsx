import Link from 'next/link';
import { getFeaturedCaseStudies } from '@/lib/mdx';
import { experience } from '@/data/experience';
import { workflowPhases, designPrinciples } from '@/data/workflow';
import CheckIcon from '@/components/ui/CheckIcon';

export default function Home() {
  const featuredWork = getFeaturedCaseStudies();

  return (
    <div className="bg-white">
      {/* Work Grid Section */}
      <section id="work" className="px-8 py-16 lg:px-16 lg:py-24">

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Selected Work</h2>
          <p className="text-gray-600">
            Recent projects with measurable impact
          </p>
        </div>

        <div className="space-y-6">
          {featuredWork.map((work) => (
            <Link
              key={work.slug}
              href={`/work/${work.slug}`}
              className="group block border-b border-gray-200 pb-6 transition-all hover:border-gray-400"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                    {work.frontmatter.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {work.frontmatter.description}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                    <span>{work.frontmatter.role}</span>
                    <span>•</span>
                    <span>{work.frontmatter.year}</span>
                  </div>
                </div>
                <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="border-t border-gray-200 px-8 py-16 lg:px-16 lg:py-24">
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
      <section id="experience" className="border-t border-gray-200 px-8 py-16 lg:px-16 lg:py-24">
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

      {/* Contact Section */}
      <section id="contact" className="border-t border-gray-200 bg-gray-50 px-8 py-16 lg:px-16 lg:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Let's Work Together
          </h2>
          <p className="mb-8 text-lg text-gray-600">
            I'm available for freelance projects, consulting, and full-time opportunities.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center mb-12">
            <a
              href="mailto:n.boterom@gmail.com"
              className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-8 py-4 font-medium text-white transition-colors hover:bg-gray-800"
            >
              <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Me
            </a>
            <a
              href="https://linkedin.com/in/nicolas-botero"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-8 py-4 font-medium text-gray-900 transition-colors hover:bg-gray-100"
            >
              <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-8 text-left">
            <h3 className="mb-6 text-lg font-semibold text-gray-900 text-center">Or find me here</h3>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="mb-2 text-sm font-medium text-gray-900">Email</h4>
                <a href="mailto:n.boterom@gmail.com" className="text-sm text-gray-600 hover:text-gray-900">
                  n.boterom@gmail.com
                </a>
              </div>
              <div>
                <h4 className="mb-2 text-sm font-medium text-gray-900">Location</h4>
                <p className="text-sm text-gray-600">Bogotá, Colombia</p>
                <p className="text-xs text-gray-500">Remote-ready worldwide</p>
              </div>
              <div>
                <h4 className="mb-2 text-sm font-medium text-gray-900">LinkedIn</h4>
                <a
                  href="https://linkedin.com/in/nicolas-botero"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  linkedin.com/in/nicolas-botero
                </a>
              </div>
              <div>
                <h4 className="mb-2 text-sm font-medium text-gray-900">Availability</h4>
                <p className="text-sm text-gray-600">Open to opportunities</p>
                <p className="text-xs text-gray-500">Freelance • Consulting • Full-time</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
