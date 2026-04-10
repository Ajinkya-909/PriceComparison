import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Placeholder Supabase client initialization
// import { createClient } from '@supabase/supabase-js'
// const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY')

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("auth_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem("auth_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("auth_user");
    }
  }, [user]);

  const signIn = async (email: string, _password: string) => {
    setLoading(true);
    // Placeholder: const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    await new Promise((r) => setTimeout(r, 800));
    setUser({ id: crypto.randomUUID(), email });
    setLoading(false);
  };

  const signUp = async (email: string, _password: string) => {
    setLoading(true);
    // Placeholder: const { data, error } = await supabase.auth.signUp({ email, password })
    await new Promise((r) => setTimeout(r, 800));
    setUser({ id: crypto.randomUUID(), email });
    setLoading(false);
  };

  const signOut = async () => {
    // Placeholder: await supabase.auth.signOut()
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
