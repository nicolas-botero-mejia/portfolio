import { COMPANY_SLUGS } from '../sources/companies';

export interface ProfileData {
  name: string;
  title: string;
  bio: string[];
  outro: string;
  companySlugs: string[]; // Resolve via getCompany() from companies.ts
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
  title: 'Product Designer',
  bio: [
    'Hi, I\'m Nico → a Product Design Leader with 10+ years of experience unifying fragmented SaaS platforms, scaling products through strong UX architecture, building token-first design systems, and driving AI-integrated workflows that balance operational efficiency with clarity and control.',
    'I brew coffee with unnecessary precision, cook without recipes, ride long distances on my bike, and climb rocks whenever I can. I read fantasy light novels and recently started writing, exploring structure and world-building from the other side of the page.'
  ],
  outro: 'If you\'d like to learn more about me or my work, feel free to reach out!',
  companySlugs: [COMPANY_SLUGS.SAINAPSIS, COMPANY_SLUGS.MASIV, COMPANY_SLUGS.PAYU_LATAM],
  contact: {
    email: 'n.boterom@gmail.com',
    linkedin: 'https://linkedin.com/in/nicolas-botero',
    location: 'Bogotá, Colombia',
    locationSubtext: 'Remote-ready worldwide',
    availability: 'Open to opportunities',
    availabilityTypes: 'Full-time • Freelance • Consulting',
  },
};
