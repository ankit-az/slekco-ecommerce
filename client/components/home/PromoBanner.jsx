import Link from 'next/link';
import { Tag, Sparkles, ArrowRight } from 'lucide-react';

export default function PromoBanner() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-950 via-gray-900 to-violet-950 border border-indigo-500/30 p-8 sm:p-12 shadow-2xl">
          
          {/* Background Decorative Element */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/30">
              <Tag className="w-3.5 h-3.5" />
              Limited Time Seasonal Sale
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Save Up To <span className="text-indigo-400">25% OFF</span> On Selected Premium Audio & Tech
            </h2>

            <p className="text-gray-300 text-sm sm:text-base">
              Upgrade your audio equipment with high-fidelity studio wireless headphones, ambient party speakers, and titanium smartwatches. Free shipping included on all orders over ₹1,999.
            </p>

            <div className="pt-2">
              <Link
                href="/products?category=electronics"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-6 py-3.5 rounded-2xl shadow-lg shadow-indigo-600/40 hover:scale-105 transition-all"
              >
                <span>Claim Offer Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
