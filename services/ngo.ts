import api from './api';

export interface IAnalytics {
  _id?: string;
  title: string;
  type: 'yield' | 'waste' | 'market' | 'sustainability';
  region: string;
  startDate: Date;
  endDate: Date;
  metrics: {
    name: string;
    value: number;
    unit: string;
    trend: 'up' | 'down' | 'stable';
  }[];
  status: 'active' | 'archived';
  lastUpdated: Date;
}

export interface IExportOptions {
  format: 'csv' | 'json' | 'pdf';
  dateRange?: {
    start: Date;
    end: Date;
  };
  regions?: string[];
  metrics?: string[];
}

// Analytics management
export const getAnalytics = async () => {
  const response = await api.get('/ngos/analytics');
  return response.data;
};

export const getAnalyticsById = async (analyticsId: string) => {
  const response = await api.get(`/ngos/analytics/${analyticsId}`);
  return response.data;
};

export const createAnalytics = async (data: Omit<IAnalytics, '_id' | 'lastUpdated'>) => {
  const response = await api.post('/ngos/analytics', data);
  return response.data;
};

export const updateAnalytics = async (analyticsId: string, data: Partial<IAnalytics>) => {
  const response = await api.put(`/ngos/analytics/${analyticsId}`, data);
  return response.data;
};

export const deleteAnalytics = async (analyticsId: string) => {
  const response = await api.delete(`/ngos/analytics/${analyticsId}`);
  return response.data;
};

// Data export
export const exportAnalyticsData = async (options: IExportOptions) => {
  const response = await api.post('/ngos/analytics/export', options, {
    responseType: 'blob'
  });
  return response.data;
};

// Sustainability metrics
export const getSustainabilityMetrics = async () => {
  const response = await api.get('/ngos/metrics/sustainability');
  return response.data;
};

// Food security data
export const getFoodSecurityData = async () => {
  const response = await api.get('/ngos/metrics/food-security');
  return response.data;
}; 