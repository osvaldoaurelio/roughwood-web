import api from '../services/api';

export const listEmployees = async (search = '') => {
  const searchParam = search ? `?search=${search}` : '';

  const {
    data: { users },
  } = await api.get(`users${searchParam}`);

  return { employees: users };
};

export const storeEmployee = async ({ name, username, address, phone }) => {
  const payload = {
    user: { name, username, address, phone }
  };
  const {
    data: { user },
  } = await api.post('users', payload);

  return { employee: user };
};

export const showEmployee = async ({ id }) => {
  const {
    data: { user },
  } = await api.get(`users/${id}`);

  return { employee: user };
};

export const ordersEmployee = async ({ id }) => {
  const {
    data: { user },
  } = await api.get(`users/${id}/orders`);

  return { employee: user };
};

export const removeEmployee = async ({ id }) => {
  return await api.delete(`users/${id}`);
};

export const resetPassword = async ({ id }) => {
  return await api.put(`users/${id}/resetpassword`);
};

export const updateEmployee = async (
  { name, username, address, phone },
  { id },
  ) => {
  const payload = {
    user: { name, username, address, phone }
  };
  const {
    data: { user },
  } = await api.put(`users/${id}`, payload);

  return { employee: user };
};
