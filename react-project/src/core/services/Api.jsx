import axios from 'axios';

const API_URL = 'https://0.0.0.0:3001/api/user';

export const signup = (email, username, password) => {
  return axios.post(`${API_URL}/signup`, { email, username, password });
};

export const login = (username, password) => {
  return axios.post(`${API_URL}/login`, { username, password });
};

export const createPost = (profile, content, token) => {
  return axios.post(`https://0.0.0.0:3001/api/posts`, { profile, content }, {
    headers: {
      Authorization: token
    }
  });
};

export const getPosts = () => {
  return axios.get(`https://0.0.0.0:3001/api/posts`);
};

export const getProfile = (token) => {
  return axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: token
    }
  });
};
