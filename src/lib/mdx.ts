import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface CaseStudyFrontmatter {
  title: string;
  description: string;
  company: string;   // Company slug - resolve with getCompany()
  role: string;
  year: string;
  duration: string;
  type: string;      // Work type: case-study, feature, side-project
  subtitle?: string; // Descriptive label e.g. "Design System & Process Transformation"
  featured: boolean;
  heroImage: string;
  tags: string[];
  date?: string;     // For sorting (YYYY-MM-DD format)
  order?: number;    // For manual ordering
  parent?: string;   // For features: links to parent case study
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

// Navigation: Get adjacent case studies for next/prev links
export interface AdjacentContent {
  prev: CaseStudy | null;
  next: CaseStudy | null;
}

export function getAdjacentCaseStudies(currentSlug: string): AdjacentContent {
  const caseStudies = getCaseStudies();
  const currentIndex = caseStudies.findIndex((study) => study.slug === currentSlug);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: caseStudies[currentIndex - 1] || null,
    next: caseStudies[currentIndex + 1] || null,
  };
}

// ============================================================================
// PAGES (about, now, uses, etc.)
// ============================================================================

export interface PageFrontmatter {
  title: string;
  description: string;
  lastUpdated?: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

export interface Page {
  slug: string;
  frontmatter: PageFrontmatter;
  content: string;
}

export function getPageBySlug(slug: string): Page | null {
  try {
    const fullPath = path.join(contentDirectory, 'pages', `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontmatter: data as PageFrontmatter,
      content,
    };
  } catch {
    return null;
  }
}

// ============================================================================
// ALL WORK (Combined case studies + features)
// ============================================================================

export function getAllWork(): CaseStudy[] {
  const caseStudies = getCaseStudies();
  const features = getFeatures();
  const combined = [...caseStudies, ...features];

  // Sort by date (newest first)
  return combined.sort((a, b) => {
    if (a.frontmatter.date && b.frontmatter.date) {
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
    }
    return parseInt(b.frontmatter.year) - parseInt(a.frontmatter.year);
  });
}

// ============================================================================
// FEATURES
// ============================================================================

export function getFeatures(): CaseStudy[] {
  const featuresPath = path.join(contentDirectory, 'work', 'features');

  if (!fs.existsSync(featuresPath)) {
    return [];
  }

  const fileNames = fs.readdirSync(featuresPath);
  const features = fileNames
    .filter((fileName) => fileName.endsWith('.mdx') && !fileName.startsWith('_'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(featuresPath, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        frontmatter: data as CaseStudyFrontmatter,
        content,
      };
    });

  return features.sort((a, b) => {
    // Sort by date if available, otherwise by year
    if (a.frontmatter.date && b.frontmatter.date) {
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
    }
    return parseInt(b.frontmatter.year) - parseInt(a.frontmatter.year);
  });
}

export function getFeatureBySlug(slug: string): CaseStudy | null {
  try {
    const fullPath = path.join(contentDirectory, 'work', 'features', `${slug}.mdx`);
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

export function getAdjacentFeatures(currentSlug: string): AdjacentContent {
  const features = getFeatures();
  const currentIndex = features.findIndex((feature) => feature.slug === currentSlug);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: features[currentIndex - 1] || null,
    next: features[currentIndex + 1] || null,
  };
}

export function getFeaturedFeatures(): CaseStudy[] {
  const features = getFeatures();
  return features.filter((feature) => feature.frontmatter.featured);
}

// ============================================================================
// TODO: Add utilities for other content types
// ============================================================================
//
// When adding new content types, implement these 4 methods for each:
//
// 1. getContentType() - Get all items from folder
// 2. getContentTypeBySlug(slug) - Get single item
// 3. getFeaturedContentType() - Get featured items (for home page)
// 4. getAdjacentContentType(slug) - Get prev/next navigation
//
// Content types to add:
//
// WORK:
//   - Side Projects (work/side-projects/)
//     - getSideProjects()
//     - getSideProjectBySlug(slug)
//     - getFeaturedSideProjects()
//     - getAdjacentSideProjects(slug)
//
// WRITING:
//   - Posts (writing/posts/)
//     - getPosts()
//     - getPostBySlug(slug)
//     - getFeaturedPosts()
//     - getAdjacentPosts(slug)
//
//   - Thoughts (writing/thoughts/)
//     - getThoughts()
//     - getThoughtBySlug(slug)
//     - getFeaturedThoughts()
//     - getAdjacentThoughts(slug)
//
//   - Quotes (writing/quotes/)
//     - getQuotes()
//     - getQuoteBySlug(slug)
//     - getFeaturedQuotes()
//     - getAdjacentQuotes(slug)
//
// EXPERIMENTS:
//   - Design (experiments/design/)
//     - getDesignExperiments()
//     - getDesignExperimentBySlug(slug)
//     - getFeaturedDesignExperiments()
//     - getAdjacentDesignExperiments(slug)
//
//   - Code (experiments/code/)
//     - getCodeExperiments()
//     - getCodeExperimentBySlug(slug)
//     - getFeaturedCodeExperiments()
//     - getAdjacentCodeExperiments(slug)
//
//   - Prototypes (experiments/prototypes/)
//     - getPrototypes()
//     - getPrototypeBySlug(slug)
//     - getFeaturedPrototypes()
//     - getAdjacentPrototypes(slug)
//
// READING:
//   - Books (reading/books/)
//     - getBooks()
//     - getBookBySlug(slug)
//     - getFeaturedBooks()
//     - getAdjacentBooks(slug)
//
//   - Articles (reading/articles/)
//     - getArticles()
//     - getArticleBySlug(slug)
//     - getFeaturedArticles()
//     - getAdjacentArticles(slug)
//
// PATTERN EXAMPLE:
//
//   export function getSideProjects(): CaseStudy[] {
//     const sideProjectsPath = path.join(contentDirectory, 'work', 'side-projects');
//     if (!fs.existsSync(sideProjectsPath)) return [];
//     
//     const fileNames = fs.readdirSync(sideProjectsPath);
//     const sideProjects = fileNames
//       .filter((fileName) => fileName.endsWith('.mdx') && !fileName.startsWith('_'))
//       .map((fileName) => {
//         const slug = fileName.replace(/\.mdx$/, '');
//         const fullPath = path.join(sideProjectsPath, fileName);
//         const fileContents = fs.readFileSync(fullPath, 'utf8');
//         const { data, content } = matter(fileContents);
//         return { slug, frontmatter: data as CaseStudyFrontmatter, content };
//       });
//     
//     return sideProjects.sort((a, b) => {
//       if (a.frontmatter.date && b.frontmatter.date) {
//         return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
//       }
//       return parseInt(b.frontmatter.year) - parseInt(a.frontmatter.year);
//     });
//   }
//
//   export function getSideProjectBySlug(slug: string): CaseStudy | null {
//     try {
//       const fullPath = path.join(contentDirectory, 'work', 'side-projects', `${slug}.mdx`);
//       const fileContents = fs.readFileSync(fullPath, 'utf8');
//       const { data, content } = matter(fileContents);
//       return { slug, frontmatter: data as CaseStudyFrontmatter, content };
//     } catch {
//       return null;
//     }
//   }
//
//   export function getFeaturedSideProjects(): CaseStudy[] {
//     return getSideProjects().filter((project) => project.frontmatter.featured);
//   }
//
//   export function getAdjacentSideProjects(currentSlug: string): AdjacentContent {
//     const sideProjects = getSideProjects();
//     const currentIndex = sideProjects.findIndex((project) => project.slug === currentSlug);
//     if (currentIndex === -1) return { prev: null, next: null };
//     return {
//       prev: sideProjects[currentIndex - 1] || null,
//       next: sideProjects[currentIndex + 1] || null,
//     };
//   }
//
// Copy this pattern for each content type!
// ============================================================================
