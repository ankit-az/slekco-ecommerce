'use client';

import { useState, useEffect } from 'react';
import Hero from '../components/home/Hero';
import FeaturedCategories from '../components/home/FeaturedCategories';
import PromoBanner from '../components/home/PromoBanner';
import Newsletter from '../components/home/Newsletter';
import ProductGrid from '../components/product/ProductGrid';
import Link from 'next/link';
import { ArrowRight, Flame } from 'lucide-react';
import { fetchFeaturedProducts, fetchCategories } from '../lib/api';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [prodRes, catRes] = await Promise.allSettled([
          fetchFeaturedProducts(),
          fetchCategories()
        ]);

        if (prodRes.status === 'fulfilled' && prodRes.value.success) {
          setFeaturedProducts(prodRes.value.data || []);
        }

        if (catRes.status === 'fulfilled' && catRes.value.success) {
          setCategories(catRes.value.data || []);
        }
      } catch (err) {
        console.error('Error loading homepage data:', err);
        setError('Could not connect to backend server');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <Hero />

      {/* Categories Grid */}
      <FeaturedCategories categories={categories} />

      {/* Featured Products Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-widest">
              <Flame className="w-4 h-4 fill-current" />
              Handpicked Essentials
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Featured Products
            </h2>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-400 hover:text-indigo-300 group"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Products Grid */}
        <ProductGrid
          products={featuredProducts}
          loading={loading}
          error={error}
        />
      </section>

      {/* Promotional Banner */}
      <PromoBanner />

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}
