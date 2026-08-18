import ProductCard from './ProductCard';
import { ProductCardSkeleton } from '../ui/Skeleton';
import { PackageOpen, AlertTriangle } from 'lucide-react';

export default function ProductGrid({ products, loading, error, onResetFilters }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, idx) => (
          <ProductCardSkeleton key={idx} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 px-4 bg-gray-900/40 border border-gray-800 rounded-3xl my-6">
        <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-white mb-2">Unable to Load Products</h3>
        <p className="text-gray-400 text-sm max-w-md mx-auto mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all"
        >
          Try Refreshing
        </button>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-gray-900/30 border border-gray-800/80 rounded-3xl my-6">
        <PackageOpen className="w-14 h-14 text-gray-500 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-white mb-2">No Products Match Your Filter</h3>
        <p className="text-gray-400 text-sm max-w-md mx-auto mb-6">
          Try tweaking your search term, adjusting price boundaries, or clearing active filters.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="bg-gray-800 hover:bg-gray-700 text-indigo-300 text-sm font-semibold px-6 py-2.5 rounded-full border border-gray-700 transition-all"
          >
            Clear All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
