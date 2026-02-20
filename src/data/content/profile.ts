import { COMPANY_SLUGS } from '@/data/sources/companies';

const { SAINAPSIS, MASIV, PAYU_LATAM } = COMPANY_SLUGS;

export interface ProfileData {
  name: string;
  title: string;
  bio: string[];
  contact: {
    email: string;
    linkedin: string;
    location: string;
    locationSubtext: string;
    availability: string;
    availabilityTypes: string;
  };
}

export const profile: ProfileData = {
  name: 'Nicolás Botero',
  title: 'Product Design Leader',
  bio: [
    "I'm Nico, a Product Design Leader with 10+ years of experience turning fragmented SaaS platforms into coherent, scalable products. I work where UX architecture, design systems, and AI-integrated workflows meet, trying to balance efficiency with clarity (harder than it sounds).",
    `I've worked across fintech, SaaS, and B2B, most recently at {{${SAINAPSIS}}}, {{${MASIV}}}, and {{${PAYU_LATAM}}}.`,
    "Outside of work, I brew coffee with unnecessary precision and cook without recipes. I ride long distances on my bike and climb rocks whenever I can. I read fantasy light novels and recently started writing. Turns out exploring structure and world-building from the other side of the page is more fun than I expected.",
    "If any of that clicks, I'd love to connect!",
  ],
  contact: {
    email: 'n.boterom@gmail.com',
    linkedin: 'https://linkedin.com/in/nicolas-botero',
    location: 'Bogotá, Colombia',
    locationSubtext: 'Remote-ready worldwide',
    availability: 'Open to opportunities',
    availabilityTypes: 'Full-time • Freelance • Consulting',
  },
};
