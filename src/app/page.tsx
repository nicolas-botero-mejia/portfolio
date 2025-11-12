import Link from 'next/link';
import { getFeaturedCaseStudies } from '@/lib/mdx';

export default function Home() {
  const featuredWork = getFeaturedCaseStudies();

  return (
    <div className="bg-white">
      {/* Hero / Intro Section */}
      <section id="intro" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Product Designer & Design Systems Leader
          </h1>
          <p className="mb-8 text-xl text-gray-600">
            10+ years transforming complex challenges into elegant solutions.
            Specialized in design systems, enterprise SaaS, and strategic product leadership.
          </p>
          <div className="flex gap-4">
            <a
              href="#work"
              className="rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-50"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="border-t border-gray-200 bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="mb-2 text-3xl font-bold text-gray-900">Featured Work</h2>
            <p className="text-lg text-gray-600">
              Recent projects with measurable impact
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredWork.map((work) => (
              <Link
                key={work.slug}
                href={`/${work.slug}`}
                className="group block rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 aspect-video w-full overflow-hidden rounded-lg bg-gray-200">
                  <div className="flex h-full items-center justify-center text-gray-400">
                    {work.frontmatter.company}
                  </div>
                </div>

                <h3 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                  {work.frontmatter.company}
                </h3>

                <p className="mb-4 text-sm text-gray-600">
                  {work.frontmatter.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {work.frontmatter.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="border-t border-gray-200 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="mb-2 text-3xl font-bold text-gray-900">My Workflow</h2>
            <p className="text-lg text-gray-600">
              A human-centered approach to solving complex problems
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Discover',
                description: 'Research users, audit existing solutions, and identify core problems through interviews and data analysis.',
              },
              {
                step: '02',
                title: 'Define',
                description: 'Synthesize findings into clear problem statements, user personas, and strategic design principles.',
              },
              {
                step: '03',
                title: 'Design',
                description: 'Create solutions through iterative prototyping, testing concepts with users, and refining based on feedback.',
              },
              {
                step: '04',
                title: 'Deliver',
                description: 'Partner with engineering for implementation, measure impact, and continuously optimize based on data.',
              },
            ].map((phase) => (
              <div key={phase.step} className="relative">
                <div className="mb-4 text-5xl font-bold text-gray-200">{phase.step}</div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{phase.title}</h3>
                <p className="text-gray-600">{phase.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-lg bg-gray-50 p-8">
            <h3 className="mb-4 text-xl font-semibold text-gray-900">Design Principles</h3>
            <ul className="grid gap-4 md:grid-cols-2">
              <li className="flex items-start">
                <svg className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700"><strong>User-First:</strong> Design for real people with real needs</span>
              </li>
              <li className="flex items-start">
                <svg className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700"><strong>Data-Informed:</strong> Let metrics guide decisions, not dictate them</span>
              </li>
              <li className="flex items-start">
                <svg className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700"><strong>Systems Thinking:</strong> Build scalable, maintainable solutions</span>
              </li>
              <li className="flex items-start">
                <svg className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700"><strong>Iterate Fast:</strong> Perfect is the enemy of progress</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="border-t border-gray-200 bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900">
                Hi, I'm Nicolás
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  I'm a Product Designer with 10+ years of experience transforming complex challenges
                  into elegant, user-centered solutions. My work spans design systems, enterprise SaaS
                  platforms, and strategic product leadership.
                </p>
                <p>
                  I specialize in building design systems that scale, leading cross-functional teams,
                  and delivering measurable business impact through thoughtful design.
                </p>
                <p>
                  Currently based in Bogotá, Colombia, working remotely with teams around the world.
                </p>
              </div>

              <div className="mt-8">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Core Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Design Systems',
                    'Product Strategy',
                    'UX Research',
                    'Design Leadership',
                    'Enterprise SaaS',
                    'Information Architecture',
                    'Prototyping',
                    'Design Ops',
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="aspect-square w-full max-w-md rounded-lg bg-gray-200">
                <div className="flex h-full items-center justify-center text-gray-400">
                  Headshot Photo
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="border-t border-gray-200 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="mb-2 text-3xl font-bold text-gray-900">Experience</h2>
            <p className="text-lg text-gray-600">
              10+ years building impactful design solutions
            </p>
          </div>

          <div className="space-y-12">
            {[
              {
                company: 'Sainapsis',
                role: 'UX Advisor · Design System Lead',
                period: '2024 - 2025',
                description: 'Led comprehensive design system transformation achieving 16x productivity increase. Mentored team of 3 designers and established scalable workflows.',
                highlights: [
                  '16x productivity increase through design system',
                  '24x team output growth quarter over quarter',
                  'Built component library with 90% reusability',
                ],
              },
              {
                company: 'RouteMobile',
                role: 'Lead Product Designer · Design System Architect',
                period: '2021 - 2024',
                description: 'Designed Ocean CPaaS platform serving 300M+ messages monthly. Built AquaDS design system adopted across 12+ products.',
                highlights: [
                  'Scaled platform to 300M+ messages per month',
                  'Created design system with 80-90% adoption',
                  '80% faster design-to-development delivery',
                ],
              },
              {
                company: 'Masiv',
                role: 'Senior Product Designer',
                period: '2018 - 2021',
                description: 'Designed enterprise communication platform and led UX strategy for B2B SaaS products.',
                highlights: [
                  'Redesigned core platform serving 1000+ enterprise clients',
                  'Established design process and research practice',
                  'Led design for 3 major product launches',
                ],
              },
              {
                company: 'PayU Latam',
                role: 'Product Designer',
                period: '2016 - 2018',
                description: 'Designed payment solutions for Latin American markets, focusing on conversion optimization and user trust.',
                highlights: [
                  'Improved checkout conversion by 25%',
                  'Designed solutions for 6 LATAM countries',
                  'Conducted extensive user research across markets',
                ],
              },
            ].map((job, index) => (
              <div key={index} className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-gray-200">
                <div className="absolute -left-1 top-0 h-2 w-2 rounded-full bg-blue-600"></div>
                <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-semibold text-gray-900">{job.company}</h3>
                  <span className="text-sm text-gray-500">{job.period}</span>
                </div>
                <p className="mb-2 text-sm font-medium text-gray-700">{job.role}</p>
                <p className="mb-4 text-gray-600">{job.description}</p>
                <ul className="space-y-1">
                  {job.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-600">
                      <svg className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-50"
            >
              <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Full Resume
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="border-t border-gray-200 bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Let's Work Together
            </h2>
            <p className="mb-8 text-lg text-gray-600">
              I'm available for freelance projects, consulting, and full-time opportunities.
            </p>

            <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
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
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-8 py-4 font-medium text-gray-900 transition-colors hover:bg-gray-100"
              >
                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-sm">
              <h3 className="mb-6 text-xl font-semibold text-gray-900">Or find me here</h3>
              <div className="grid gap-6 text-left sm:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-medium text-gray-900">Email</h4>
                  <a href="mailto:n.boterom@gmail.com" className="text-gray-600 hover:text-blue-600">
                    n.boterom@gmail.com
                  </a>
                </div>
                <div>
                  <h4 className="mb-2 font-medium text-gray-900">Location</h4>
                  <p className="text-gray-600">Bogotá, Colombia</p>
                  <p className="text-sm text-gray-500">Remote-ready worldwide</p>
                </div>
                <div>
                  <h4 className="mb-2 font-medium text-gray-900">LinkedIn</h4>
                  <a
                    href="https://linkedin.com/in/nicolas-botero"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    linkedin.com/in/nicolas-botero
                  </a>
                </div>
                <div>
                  <h4 className="mb-2 font-medium text-gray-900">Availability</h4>
                  <p className="text-gray-600">Open to opportunities</p>
                  <p className="text-sm text-gray-500">Freelance • Consulting • Full-time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
