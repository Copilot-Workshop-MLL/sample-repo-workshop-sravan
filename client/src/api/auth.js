import api from './axiosInstance';

export const login = (username, password) =>
    api.post('/auth/login', { username, password });

export const register = (username, password) =>
    api.post('/auth/register', { username, password });
