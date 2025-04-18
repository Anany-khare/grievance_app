// utils/auth.js

export const saveAuth = (user, token) => {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const getRole = () => {
  const user = getUser();
  return user?.role || null;
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const clearAuth = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};
