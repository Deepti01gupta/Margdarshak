import { createContext, useState, useEffect, useCallback } from 'react';
import { loginUser, registerUser, logoutUser, getCurrentUser } from '../api/authApi';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [token,   setToken]   = useState(() => localStorage.getItem('cc_token'));
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  // Validate stored token with Spring Boot on every page load
  useEffect(() => {
    (async () => {
      if (localStorage.getItem('cc_token')) {
        try {
          const u = await getCurrentUser();
          setUser(u);
        } catch {
          localStorage.removeItem('cc_token');
          localStorage.removeItem('cc_user');
          setToken(null);
        }
      }
      setLoading(false);
    })();
  }, []);

  // Spring Boot: POST /api/auth/login → { token, user }
  const login = useCallback(async (email, password) => {
    setError(null);
    const data = await loginUser({ username: email, password });
    localStorage.setItem('cc_token', data.token);
    localStorage.setItem('cc_user', JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    return data.user;
  }, []);

  // Spring Boot: POST /api/auth/register → auto-login
  const register = useCallback(async (form) => {
    setError(null);
    await registerUser(form);
    return login(form.email, form.password);
  }, [login]);

  const logout = useCallback(async () => {
    await logoutUser();
    setUser(null);
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider value={{
      user, token, loading, error, setError,
      login, register, logout,
      isAuthenticated: !!token && !!user,
      isStudent: user?.role === 'STUDENT',
      isAlumni:  user?.role === 'ALUMNI',
      isAdmin:   user?.role === 'ADMIN',
    }}>
      {children}
    </AuthContext.Provider>
  );
}
