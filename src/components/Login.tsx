import React from 'react';
import { User } from '../types';
import useStore from '../store/useStore';

const Login: React.FC = () => {
  const login = useStore((state) => state.login);

  const handleLogin = (user: User) => {
    login(user);
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
          <h3 className="text-xl font-semibold text-center mb-6">Who's planning today?</h3>
          
          <div className="space-y-4">
            <button
              onClick={() => handleLogin('Yvonne')}
              className="w-full bg-gradient-to-r from-secondary-500 to-secondary-600 text-white py-4 px-6 rounded-xl hover:from-secondary-600 hover:to-secondary-700 transition-all duration-200 transform hover:scale-105 font-medium text-lg shadow-lg"
            >
              <span className="flex items-center justify-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Yvonne
              </span>
            </button>

            <button
              onClick={() => handleLogin('Daniel')}
              className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-4 px-6 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-200 transform hover:scale-105 font-medium text-lg shadow-lg"
            >
              <span className="flex items-center justify-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Daniel
              </span>
            </button>
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