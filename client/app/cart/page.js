'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import { useCartStore } from '../../store/useCartStore';

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const {
    items,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
    getSubtotal
  } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 text-center text-gray-400">
        Loading cart details...
      </div>
    );
  }

  const subtotal = getSubtotal();
  const shipping = subtotal > 1999 || subtotal === 0 ? 0 : 149;
  const tax = subtotal * 0.18; // 18% GST according to Indian Govt standards
  const total = subtotal + shipping + tax;

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setCheckoutSuccess(true);
    setTimeout(() => {
      clearCart();
    }, 1500);
  };

  if (items.length === 0 && !checkoutSuccess) {
    return (
      <div className="pt-32 pb-20 max-w-3xl mx-auto px-4 text-center">
        <div className="bg-gray-900/40 border border-gray-800 rounded-3xl p-12 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center mx-auto mb-4 border border-indigo-500/30">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Your Shopping Cart is Empty</h1>
          <p className="text-gray-400 text-sm max-w-md mx-auto mb-8">
            Looks like you haven't added any items to your bag yet. Explore our curated collections to get started!
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm px-8 py-3.5 rounded-2xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
          >
            <span>Start Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Shopping Cart</h1>
          <p className="text-sm text-gray-400 mt-1">Review your selected items before completing your order.</p>
        </div>

        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs text-red-400 hover:text-red-300 font-semibold underline"
          >
            Clear Entire Cart
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-gray-900/60 border border-gray-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all"
            >
              {/* Product Image & Title */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-950 shrink-0 border border-gray-800">
                  <Image
                    src={
                      item.images && item.images.length > 0
                        ? item.images[0]
                        : 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'
                    }
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
                    {item.brand}
                  </span>
                  <Link href={`/products/${item.slug}`}>
                    <h3 className="text-sm font-semibold text-white hover:text-indigo-300 transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                  </Link>
                  <div className="text-xs text-gray-400">{formatCurrency(item.price)} each</div>
                  {item.stock !== undefined && item.quantity >= item.stock && (
                    <div className="text-[10px] font-bold text-amber-400">
                      Max Stock ({item.stock}) Reached
                    </div>
                  )}
                </div>
              </div>

              {/* Quantity Controls & Remove */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-800">
                
                <div className="flex items-center bg-gray-950 border border-gray-800 rounded-xl p-1">
                  <button
                    onClick={() => decreaseQuantity(item._id)}
                    className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-white">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item._id)}
                    disabled={item.stock !== undefined && item.quantity >= item.stock}
                    className={`w-7 h-7 flex items-center justify-center rounded-lg ${
                      item.stock !== undefined && item.quantity >= item.stock
                        ? 'text-gray-600 cursor-not-allowed'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                    title={
                      item.stock !== undefined && item.quantity >= item.stock
                        ? `Maximum stock of ${item.stock} reached`
                        : 'Increase quantity'
                    }
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right min-w-[80px]">
                  <div className="text-sm font-bold text-white">
                    {formatCurrency(item.price * item.quantity)}
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item._id)}
                  className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 bg-gray-900/60 border border-gray-800 rounded-3xl p-6 space-y-6">
          <h2 className="text-lg font-bold text-white border-b border-gray-800 pb-4">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span className="font-semibold text-white">{formatCurrency(subtotal)}</span>
            </div>

            <div className="flex justify-between text-gray-400">
              <span>Estimated Shipping</span>
              <span className="font-semibold text-emerald-400">
                {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
              </span>
            </div>

            <div className="flex justify-between text-gray-400">
              <span>GST (18%)</span>
              <span className="font-semibold text-white">{formatCurrency(tax)}</span>
            </div>

            <div className="pt-3 border-t border-gray-800 flex justify-between items-baseline text-base font-bold">
              <span className="text-white">Total</span>
              <span className="text-2xl text-indigo-400">{formatCurrency(total)}</span>
            </div>
          </div>

          <button
            onClick={() => setCheckoutModalOpen(true)}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Encrypted & Safe Checkout</span>
          </div>
        </div>

      </div>

      {/* Mock Checkout Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 max-w-lg w-full rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            
            {!checkoutSuccess ? (
              <>
                <h3 className="text-xl font-bold text-white">Mock Checkout</h3>
                <p className="text-xs text-gray-400">
                  This demonstrates how order placement is processed in Slekco.
                </p>

                <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-sm">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      defaultValue="Alex Mercer"
                      className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Shipping Address</label>
                    <input
                      type="text"
                      required
                      defaultValue="742 Evergreen Terrace"
                      className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">City</label>
                      <input
                        type="text"
                        required
                        defaultValue="Springfield"
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Zip Code</label>
                      <input
                        type="text"
                        required
                        defaultValue="97477"
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between items-center text-sm font-bold border-t border-gray-800">
                    <span className="text-gray-400">Total Payable:</span>
                    <span className="text-indigo-400 text-lg">{formatCurrency(total)}</span>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setCheckoutModalOpen(false)}
                      className="w-1/2 bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold py-3 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-600/30"
                    >
                      Confirm Order
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-6 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-2xl font-extrabold text-white">Order Placed Successfully!</h3>
                <p className="text-sm text-gray-300">
                  Thank you for shopping with Slekco. Your order summary has been logged.
                </p>
                <button
                  onClick={() => {
                    setCheckoutModalOpen(false);
                    setCheckoutSuccess(false);
                  }}
                  className="bg-indigo-600 text-white font-bold px-6 py-2.5 rounded-xl"
                >
                  Close & Back To Home
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
