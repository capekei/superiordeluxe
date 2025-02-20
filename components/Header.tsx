'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

interface NavLink {
  name: string;
  href: string;
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: NavLink[] = [
    { name: 'Inicio', href: '/' },
    { name: 'Productos', href: '/products' },
    { name: 'Contacto', href: '/contact' }
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300">
      {/* Backdrop */}
      <div className={`absolute inset-0 transition-colors duration-300 ${
        isScrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md' : 'bg-transparent'
      }`} />
      
      {/* Border Gradient */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent opacity-20" />

      <nav className="relative container mx-auto px-4">
        <div className="flex items-center h-24">
          {/* Logo */}
          <Link href="/" className="relative group mr-12">
            <div className="relative w-28 h-28 overflow-hidden rounded-3xl transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/images/logo.png"
                alt="Superior Deluxe Logo"
                width={112}
                height={112}
                className="object-contain w-full h-full transition-all duration-300 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/10 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center flex-grow justify-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative group px-4 py-2 rounded-full transition-colors ${
                  pathname === link.href 
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-400/10' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-500/10 dark:hover:bg-slate-400/10'
                }`}
              >
                <span className="relative text-base font-medium uppercase tracking-wide">
                  {link.name}
                  {pathname === link.href && (
                    <div className="absolute -bottom-1 left-2 right-2 h-0.5 bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600" />
                  )}
                </span>
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-6 ml-auto">
            {/* Admin Link */}
            <Link
              href="/admin"
              className="hidden md:flex relative group px-4 py-2 rounded-full transition-all duration-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 shadow-sm hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10"
            >
              <span className="relative text-sm font-medium uppercase tracking-wide text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                Admin
              </span>
            </Link>

            {/* Theme Toggle Button */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="relative group p-2 rounded-full transition-all duration-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 shadow-sm hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10 focus:outline-none"
                aria-label="Toggle theme"
              >
                <svg
                  className="w-4 h-4 text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {theme === 'dark' ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  )}
                </svg>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="block md:hidden relative group p-4 rounded-full transition-all duration-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 shadow-sm hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10 focus:outline-none"
              aria-label="Menu"
              type="button"
            >
              <svg
                className="w-6 h-6 text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 overflow-hidden">
            <div className="bg-white/90 dark:bg-black/90 backdrop-blur-md p-4 rounded-2xl mt-2 border border-slate-300/30 dark:border-slate-600/30 space-y-2 shadow-lg">
              {[...navLinks, { name: 'Admin', href: '/admin' }].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-6 py-3 rounded-xl transition-all duration-300 ${
                    pathname === link.href 
                      ? 'bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400' 
                      : 'text-slate-800 dark:text-slate-200 hover:bg-slate-500/10 dark:hover:bg-slate-400/10 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  <span className="text-base font-medium uppercase tracking-wide">{link.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
