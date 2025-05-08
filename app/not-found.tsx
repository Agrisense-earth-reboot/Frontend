import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <main className="flex-grow flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="text-6xl font-bold text-green-700 mb-4">404</div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h1>
                    <p className="text-gray-600 mb-8">
                        Sorry, we couldn&apos;t find the page you&apos;re looking for.
                    </p>
                    <div className="space-y-4">
                        <Link href="/" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                            Go to Homepage
                        </Link>
                        <div className="text-gray-500 text-sm mt-8">
                            Need help? <Link href="#" className="text-green-600 hover:underline">Contact us</Link>
                        </div>
                    </div>
                </div>
            </main>

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