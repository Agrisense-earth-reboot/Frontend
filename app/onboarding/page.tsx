'use client';

import { useState } from 'react';
import Link from 'next/link';

// Define user roles
enum UserRole {
    FARMER = 'farmer',
    VENDOR = 'vendor',
    NGO = 'ngo'
}

// Define registration form state
interface RegistrationForm {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: UserRole;
    location: {
        country: string;
        region: string;
    };
    phoneNumber: string;
}

export default function Onboarding() {
    // State for the registration form
    const [formData, setFormData] = useState<RegistrationForm>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: UserRole.FARMER, // Default role
        location: {
            country: '',
            region: ''
        },
        phoneNumber: ''
    });

    // State for current step in the registration process
    const [currentStep, setCurrentStep] = useState(1);

    // State for form errors
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Handle input change for most fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name.includes('.')) {
            // Handle nested properties like location.country
            const [parent, child] = name.split('.');
            setFormData({
                ...formData,
                [parent]: {
                    ...formData[parent as keyof typeof formData] as Record<string, string>,
                    [child]: value
                }
            });
        } else {
            // Handle top-level properties
            setFormData({
                ...formData,
                [name]: value
            });
        }

        // Clear error for this field if it exists
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    // Handle role selection
    const handleRoleSelect = (role: UserRole) => {
        setFormData({
            ...formData,
            role
        });
    };

    // Validate step 1 (basic info)
    const validateStep1 = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Validate step 2 (location info)
    const validateStep2 = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.location.country.trim()) {
            newErrors['location.country'] = 'Country is required';
        }

        if (!formData.location.region.trim()) {
            newErrors['location.region'] = 'Region is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle next step
    const handleNextStep = () => {
        if (currentStep === 1 && validateStep1()) {
            setCurrentStep(2);
        } else if (currentStep === 2 && validateStep2()) {
            setCurrentStep(3);
        }
    };

    // Handle previous step
    const handlePrevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (currentStep === 3) {
            try {
                // In a real implementation, this would be an API call to the backend
                console.log('Submitting form data:', formData);

                // Simulate API call success
                alert('Registration successful! Redirecting to dashboard...');

                // Redirect to dashboard based on role
                window.location.href = `/dashboard/${formData.role}`;
            } catch (error) {
                console.error('Registration error:', error);
                alert('Registration failed. Please try again.');
            }
        } else {
            handleNextStep();
        }
    };

    // Render different steps based on currentStep
    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold mb-6">Step 1: Basic Information</h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Your full name"
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="email@example.com"
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Create a secure password"
                            />
                            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Confirm your password"
                            />
                            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold mb-6">Step 2: Location Information</h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                            <input
                                type="text"
                                name="location.country"
                                value={formData.location.country}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Your country"
                            />
                            {errors['location.country'] && <p className="mt-1 text-sm text-red-600">{errors['location.country']}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Region/State</label>
                            <input
                                type="text"
                                name="location.region"
                                value={formData.location.region}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Your region or state"
                            />
                            {errors['location.region'] && <p className="mt-1 text-sm text-red-600">{errors['location.region']}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Your phone number"
                            />
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold mb-6">Step 3: Select Your Role</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Farmer Option */}
                            <div
                                className={`border p-4 rounded-lg cursor-pointer transition-colors ${formData.role === UserRole.FARMER
                                    ? 'border-green-500 bg-green-50'
                                    : 'hover:border-gray-400'
                                    }`}
                                onClick={() => handleRoleSelect(UserRole.FARMER)}
                            >
                                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white text-xl mb-3">
                                    🌾
                                </div>
                                <h3 className="font-semibold mb-1">Farmer</h3>
                                <p className="text-sm text-gray-600">
                                    Access yield predictions, planting schedules, and resource optimization.
                                </p>
                            </div>

                            {/* Vendor Option */}
                            <div
                                className={`border p-4 rounded-lg cursor-pointer transition-colors ${formData.role === UserRole.VENDOR
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'hover:border-gray-400'
                                    }`}
                                onClick={() => handleRoleSelect(UserRole.VENDOR)}
                            >
                                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl mb-3">
                                    🛒
                                </div>
                                <h3 className="font-semibold mb-1">Vendor</h3>
                                <p className="text-sm text-gray-600">
                                    Track product freshness, get spoilage alerts, and optimize distribution.
                                </p>
                            </div>

                            {/* NGO Option */}
                            <div
                                className={`border p-4 rounded-lg cursor-pointer transition-colors ${formData.role === UserRole.NGO
                                    ? 'border-amber-500 bg-amber-50'
                                    : 'hover:border-gray-400'
                                    }`}
                                onClick={() => handleRoleSelect(UserRole.NGO)}
                            >
                                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white text-xl mb-3">
                                    📊
                                </div>
                                <h3 className="font-semibold mb-1">NGO/Researcher</h3>
                                <p className="text-sm text-gray-600">
                                    Access aggregated analytics, reports, and sustainability metrics.
                                </p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <p className="text-sm text-gray-600 mb-1">
                                Selected role: <span className="font-semibold">{formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}</span>
                            </p>
                            <p className="text-sm text-gray-600">
                                You can customize your experience further after registration.
                            </p>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="bg-green-700 shadow-md">
                <div className="container mx-auto px-4 py-4">
                    <Link href="/" className="text-white text-2xl font-bold">AgriSense</Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow bg-gray-50">
                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
                        <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Your AgriSense Account</h1>

                        {/* Progress Indicator */}
                        <div className="flex mb-8">
                            {[1, 2, 3].map((step) => (
                                <div key={step} className="flex-1 relative">
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto ${step === currentStep
                                            ? 'bg-green-600 text-white'
                                            : step < currentStep
                                                ? 'bg-green-500 text-white'
                                                : 'bg-gray-200 text-gray-600'
                                            }`}
                                    >
                                        {step < currentStep ? '✓' : step}
                                    </div>
                                    <div className="text-xs mt-2 text-center">
                                        {step === 1 ? 'Basic Info' : step === 2 ? 'Location' : 'Role'}
                                    </div>

                                    {/* Connecting line */}
                                    {step < 3 && (
                                        <div className={`absolute top-4 left-1/2 w-full h-0.5 ${step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                                            }`}></div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                            {renderStep()}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-8">
                                {currentStep > 1 ? (
                                    <button
                                        type="button"
                                        onClick={handlePrevStep}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                                    >
                                        Back
                                    </button>
                                ) : (
                                    <div></div> // Empty div to maintain flex spacing
                                )}

                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                                >
                                    {currentStep === 3 ? 'Create Account' : 'Next'}
                                </button>
                            </div>
                        </form>

                        {/* Sign In Link */}
                        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                            <p className="text-gray-600">
                                Already have an account? {' '}
                                <Link href="/login" className="text-green-600 hover:text-green-800 font-medium">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-4">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} AgriSense. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
} 