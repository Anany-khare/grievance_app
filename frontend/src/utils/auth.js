// utils/auth.js

export const getUser = () => {
  try {
    const raw = localStorage.getItem('user');
    if (!raw || raw === 'undefined') return null; // 🔒 prevent bad parse
    return JSON.parse(raw);
  } catch (err) {
    console.error('Invalid user in localStorage:', err);
    return null;
  }
};

export const getRole = () => {
  const user = getUser();
  return user?.role || null;
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const saveAuth = (user, token) => {
  if (user && token) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  } else {
    console.warn('Trying to save invalid auth info', { user, token });
  }
};

export const clearAuth = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};
