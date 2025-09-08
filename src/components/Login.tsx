import React, { useState } from 'react';
import useStore from '../store/useStore';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const login = useStore((state) => state.login);
  const authError = useStore((state) => state.authError);
  const clearAuthError = useStore((state) => state.clearAuthError);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearAuthError();
    
    if (!email || !password) {
      return;
    }
    
    const success = login(email, password);
    if (!success) {
      // Error is handled by the store
      setPassword(''); // Clear password on failed login
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-2">
            Araujo-Schacht
          </h1>
          <h2 className="text-2xl md:text-3xl font-display text-primary-600 mb-1">
            Belonging & Becoming
          </h2>
          <p className="text-gray-600 mt-4">Your 12-Week Journey Together</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-xl font-semibold text-center mb-6">Secure Login</h3>
          
          {authError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {authError}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pr-12"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {showPassword ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 px-6 rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 transform hover:scale-105 font-medium text-lg shadow-lg"
            >
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Sign In
              </span>
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Login Credentials:</h4>
            <div className="text-xs text-gray-600 space-y-1">
              <div><strong>Daniel:</strong> schacht.dan@gmail.com</div>
              <div><strong>Yvonne:</strong> yviea2013@gmail.com</div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Use password: <strong>ChangeMe2025!D</strong> (Daniel) or <strong>ChangeMe2025!Y</strong> (Yvonne)
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Change your password in Settings after login
            </p>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              "The rhythm of daily action aligned with your goals creates the momentum that separates dreamers from super-achievers."
            </p>
            <p className="text-xs text-gray-400 mt-2">- Darren Hardy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;