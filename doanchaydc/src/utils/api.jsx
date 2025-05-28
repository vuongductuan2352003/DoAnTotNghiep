// src/utils/api.js
import axios from 'axios';
import { toast } from 'react-hot-toast';
import '../../src/styles/Toast.css';

const TOKEN_KEY = 'access_token';
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(p => {
    error ? p.reject(error) : p.resolve(token);
  });
  failedQueue = [];
};

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}
function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: { Accept: 'application/json' },
});

// 1. Request interceptor: tự động đính Authorization header
api.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// 2. Response interceptor: xử lý thành công (toast) và lỗi (refresh + toast)
api.interceptors.response.use(
  // Khi response OK
  response => {
    const msg = response.data?.message;
    if (msg) toast.success(msg);
    return response;
  },
  error => {
    const originalReq = error.config;

    // Nếu 401 và chưa retry lần nào => thử refresh token
    if (error.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true;

      if (isRefreshing) {
        // Nếu đang refresh, chờ queue
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalReq.headers.Authorization = `Bearer ${token}`;
            return api(originalReq);
          })
          .catch(err => Promise.reject(err));
      }

      isRefreshing = true;

      // Gọi thẳng axios để tránh interceptor loop
      return new Promise((resolve, reject) => {
        axios
          .post(
            'http://127.0.0.1:8000/api/user/refresh',
            null,
            { headers: { Authorization: `Bearer ${getToken()}` } }
          )
          .then(({ data }) => {
            setToken(data.access_token);
            processQueue(null, data.access_token);
            originalReq.headers.Authorization = `Bearer ${data.access_token}`;
            resolve(api(originalReq));
          })
          .catch(err2 => {
            processQueue(err2, null);
            clearToken();
            window.location.href = '/login';  // hoặc navigate('/login')
            reject(err2);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    // Các lỗi khác (hoặc đã retry rồi) => show toast và reject
    const msg = error.response?.data?.message || 'Đã có lỗi xảy ra';
    toast.error(msg);
    return Promise.reject(error);
  }
);

export default api;
