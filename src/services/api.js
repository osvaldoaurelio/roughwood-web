import { create } from 'axios';

const api = create({
  baseURL: 'http://localhost:3031/api',
});

export default api;
