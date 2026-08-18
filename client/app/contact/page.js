'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { sendContactForm } from '../../lib/api';
import Toast from '../../components/ui/Toast';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email address required'),
  message: z.string().min(10, 'Message must be at least 10 characters long')
});

export default function ContactPage() {
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data) => {
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const res = await sendContactForm(data);
      if (res.success) {
        setSuccessMsg(res.message || 'Message submitted successfully!');
        reset();
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to submit message. Please try again.');
    }
  };

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
          We'd Love To Hear From You
        </span>
        <h1 className="text-4xl font-extrabold text-white">Get In Touch</h1>
        <p className="text-gray-400 text-sm">
          Have questions about a product drop, order status, or wholesale inquiry? Fill out the form below and our team will get back to you within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
        
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6 space-y-6">
            <h2 className="text-lg font-bold text-white mb-4">Contact Information</h2>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-gray-400 font-semibold">Email Us</div>
                <div className="text-sm font-bold text-white">support@slekco.com</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-gray-400 font-semibold">Customer Support</div>
                <div className="text-sm font-bold text-white">+1 (800) 555-SLEKCO</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-gray-400 font-semibold">Global Headquarters</div>
                <div className="text-sm font-bold text-white">100 Marketplace Way, San Francisco, CA</div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7 bg-gray-900/70 border border-gray-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">Send Us A Message</h2>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-sm">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Your Name</label>
              <input
                type="text"
                placeholder="Alex Mercer"
                {...register('name')}
                className="w-full bg-gray-950 text-white placeholder-gray-500 text-sm rounded-xl px-4 py-3 border border-gray-800 focus:outline-none focus:border-indigo-500"
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="alex@example.com"
                {...register('email')}
                className="w-full bg-gray-950 text-white placeholder-gray-500 text-sm rounded-xl px-4 py-3 border border-gray-800 focus:outline-none focus:border-indigo-500"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Message</label>
              <textarea
                rows={5}
                placeholder="Tell us how we can help you..."
                {...register('message')}
                className="w-full bg-gray-950 text-white placeholder-gray-500 text-sm rounded-xl px-4 py-3 border border-gray-800 focus:outline-none focus:border-indigo-500 resize-none"
              />
              {errors.message && (
                <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
            </button>
          </form>
        </div>

      </div>

      <Toast message={successMsg} onClose={() => setSuccessMsg('')} />
    </div>
  );
}
