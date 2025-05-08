'use client';

import { useState } from 'react';
import Link from 'next/link';
import Card from '../../../components/ui/Card';
import Table, { Column } from '../../../components/ui/Table';
import Button from '../../../components/ui/Button';

interface AnalyticsData {
    id: string;
    title: string;
    type: 'yield' | 'waste' | 'market' | 'distribution' | 'environmental';
    region: string;
    lastUpdated: string;
    status: 'active' | 'archived';
    actions?: never; // Add this to allow 'actions' key in columns
}

// Mock data for demonstration
const mockAnalytics = [
    {
        id: 'a1',
        title: 'Regional Crop Yield Analysis',
        type: 'yield',
        region: 'Eastern Province',
        lastUpdated: '2025-05-01',
        status: 'active'
    },
    {
        id: 'a2',
        title: 'Food Waste Reduction Study',
        type: 'waste',
        region: 'Central Region',
        lastUpdated: '2025-04-28',
        status: 'active'
    }
] as AnalyticsData[];

const mockSustainabilityMetrics = [
    {
        metric: 'Food Waste Reduction',
        value: 25,
        unit: '%',
        trend: 'improving',
        description: 'Reduction in post-harvest losses'
    },
    {
        metric: 'Water Usage Efficiency',
        value: 15,
        unit: '%',
        trend: 'improving',
        description: 'Improvement in irrigation efficiency'
    },
    {
        metric: 'Carbon Footprint',
        value: 10,
        unit: '%',
        trend: 'improving',
        description: 'Reduction in transportation emissions'
    }
];

const mockFoodSecurityData = [
    {
        region: 'Eastern Province',
        score: 78,
        trend: 'up',
        factors: ['Improved crop yields', 'Better storage facilities']
    },
    {
        region: 'Central Region',
        score: 82,
        trend: 'up',
        factors: ['Market access improvements', 'Reduced post-harvest losses']
    },
    {
        region: 'Western Zone',
        score: 65,
        trend: 'down',
        factors: ['Weather challenges', 'Transportation issues']
    }
];

export default function NgoDashboard() {
    const [activeTab, setActiveTab] = useState('overview');

    const analyticsColumns: Column<AnalyticsData>[] = [
        { key: 'title', header: 'Title', sortable: true },
        { key: 'type', header: 'Type', sortable: true },
        { key: 'region', header: 'Region', sortable: true },
        { key: 'lastUpdated', header: 'Last Updated', sortable: true },
        { key: 'status', header: 'Status', sortable: true },
        {
            key: 'actions' as keyof AnalyticsData,
            header: 'Actions',
            render: (item: AnalyticsData) => (
                <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => console.log('View', item.id)}>View</Button>
                    <Button variant="outline" size="sm" onClick={() => console.log('Export', item.id)}>Export</Button>
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
                                <span>Food Security Research Institute</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                                <Link href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Organization Profile</Link>
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
                                    onClick={() => setActiveTab('analytics')}
                                    className={`w-full flex items-center space-x-2 px-4 py-2 rounded-md ${activeTab === 'analytics' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                                    </svg>
                                    <span>Analytics</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveTab('reports')}
                                    className={`w-full flex items-center space-x-2 px-4 py-2 rounded-md ${activeTab === 'reports' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" clipRule="evenodd" />
                                    </svg>
                                    <span>Reports</span>
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
                            <h1 className="text-2xl font-bold text-gray-800">NGO Dashboard</h1>

                            {/* Sustainability Metrics */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {mockSustainabilityMetrics.map((metric, index) => (
                                    <Card key={index} variant="default">
                                        <div className="text-center">
                                            <h3 className="text-lg font-semibold mb-2">{metric.metric}</h3>
                                            <div className="flex items-center justify-center space-x-2">
                                                <p className="text-3xl font-bold text-green-600">{metric.value}{metric.unit}</p>
                                                {metric.trend === 'improving' && (
                                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                                    </svg>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-600 mt-2">{metric.description}</p>
                                        </div>
                                    </Card>
                                ))}
                            </div>

                            {/* Food Security Map */}
                            <Card
                                title="Regional Food Security Index"
                                subtitle="Current status and trends by region"
                            >
                                <div className="space-y-4">
                                    {mockFoodSecurityData.map((region, index) => (
                                        <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                            <div>
                                                <h4 className="font-semibold">{region.region}</h4>
                                                <div className="text-sm text-gray-600">
                                                    {region.factors.map((factor, i) => (
                                                        <span key={i} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs mr-2 mb-2">
                                                            {factor}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-gray-800">{region.score}</div>
                                                <div className={`text-sm ${region.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                                    {region.trend === 'up' ? '↑' : '↓'}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    )}

                    {/* Analytics Tab */}
                    {activeTab === 'analytics' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h1 className="text-2xl font-bold text-gray-800">Analytics Management</h1>
                                <Button variant="primary">Create New Analysis</Button>
                            </div>

                            <Card>
                                <Table<AnalyticsData>
                                    columns={analyticsColumns}
                                    data={mockAnalytics}
                                    keyExtractor={(item) => item.id}
                                    pagination={{
                                        itemsPerPage: 10,
                                        totalItems: mockAnalytics.length,
                                        currentPage: 1,
                                        onPageChange: () => { }
                                    }}
                                />
                            </Card>
                        </div>
                    )}

                    {/* Reports Tab */}
                    {activeTab === 'reports' && (
                        <div className="space-y-6">
                            <h1 className="text-2xl font-bold text-gray-800">Reports & Publications</h1>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card
                                    title="Generate Report"
                                    subtitle="Create custom reports from available data"
                                >
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Report Type
                                            </label>
                                            <select className="w-full border border-gray-300 rounded-md shadow-sm p-2">
                                                <option>Food Security Assessment</option>
                                                <option>Sustainability Impact</option>
                                                <option>Market Analysis</option>
                                                <option>Resource Utilization</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Time Period
                                            </label>
                                            <select className="w-full border border-gray-300 rounded-md shadow-sm p-2">
                                                <option>Last Month</option>
                                                <option>Last Quarter</option>
                                                <option>Last Year</option>
                                                <option>Custom Range</option>
                                            </select>
                                        </div>
                                        <Button variant="primary" className="w-full">
                                            Generate Report
                                        </Button>
                                    </div>
                                </Card>

                                <Card
                                    title="Recent Reports"
                                    subtitle="Previously generated reports"
                                >
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                                            <div>
                                                <h4 className="font-medium">Q1 2025 Food Security Report</h4>
                                                <p className="text-sm text-gray-600">Generated on May 1, 2025</p>
                                            </div>
                                            <Button variant="outline" size="sm">Download</Button>
                                        </div>
                                        <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                                            <div>
                                                <h4 className="font-medium">Annual Sustainability Report 2024</h4>
                                                <p className="text-sm text-gray-600">Generated on Apr 15, 2025</p>
                                            </div>
                                            <Button variant="outline" size="sm">Download</Button>
                                        </div>
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