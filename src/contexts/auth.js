import { createContext, useState, useEffect, useCallback } from "react";

import api from '../services/api';
import { signInService, signUpService } from "../services/auth";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [storageUser, setStorageUser] = useLocalStorage('@roughwood:user');
  const [storageToken, setStorageToken] = useLocalStorage('@roughwood:token');

  useEffect(() => {
    if (storageUser && storageToken) {
      setUser(storageUser);
      api.defaults.headers.Authorization = `Baerer ${storageToken}`;
    }
    setLoading(false);
  }, [storageUser, storageToken]);

  const signIn = useCallback(async ({ username, password }) => {
    setLoading(true);
    setError(null);
    try {
      const { user, token } = await signInService({ username, password });
      setUser(user);
      api.defaults.headers.Authorization = `Baerer ${token}`;
      setStorageUser(user);
      setStorageToken(token);
    } catch (err) {
      setError(err.response);
    } finally {
      setLoading(false);
    }
  }, [setStorageUser, setStorageToken]);

  const signUp = useCallback(async ({ name, username, password }) => {
    setLoading(true);
    setError(null);
    try {
      await signUpService({ name, username, password });

      signIn({ username, password });
    } catch (err) {
      setError(err.response);
      setLoading(false);
    }
  }, [signIn]);

  const signOut = useCallback(async () => {
    await new Promise(resolve => setTimeout(resolve, 100));
    setLoading(true);
    setError(null);
    setStorageUser(null);
    setStorageToken(null);
    setUser(null);
    setLoading(false);
  }, [setStorageUser, setStorageToken]);

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signUp, signOut, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
