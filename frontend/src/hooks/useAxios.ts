import axios from 'axios';
import { useAuthStore } from '@store/auth.store.ts';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  res => res,
  async err => {
    const originalReq = err.config;
    if (err.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true;
      try {
        await api.post('/auth/refresh');
        return api(originalReq);
      } catch (refreshErr) {
        useAuthStore.getState().logout();
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(err);
  },
);

export default api;

