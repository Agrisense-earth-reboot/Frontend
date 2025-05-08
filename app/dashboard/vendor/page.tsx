'use client';

import { useState } from 'react';
import Link from 'next/link';
import Card from '../../../components/ui/Card';
import Table, { Column } from '../../../components/ui/Table';
import Button from '../../../components/ui/Button';

interface Product {
    id: string;
    name: string;
    category: string;
    quantity: number;
    unit: string;
    price: number;
    harvestDate: string;
    expiryDate: string;
    status: string;
    actions?: never;
}

// Mock data for demonstration
const mockProducts = [
    {
        id: 'prod1',
        name: 'Fresh Tomatoes',
        category: 'Vegetables',
        quantity: 500,
        unit: 'kg',
        price: 2.5,
        harvestDate: '2025-05-01',
        expiryDate: '2025-05-10',
        status: 'Available'
    },
    {
        id: 'prod2',
        name: 'Organic Potatoes',
        category: 'Vegetables',
        quantity: 1000,
        unit: 'kg',
        price: 1.8,
        harvestDate: '2025-05-03',
        expiryDate: '2025-06-03',
        status: 'Available'
    }
];

const mockSpoilageRisks = [
    {
        id: 'risk1',
        productName: 'Fresh Tomatoes',
        riskLevel: 'High',
        daysUntilExpiry: 3,
        recommendation: 'Consider immediate sale or processing'
    },
    {
        id: 'risk2',
        productName: 'Organic Potatoes',
        riskLevel: 'Low',
        daysUntilExpiry: 30,
        recommendation: 'Regular storage conditions adequate'
    }
];

const mockDemandForecasts = [
    {
        category: 'Vegetables',
        trend: 'Increasing',
        nextWeekDemand: 750,
        priceRecommendation: 'Consider 5-10% price increase',
        confidence: 0.85
    },
    {
        category: 'Fruits',
        trend: 'Stable',
        nextWeekDemand: 500,
        priceRecommendation: 'Maintain current pricing',
        confidence: 0.90
    }
];

