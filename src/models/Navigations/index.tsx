export interface NavigationInterface {
  name: string;
  href: string;
  onClick?: () => void
}

export let Navigations: Array<NavigationInterface>
Navigations = [
  { name: 'Home', href: '/' },
  { name: 'Stores', href: '/stores' },
];