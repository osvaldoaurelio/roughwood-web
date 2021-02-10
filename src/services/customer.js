import api from '../services/api';

export const listCustomers = async (search = '') => {
  const searchParam = search ? `?search=${search}` : '';

  const {
    data: { customers },
  } = await api.get(`customers${searchParam}`);

  return { customers };
};

export const storeCustomer = async ({ name, cpf, address, phone }) => {
  const payload = {
    customer: { name, cpf, address, phone }
  };
  const {
    data: { customer },
  } = await api.post('customers', payload);

  return { customer };
};

export const showCustomer = async ({ id }) => {
  const {
    data: { customer },
  } = await api.get(`customers/${id}`);

  return { customer };
};

export const ordersCustomer = async ({ id }) => {
  const {
    data: { customer },
  } = await api.get(`customers/${id}/orders`);

  return { customer };
};

export const removeCustomer = async ({ id }) => {
  return await api.delete(`customers/${id}`);
};

export const updateCustomer = async (
  { name, cpf, address, phone },
  { id },
  ) => {
  const payload = {
    customer: { name, cpf, address, phone }
  };
  const {
    data: { customer },
  } = await api.put(`customers/${id}`, payload);

  return { customer };
};
