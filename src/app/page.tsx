import { getFeaturedCaseStudies } from '@/lib/mdx';
import HomeClient from '@/components/home/HomeClient';

export default function Home() {
  const featuredWork = getFeaturedCaseStudies();

  return <HomeClient featuredWork={featuredWork} />;
}
