'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingBag, Plus, Minus } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import { useCartStore } from '../../store/useCartStore';

export default function ProductCard({ product }) {
  const { items, addItem, increaseQuantity, decreaseQuantity } = useCartStore();

  const cartItem = items.find((i) => i._id === product?._id);
  const inCartQuantity = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = product.stock !== undefined && product.stock <= 0;
  const maxStock = product.stock !== undefined ? product.stock : 999;
  const isMaxStockReached = inCartQuantity >= maxStock;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addItem(product, 1);
  };

  const handleIncrease = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isMaxStockReached) return;
    increaseQuantity(product._id);
  };

  const handleDecrease = (e) => {
    e.preventDefault();
    e.stopPropagation();
    decreaseQuantity(product._id);
  };

  const imageSrc =
    product.images && product.images.length > 0
      ? product.images[0]
      : 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80';

  return (
    <div className="group relative bg-gray-900/60 border border-gray-800/80 rounded-2xl overflow-hidden hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col h-full">
      
      {/* Top Image Container */}
      <Link href={`/products/${product.slug}`} className="relative aspect-square overflow-hidden bg-gray-950 block">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {isOutOfStock ? (
            <span className="bg-gray-800/90 text-gray-300 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-gray-700 backdrop-blur-md">
              OUT OF STOCK
            </span>
          ) : (
            <>
              {product.discount > 0 && (
                <span className="bg-gradient-to-r from-red-600 to-amber-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md shadow-red-900/40">
                  -{product.discount}% OFF
                </span>
              )}
              {product.isFeatured && (
                <span className="bg-indigo-600/90 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-md">
                  FEATURED
                </span>
              )}
            </>
          )}
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-grow justify-between gap-3">
        <div>
          <div className="flex items-center justify-between gap-2 text-xs text-gray-400 mb-1">
            <span className="font-semibold text-indigo-400 uppercase tracking-wider">{product.brand}</span>
            {product.category?.name && (
              <span className="text-gray-500 truncate max-w-[120px]">{product.category.name}</span>
            )}
          </div>

          <Link href={`/products/${product.slug}`}>
            <h3 className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2 text-xs">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-bold ml-1 text-white">{product.rating || 4.5}</span>
            </div>
            <span className="text-gray-500">({product.reviewCount || 42})</span>
          </div>
        </div>

        {/* Price & Add to Cart / Quantity Control */}
        <div className="pt-3 border-t border-gray-800/60 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-white">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-gray-500 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          {isOutOfStock ? (
            <button
              disabled
              className="p-2 px-3 rounded-xl text-xs font-semibold bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed"
            >
              Out of Stock
            </button>
          ) : inCartQuantity === 0 ? (
            <button
              onClick={handleAddToCart}
              className="p-2.5 rounded-xl text-xs font-semibold bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 transition-all flex items-center gap-1.5"
              aria-label="Add to Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Add</span>
            </button>
          ) : (
            <div className="flex items-center bg-gray-950 border border-indigo-500/50 rounded-xl p-0.5">
              <button
                onClick={handleDecrease}
                className="w-7 h-7 flex items-center justify-center text-gray-300 hover:text-white rounded-lg hover:bg-gray-800"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center text-xs font-extrabold text-white">
                {inCartQuantity}
              </span>
              <button
                onClick={handleIncrease}
                disabled={isMaxStockReached}
                className={`w-7 h-7 flex items-center justify-center rounded-lg ${
                  isMaxStockReached
                    ? 'text-gray-600 cursor-not-allowed'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
                aria-label="Increase quantity"
                title={isMaxStockReached ? `Stock limit of ${maxStock} reached` : 'Increase quantity'}
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
