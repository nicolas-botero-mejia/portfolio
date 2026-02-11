export interface NavItem {
  name: string;
  href: string;
  visible: boolean;
}

export const navigation: NavItem[] = [
  { name: 'Work', href: '/work', visible: true },
  { name: 'Experiments', href: '/experiments', visible: true },
  { name: 'Reading', href: '/reading', visible: true },
  { name: 'Writing', href: '/writing', visible: true },
  { name: 'About', href: '/about', visible: false },
  { name: 'Now', href: '/now', visible: false },
  { name: 'Uses', href: '/uses', visible: false },
];
