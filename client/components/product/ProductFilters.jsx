'use client';

import { X, RotateCcw, Filter } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';

export default function ProductFilters({
  categories = [],
  selectedCategory,
  selectedBrand,
  maxPrice,
  onCategoryChange,
  onBrandChange,
  onMaxPriceChange,
  onResetFilters,
  onCloseMobile
}) {
  const brands = [
    'Apple',
    'Sony',
    'Nike',
    'Adidas',
    'Bose',
    'Philips',
    'Dyson',
    'Ray-Ban',
    'Sephora',
    'IKEA',
    'Fossil'
  ];

  return (
    <div className="space-y-6 text-sm">
      
      {/* Mobile Drawer Header */}
      {onCloseMobile && (
        <div className="flex items-center justify-between pb-4 border-b border-gray-800 lg:hidden">
          <div className="flex items-center gap-2 font-bold text-white text-base">
            <Filter className="w-5 h-5 text-indigo-400" />
            Product Filters
          </div>
          <button
            onClick={onCloseMobile}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-white text-base uppercase tracking-wider text-xs text-indigo-400">
          Refine Selection
        </h3>
        <button
          onClick={onResetFilters}
          className="text-xs text-gray-400 hover:text-indigo-400 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset All
        </button>
      </div>

      {/* Category Filter */}
      <div className="space-y-3 pt-2 border-t border-gray-800/80">
        <h4 className="font-semibold text-white">Categories</h4>
        <div className="space-y-1.5">
          <button
            onClick={() => onCategoryChange('')}
            className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
              !selectedCategory
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => onCategoryChange(cat.slug)}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                selectedCategory === cat.slug
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3 pt-4 border-t border-gray-800/80">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-white">Max Price</h4>
          <span className="text-xs font-bold text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded-md border border-indigo-800/50">
            Up to {formatCurrency(maxPrice || 50000)}
          </span>
        </div>
        <input
          type="range"
          min="500"
          max="50000"
          step="500"
          value={maxPrice || 50000}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
          className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
        />
        <div className="flex justify-between text-[11px] text-gray-500 font-mono">
          <span>₹500</span>
          <span>₹25,000</span>
          <span>₹50,000</span>
        </div>
      </div>

      {/* Brand Filter */}
      <div className="space-y-3 pt-4 border-t border-gray-800/80">
        <h4 className="font-semibold text-white">Popular Brands</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {brands.map((brand) => {
            const isChecked = selectedBrand === brand;
            return (
              <label
                key={brand}
                className="flex items-center gap-2.5 text-gray-300 hover:text-white cursor-pointer select-none text-sm"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onBrandChange(isChecked ? '' : brand)}
                  className="w-4 h-4 rounded border-gray-700 bg-gray-900 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-gray-950"
                />
                <span className={isChecked ? 'text-indigo-300 font-semibold' : ''}>
                  {brand}
                </span>
              </label>
            );
          })}
        </div>
      </div>

    </div>
  );
}
