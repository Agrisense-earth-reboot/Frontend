import api from './api';

export enum ProductStatus {
  AVAILABLE = 'available',
  RESERVED = 'reserved',
  SOLD = 'sold'
}

export enum ProductCategory {
  FRUITS = 'fruits',
  VEGETABLES = 'vegetables',
  GRAINS = 'grains',
  DAIRY = 'dairy',
  LIVESTOCK = 'livestock',
  OTHER = 'other'
}

export interface IProduct {
  _id?: string;
  seller: string;
  farm?: string;
  name: string;
  description: string;
  category: ProductCategory;
  quantity: number;
  unit: string;
  price: number;
  currency: string;
  harvestDate: Date;
  expiryEstimate: Date;
  status: ProductStatus;
  location: {
    country: string;
    region: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
}

// Product management
export const getProducts = async () => {
  const response = await api.get('/vendors/products');
  return response.data;
};

export const getProduct = async (productId: string) => {
  const response = await api.get(`/vendors/products/${productId}`);
  return response.data;
};

export const addProduct = async (productData: Omit<IProduct, '_id' | 'seller'>) => {
  const response = await api.post('/vendors/products', productData);
  return response.data;
};

export const updateProduct = async (productId: string, productData: Partial<IProduct>) => {
  const response = await api.put(`/vendors/products/${productId}`, productData);
  return response.data;
};

export const deleteProduct = async (productId: string) => {
  const response = await api.delete(`/vendors/products/${productId}`);
  return response.data;
};

// Inventory analytics
export const getInventoryAnalytics = async () => {
  const response = await api.get('/vendors/analytics/inventory');
  return response.data;
};

export const getSalesAnalytics = async () => {
  const response = await api.get('/vendors/analytics/sales');
  return response.data;
}; 