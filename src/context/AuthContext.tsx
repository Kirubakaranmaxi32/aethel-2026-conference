import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { getSupabase, getSupabaseCredentials } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  // Fallback demo admin session mode (useful when testing UI without requiring pre-seeded users)
  isDemoAdmin: boolean;
  loginAsDemoAdmin: () => void;
  logoutDemoAdmin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoAdmin, setIsDemoAdmin] = useState<boolean>(() => {
    return typeof window !== 'undefined' && localStorage.getItem('aethel_demo_admin') === 'true';
  });

  const { isConfigured } = getSupabaseCredentials();

  useEffect(() => {
    const client = getSupabase();
    if (!client) {
      setIsLoading(false);
      return;
    }

    // Get current session
    client.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    }).catch(err => {
      console.warn('Error fetching Supabase session:', err);
      setIsLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [isConfigured]);

  const signIn = async (email: string, password: string) => {
    const client = getSupabase();
    if (!client) {
      return { error: new Error('Supabase client is not configured. Please set your credentials.') };
    }
    const { error } = await client.auth.signInWithPassword({ email, password });
    return { error: error ? new Error(error.message) : null };
  };

  const signUp = async (email: string, password: string) => {
    const client = getSupabase();
    if (!client) {
      return { error: new Error('Supabase client is not configured.') };
    }
    const { error } = await client.auth.signUp({ email, password });
    return { error: error ? new Error(error.message) : null };
  };

  const signOut = async () => {
    const client = getSupabase();
    if (client) {
      await client.auth.signOut();
    }
    logoutDemoAdmin();
    setUser(null);
    setSession(null);
  };

  const loginAsDemoAdmin = () => {
    setIsDemoAdmin(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('aethel_demo_admin', 'true');
    }
  };

  const logoutDemoAdmin = () => {
    setIsDemoAdmin(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('aethel_demo_admin');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isConfigured,
        signIn,
        signUp,
        signOut,
        isDemoAdmin,
        loginAsDemoAdmin,
        logoutDemoAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
