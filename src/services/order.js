import api from '../services/api';

export const listOrders = async (search = '') => {
  const searchParam = search ? `?search=${search}` : '';

  const {
    data: { orders },
  } = await api.get(`orders${searchParam}`);

  return { orders };
};

export const storeOrder = async ({
  user_id,
  customer_id,
  description,
  initial_date,
  final_date,
  labor_cost,
  total_price,
  used_materials,
}) => {
  const payload = {
    order: {
      user_id,
      customer_id,
      description,
      initial_date,
      final_date,
      labor_cost,
      total_price,
      used_materials,
    }
  };
  const {
    data: { order },
  } = await api.post('orders', payload);

  return { order };
};

export const showOrder = async ({ id }) => {
  const {
    data: { order },
  } = await api.get(`orders/${id}`);

  return { order };
};

export const removeOrder = async ({ id }) => {
  return await api.delete(`orders/${id}`);
};

export const invoiceOrder = async ({ id }) => {
  const { data } = await api.put(`orders/${id}/invoice`);

  return { order: data.order };
};

export const updateOrder = async ({ user_id, description }, { id }) => {
  const payload = { order: { user_id, description } };
  const { data } = await api.put(`orders/${id}`, payload);

  return { order: data.order };
};
