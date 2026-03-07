import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  displayName?: string;
  isPremium: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: UserProfile | null;
  firebaseUser: any | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('smartfood_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    // Demo mode - just create a local user
    const newUser: UserProfile = {
      uid: `demo-${Date.now()}`,
      email,
      name,
      displayName: name,
      isPremium: true,
      createdAt: new Date().toISOString()
    };
    setUser(newUser);
    localStorage.setItem('smartfood_user', JSON.stringify(newUser));
  };

  const signIn = async (email: string, password: string) => {
    // Demo mode - just sign in
    const newUser: UserProfile = {
      uid: `demo-${email.split('@')[0]}`,
      email,
      name: email.split('@')[0],
      displayName: email.split('@')[0],
      isPremium: true,
      createdAt: new Date().toISOString()
    };
    setUser(newUser);
    localStorage.setItem('smartfood_user', JSON.stringify(newUser));
  };

  const signInWithGoogle = async () => {
    // Demo mode
    const newUser: UserProfile = {
      uid: 'demo-google-user',
      email: 'user@gmail.com',
      name: 'Demo User',
      displayName: 'Demo User',
      isPremium: true,
      createdAt: new Date().toISOString()
    };
    setUser(newUser);
    localStorage.setItem('smartfood_user', JSON.stringify(newUser));
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('smartfood_user');
  };

  const value: AuthContextType = {
    user,
    firebaseUser: null,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
