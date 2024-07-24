import axios from 'axios';

const API_URL = 'http://localhost:3001/api/user';

export const signup = (email, username, password) => {
  return axios.post(`${API_URL}/signup`, { email, username, password });
};

export const login = (username, password) => {
  return axios.post(`${API_URL}/login`, { username, password });
};
export const createPost = (title, content, token) => {
  return axios.post(`http://localhost:3001/api/admin/posts`, { title, content }, {
    headers: {
      Authorization: token
    }
  });
};
export const getPosts = () => {
  return axios.get(`http://localhost:3001/api/admin/posts`);
};
export const getProfile = (token) => {
  return axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: token
    }
  });
};