'use client';

import { useState } from 'react';
import Link from 'next/link';
import CropDashboard from '../../../src/app/components/CropDashboard';
import Marketplace from '../../../src/app/components/Marketplace';

// Mock data for demonstration
const mockFarmData = {
    name: "Green Valley Farm",
    location: {
        country: "Kenya",
        region: "Eastern Province"
    },
    size: 12, // hectares
    crops: [
        {
            id: "crop1",
            name: "Maize",
            variety: "Highland Hybrid",
            plantingDate: new Date("2025-03-15"),
            expectedHarvestDate: new Date("2025-07-10"),
            area: 4.5, // hectares
            soilType: "Loamy",
            irrigationType: "Drip irrigation"
        },
        {
            id: "crop2",
            name: "Beans",
            variety: "Red Kidney",
            plantingDate: new Date("2025-04-01"),
            expectedHarvestDate: new Date("2025-06-15"),
            area: 2.5, // hectares
            soilType: "Clay",
            irrigationType: "Furrow irrigation"
        }
    ],
    soilCharacteristics: {
        type: "Mixed loamy and clay",
        pH: 6.8,
        nutrientLevels: {
            nitrogen: 65,
            phosphorus: 45,
            potassium: 70
        }
    }
};

const mockPredictions = [
    {
        id: "pred1",
        crop: {
            name: "Maize",
            variety: "Highland Hybrid"
        },
        prediction: {
            expectedYield: 6300,
            yieldUnit: "kg/ha",
            lowerBound: 5800,
            upperBound: 6900,
            confidenceLevel: 0.85
        },
        recommendations: {
            irrigationSchedule: "Twice weekly, 20mm per session",
            fertilizers: [
                {
                    type: "Nitrogen-rich",
                    amount: 50,
                    unit: "kg/ha",
                    time: "Every 2 weeks"
                }
            ],
            pestControl: ["Monitor for fall armyworm", "Apply organic pesticides if needed"],
            harvestTime: new Date("2025-07-10")
        }
    },
    {
        id: "pred2",
        crop: {
            name: "Beans",
            variety: "Red Kidney"
        },
        prediction: {
            expectedYield: 1800,
            yieldUnit: "kg/ha",
            lowerBound: 1600,
            upperBound: 2100,
            confidenceLevel: 0.82
        },
        recommendations: {
            irrigationSchedule: "Three times weekly, 15mm per session",
            fertilizers: [
                {
                    type: "Phosphorus-rich",
                    amount: 35,
                    unit: "kg/ha",
                    time: "At planting and 3 weeks after"
                }
            ],
            pestControl: ["Check for aphids regularly", "Use beneficial insects for pest control"],
            harvestTime: new Date("2025-06-15")
        }
    }
];

const mockWeatherData = {
    current: {
        date: new Date(),
        condition: "Partly cloudy",
        temperature: 24, // °C
        humidity: 65, // %
        precipitation: 0, // mm
        windSpeed: 8 // km/h
    },
    forecast: [
        {
            date: new Date(Date.now() + 86400000 * 1), // Tomorrow
            condition: "Sunny",
            highTemp: 27,
            lowTemp: 18,
            precipitation: 0,
            humidity: 60
        },
        {
            date: new Date(Date.now() + 86400000 * 2), // Day after tomorrow
            condition: "Light rain",
            highTemp: 25,
            lowTemp: 17,
            precipitation: 5.2,
            humidity: 75
        },
        {
            date: new Date(Date.now() + 86400000 * 3), // 3 days from now
            condition: "Mostly cloudy",
            highTemp: 22,
            lowTemp: 16,
            precipitation: 2.1,
            humidity: 70
        }
    ]
};

