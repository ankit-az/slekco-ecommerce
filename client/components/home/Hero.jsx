import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Truck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Glow Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-800/50 text-indigo-300 text-xs font-semibold shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Next-Gen E-Commerce Experience</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Elevate Your Everyday.{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-amber-300 bg-clip-text text-transparent">
                All In One Place.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Discover a handpicked collection of flagship electronics, designer streetwear, minimalist home aesthetics, and organic beauty. Designed for those who appreciate excellence.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/products"
                className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl shadow-indigo-600/30 hover:scale-105 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/products?sort=rating"
                className="w-full sm:w-auto bg-gray-900/80 hover:bg-gray-800 text-gray-200 font-semibold px-8 py-4 rounded-2xl border border-gray-800 hover:border-gray-700 transition-all flex items-center justify-center"
              >
                Top Rated Products
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 border-t border-gray-900 grid grid-cols-3 gap-4 text-left max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-indigo-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">Express Delivery</div>
                  <div className="text-[11px] text-gray-500">Global 2-day shipping</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">Buyer Protection</div>
                  <div className="text-[11px] text-gray-500">100% verified authentic</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-indigo-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">Instant Return</div>
                  <div className="text-[11px] text-gray-500">30-day hassle free</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Visual Showcase Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image Frame */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass-panel border border-gray-700/50 shadow-2xl shadow-indigo-950/50">
                <Image
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
                  alt="Slekco Featured Audio Product"
                  fill
                  priority
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent" />
                
                {/* Floating Bottom Card */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-panel border border-white/10 space-y-1">
                  <div className="text-xs text-indigo-400 font-bold uppercase tracking-wider">Spotlight Drop</div>
                  <div className="text-base font-bold text-white">AuraSound Pro Headphones</div>
                  <div className="text-xs text-gray-300">₹14,999 <span className="text-gray-500 line-through ml-1">₹17,999</span></div>
                </div>
              </div>

              {/* Floating Stat Badge */}
              <div className="absolute -top-4 -left-4 p-3 rounded-2xl bg-gray-900/90 border border-gray-800 shadow-xl backdrop-blur-md hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 flex items-center justify-center text-indigo-400 font-bold text-lg">
                  ★
                </div>
                <div>
                  <div className="text-sm font-bold text-white">4.9 / 5.0</div>
                  <div className="text-xs text-gray-400">Over 10,000+ Reviews</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