export default function VendorDashboard() {
    const [activeTab, setActiveTab] = useState('overview');

    const productColumns: Column<Product>[] = [
        { key: 'name', header: 'Product Name', sortable: true },
        { key: 'category', header: 'Category', sortable: true },
        { key: 'quantity', header: 'Quantity', sortable: true },
        { key: 'price', header: 'Price (USD)', sortable: true },
        { key: 'status', header: 'Status', sortable: true },
        {
            key: 'actions',
            header: 'Actions',
            render: (item: Product) => (
                <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => console.log('Edit', item.id)}>Edit</Button>
                    <Button variant="danger" size="sm" onClick={() => console.log('Delete', item.id)}>Delete</Button>
                </div>
            )
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Header/Navigation */}
            <header className="bg-green-700 text-white shadow-md">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold">AgriSense</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative group">
                            <button className="flex items-center space-x-1">
                                <span>John Vendor</span>
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

            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-64 bg-white shadow-md">
                    <nav className="py-6 px-4">
                        <ul className="space-y-2">
                            <li>
                                <button
                                    onClick={() => setActiveTab('overview')}
                                    className={`w-full flex items-center space-x-2 px-4 py-2 rounded-md ${activeTab === 'overview' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                    </svg>
                                    <span>Overview</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveTab('products')}
                                    className={`w-full flex items-center space-x-2 px-4 py-2 rounded-md ${activeTab === 'products' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                                        <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <span>Products</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveTab('analytics')}
                                    className={`w-full flex items-center space-x-2 px-4 py-2 rounded-md ${activeTab === 'analytics' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                                    </svg>
                                    <span>Analytics</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 p-6">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            <h1 className="text-2xl font-bold text-gray-800">Vendor Dashboard</h1>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <Card variant="default">
                                    <div className="text-center">
                                        <h3 className="text-lg font-semibold mb-2">Total Products</h3>
                                        <p className="text-3xl font-bold text-green-600">24</p>
                                    </div>
                                </Card>
                                <Card variant="default">
                                    <div className="text-center">
                                        <h3 className="text-lg font-semibold mb-2">Active Listings</h3>
                                        <p className="text-3xl font-bold text-blue-600">18</p>
                                    </div>
                                </Card>
                                <Card variant="default">
                                    <div className="text-center">
                                        <h3 className="text-lg font-semibold mb-2">Pending Orders</h3>
                                        <p className="text-3xl font-bold text-amber-600">5</p>
                                    </div>
                                </Card>
                                <Card variant="default">
                                    <div className="text-center">
                                        <h3 className="text-lg font-semibold mb-2">Revenue (MTD)</h3>
                                        <p className="text-3xl font-bold text-green-600">$12.5k</p>
                                    </div>
                                </Card>
                            </div>

                            {/* Spoilage Risks */}
                            <Card
                                title="Spoilage Risks"
                                subtitle="Products requiring immediate attention"
                                variant="warning"
                            >
                                <div className="space-y-4">
                                    {mockSpoilageRisks.map(risk => (
                                        <div key={risk.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                            <div>
                                                <h4 className="font-semibold">{risk.productName}</h4>
                                                <p className="text-sm text-gray-600">
                                                    {risk.recommendation}
                                                </p>
                                            </div>
                                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${risk.riskLevel === 'High' ? 'bg-red-100 text-red-800' :
                                                risk.riskLevel === 'Medium' ? 'bg-amber-100 text-amber-800' :
                                                    'bg-green-100 text-green-800'
                                                }`}>
                                                {risk.daysUntilExpiry} days left
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* Demand Forecasts */}
                            <Card
                                title="Market Demand Forecasts"
                                subtitle="Predicted demand for next week"
                                variant="info"
                            >
                                <div className="space-y-4">
                                    {mockDemandForecasts.map((forecast, index) => (
                                        <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                            <div>
                                                <h4 className="font-semibold">{forecast.category}</h4>
                                                <p className="text-sm text-gray-600">
                                                    {forecast.priceRecommendation}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium">
                                                    {forecast.nextWeekDemand} units
                                                </p>
                                                <p className={`text-sm ${forecast.trend === 'Increasing' ? 'text-green-600' :
                                                    forecast.trend === 'Decreasing' ? 'text-red-600' :
                                                        'text-gray-600'
                                                    }`}>
                                                    {forecast.trend}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    )}

                    {/* Products Tab */}
                    {activeTab === 'products' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
                                <Button variant="primary">Add New Product</Button>
                            </div>

                            <Card>
                                <Table
                                    columns={productColumns}
                                    data={mockProducts}
                                    keyExtractor={(item) => item.id}
                                    pagination={{
                                        itemsPerPage: 10,
                                        totalItems: mockProducts.length,
                                        currentPage: 1,
                                        onPageChange: () => { }
                                    }}
                                />
                            </Card>
                        </div>
                    )}

                    {/* Analytics Tab */}
                    {activeTab === 'analytics' && (
                        <div className="space-y-6">
                            <h1 className="text-2xl font-bold text-gray-800">Analytics & Insights</h1>

                            {/* Sales Trends */}
                            <Card
                                title="Sales Trends"
                                subtitle="Last 30 days performance"
                            >
                                <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                                    [Sales Chart Placeholder]
                                </div>
                            </Card>

                            {/* Product Performance */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card
                                    title="Top Selling Products"
                                    subtitle="By volume this month"
                                >
                                    <div className="space-y-4">
                                        {mockProducts.map(product => (
                                            <div key={product.id} className="flex justify-between items-center">
                                                <span>{product.name}</span>
                                                <span className="font-medium">{product.quantity} {product.unit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </Card>

                                <Card
                                    title="Revenue by Category"
                                    subtitle="Distribution this month"
                                >
                                    <div className="h-48 flex items-center justify-center bg-gray-50 rounded">
                                        [Category Distribution Chart Placeholder]
                                    </div>
                                </Card>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
} 