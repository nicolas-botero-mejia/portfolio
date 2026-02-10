import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Nicolás Botero',
  description: 'Product Designer with 11+ years of experience designing product systems that stay coherent as complexity increases.',
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <article className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
        <h1 className="mb-12 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          About
        </h1>

        <div className="prose prose-lg prose-gray max-w-none space-y-6 text-gray-600">
          <p>
            I'm Nico — a Product Designer who believes that structure and storytelling can turn 
            complexity into clarity.
          </p>

          <p>
            With over 10 years of experience designing for SaaS products, I've led multidisciplinary 
            teams, built design systems, and guided global platforms from concept to launch. My work 
            sits at the intersection of design, strategy, and technology, shaping products that scale 
            while staying human.
          </p>

          <p>
            My background started in front-end development, evolved into UX design, and eventually 
            into leading product and design teams. That journey taught me how to bridge disciplines — 
            translating ideas into systems, and systems into experiences that work for both users and 
            businesses.
          </p>

          <p>
            I enjoy building frameworks that help others move faster: clear design systems, decision 
            principles, and collaborative rituals that make teams more aligned and creative.
          </p>

          <p>
            I'm curious by nature, analytical by instinct, and always looking for better ways to 
            connect people and technology.
          </p>

          <p>
            When I'm not designing, you'll probably find me sketching, exploring new design tools, 
            or out walking with my dog.
          </p>
        </div>

        <div className="mt-16 border-t border-gray-200 pt-8">
          <a
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            ← Back to home
          </a>
        </div>
      </article>
    </div>
  );
}
