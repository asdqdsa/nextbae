'use client';

import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils/cn';
import { useState } from 'react';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLaoding] = useState<boolean>(false);
  const supabase = createClient();

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleAuthForm = async (e: React.FormEvent) => {
    e.preventDefault();

    setLaoding(true);
    setError('');

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;
        if (data.user && !data.session) {
          setError('Confirm your email via link');
          return;
        }
      }
      if (!isSignUp) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
    } finally {
      setLaoding(false);
    }
  };

  return (
    <div
      className={cn(
        'flex min-h-screen items-center justify-center',
        'bg-gradient-to-br from-gray-900 to-gray-800'
      )}
    >
      <div className="w-full max-w-md space-y-4 p-4">
        <div className="text-center">
          <h1 className="font-mono text-2xl font-bold">Rest Client</h1>
          <p className="font-mono font-thin">
            {isSignUp ? 'Create New Account' : 'Login'}
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleAuthForm}>
          <div className="gap-4 rounded border-gray-700 py-2">
            <div className="grid grid-cols-1 items-center justify-center gap-2">
              <label htmlFor="email" className="text-sm text-gray-600">
                {/*Email*/}
              </label>
              <input
                className="auth"
                id="email"
                type="email"
                value={email}
                placeholder="Email"
                onChange={handleEmail}
              />

              <label htmlFor="password" className="text-smal text-gray-600">
                {/*Password*/}
              </label>
              <input
                className="auth"
                id="password"
                type="password"
                value={password}
                placeholder="Password"
                onChange={handlePassword}
              />
            </div>
          </div>

          {error && <div className="text-sm text-red-400">{error}</div>}

          <button
            className="w-full cursor-pointer rounded-md bg-gradient-to-r from-orange-500 to-red-400 p-2 shadow-sm hover:from-red-400 hover:to-orange-500 focus:outline-none disabled:hover:bg-gradient-to-r"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Loading..' : isSignUp ? 'Sign up' : 'Sing in'}
          </button>
        </form>
        <div className="text-center">
          <button
            className="font-mono text-sm text-orange-300/50 hover:text-orange-200/70 focus:outline-none"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp
              ? 'Have an account? Sign in'
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
}
