import api from './api';

export interface Product {
  id?: string;
  name: string;
  category: 'fertilizer' | 'pesticide' | 'seeds' | 'equipment' | 'other';
  price: number;
  description: string;
  manufacturer: string;
  stockQuantity: number;
  unit: string;
  imageUrl?: string;
}

export const getProducts = async (category?: Product['category']): Promise<Product[]> => {
  const response = await api.get('/marketplace/products', {
    params: category ? { category } : undefined
  });
  return response.data;
};

export const getProduct = async (id: string): Promise<Product> => {
  const response = await api.get(`/marketplace/products/${id}`);
  return response.data;
};

export const addProduct = async (productData: Omit<Product, 'id'>): Promise<Product> => {
  const response = await api.post('/marketplace/products', productData);
  return response.data;
};

export const updateProduct = async (id: string, productData: Partial<Product>): Promise<Product> => {
  const response = await api.put(`/marketplace/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/marketplace/products/${id}`);
}; 