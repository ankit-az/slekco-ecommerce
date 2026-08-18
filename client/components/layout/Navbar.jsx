'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { ShoppingBag, Search, Menu, X, User, Sparkles, Heart } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useAuthStore } from '../../store/useAuthStore';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const totalItems = useCartStore((state) => state.getTotalItems());
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop All', href: '/products' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-nav py-3 shadow-lg shadow-black/20' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors">
              Slekco<span className="text-indigo-500">.</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-indigo-400 ${
                  pathname === link.href ? 'text-indigo-400 font-semibold' : 'text-gray-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar (Desktop) */}
          <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center relative max-w-xs w-full">
            <input
              type="text"
              placeholder="Search tech, fashion, decor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900/80 text-white placeholder-gray-400 text-sm rounded-full pl-10 pr-4 py-2 border border-gray-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-2.5" />
          </form>

          {/* User Actions (Cart & Auth) */}
          <div className="flex items-center gap-4">
            
            {/* Cart Icon */}
            <Link
              href="/cart"
              className="relative p-2 rounded-full text-gray-300 hover:text-white hover:bg-gray-800/60 transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-6 h-6" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-md shadow-indigo-500/50">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User Auth */}
            {mounted && isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-3 bg-gray-900/60 border border-gray-800 rounded-full px-3 py-1.5">
                <span className="text-xs text-indigo-300 font-medium truncate max-w-[100px]">
                  {user?.name || 'Account'}
                </span>
                <button
                  onClick={logout}
                  className="text-xs text-gray-400 hover:text-red-400 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-full transition-all shadow-md shadow-indigo-600/30 hover:scale-105"
              >
                <User className="w-4 h-4" />
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 pb-6 border-t border-gray-800 bg-gray-950/95 backdrop-blur-xl rounded-2xl p-5 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900 text-white placeholder-gray-400 text-sm rounded-xl pl-10 pr-4 py-2.5 border border-gray-800 focus:outline-none focus:border-indigo-500"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            </form>

            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium px-3 py-2 rounded-lg transition-colors ${
                    pathname === link.href ? 'bg-indigo-600/20 text-indigo-400' : 'text-gray-300 hover:bg-gray-900'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="pt-3 border-t border-gray-800 flex items-center justify-between">
              {isAuthenticated ? (
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm text-gray-300 font-medium">{user?.email}</span>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-sm text-red-400 hover:underline font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-600/30"
                >
                  Sign In / Register
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
