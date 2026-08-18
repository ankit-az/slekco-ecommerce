'use client';

import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-gray-900 border border-gray-800 text-white px-4 py-3 rounded-xl shadow-2xl shadow-black/50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      {type === 'success' ? (
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
      ) : (
        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
      )}
      <p className="text-sm font-medium pr-2">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
