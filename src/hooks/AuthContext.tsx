import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';


import api from '../services/api';

interface Credentials {
  email: string;
  password: string;
}

interface AuthContextrops {
  user: {
    name: string;
  };
  loading: boolean;
  signIn(credentials: Credentials): Promise<void>;
  signOut(): void;
}

interface ResponseUser {
  token: string;
  user: {
    name: string;
  };
}

const AuthContext = createContext<AuthContextrops>({} as AuthContextrops);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<ResponseUser>({} as ResponseUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedDate(): Promise<void> {
      const [ token, user] = await AsyncStorage.multiGet([
        '@Gobarber:token',
        '@Gobarber:user'
      ]);
      if (token[1] && user[1] ) {
        setData({token: token[1], user: JSON.parse(user[1])});

      }
      setLoading(false);
    }
    loadStoragedDate();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@Gobarber:token', token],
      ['@Gobarber:user', JSON.stringify(user)]
    ]);
    setData({ token, user });

  }, []);

  const signOut = useCallback(async() => {
    await AsyncStorage.multiRemove([
      '@Gobarber:token',
      '@Gobarber:user'
    ]);

    setData({} as ResponseUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextrops {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