export default function FarmerDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const [weatherPredictionForm, setWeatherPredictionForm] = useState({
        location: '',
        date: '',
        cropType: ''
    });

    const handleWeatherPredictionSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement weather prediction API call
        console.log('Weather prediction form submitted:', weatherPredictionForm);
    };

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
            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-64 bg-white shadow-md">
                    <nav className="py-6 px-4">
                        <ul className="space-y-2">
                            <li>
                                <button
                                    onClick={() => setActiveTab('overview')}
                                    className={`w-full flex items-center space-x-2 px-4 py-2 rounded-md ${activeTab === 'overview' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'
                                        }`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                    </svg>
                                    <span>Overview</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveTab('crops')}
                                    className={`w-full flex items-center space-x-2 px-4 py-2 rounded-md ${activeTab === 'crops' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'
                                        }`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                    </svg>
                                    <span>Crop Management</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveTab('predictions')}
                                    className={`w-full flex items-center space-x-2 px-4 py-2 rounded-md ${activeTab === 'predictions' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'
                                        }`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z" clipRule="evenodd" />
                                    </svg>
                                    <span>Yield Predictions</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveTab('weather')}
                                    className={`w-full flex items-center space-x-2 px-4 py-2 rounded-md ${activeTab === 'weather' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'
                                        }`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                                    </svg>
                                    <span>Weather Forecast</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveTab('marketplace')}
                                    className={`w-full flex items-center space-x-2 px-4 py-2 rounded-md ${activeTab === 'marketplace' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'
                                        }`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                    </svg>
                                    <span>Marketplace</span>
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
                            <h1 className="text-2xl font-bold text-gray-800">Farm Overview</h1>

                            {/* Farm Summary Card */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-xl font-semibold mb-4">{mockFarmData.name}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Location</h3>
                                        <p>{mockFarmData.location.region}, {mockFarmData.location.country}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Farm Size</h3>
                                        <p>{mockFarmData.size} hectares</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Soil Type</h3>
                                        <p>{mockFarmData.soilCharacteristics.type}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Current Crops */}
                            <div className="bg-white rounded-lg shadow">
                                <div className="p-6 border-b">
                                    <h2 className="text-xl font-semibold">Current Crops</h2>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Crop Name
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Variety
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Area
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Planting Date
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Expected Harvest
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {mockFarmData.crops.map(crop => (
                                                <tr key={crop.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">{crop.name}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">{crop.variety}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">{crop.area} hectares</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">{crop.plantingDate.toLocaleDateString()}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">{crop.expectedHarvestDate.toLocaleDateString()}</div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h3 className="font-semibold mb-2">Add New Crop</h3>
                                    <p className="text-sm text-gray-600 mb-4">Record a new crop planting for predictions and tracking.</p>
                                    <button
                                        onClick={() => setActiveTab('crops')}
                                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                                    >
                                        Add Crop
                                    </button>
                                </div>
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h3 className="font-semibold mb-2">Get Yield Predictions</h3>
                                    <p className="text-sm text-gray-600 mb-4">Generate AI-powered yield predictions for your crops.</p>
                                    <button
                                        onClick={() => setActiveTab('predictions')}
                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                                    >
                                        View Predictions
                                    </button>
                                </div>
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h3 className="font-semibold mb-2">Check Weather Forecast</h3>
                                    <p className="text-sm text-gray-600 mb-4">View upcoming weather for your farm location.</p>
                                    <button
                                        onClick={() => setActiveTab('weather')}
                                        className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition"
                                    >
                                        Weather Forecast
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Crops Tab */}
                    {activeTab === 'crops' && (
                        <div className="space-y-6">
                            <CropDashboard />
                        </div>
                    )}

                    {/* Predictions Tab */}
                    {activeTab === 'predictions' && (
                        <div className="space-y-6">
                            <h1 className="text-2xl font-bold text-gray-800">Yield Predictions</h1>

                            {/* Predictions Overview */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {mockPredictions.map(prediction => (
                                    <div key={prediction.id} className="bg-white rounded-lg shadow">
                                        <div className="bg-green-700 text-white px-6 py-4 rounded-t-lg">
                                            <h2 className="text-lg font-semibold">
                                                {prediction.crop.name} ({prediction.crop.variety})
                                            </h2>
                                        </div>
                                        <div className="p-6">
                                            <div className="mb-4">
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Expected Yield</h3>
                                                <div className="flex items-baseline">
                                                    <span className="text-3xl font-bold text-gray-900">{prediction.prediction.expectedYield}</span>
                                                    <span className="ml-1 text-gray-600">{prediction.prediction.yieldUnit}</span>
                                                </div>
                                                <div className="text-sm text-gray-500 mt-1">
                                                    Range: {prediction.prediction.lowerBound} - {prediction.prediction.upperBound} {prediction.prediction.yieldUnit}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    Confidence: {(prediction.prediction.confidenceLevel * 100).toFixed(0)}%
                                                </div>
                                            </div>

                                            <div className="mt-6">
                                                <h3 className="text-sm font-medium text-gray-500 mb-2">Recommendations</h3>
                                                <ul className="space-y-2">
                                                    <li className="flex items-start">
                                                        <span className="text-green-600 mr-2">•</span>
                                                        <span className="text-sm">{prediction.recommendations.irrigationSchedule}</span>
                                                    </li>
                                                    {prediction.recommendations.fertilizers.map((fertilizer, index) => (
                                                        <li key={index} className="flex items-start">
                                                            <span className="text-green-600 mr-2">•</span>
                                                            <span className="text-sm">
                                                                Apply {fertilizer.amount} {fertilizer.unit} of {fertilizer.type} {fertilizer.time}
                                                            </span>
                                                        </li>
                                                    ))}
                                                    {prediction.recommendations.pestControl.map((control, index) => (
                                                        <li key={index} className="flex items-start">
                                                            <span className="text-green-600 mr-2">•</span>
                                                            <span className="text-sm">{control}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="mt-6">
                                                <h3 className="text-sm font-medium text-gray-500 mb-1">Harvest Time</h3>
                                                <div className="text-lg font-semibold">
                                                    {prediction.recommendations.harvestTime.toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Generate New Prediction */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-xl font-semibold mb-4">Generate New Prediction</h2>
                                <div className="text-gray-600 mb-4">
                                    Use our AI model to generate a new yield prediction for your crops.
                                </div>
                                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                                    Generate New Prediction
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Weather Tab */}
                    {activeTab === 'weather' && (
                        <div className="space-y-6">
                            <h1 className="text-2xl font-bold text-gray-800">Weather Forecast</h1>

                            {/* Weather Prediction Form */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-xl font-semibold mb-4">Get Weather Prediction</h2>
                                <form onSubmit={handleWeatherPredictionSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            id="location"
                                            value={weatherPredictionForm.location}
                                            onChange={(e) => setWeatherPredictionForm(prev => ({ ...prev, location: e.target.value }))}
                                            placeholder="Enter location (e.g., City, Country)"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                                            Prediction Date
                                        </label>
                                        <input
                                            type="date"
                                            id="date"
                                            value={weatherPredictionForm.date}
                                            onChange={(e) => setWeatherPredictionForm(prev => ({ ...prev, date: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="cropType" className="block text-sm font-medium text-gray-700 mb-1">
                                            Crop Type (Optional)
                                        </label>
                                        <select
                                            id="cropType"
                                            value={weatherPredictionForm.cropType}
                                            onChange={(e) => setWeatherPredictionForm(prev => ({ ...prev, cropType: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        >
                                            <option value="">Select a crop type</option>
                                            <option value="maize">Maize</option>
                                            <option value="beans">Beans</option>
                                            <option value="wheat">Wheat</option>
                                            <option value="rice">Rice</option>
                                            <option value="vegetables">Vegetables</option>
                                        </select>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200"
                                    >
                                        Get Prediction
                                    </button>
                                </form>
                            </div>

                            {/* Current Weather */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-xl font-semibold mb-4">Current Weather</h2>
                                <div className="flex items-center">
                                    <div className="text-6xl mr-6">
                                        {mockWeatherData.current.condition === "Sunny" ? "☀️" :
                                            mockWeatherData.current.condition === "Partly cloudy" ? "⛅" :
                                                mockWeatherData.current.condition === "Cloudy" ? "☁️" :
                                                    mockWeatherData.current.condition.includes("rain") ? "🌧️" : "🌤️"}
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold">{mockWeatherData.current.temperature}°C</div>
                                        <div className="text-lg text-gray-600">{mockWeatherData.current.condition}</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Humidity</h3>
                                        <p>{mockWeatherData.current.humidity}%</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Wind Speed</h3>
                                        <p>{mockWeatherData.current.windSpeed} km/h</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Precipitation</h3>
                                        <p>{mockWeatherData.current.precipitation} mm</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Date</h3>
                                        <p>{mockWeatherData.current.date.toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Forecast */}
                            <div className="bg-white rounded-lg shadow">
                                <div className="p-6 border-b">
                                    <h2 className="text-xl font-semibold">3-Day Forecast</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
                                    {mockWeatherData.forecast.map((day, index) => (
                                        <div key={index} className="p-6">
                                            <h3 className="font-semibold mb-2">
                                                {index === 0 ? 'Tomorrow' :
                                                    index === 1 ? 'Day After Tomorrow' :
                                                        day.date.toLocaleDateString()}
                                            </h3>
                                            <div className="flex items-center mb-4">
                                                <div className="text-4xl mr-4">
                                                    {day.condition === "Sunny" ? "☀️" :
                                                        day.condition === "Partly cloudy" ? "⛅" :
                                                            day.condition === "Cloudy" || day.condition === "Mostly cloudy" ? "☁️" :
                                                                day.condition.includes("rain") ? "🌧️" : "🌤️"}
                                                </div>
                                                <div>
                                                    <div className="font-bold">{day.highTemp}°C / {day.lowTemp}°C</div>
                                                    <div className="text-sm text-gray-600">{day.condition}</div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 text-sm">
                                                <div>
                                                    <span className="text-gray-500">Humidity:</span> {day.humidity}%
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Rain:</span> {day.precipitation} mm
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Agricultural Impact */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-xl font-semibold mb-4">Agricultural Impact</h2>
                                <div className="space-y-3">
                                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                                        <h3 className="font-medium">Irrigation Needs</h3>
                                        <p className="text-sm text-gray-600">Based on the forecast, your maize crop will need additional irrigation in the next 3 days due to higher temperatures and limited rainfall.</p>
                                    </div>
                                    <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                                        <h3 className="font-medium">Growth Conditions</h3>
                                        <p className="text-sm text-gray-600">Conditions are favorable for bean growth with moderate temperatures and humidity levels.</p>
                                    </div>
                                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
                                        <h3 className="font-medium">Pest Alert</h3>
                                        <p className="text-sm text-gray-600">The humid conditions forecasted may increase risk of fungal diseases. Consider preventative measures for your crops.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Marketplace Tab */}
                    {activeTab === 'marketplace' && (
                        <Marketplace />
                    )}
                </main>
            </div>
        </div>
    );
} 