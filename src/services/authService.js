import api from './api';

export const login = (email, password) => {
  return api.post('/auth/login', { email, password });
};

export const register = (username, email, password) => {
  return api.post('/auth/register', { username, email, password });
};

export const logout = () => {
  // Just clear the token on the client side
  // You might want to call a logout endpoint if needed
  return true;
};