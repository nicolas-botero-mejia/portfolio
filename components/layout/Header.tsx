import Link from 'next/link';
import Navigation from './Navigation';

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Nicolás Botero
            </Link>
          </div>
          <Navigation />
        </div>
      </div>
    </header>
  );
}
