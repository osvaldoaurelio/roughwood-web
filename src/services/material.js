import api from '../services/api';

export const listMaterials = async (search = '') => {
  const searchParam = search ? `?search=${search}` : '';

  const { data } = await api.get(`stock_materials${searchParam}`);

  return { materials: data.stock_materials };
};

export const listActiveMaterials = async () => {
  const { data } = await api.get('stock_materials/active');

  return { materials: data.stock_materials };
};

export const storeMaterial = async ({ name, supplier_name, description, price, is_active }) => {
  const payload = {
    stock_material: { name, supplier_name, description, price, is_active }
  };
  const { data } = await api.post('stock_materials', payload);

  return { material: data.stock_material };
};

export const showMaterial = async ({ id }) => {
  const { data } = await api.get(`stock_materials/${id}`);

  return { material: data.stock_material };
};

export const removeMaterial = async ({ id }) => {
  return await api.delete(`stock_materials/${id}`);
};

export const updateMaterial = async (
  { name, supplier_name, description, price, is_active },
  { id },
  ) => {
  const payload = {
    stock_material: { name, supplier_name, description, price, is_active }
  };
  const { data } = await api.put(`stock_materials/${id}`, payload);

  return { material: data.stock_material };
};
