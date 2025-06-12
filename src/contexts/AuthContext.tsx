
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Hardcoded authorized user credentials
const AUTHORIZED_EMAIL = 'maria.elhelou@cedar-rose.com';
const AUTHORIZED_PASSWORD = 'Cedar123';
const AUTHORIZED_USER: User = {
  id: '1',
  name: 'Maria El Helou',
  email: AUTHORIZED_EMAIL,
  avatar: undefined
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    console.log('Attempting login with:', email);
    
    // Check if credentials match the authorized user
    if (email === AUTHORIZED_EMAIL && password === AUTHORIZED_PASSWORD) {
      setUser(AUTHORIZED_USER);
      localStorage.setItem('user', JSON.stringify(AUTHORIZED_USER));
    } else {
      throw new Error('Invalid credentials. Access restricted to authorized users only.');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const signup = async (name: string, email: string, password: string) => {
    // Disable signup functionality - only the authorized user can access
    throw new Error('Registration is not available. This application is restricted to authorized users only.');
  };

  // Check for existing user on mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      // Verify the saved user is the authorized user
      if (parsedUser.email === AUTHORIZED_EMAIL) {
        setUser(parsedUser);
      } else {
        // Clear invalid user from storage
        localStorage.removeItem('user');
      }
    }
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    signup
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
