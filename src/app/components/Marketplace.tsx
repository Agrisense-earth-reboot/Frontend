'use client';

import React, { useState } from 'react';

interface Product {
    id: string;
    name: string;
    category: string;
    quantity: number;
    unit: string;
    price: number;
    description: string;
    seller: string;
    location: string;
    listedDate: Date;
}

const Marketplace = () => {
    const [products, setProducts] = useState<Product[]>([
        {
            id: '1',
            name: 'Fresh Maize',
            category: 'Cereals',
            quantity: 1000,
            unit: 'kg',
            price: 45.00,
            description: 'High-quality fresh maize harvested this season',
            seller: 'John Farmer',
            location: 'Eastern Province',
            listedDate: new Date('2024-03-15')
        },
        {
            id: '2',
            name: 'Red Kidney Beans',
            category: 'Pulses',
            quantity: 500,
            unit: 'kg',
            price: 120.00,
            description: 'Organic red kidney beans, perfect for wholesale',
            seller: 'Sarah\'s Farm',
            location: 'Central Region',
            listedDate: new Date('2024-03-14')
        }
    ]);

    const [showAddForm, setShowAddForm] = useState(false);
    const [newProduct, setNewProduct] = useState<Omit<Product, 'id' | 'listedDate' | 'seller'>>({
        name: '',
        category: '',
        quantity: 0,
        unit: 'kg',
        price: 0,
        description: '',
        location: ''
    });

    const handleAddProduct = (e: React.FormEvent) => {
        e.preventDefault();
        const product: Product = {
            id: Math.random().toString(36).substr(2, 9),
            ...newProduct,
            seller: 'John Farmer', // This would come from authenticated user
            listedDate: new Date()
        };
        setProducts([product, ...products]);
        setShowAddForm(false);
        setNewProduct({
            name: '',
            category: '',
            quantity: 0,
            unit: 'kg',
            price: 0,
            description: '',
            location: ''
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Marketplace</h1>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                >
                    {showAddForm ? 'Cancel' : 'List New Product'}
                </button>
            </div>

            {/* Add Product Form */}
            {showAddForm && (
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">List New Product</h2>
                    <form onSubmit={handleAddProduct} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    value={newProduct.name}
                                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Category
                                </label>
                                <select
                                    value={newProduct.category}
                                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="Cereals">Cereals</option>
                                    <option value="Pulses">Pulses</option>
                                    <option value="Vegetables">Vegetables</option>
                                    <option value="Fruits">Fruits</option>
                                    <option value="Cash Crops">Cash Crops</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Quantity
                                </label>
                                <div className="flex">
                                    <input
                                        type="number"
                                        value={newProduct.quantity}
                                        onChange={(e) => setNewProduct({ ...newProduct, quantity: Number(e.target.value) })}
                                        className="w-2/3 px-3 py-2 border border-gray-300 rounded-l-md"
                                        min="0"
                                        required
                                    />
                                    <select
                                        value={newProduct.unit}
                                        onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                                        className="w-1/3 px-3 py-2 border border-l-0 border-gray-300 rounded-r-md"
                                    >
                                        <option value="kg">kg</option>
                                        <option value="tons">tons</option>
                                        <option value="bags">bags</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Price per {newProduct.unit}
                                </label>
                                <input
                                    type="number"
                                    value={newProduct.price}
                                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    value={newProduct.description}
                                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    rows={3}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    value={newProduct.location}
                                    onChange={(e) => setNewProduct({ ...newProduct, location: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => setShowAddForm(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                            >
                                List Product
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Product Listings */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow">
                        <div className="p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                                    <p className="text-sm text-gray-500">{product.category}</p>
                                </div>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    {product.quantity} {product.unit} available
                                </span>
                            </div>
                            <div className="mt-4">
                                <p className="text-gray-600">{product.description}</p>
                            </div>
                            <div className="mt-4">
                                <div className="flex justify-between items-center">
                                    <div className="text-lg font-bold text-green-600">
                                        ${product.price.toFixed(2)} / {product.unit}
                                    </div>
                                    <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition">
                                        Contact Seller
                                    </button>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <div className="flex justify-between text-sm text-gray-500">
                                    <div>{product.seller}</div>
                                    <div>{product.location}</div>
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                    Listed on {product.listedDate.toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Marketplace; 