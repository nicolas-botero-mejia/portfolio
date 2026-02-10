import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface CaseStudyFrontmatter {
  title: string;
  description: string;
  company: string;
  role: string;
  year: string;
  duration: string;
  type: string;
  featured: boolean;
  heroImage: string;
  tags: string[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  password?: string; // Optional: Dedicated password for this case study
  locked?: boolean;  // Optional: Whether this case study requires password
}

export interface CaseStudy {
  slug: string;
  frontmatter: CaseStudyFrontmatter;
  content: string;
}

export function getCaseStudies(): CaseStudy[] {
  const caseStudiesPath = path.join(contentDirectory, 'work', 'case-studies');

  if (!fs.existsSync(caseStudiesPath)) {
    return [];
  }

  const fileNames = fs.readdirSync(caseStudiesPath);
  const caseStudies = fileNames
    .filter((fileName) => fileName.endsWith('.mdx') && !fileName.startsWith('_'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(caseStudiesPath, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        frontmatter: data as CaseStudyFrontmatter,
        content,
      };
    });

  return caseStudies.sort((a, b) => {
    return parseInt(b.frontmatter.year) - parseInt(a.frontmatter.year);
  });
}

export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  try {
    const fullPath = path.join(contentDirectory, 'work', 'case-studies', `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontmatter: data as CaseStudyFrontmatter,
      content,
    };
  } catch {
    return null;
  }
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  const caseStudies = getCaseStudies();
  return caseStudies.filter((caseStudy) => caseStudy.frontmatter.featured);
}
