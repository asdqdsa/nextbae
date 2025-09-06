'use client';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      try {
        setLoading(true);
        const {
          data: { session },
        } = await supabase.auth.getSession();

        setUser(session?.user ?? null);

        console.log('user: ', session?.user);

        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange(async (_event, session) =>
          setUser(session?.user ?? null)
        );

        return () => subscription.unsubscribe();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    checkUser();
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error(error);
    } finally {
      setUser(null);
      router.push('/auth');
    }
  };
  return (
    <AuthContext value={{ signOut, loading, user }}>{children}</AuthContext>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
