'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserRole } from '@/types/auth';

interface NavItem {
    label: string;
    href: string;
    roles: UserRole[];
}

const navItems: NavItem[] = [
    { label: 'Dashboard', href: '/dashboard', roles: ['farmer', 'vendor', 'researcher'] },
    { label: 'Farm Profile', href: '/farm-profile', roles: ['farmer'] },
    { label: 'Yield Predictions', href: '/predictions', roles: ['farmer'] },
    { label: 'Weather', href: '/weather', roles: ['farmer'] },
    { label: 'Inventory', href: '/inventory', roles: ['vendor'] },
    { label: 'Market Insights', href: '/market', roles: ['vendor'] },
    { label: 'Distribution', href: '/distribution', roles: ['vendor'] },
    { label: 'Analytics', href: '/analytics', roles: ['researcher'] },
    { label: 'Reports', href: '/reports', roles: ['researcher'] },
    { label: 'Sustainability', href: '/sustainability', roles: ['researcher'] },
];

interface NavigationProps {
    userRole?: UserRole;
}

export default function Navigation({ userRole = 'farmer' }: NavigationProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const filteredNavItems = navItems.filter(item =>
        item.roles.includes(userRole) || item.roles.includes('all')
    );

    const isActiveLink = (href: string) => pathname === href;

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="text-green-600 font-bold text-xl">
                                AgriSense
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            {filteredNavItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`
                    inline-flex items-center px-1 pt-1 border-b-2
                    text-sm font-medium
                    ${isActiveLink(item.href)
                                            ? 'border-green-500 text-gray-900'
                                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}
                  `}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="sm:hidden flex items-center">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Menu icon */}
                            <svg
                                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                            {/* Close icon */}
                            <svg
                                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden`}
                id="mobile-menu"
            >
                <div className="pt-2 pb-3 space-y-1">
                    {filteredNavItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                block pl-3 pr-4 py-2 border-l-4 text-base font-medium
                ${isActiveLink(item.href)
                                    ? 'bg-green-50 border-green-500 text-green-700'
                                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'}
              `}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
} 