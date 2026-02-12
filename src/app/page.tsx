import { redirect } from 'next/navigation';
import { routes } from '@/data';

export default function Home() {
  redirect(routes.work);
}
