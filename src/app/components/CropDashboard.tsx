'use client';

import React, { useState } from 'react';

interface Crop {
    id: string;
    name: string;
    category: string;
    quantity: number;
    plantingDate: string;
    expectedHarvestDate: string;
}

const CropDashboard = () => {
    const [crops, setCrops] = useState<Crop[]>([]);
    const [showAddForm, setShowAddForm] = useState(false);

    const cropCategories = [
        'Cereals',
        'Vegetables',
        'Fruits',
        'Pulses',
        'Oil Seeds',
        'Cash Crops',
    ];

    const cropStats = {
        totalCrops: crops.length,
        totalQuantity: crops.reduce((acc, crop) => acc + crop.quantity, 0),
        categoriesUsed: [...new Set(crops.map(crop => crop.category))].length,
    };

    const handleAddCrop = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const newCrop: Crop = {
            id: Date.now().toString(),
            name: formData.get('name') as string,
            category: formData.get('category') as string,
            quantity: Number(formData.get('quantity')),
            plantingDate: formData.get('plantingDate') as string,
            expectedHarvestDate: formData.get('expectedHarvestDate') as string,
        };

        setCrops([...crops, newCrop]);
        setShowAddForm(false);
        form.reset();
    };

    return (
        <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-lg border bg-white shadow-sm p-6">
                    <div className="flex flex-col space-y-1.5">
                        <h3 className="text-2xl font-semibold">Total Crops</h3>
                    </div>
                    <div className="p-6 pt-0">
                        <p className="text-3xl font-bold">{cropStats.totalCrops}</p>
                    </div>
                </div>
                <div className="rounded-lg border bg-white shadow-sm p-6">
                    <div className="flex flex-col space-y-1.5">
                        <h3 className="text-2xl font-semibold">Total Quantity</h3>
                    </div>
                    <div className="p-6 pt-0">
                        <p className="text-3xl font-bold">{cropStats.totalQuantity}</p>
                    </div>
                </div>
                <div className="rounded-lg border bg-white shadow-sm p-6">
                    <div className="flex flex-col space-y-1.5">
                        <h3 className="text-2xl font-semibold">Categories Used</h3>
                    </div>
                    <div className="p-6 pt-0">
                        <p className="text-3xl font-bold">{cropStats.categoriesUsed}</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Your Crops</h2>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                    Add New Crop
                </button>
            </div>

            {showAddForm && (
                <div className="rounded-lg border bg-white shadow-sm p-6">
                    <div className="flex flex-col space-y-1.5">
                        <h3 className="text-2xl font-semibold">Add New Crop</h3>
                    </div>
                    <div className="p-6 pt-0">
                        <form onSubmit={handleAddCrop} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Crop Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                    Category
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    required
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                                >
                                    <option value="">Select category</option>
                                    {cropCategories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                                    Quantity (in kg)
                                </label>
                                <input
                                    id="quantity"
                                    name="quantity"
                                    type="number"
                                    min="0"
                                    required
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="plantingDate" className="block text-sm font-medium text-gray-700">
                                    Planting Date
                                </label>
                                <input
                                    id="plantingDate"
                                    name="plantingDate"
                                    type="date"
                                    required
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="expectedHarvestDate" className="block text-sm font-medium text-gray-700">
                                    Expected Harvest Date
                                </label>
                                <input
                                    id="expectedHarvestDate"
                                    name="expectedHarvestDate"
                                    type="date"
                                    required
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                                />
                            </div>

                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                >
                                    Add Crop
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowAddForm(false)}
                                    className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {crops.map((crop) => (
                    <div key={crop.id} className="rounded-lg border bg-white shadow-sm">
                        <div className="flex flex-col space-y-1.5 p-6">
                            <h3 className="text-2xl font-semibold">{crop.name}</h3>
                        </div>
                        <div className="p-6 pt-0">
                            <div className="space-y-2">
                                <p><strong>Category:</strong> {crop.category}</p>
                                <p><strong>Quantity:</strong> {crop.quantity} kg</p>
                                <p><strong>Planting Date:</strong> {crop.plantingDate}</p>
                                <p><strong>Expected Harvest:</strong> {crop.expectedHarvestDate}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CropDashboard; 