'use client';

import { ArrowUpDown } from 'lucide-react';

export default function ProductSort({ sort, onSortChange }) {
  const options = [
    { label: 'Newest Arrivals', value: 'newest' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Highest Rated', value: 'rating' }
  ];

  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="w-4 h-4 text-gray-400" />
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider hidden sm:inline">Sort:</span>
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="bg-gray-900 text-white text-sm font-medium border border-gray-800 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
