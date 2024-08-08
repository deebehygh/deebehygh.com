import axios from 'axios';

const API_URL = 'http://api.deebehygh.com:3001/api/user';

export const signup = (email, username, password) => {
  return axios.post(`${API_URL}/signup`, { email, username, password }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }
  });
};

export const login = (username, password) => {
  return axios.post(`${API_URL}/login`, { username, password }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    mode: 'no-cors',
  });
};

export const createPost = (profile, content, token) => {
  return axios.post(`http://api.deebehygh.com:3001/api/posts`, { profile, content }, {
    headers: {
      Authorization: token
    }
  });
};

export const getPosts = () => {
  return axios.get(`http://api.deebehygh.com:3001/api/posts`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    mode: 'no-cors',
  });
};

export const getProfile = (token) => {
  return axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: token
    }
  });
};
