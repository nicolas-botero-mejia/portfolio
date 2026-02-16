import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getProducts, getProductBySlug, getAdjacentProducts } from '@/lib/mdx';
import { routes, getWorkTypeLabel } from '@/data';
import { generatePageMetadata } from '@/lib/seo';
import { Metadata } from 'next';
import { requiresPassword, isAuthenticated } from '@/lib/serverPasswordAuth';
import ServerPasswordPrompt from '@/components/ServerPasswordPrompt';
import ProductTracker from '@/components/ProductTracker';
import ContentNavigation from '@/components/ui/ContentNavigation';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const products = getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const product = getProductBySlug(slug);

    if (!product) return {};

    const { frontmatter } = product;
    return generatePageMetadata({
      title: frontmatter.seo.metaTitle,
      description: frontmatter.seo.metaDescription,
      keywords: frontmatter.seo.keywords,
      ogImage: frontmatter.heroImage,
    });
  } catch {
    return {};
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Server-side authentication check
  const needsPassword = requiresPassword(product);
  const authenticated = needsPassword ? await isAuthenticated(slug) : true;

  // Show password prompt if locked and not authenticated
  if (needsPassword && !authenticated) {
    return (
      <ServerPasswordPrompt
        slug={slug}
        title={product.frontmatter.title}
        workItemTypeLabel={getWorkTypeLabel(product.frontmatter.type)}
      />
    );
  }

  // Render product content
  const { frontmatter, content } = product;
  
  // Get adjacent products for next/prev navigation
  const { prev, next } = getAdjacentProducts(slug);

  return (
    <>
      <ProductTracker 
        slug={slug} 
        title={frontmatter.title} 
        company={frontmatter.company} 
      />
      <article className="px-8 py-16 lg:px-16 lg:py-24">
        <div className="max-w-3xl">
        {/* Back Link */}
        <Link
          href={routes.work}
          className="inline-flex items-center text-sm text-content-muted hover:text-content-primary mb-8 transition-colors"
        >
          ← Back to work
        </Link>

        {/* Header */}
        <header className="mb-12">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-content-primary">
            {frontmatter.title}
          </h1>

          <p className="mb-6 text-lg text-content-muted leading-relaxed">
            {frontmatter.description}
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-content-muted border-t border-b border-border-default py-4">
            <div>
              <span className="font-medium text-content-primary">Role:</span> {frontmatter.role}
            </div>
            <div>
              <span className="font-medium text-content-primary">Duration:</span> {frontmatter.duration}
            </div>
            <div>
              <span className="font-medium text-content-primary">Year:</span> {frontmatter.year}
            </div>
          </div>
        </header>

        {/* Hero Image Placeholder */}
        <div className="mb-12 aspect-video w-full rounded-lg bg-background-subtle">
          <div className="flex h-full items-center justify-center text-content-muted">
            Hero Image: {frontmatter.heroImage}
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-gray prose-lg max-w-none">
          <MDXRemote source={content} />
        </div>

        {/* Next/Previous Navigation */}
        <ContentNavigation
          prev={prev ? { slug: prev.slug, title: prev.frontmatter.title } : null}
          next={next ? { slug: next.slug, title: next.frontmatter.title } : null}
          basePath={routes.work}
        />
        </div>
      </article>
    </>
  );
}
