'use client';

import Link from 'next/link';
import { Sparkles, Github, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-900 text-gray-400 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Slekco<span className="text-indigo-500">.</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Slekco is a modern multipurpose marketplace curated for tech enthusiasts, trendsetters, and lifestyle connoisseurs. Delivering premium products with unmatched speed and elegance.
            </p>
            <div className="flex items-center gap-4 pt-2">
              {[
                { icon: Twitter, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Github, href: '#' },
                { icon: Linkedin, href: '#' }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="w-9 h-9 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-indigo-500 hover:bg-indigo-600/20 transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {['Home', 'Shop All', 'Categories', 'Featured Deals', 'Contact Us'].map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item === 'Home' ? '/' : item === 'Contact Us' ? '/contact' : '/products'}
                    className="hover:text-indigo-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Categories</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'Electronics', slug: 'electronics' },
                { name: 'Fashion', slug: 'fashion' },
                { name: 'Home & Living', slug: 'home-living' },
                { name: 'Beauty', slug: 'beauty' },
                { name: 'Accessories', slug: 'accessories' }
              ].map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/products?category=${cat.slug}`}
                    className="hover:text-indigo-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter teaser */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Stay Connected</h4>
            <p className="text-xs text-gray-400 mb-3">
              Subscribe to unlock VIP access to secret flash drops & exclusive seasonal rewards.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-gray-900 text-white placeholder-gray-500 text-sm rounded-lg px-3 py-2 border border-gray-800 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold py-2 rounded-lg transition-all flex items-center justify-center gap-1.5"
              >
                Join VIP Club <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Slekco Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400">Terms of Service</a>
            <a href="#" className="hover:text-gray-400">Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
