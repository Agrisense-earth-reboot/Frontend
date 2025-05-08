import api from './api';

export interface ICrop {
  _id?: string;
  name: string;
  variety?: string;
  plantingDate: Date;
  expectedHarvestDate?: Date;
  area: number;
  soilType?: string;
  irrigationType?: string;
  previousYields?: {
    year: number;
    amount: number;
    unit: string;
  }[];
}

export interface IFarm {
  _id?: string;
  owner: string;
  name: string;
  location: {
    country: string;
    region: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  size: number;
  crops: ICrop[];
}

// Farm management
export const getFarmProfile = async () => {
  const response = await api.get('/farmers/profile');
  return response.data;
};

export const updateFarmProfile = async (data: Partial<IFarm>) => {
  const response = await api.put('/farmers/profile', data);
  return response.data;
};

// Crop management
export const getCrops = async () => {
  const response = await api.get('/farmers/crops');
  return response.data;
};

export const addCrop = async (cropData: Omit<ICrop, '_id'>) => {
  const response = await api.post('/farmers/crops', cropData);
  return response.data;
};

export const updateCrop = async (cropId: string, cropData: Partial<ICrop>) => {
  const response = await api.put(`/farmers/crops/${cropId}`, cropData);
  return response.data;
};

export const deleteCrop = async (cropId: string) => {
  const response = await api.delete(`/farmers/crops/${cropId}`);
  return response.data;
}; 