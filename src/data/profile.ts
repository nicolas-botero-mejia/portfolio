export interface CompanyLink {
  name: string;
  url: string;
}

export interface ProfileData {
  name: string;
  title: string;
  bio: string[];
  companies: CompanyLink[];
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
    'Product Design Leader with 11+ years of experience designing product systems that stay coherent as complexity increases.',
    'I work on system-level product design problems: unifying fragmented SaaS platforms, scaling design and delivery infrastructure, and integrating AI in ways that enhance human judgment.',
    'My focus is on building durable foundations that allow teams and products to evolve without losing clarity.',
  ],
  companies: [
    { name: 'Sainapsis', url: 'https://www.sainapsis.com/' },
    { name: 'Masiv', url: 'https://www.masiv.com/' },
    { name: 'PayU Latam', url: 'https://corporate.payu.com/colombia/' },
  ],
  contact: {
    email: 'n.boterom@gmail.com',
    linkedin: 'nicolas-botero',
    location: 'Bogotá, Colombia',
    locationSubtext: 'Remote-ready worldwide',
    availability: 'Open to opportunities',
    availabilityTypes: 'Freelance • Consulting • Full-time',
  },
};
