'use client';

import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AdminAuthProps {
  onLoginSuccess?: () => void;
}

export default function AdminAuth({ onLoginSuccess }: AdminAuthProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        onLoginSuccess?.();
      }
    });

    return unsubscribe;
  }, [onLoginSuccess]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setTimeout(() => {
        onLoginSuccess?.();
      }, 500);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const useGlobalLogin = () => {
    setEmail('tsa-tester@gmail.com');
    setPassword('password123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: '#FCF9EA'}}>
      <div className="max-w-md w-full mx-4">
        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border" style={{borderColor: '#EBD9D1'}}>
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{backgroundColor: '#B87C4C'}}>
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-2" style={{color: '#B87C4C'}}>Admin Portal</h2>
            <p className="text-gray-600">Sign in to manage resources</p>
          </div>

          {/* Global Login Credentials Box */}
          <div className="mb-8 p-4 rounded-xl border-2" style={{backgroundColor: '#F7F4EA', borderColor: '#B87C4C'}}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold" style={{color: '#B87C4C'}}>🔐 TSA Test Credentials</h3>
              <button
                onClick={useGlobalLogin}
                className="text-xs px-3 py-1 rounded-lg font-medium transition-all hover:scale-105"
                style={{backgroundColor: '#B87C4C', color: 'white'}}
              >
                Use These
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span style={{color: '#748DAE'}}>User:</span>
                <code className="bg-white px-2 py-1 rounded" style={{color: '#333'}}>tsa-tester@gmail.com</code>
              </div>
              <div className="flex justify-between">
                <span style={{color: '#748DAE'}}>Password:</span>
                <code className="bg-white px-2 py-1 rounded" style={{color: '#333'}}>password123</code>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{color: '#748DAE'}}>
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5" style={{color: '#748DAE'}} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:border-blue-500 transition-all"
                  style={{borderColor: '#EBD9D1', color: '#333'}}
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{color: '#748DAE'}}>
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5" style={{color: '#748DAE'}} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:border-blue-500 transition-all"
                  style={{borderColor: '#EBD9D1', color: '#333'}}
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-xl text-center text-red-600 bg-red-50 border-2 border-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              style={{backgroundColor: '#B87C4C', color: 'white'}}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-8 p-4 rounded-xl" style={{backgroundColor: '#F7F4EA'}}>
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 mt-0.5 flex-shrink-0" style={{color: '#B87C4C'}} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-semibold" style={{color: '#B87C4C'}}>Admin Access Only</p>
                <p className="text-xs mt-1" style={{color: '#748DAE'}}>
                  This portal is for authorized administrators only. All access attempts are logged.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
