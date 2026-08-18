'use client';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingBag, Check, Shield, Truck, RotateCcw, ArrowLeft, Plus, Minus, ArrowRight, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../../../lib/utils';
import { useCartStore } from '../../../store/useCartStore';
import { fetchProductBySlug } from '../../../lib/api';
import ProductCard from '../../../components/product/ProductCard';
import Toast from '../../../components/ui/Toast';

export default function ProductDetailPage({ params }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  const { items, addItem, increaseQuantity, decreaseQuantity } = useCartStore();

  const cartItem = items.find((i) => i._id === product?._id);
  const inCartQuantity = cartItem ? cartItem.quantity : 0;
  const maxStock = product?.stock !== undefined ? product.stock : 999;
  const isOutOfStock = maxStock <= 0;
  const isMaxStockReached = inCartQuantity >= maxStock;

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchProductBySlug(slug);
        if (res.success && res.data) {
          setProduct(res.data);
          setRelatedProducts(res.data.relatedProducts || []);
          if (res.data.images && res.data.images.length > 0) {
            setSelectedImage(res.data.images[0]);
          }
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Failed to load product detail:', err);
        setError('Error connecting to product server');
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadProduct();
    }
  }, [slug]);

  const handleAddToCart = () => {
    if (!product || isOutOfStock) return;
    const res = addItem(product, 1);
    if (res?.maxReached) {
      setToastMsg(`Maximum stock limit of ${maxStock} items reached!`);
    } else {
      setToastMsg(`Added "${product.name}" to your cart!`);
    }
  };

  const handleIncreaseQuantity = () => {
    if (!product || isMaxStockReached) return;
    const res = increaseQuantity(product._id);
    if (res?.maxReached) {
      setToastMsg(`Maximum stock limit of ${maxStock} items reached!`);
    }
  };

  if (loading) {
    return (
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-gray-800/40 animate-pulse aspect-square rounded-3xl" />
          <div className="space-y-4">
            <div className="h-6 bg-gray-800/60 rounded w-1/4" />
            <div className="h-10 bg-gray-800/60 rounded w-3/4" />
            <div className="h-6 bg-gray-800/60 rounded w-1/3" />
            <div className="h-24 bg-gray-800/60 rounded w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Product Not Found</h2>
        <p className="text-gray-400 text-sm mb-6">{error || "The requested item could not be retrieved."}</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-2.5 rounded-full"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>
      </div>
    );
  }

  const allImages = product.images && product.images.length > 0
    ? product.images
    : ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'];

  const currentImage = selectedImage || allImages[0];

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Back Link */}
      <div className="mb-6">
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Catalog
        </Link>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Image Viewer */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden glass-panel border border-gray-800 shadow-2xl">
            <Image
              src={currentImage}
              alt={product.name}
              fill
              priority
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
            {product.discount > 0 && !isOutOfStock && (
              <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                -{product.discount}% OFF
              </span>
            )}
            {isOutOfStock && (
              <span className="absolute top-4 left-4 bg-gray-800 text-gray-300 text-xs font-extrabold px-3 py-1 rounded-full shadow-lg border border-gray-700">
                OUT OF STOCK
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    currentImage === img ? 'border-indigo-500 scale-105' : 'border-gray-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Specs & Actions */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-indigo-400 uppercase tracking-wider">{product.brand}</span>
            {product.category?.name && (
              <span className="text-gray-400 bg-gray-900 border border-gray-800 px-3 py-1 rounded-full">
                {product.category.name}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl font-extrabold text-white leading-tight">{product.name}</h1>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center text-amber-400">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-bold text-white ml-1">{product.rating || 4.5}</span>
            </div>
            <span className="text-gray-500">|</span>
            <span className="text-gray-400">{product.reviewCount || 42} Verified Reviews</span>
          </div>

          {/* Pricing */}
          <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800/80 flex items-baseline gap-3">
            <span className="text-3xl font-black text-white">{formatCurrency(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="text-base text-gray-500 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm leading-relaxed">
            {product.description}
          </p>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isOutOfStock ? 'bg-red-500' : 'bg-emerald-500 animate-pulse'}`} />
            <span className={`text-xs font-semibold ${isOutOfStock ? 'text-red-400' : 'text-emerald-400'}`}>
              {isOutOfStock ? 'Out of Stock' : `In Stock (${maxStock} units available)`}
            </span>
          </div>

          {/* Stock Limit Notice if max stock reached */}
          {isMaxStockReached && !isOutOfStock && (
            <div className="flex items-center gap-2 text-xs text-amber-400 bg-amber-950/40 border border-amber-800/60 p-3 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Maximum available stock of {maxStock} items added to your cart.</span>
            </div>
          )}

          {/* Add to Cart / Live Cart Quantity Controls */}
          <div className="space-y-4 pt-4 border-t border-gray-800">
            {isOutOfStock ? (
              <button
                disabled
                className="w-full bg-gray-800 text-gray-500 font-bold py-4 px-6 rounded-2xl border border-gray-700 cursor-not-allowed text-center"
              >
                Out of Stock
              </button>
            ) : inCartQuantity === 0 ? (
              <button
                onClick={handleAddToCart}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/30 hover:scale-[1.02]"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Add To Cart</span>
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row items-stretch gap-4">
                <div className="flex items-center justify-between bg-gray-900 border border-indigo-500/50 rounded-2xl p-1.5 shadow-lg min-w-[150px]">
                  <button
                    onClick={() => decreaseQuantity(product._id)}
                    className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-white font-bold text-lg hover:bg-gray-800 rounded-xl transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="px-3 text-center">
                    <span className="text-base font-extrabold text-white">{inCartQuantity}</span>
                    <span className="text-[10px] text-indigo-300 block font-medium">in cart</span>
                  </div>
                  <button
                    onClick={handleIncreaseQuantity}
                    disabled={isMaxStockReached}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${
                      isMaxStockReached
                        ? 'text-gray-600 cursor-not-allowed'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <Link
                  href="/cart"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-6 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 hover:scale-[1.02]"
                >
                  <span>Go To Cart</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-gray-800 text-center">
            <div className="p-3 rounded-2xl bg-gray-900/40 border border-gray-800/60">
              <Truck className="w-5 h-5 text-indigo-400 mx-auto mb-1" />
              <div className="text-[11px] font-bold text-white">Free Shipping</div>
              <div className="text-[10px] text-gray-500">Orders over ₹1,999</div>
            </div>
            <div className="p-3 rounded-2xl bg-gray-900/40 border border-gray-800/60">
              <Shield className="w-5 h-5 text-indigo-400 mx-auto mb-1" />
              <div className="text-[11px] font-bold text-white">2 Year Warranty</div>
              <div className="text-[10px] text-gray-500">Official Guarantee</div>
            </div>
            <div className="p-3 rounded-2xl bg-gray-900/40 border border-gray-800/60">
              <RotateCcw className="w-5 h-5 text-indigo-400 mx-auto mb-1" />
              <div className="text-[11px] font-bold text-white">Easy Returns</div>
              <div className="text-[10px] text-gray-500">30-day window</div>
            </div>
          </div>

        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-24 pt-12 border-t border-gray-900">
          <h2 className="text-2xl font-extrabold text-white mb-6">
            Similar Products You Might Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel._id} product={rel} />
            ))}
          </div>
        </section>
      )}

      <Toast message={toastMsg} onClose={() => setToastMsg('')} />
    </div>
  );
}
