import { create } from 'axios';

const api = create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default api;
