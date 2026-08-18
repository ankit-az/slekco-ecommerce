'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductGrid from '../../components/product/ProductGrid';
import ProductFilters from '../../components/product/ProductFilters';
import ProductSort from '../../components/product/ProductSort';
import { Filter, Search, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { fetchProducts, fetchCategories } from '../../lib/api';
import { debounce } from '../../lib/utils';

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 12, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Active Filter States
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [brand, setBrand] = useState(searchParams.get('brand') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : 50000);
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  // Mobile Filter Drawer Toggle
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Fetch Categories once
  useEffect(() => {
    fetchCategories()
      .then((res) => {
        if (res.success) setCategories(res.data || []);
      })
      .catch((err) => console.error('Failed to load categories:', err));
  }, []);

  // Sync state if URL query params change externally
  useEffect(() => {
    setSearch(searchParams.get('search') || '');
    setCategory(searchParams.get('category') || '');
    setBrand(searchParams.get('brand') || '');
    if (searchParams.get('maxPrice')) setMaxPrice(Number(searchParams.get('maxPrice')));
    if (searchParams.get('sort')) setSort(searchParams.get('sort'));
    if (searchParams.get('page')) setPage(Number(searchParams.get('page')));
  }, [searchParams]);

  // Fetch Products based on current filters
  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = {
        page,
        limit: 12,
        sort
      };

      if (search) queryParams.search = search;
      if (category) queryParams.category = category;
      if (brand) queryParams.brand = brand;
      if (maxPrice && maxPrice < 50000) queryParams.maxPrice = maxPrice;

      const data = await fetchProducts(queryParams);
      if (data.success) {
        setProducts(data.data || []);
        setPagination(data.pagination || { page: 1, limit: 12, total: 0, totalPages: 1 });
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Could not load products. Please verify the server is running.');
    } finally {
      setLoading(false);
    }
  }, [search, category, brand, maxPrice, sort, page]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Helper to update URL params cleanly
  const updateQueryParams = (newParams) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        params.set(key, val);
      } else {
        params.delete(key);
      }
    });
    router.push(`/products?${params.toString()}`);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    setPage(1);
    updateQueryParams({ search: val, page: 1 });
  };

  const handleCategoryChange = (catSlug) => {
    setCategory(catSlug);
    setPage(1);
    updateQueryParams({ category: catSlug, page: 1 });
  };

  const handleBrandChange = (brandName) => {
    setBrand(brandName);
    setPage(1);
    updateQueryParams({ brand: brandName, page: 1 });
  };

  const handleMaxPriceChange = (price) => {
    setMaxPrice(price);
    setPage(1);
    updateQueryParams({ maxPrice: price < 50000 ? price : '', page: 1 });
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
    updateQueryParams({ sort: newSort });
  };

  const handleResetFilters = () => {
    setSearch('');
    setCategory('');
    setBrand('');
    setMaxPrice(50000);
    setSort('newest');
    setPage(1);
    router.push('/products');
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header Banner */}
      <div className="mb-8 bg-gradient-to-r from-gray-900 via-indigo-950/40 to-gray-900 border border-gray-800 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Marketplace Catalog</h1>
            <p className="text-sm text-gray-400 mt-1">
              Browse through our multi-brand collections with instant precision filtering.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md w-full">
            <input
              type="text"
              placeholder="Search by name, brand, or specs..."
              value={search}
              onChange={handleSearchChange}
              className="w-full bg-gray-950 text-white placeholder-gray-500 text-sm rounded-2xl pl-10 pr-4 py-3 border border-gray-800 focus:outline-none focus:border-indigo-500"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Desktop Filters Sidebar */}
        <aside className="hidden lg:block bg-gray-900/50 border border-gray-800 rounded-3xl p-6 sticky top-28">
          <ProductFilters
            categories={categories}
            selectedCategory={category}
            selectedBrand={brand}
            maxPrice={maxPrice}
            onCategoryChange={handleCategoryChange}
            onBrandChange={handleBrandChange}
            onMaxPriceChange={handleMaxPriceChange}
            onResetFilters={handleResetFilters}
          />
        </aside>

        {/* Mobile Filter Drawer Overlay */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden bg-black/80 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
            <div className="bg-gray-950 w-full max-w-xs h-full p-6 overflow-y-auto border-l border-gray-800">
              <ProductFilters
                categories={categories}
                selectedCategory={category}
                selectedBrand={brand}
                maxPrice={maxPrice}
                onCategoryChange={(cat) => {
                  handleCategoryChange(cat);
                  setMobileFiltersOpen(false);
                }}
                onBrandChange={(b) => {
                  handleBrandChange(b);
                  setMobileFiltersOpen(false);
                }}
                onMaxPriceChange={handleMaxPriceChange}
                onResetFilters={() => {
                  handleResetFilters();
                  setMobileFiltersOpen(false);
                }}
                onCloseMobile={() => setMobileFiltersOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="lg:col-span-3 space-y-6">
          
          {/* Controls Bar (Mobile Filter Toggle + Count + Sort) */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-gray-900/40 border border-gray-800 rounded-2xl p-4">
            
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 text-xs font-semibold px-4 py-2 rounded-xl"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            {/* Results count */}
            <div className="text-xs text-gray-400">
              Showing <span className="font-bold text-white">{products.length}</span> of{' '}
              <span className="font-bold text-white">{pagination.total}</span> products
            </div>

            {/* Sort Dropdown */}
            <ProductSort sort={sort} onSortChange={handleSortChange} />
          </div>

          {/* Product Grid */}
          <ProductGrid
            products={products}
            loading={loading}
            error={error}
            onResetFilters={handleResetFilters}
          />

          {/* Pagination Controls */}
          {pagination.totalPages > 1 && (
            <div className="pt-8 flex items-center justify-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => {
                  setPage((prev) => prev - 1);
                  updateQueryParams({ page: page - 1 });
                }}
                className="p-2.5 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {Array.from({ length: pagination.totalPages }).map((_, idx) => {
                const pNum = idx + 1;
                return (
                  <button
                    key={pNum}
                    onClick={() => {
                      setPage(pNum);
                      updateQueryParams({ page: pNum });
                    }}
                    className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                      page === pNum
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                        : 'bg-gray-900 border border-gray-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    {pNum}
                  </button>
                );
              })}

              <button
                disabled={page >= pagination.totalPages}
                onClick={() => {
                  setPage((prev) => prev + 1);
                  updateQueryParams({ page: page + 1 });
                }}
                className="p-2.5 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-gray-400">Loading catalog...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
