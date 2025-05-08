import Link from 'next/link';

interface HeaderProps {
    isLoggedIn?: boolean;
    userName?: string;
}

export default function Header({ isLoggedIn = false, userName = '' }: HeaderProps) {
    return (
        <header className="bg-green-700 shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <Link href="/" className="text-white text-2xl font-bold">AgriSense</Link>
                </div>

                {!isLoggedIn ? (
                    <>
                        <nav className="hidden md:flex space-x-8">
                            <Link href="/" className="text-white hover:text-green-200 transition">
                                Home
                            </Link>
                            <Link href="/about" className="text-white hover:text-green-200 transition">
                                About
                            </Link>
                            <Link href="/onboarding" className="text-white hover:text-green-200 transition">
                                Get Started
                            </Link>
                        </nav>
                        <Link href="/login" className="bg-white text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-green-100 transition">
                            Login / Sign Up
                        </Link>
                    </>
                ) : (
                    <div className="flex items-center space-x-4">
                        <div className="relative group">
                            <button className="flex items-center space-x-1 text-white">
                                <span>{userName}</span>
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
                )}
            </div>
        </header>
    );
} 