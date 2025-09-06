'use client';

import { useAuth } from '@/app/contexts/auth-context';
import Link from 'next/link';

export default function Navbar() {
  const { user, signOut } = useAuth();
  return (
    <nav className="relative z-40 border-b border-gray-200/50 bg-slate-900 dark:bg-gray-700/50">
      <div className="container mx-auto px-6">
        <div className="flex h-16 justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-xl font-bold dark:from-purple-500 dark:to-blue-500">
              nextbae
            </span>
          </Link>

          <div className="hidden items-center space-x-8 md:flex">
            <Link href="/chat" className="flex items-center space-x-3">
              <span className="font-medium text-gray-700 transition-colors duration-200 hover:text-pink-600 dark:text-gray-300 dark:hover:text-pink-400">
                chat
              </span>
            </Link>
            <Link href="/profile" className="flex items-center space-x-3">
              <span className="font-medium text-gray-700 transition-colors duration-200 hover:text-pink-600 dark:text-gray-300 dark:hover:text-pink-400">
                profile
              </span>
            </Link>
          </div>

          {user ? (
            <div className="flex items-center space-x-4">
              <button
                className="inline-flex items-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-200 hover:from-purple-600 hover:to-pink-700 hover:shadow-lg"
                onClick={signOut}
              >
                <svg
                  className="mr-1 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                href="/auth"
                className="inline-flex items-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-200 hover:from-purple-600 hover:to-pink-700 hover:shadow-lg"
              >
                Sign in
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
