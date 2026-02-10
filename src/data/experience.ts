export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
}

export const experience: ExperienceItem[] = [
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
];
