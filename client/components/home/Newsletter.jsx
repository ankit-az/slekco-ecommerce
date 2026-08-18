'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, CheckCircle } from 'lucide-react';
import Toast from '../ui/Toast';

const newsletterSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' })
});

export default function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(newsletterSchema)
  });

  const onSubmit = async (data) => {
    // Simulate short network delay for smooth UX
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSubscribed(true);
    setToastMessage('🎉 Welcome to the Slekco Insider Club!');
    reset();
  };

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-8 sm:p-12 shadow-xl backdrop-blur-md relative overflow-hidden">
          
          <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-7 h-7" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Stay Ahead of the Trend
          </h2>
          <p className="text-gray-400 text-sm max-w-lg mx-auto mb-8">
            Subscribe to our weekly dispatch for early access to limited luxury drops, curated product roundups, and VIP discount vouchers.
          </p>

          {subscribed ? (
            <div className="bg-emerald-950/60 border border-emerald-800 text-emerald-300 p-4 rounded-2xl max-w-md mx-auto flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-semibold">You're subscribed! Check your inbox for updates.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  {...register('email')}
                  className="w-full bg-gray-950 text-white placeholder-gray-500 text-sm rounded-2xl px-4 py-3 border border-gray-800 focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm px-6 py-3 rounded-2xl shrink-0 transition-all shadow-md shadow-indigo-600/30 hover:scale-105 disabled:opacity-50"
                >
                  {isSubmitting ? 'Joining...' : 'Subscribe'}
                </button>
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs text-left pl-2">{errors.email.message}</p>
              )}
            </form>
          )}

        </div>
      </div>

      <Toast message={toastMessage} onClose={() => setToastMessage('')} />
    </section>
  );
}
