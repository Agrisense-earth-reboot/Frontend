'use client';

import { useState } from 'react';
import { getWeatherForecast, getLocationCoordinates } from '../../services/weather';
import type { WeatherForecast } from '../../services/weather';
import { AddCropForm } from '../../components/ui/AddCropForm';
import { WeatherAlertForm } from '../../components/ui/WeatherAlertForm';

interface CropData {
    name: string;
    type: string;
    plantingDate: string;
    area: number;
}

interface AlertData {
    temperature: {
        enabled: boolean;
        min: number;
        max: number;
    };
    rainfall: {
        enabled: boolean;
        threshold: number;
    };
    humidity: {
        enabled: boolean;
        min: number;
        max: number;
    };
    notificationMethod: string;
}

export default function WeatherPage() {
    const [formData, setFormData] = useState({
        city: '',
        country: '',
        startDate: '',
        endDate: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [forecast, setForecast] = useState<WeatherForecast | null>(null);
    const [showAddCropForm, setShowAddCropForm] = useState(false);
    const [showAlertForm, setShowAlertForm] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // First get coordinates for the location
            const coordinates = await getLocationCoordinates(formData.city, formData.country);

            // Then get the weather forecast
            const weatherData = await getWeatherForecast({
                location: {
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude
                },
                startDate: new Date(formData.startDate),
                endDate: formData.endDate ? new Date(formData.endDate) : undefined
            });

            setForecast(weatherData);
        } catch (error: unknown) {
            console.error('Weather forecast error:', error);
            const err = error as { response?: { data?: { message?: string } } };
            setError(err.response?.data?.message || 'Failed to fetch weather forecast. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddCrop = (cropData: CropData) => {
        console.log('New crop data:', cropData);
        // TODO: Implement crop addition logic
        setShowAddCropForm(false);
    };

    const handleAlertSettings = (alertData: AlertData) => {
        console.log('New alert settings:', alertData);
        // TODO: Implement alert settings logic
        setShowAlertForm(false);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Weather Forecast</h1>

            {/* Current Weather Section */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Current Weather</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                City
                            </label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                required
                                value={formData.city}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                Country
                            </label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                required
                                value={formData.country}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                                Start Date
                            </label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                required
                                value={formData.startDate}
                                onChange={handleChange}
                                min={new Date().toISOString().split('T')[0]}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                                End Date (Optional)
                            </label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                min={formData.startDate}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'
                                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                        >
                            {loading ? 'Loading...' : 'Get Forecast'}
                        </button>
                    </div>
                </form>

                {forecast && (
                    <div className="mt-8">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Forecast for {forecast.location.name}, {forecast.location.country}
                        </h3>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {forecast.forecast.map((day, index) => (
                                <div
                                    key={index}
                                    className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200"
                                >
                                    <div className="px-4 py-5 sm:p-6">
                                        <div className="text-sm font-medium text-gray-500">
                                            {new Date(day.date).toLocaleDateString()}
                                        </div>
                                        <div className="mt-1 flex items-center">
                                            <img
                                                src={day.icon}
                                                alt={day.condition}
                                                className="h-12 w-12"
                                            />
                                            <div className="ml-3">
                                                <div className="text-xl font-semibold text-gray-900">
                                                    {day.temperature.average}°C
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {day.condition}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4 space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-500">Temperature</span>
                                                <span className="text-sm text-gray-900">
                                                    {day.temperature.min}°C - {day.temperature.max}°C
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-500">Humidity</span>
                                                <span className="text-sm text-gray-900">{day.humidity}%</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-500">Precipitation</span>
                                                <span className="text-sm text-gray-900">
                                                    {day.precipitation.amount}mm ({day.precipitation.probability}%)
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-500">Wind</span>
                                                <span className="text-sm text-gray-900">
                                                    {day.wind.speed} km/h {day.wind.direction}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* 3-Day Forecast Section */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">3-Day Forecast</h2>
                {/* ... existing forecast content ... */}
            </div>

            {/* Agricultural Impact Section */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Agricultural Impact</h2>
                {/* ... existing agricultural impact content ... */}

                <div className="mt-4">
                    <button
                        onClick={() => setShowAddCropForm(!showAddCropForm)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        {showAddCropForm ? '- Hide Crop Form' : '+ Add New Crop'}
                    </button>
                    {showAddCropForm && (
                        <div className="mt-4">
                            <AddCropForm onSubmit={handleAddCrop} />
                        </div>
                    )}
                </div>
            </div>

            {/* Weather Alerts Section */}
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Weather Alerts</h2>
                    <button
                        onClick={() => setShowAlertForm(!showAlertForm)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        {showAlertForm ? 'Cancel' : 'Configure Alerts'}
                    </button>
                </div>

                {showAlertForm ? (
                    <WeatherAlertForm onSubmit={handleAlertSettings} />
                ) : (
                    <p className="text-gray-600">
                        Configure alerts to receive notifications about important weather changes that may affect your crops.
                    </p>
                )}
            </div>
        </div>
    );
} 