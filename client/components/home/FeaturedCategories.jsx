import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export default function FeaturedCategories({ categories = [] }) {
  const fallbackCategories = [
    {
      name: 'Electronics',
      slug: 'electronics',
      description: 'Headphones, smartwatches, speakers & tech essentials',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&auto=format&fit=crop&q=80'
    },
    {
      name: 'Fashion',
      slug: 'fashion',
      description: 'Streetwear, sneakers, parkas & organic cottons',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop&q=80'
    },
    {
      name: 'Home & Living',
      slug: 'home-living',
      description: 'Brass lamps, wooden lounge chairs & home decor',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop&q=80'
    },
    {
      name: 'Beauty',
      slug: 'beauty',
      description: 'Radiance serums, luxury scents & hair care',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80'
    },
    {
      name: 'Accessories',
      slug: 'accessories',
      description: 'Automatic watches, aviator shades & leather bags',
      image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&auto=format&fit=crop&q=80'
    }
  ];

  const displayCategories = categories.length > 0 ? categories : fallbackCategories;

  return (
    <section id="categories" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
              Curated Collections
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Shop By Category
            </h2>
          </div>
          <p className="text-gray-400 text-sm max-w-md">
            Explore carefully structured product lines built around quality, design integrity, and premium function.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCategories.map((cat, idx) => (
            <Link
              key={cat.slug || idx}
              href={`/products?category=${cat.slug}`}
              className={`group relative rounded-3xl overflow-hidden glass-panel border border-gray-800 hover:border-indigo-500/50 transition-all duration-500 min-h-[260px] flex flex-col justify-end p-6 ${
                idx === 0 ? 'sm:col-span-2 lg:col-span-2 min-h-[300px]' : ''
              }`}
            >
              {/* Background Image */}
              <Image
                src={cat.image || fallbackCategories[idx % fallbackCategories.length].image}
                alt={cat.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />

              {/* Content Overlay */}
              <div className="relative z-10 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {cat.name}
                  </h3>
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-indigo-600 group-hover:scale-110 transition-all">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-xs text-gray-300 line-clamp-2">
                  {cat.description || 'Discover handpicked products in this line.'}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
