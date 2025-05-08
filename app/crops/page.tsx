'use client';

import { useState, useEffect } from 'react';
import { addCrop, getCrops, Crop } from '../../services/crop';
import Link from 'next/link';

export default function CropsPage() {
    const [crops, setCrops] = useState<Crop[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        plantingDate: '',
        expectedHarvestDate: '',
        area: '',
        notes: '',
    });

    useEffect(() => {
        loadCrops();
    }, []);

    const loadCrops = async () => {
        try {
            const data = await getCrops();
            setCrops(data);
        } catch (error) {
            console.error('Failed to load crops:', error);
            setError('Failed to load crops. Please try again.');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
            await addCrop({
                name: formData.name,
                type: formData.type,
                plantingDate: new Date(formData.plantingDate),
                expectedHarvestDate: new Date(formData.expectedHarvestDate),
                area: Number(formData.area),
                status: 'growing',
                notes: formData.notes,
            });

            // Reset form and reload crops
            setFormData({
                name: '',
                type: '',
                plantingDate: '',
                expectedHarvestDate: '',
                area: '',
                notes: '',
            });
            await loadCrops();
        } catch (error) {
            console.error('Failed to add crop:', error);
            setError('Failed to add crop. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Header/Navigation */}
            <header className="bg-green-700 text-white shadow-md">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold">AgriSense</Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative group">
                            <button className="flex items-center space-x-1">
                                <span>John Farmer</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                                <Link href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</Link>
                                <Link href="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Settings</Link>
                                <Link href="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Crops</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Crop Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                        Crop Type
                                    </label>
                                    <select
                                        id="type"
                                        name="type"
                                        required
                                        value={formData.type}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    >
                                        <option value="">Select a type</option>
                                        <option value="grain">Grain</option>
                                        <option value="vegetable">Vegetable</option>
                                        <option value="fruit">Fruit</option>
                                        <option value="legume">Legume</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="plantingDate" className="block text-sm font-medium text-gray-700">
                                        Planting Date
                                    </label>
                                    <input
                                        type="date"
                                        id="plantingDate"
                                        name="plantingDate"
                                        required
                                        value={formData.plantingDate}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="expectedHarvestDate" className="block text-sm font-medium text-gray-700">
                                        Expected Harvest Date
                                    </label>
                                    <input
                                        type="date"
                                        id="expectedHarvestDate"
                                        name="expectedHarvestDate"
                                        required
                                        value={formData.expectedHarvestDate}
                                        onChange={handleChange}
                                        min={formData.plantingDate}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="area" className="block text-sm font-medium text-gray-700">
                                        Area (square meters)
                                    </label>
                                    <input
                                        type="number"
                                        id="area"
                                        name="area"
                                        required
                                        min="0"
                                        step="0.01"
                                        value={formData.area}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                                        Notes
                                    </label>
                                    <textarea
                                        id="notes"
                                        name="notes"
                                        rows={3}
                                        value={formData.notes}
                                        onChange={handleChange}
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
                                    {loading ? 'Adding...' : 'Add Crop'}
                                </button>
                            </div>
                        </form>

                        <div className="mt-8">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Your Crops</h3>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {crops.map((crop) => (
                                    <div
                                        key={crop.id}
                                        className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200"
                                    >
                                        <div className="px-4 py-5 sm:p-6">
                                            <h4 className="text-lg font-semibold text-gray-900">{crop.name}</h4>
                                            <p className="text-sm text-gray-500">{crop.type}</p>
                                            <div className="mt-4 space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-500">Status</span>
                                                    <span className="text-sm font-medium text-gray-900">{crop.status}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-500">Area</span>
                                                    <span className="text-sm text-gray-900">{crop.area} m²</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-500">Planting Date</span>
                                                    <span className="text-sm text-gray-900">
                                                        {new Date(crop.plantingDate).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-500">Expected Harvest</span>
                                                    <span className="text-sm text-gray-900">
                                                        {new Date(crop.expectedHarvestDate).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 