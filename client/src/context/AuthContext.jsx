import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser as loginApi, registerUser as registerApi, getMe } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Validate token on mount
  useEffect(() => {
    const validate = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await getMe();
        const userData = data.user || data.data || data;
        setUser(userData);
      } catch {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    validate();
  }, [token]);

  const login = async (credentials) => {
    const { data } = await loginApi(credentials);
    const payload = data.data || data;
    const tkn = data.token || payload.token;
    const userData = data.user || payload.user || payload;

    if (tkn) {
      localStorage.setItem('token', tkn);
      setToken(tkn);
    }
    setUser(userData);
    toast.success('Welcome back!');
    return data;
  };

  const register = async (credentials) => {
    const { data } = await registerApi(credentials);
    const payload = data.data || data;
    const tkn = data.token || payload.token;
    const userData = data.user || payload.user || payload;

    if (tkn) {
      localStorage.setItem('token', tkn);
      setToken(tkn);
    }
    setUser(userData);
    toast.success('Account created successfully!');
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    toast.success('Signed out');
  };

  const updateUser = (updated) => {
    setUser((prev) => ({ ...prev, ...updated }));
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
