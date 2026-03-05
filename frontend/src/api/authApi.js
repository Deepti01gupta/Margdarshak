
import api from './axiosConfig';

/**
 * Spring Boot Auth Endpoints
 * POST /api/auth/login    → { username, password } → { token, user }
 * POST /api/auth/register → { name, email, password, role } → { message }
 * GET  /api/auth/me       → returns current user (token in header)
 * POST /api/auth/logout   → clears token server-side
 */

export const loginUser     = (creds)    => api.post('/api/auth/login',    creds).then(r => r.data);
export const registerUser  = (data)     => api.post('/api/auth/register', data).then(r => r.data);
export const getCurrentUser = ()        => api.get('/api/auth/me').then(r => r.data);
export const logoutUser    = ()         => api.post('/api/auth/logout').then(r => r.data).finally(() => {
  localStorage.removeItem('cc_token');
  localStorage.removeItem('cc_user');
});
