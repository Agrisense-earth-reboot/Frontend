'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
    const pathname = usePathname();

    const navItems = [
        { href: '/', label: 'Overview', icon: '🏠' },
        { href: '/crop-management', label: 'Crop Management', icon: '🌾' },
        { href: '/yield-predictions', label: 'Yield Predictions', icon: '📊' },
        { href: '/weather-forecast', label: 'Weather Forecast', icon: '🌤' },
        { href: '/marketplace', label: 'Marketplace', icon: '🏪' },
    ];

    return (
        <nav className="bg-green-600 text-white">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="text-2xl font-bold">
                        AgriSense
                    </Link>
                    <div className="hidden md:flex space-x-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === item.href
                                    ? 'bg-green-700 text-white'
                                    : 'text-green-100 hover:bg-green-500'
                                    }`}
                            >
                                <span className="mr-2">{item.icon}</span>
                                {item.label}
                            </Link>
                        ))}
                    </div>
                    <div className="md:hidden">
                        {/* Mobile menu button - can be implemented later if needed */}
                        <button className="p-2 rounded-md hover:bg-green-500">
                            <span className="sr-only">Open menu</span>
                            ☰
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation; 