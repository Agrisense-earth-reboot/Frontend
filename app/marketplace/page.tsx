'use client';

import { useState, useEffect } from 'react';
import type { Product } from '../../services/marketplace';
import Link from 'next/link';

const sampleProducts: Omit<Product, 'id'>[] = [
    {
        name: "Premium NPK Fertilizer",
        category: "fertilizer",
        price: 2500,
        description: "Balanced NPK fertilizer (15-15-15) for general crop nutrition. Ideal for most crops.",
        manufacturer: "AgriChem Solutions",
        stockQuantity: 100,
        unit: "25kg bag",
        imageUrl: "/images/fertilizer-npk.jpg"
    },
    {
        name: "Organic Pest Control",
        category: "pesticide",
        price: 1200,
        description: "Natural pest control solution safe for organic farming. Controls common pests while being eco-friendly.",
        manufacturer: "EcoFarm Products",
        stockQuantity: 50,
        unit: "5L container",
        imageUrl: "/images/organic-pesticide.jpg"
    },
    {
        name: "High-Yield Maize Seeds",
        category: "seeds",
        price: 800,
        description: "Drought-resistant maize variety with high yield potential. Maturity period: 90-120 days.",
        manufacturer: "SeedTech International",
        stockQuantity: 200,
        unit: "1kg pack",
        imageUrl: "/images/maize-seeds.jpg"
    },
    {
        name: "Manual Seed Planter",
        category: "equipment",
        price: 3500,
        description: "Efficient manual seed planter for small to medium farms. Adjustable seed spacing.",
        manufacturer: "FarmTools Pro",
        stockQuantity: 15,
        unit: "piece",
        imageUrl: "/images/seed-planter.jpg"
    },
    {
        name: "Micronutrient Mix",
        category: "fertilizer",
        price: 1800,
        description: "Essential micronutrients blend for healthy crop growth. Prevents nutrient deficiencies.",
        manufacturer: "AgriChem Solutions",
        stockQuantity: 75,
        unit: "10kg bag",
        imageUrl: "/images/micronutrient-mix.jpg"
    }
];

export default function MarketplacePage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Product['category'] | 'all'>('all');

    useEffect(() => {
        loadProducts();
    }, [selectedCategory]);

    const loadProducts = async () => {
        setLoading(true);
        setError('');
        try {
            // In a real application, this would come from the API
            // const data = await getProducts(selectedCategory === 'all' ? undefined : selectedCategory);
            // For now, we'll use the sample data
            const filteredProducts = selectedCategory === 'all'
                ? sampleProducts
                : sampleProducts.filter(p => p.category === selectedCategory);
            setProducts(filteredProducts as Product[]);
        } catch (error) {
            console.error('Failed to load products:', error);
            setError('Failed to load products. Please try again.');
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
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white shadow rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Agricultural Marketplace</h2>
                            <div className="flex items-center space-x-4">
                                <label htmlFor="category" className="text-sm font-medium text-gray-700">
                                    Filter by:
                                </label>
                                <select
                                    id="category"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value as Product['category'] | 'all')}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                                    disabled={loading}
                                >
                                    <option value="all">All Products</option>
                                    <option value="fertilizer">Fertilizers</option>
                                    <option value="pesticide">Pesticides</option>
                                    <option value="seeds">Seeds</option>
                                    <option value="equipment">Equipment</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm text-center mb-6">
                                {error}
                            </div>
                        )}

                        {loading ? (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
                                <p className="mt-4 text-gray-500">Loading products...</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {products.map((product, index) => (
                                    <div
                                        key={product.id || index}
                                        className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200"
                                    >
                                        <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                                            <img
                                                src={product.imageUrl || '/images/placeholder.jpg'}
                                                alt={product.name}
                                                className="object-cover w-full h-48"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                                            <p className="text-sm text-gray-500 mt-1">{product.manufacturer}</p>
                                            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
                                            <div className="mt-4 flex justify-between items-center">
                                                <span className="text-lg font-bold text-gray-900">
                                                    KES {product.price.toLocaleString()}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    per {product.unit}
                                                </span>
                                            </div>
                                            <div className="mt-2 text-sm text-gray-500">
                                                Stock: {product.stockQuantity} {product.unit}s
                                            </div>
                                            <button
                                                className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 