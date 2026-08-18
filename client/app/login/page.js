'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Sparkles, ArrowRight, Lock, Mail, User } from 'lucide-react';
import { loginUser, registerUser } from '../../lib/api';
import { useAuthStore } from '../../store/useAuthStore';
import Toast from '../../components/ui/Toast';

const loginSchema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Valid email required'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const {
    register: regLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors, isSubmitting: isLoginSubmitting }
  } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const {
    register: regSignup,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors, isSubmitting: isSignupSubmitting }
  } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const onLogin = async (data) => {
    setErrorMessage('');
    try {
      const res = await loginUser(data);
      if (res.success && res.data) {
        setUser(res.data, res.data.token);
        setToastMessage(`Welcome back, ${res.data.name}!`);
        setTimeout(() => router.push('/'), 1000);
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  const onRegister = async (data) => {
    setErrorMessage('');
    try {
      const res = await registerUser(data);
      if (res.success && res.data) {
        setUser(res.data, res.data.token);
        setToastMessage(`Account created successfully! Welcome ${res.data.name}`);
        setTimeout(() => router.push('/'), 1000);
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Registration failed. Try a different email.');
    }
  };

  return (
    <div className="pt-32 pb-20 max-w-md mx-auto px-4">
      <div className="bg-gray-900/70 border border-gray-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white mx-auto mb-3 shadow-lg shadow-indigo-500/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">
            {isRegister ? 'Create Your Account' : 'Sign In To Slekco'}
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            {isRegister ? 'Join our community for exclusive marketplace perks' : 'Access your orders, saved items, and VIP rewards'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-gray-950 p-1 rounded-2xl mb-6 border border-gray-800">
          <button
            onClick={() => setIsRegister(false)}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              !isRegister ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsRegister(true)}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              isRegister ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Register
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs font-medium">
            {errorMessage}
          </div>
        )}

        {/* Login Form */}
        {!isRegister ? (
          <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="demo@slekco.com"
                  {...regLogin('email')}
                  className="w-full bg-gray-950 text-white placeholder-gray-500 text-sm rounded-xl pl-10 pr-4 py-2.5 border border-gray-800 focus:outline-none focus:border-indigo-500"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              </div>
              {loginErrors.email && (
                <p className="text-red-400 text-xs mt-1">{loginErrors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  {...regLogin('password')}
                  className="w-full bg-gray-950 text-white placeholder-gray-500 text-sm rounded-xl pl-10 pr-4 py-2.5 border border-gray-800 focus:outline-none focus:border-indigo-500"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              </div>
              {loginErrors.password && (
                <p className="text-red-400 text-xs mt-1">{loginErrors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoginSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <span>{isLoginSubmitting ? 'Signing In...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* Register Form */
          <form onSubmit={handleSignupSubmit(onRegister)} className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Jane Doe"
                  {...regSignup('name')}
                  className="w-full bg-gray-950 text-white placeholder-gray-500 text-sm rounded-xl pl-10 pr-4 py-2.5 border border-gray-800 focus:outline-none focus:border-indigo-500"
                />
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              </div>
              {signupErrors.name && (
                <p className="text-red-400 text-xs mt-1">{signupErrors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="jane@example.com"
                  {...regSignup('email')}
                  className="w-full bg-gray-950 text-white placeholder-gray-500 text-sm rounded-xl pl-10 pr-4 py-2.5 border border-gray-800 focus:outline-none focus:border-indigo-500"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              </div>
              {signupErrors.email && (
                <p className="text-red-400 text-xs mt-1">{signupErrors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  {...regSignup('password')}
                  className="w-full bg-gray-950 text-white placeholder-gray-500 text-sm rounded-xl pl-10 pr-4 py-2.5 border border-gray-800 focus:outline-none focus:border-indigo-500"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              </div>
              {signupErrors.password && (
                <p className="text-red-400 text-xs mt-1">{signupErrors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSignupSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <span>{isSignupSubmitting ? 'Registering...' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

      </div>

      <Toast message={toastMessage} onClose={() => setToastMessage('')} />
    </div>
  );
}
