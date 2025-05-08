import api from './api';

export interface Crop {
  id?: string;
  name: string;
  type: string;
  plantingDate: Date;
  expectedHarvestDate: Date;
  area: number; // in square meters
  status: 'growing' | 'harvested' | 'failed';
  notes?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export const addCrop = async (cropData: Omit<Crop, 'id'>): Promise<Crop> => {
  const response = await api.post('/crops', cropData);
  return response.data;
};

export const getCrops = async (): Promise<Crop[]> => {
  const response = await api.get('/crops');
  return response.data;
};

export const updateCrop = async (id: string, cropData: Partial<Crop>): Promise<Crop> => {
  const response = await api.put(`/crops/${id}`, cropData);
  return response.data;
};

export const deleteCrop = async (id: string): Promise<void> => {
  await api.delete(`/crops/${id}`);
}; 