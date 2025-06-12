
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

// Hardcoded authorized users credentials
const AUTHORIZED_USERS = [
  {
    email: 'maria.elhelou@cedar-rose.com',
    password: 'Cedar123',
    user: {
      id: '1',
      name: 'Maria El Helou',
      email: 'maria.elhelou@cedar-rose.com',
      avatar: undefined
    }
  },
  {
    email: 'andrew.rawlinson@cedar-rose.com',
    password: 'Cedar123',
    user: {
      id: '2',
      name: 'Andrew Rawlinson',
      email: 'andrew.rawlinson@cedar-rose.com',
      avatar: undefined
    }
  },
  {
    email: 'achref.messaoudi@cedar-rose.com',
    password: 'Cedar123',
    user: {
      id: '3',
      name: 'Achref Messaoudi',
      email: 'achref.messaoudi@cedar-rose.com',
      avatar: undefined
    }
  }
];

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    console.log('Attempting login with:', email);
    
    // Check if credentials match any authorized user
    const authorizedUser = AUTHORIZED_USERS.find(
      authUser => authUser.email === email && authUser.password === password
    );

    if (authorizedUser) {
      setUser(authorizedUser.user);
      localStorage.setItem('user', JSON.stringify(authorizedUser.user));
    } else {
      throw new Error('Invalid credentials. Access restricted to authorized users only.');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const signup = async (name: string, email: string, password: string) => {
    // Disable signup functionality - only the authorized users can access
    throw new Error('Registration is not available. This application is restricted to authorized users only.');
  };

  // Check for existing user on mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      // Verify the saved user is one of the authorized users
      const isAuthorized = AUTHORIZED_USERS.some(authUser => authUser.user.email === parsedUser.email);
      if (isAuthorized) {
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
