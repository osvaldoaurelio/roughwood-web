import api from '../services/api';

export const listMaterials = async (search = '') => {
  const searchParam = search ? `?search=${search}` : '';

  const {
    data: { stock_materials },
  } = await api.get(`stock_materials${searchParam}`);

  return { materials: stock_materials };
};

export const storeMaterial = async ({ name, description, price, is_active }) => {
  const payload = {
    stock_material: { name, description, price, is_active }
  };
  const {
    data: { stock_material },
  } = await api.post('stock_materials', payload);

  return { material: stock_material };
};

export const showMaterial = async ({ id }) => {
  const {
    data: { stock_material },
  } = await api.get(`stock_materials/${id}`);

  return { material: stock_material };
};

export const removeMaterial = async ({ id }) => {
  return await api.delete(`stock_materials/${id}`);
};

export const updateMaterial = async (
  { name, description, price, is_active },
  { id },
  ) => {
  const payload = {
    stock_material: { name, description, price, is_active }
  };
  const {
    data: { stock_material },
  } = await api.put(`stock_materials/${id}`, payload);

  return { material: stock_material };
};
