import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
    return (
        <div className="min-h-screen">
            {/* Navigation */}
            <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
                <Link href="/" className="text-2xl font-bold text-green-700">AgriSense</Link>
                <Link href="/login" className="text-green-700 hover:text-green-800">Login / Sign Up</Link>
            </nav>

            {/* Hero Section */}
            <section className="text-center py-16 px-4 bg-gradient-to-b from-white to-green-50">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    AI-Powered Agriculture for a Sustainable Future
                </h1>
                <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
                    AgriSense uses artificial intelligence to optimize crop yields, reduce waste, and improve food security for farmers, vendors, and NGOs.
                </p>
                <div className="space-y-4 md:space-y-0 md:space-x-4">
                    <Link
                        href="/signup"
                        className="inline-block px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Start Using AgriSense
                    </Link>
                    <Link
                        href="/about"
                        className="inline-block px-8 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                    >
                        Learn More
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4 bg-white">
                <h2 className="text-3xl font-bold text-center mb-12">Key Features for Different Users</h2>
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                    {/* Farmers */}
                    <div className="p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow">
                        <div className="mb-4">
                            <Image src="/icons/farmer.svg" alt="Farmer icon" width={48} height={48} className="mx-auto" />
                        </div>
                        <h3 className="text-xl font-semibold mb-4">For Farmers</h3>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                Smart crop planning and yield prediction
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                Optimal irrigation and fertilizer recommendations
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                Planting and harvest schedule optimization
                            </li>
                        </ul>
                    </div>

                    {/* Vendors */}
                    <div className="p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow">
                        <div className="mb-4">
                            <Image src="/icons/vendor.svg" alt="Vendor icon" width={48} height={48} className="mx-auto" />
                        </div>
                        <h3 className="text-xl font-semibold mb-4">For Vendors</h3>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                Real-time freshness tracking and spoilage alerts
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                Market demand insights and price optimization
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                Logistics and distribution route planning
                            </li>
                        </ul>
                    </div>

                    {/* NGOs & Researchers */}
                    <div className="p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow">
                        <div className="mb-4">
                            <Image src="/icons/researcher.svg" alt="Researcher icon" width={48} height={48} className="mx-auto" />
                        </div>
                        <h3 className="text-xl font-semibold mb-4">For NGOs & Researchers</h3>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                Aggregated analytics for food systems monitoring
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                Advanced data visualization and reporting tools
                            </li>
                            <li className="flex items-center">
                                <span className="text-green-500 mr-2">✓</span>
                                Regional food security and sustainability insights
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* How it Works Section */}
            <section className="py-16 px-4 bg-green-50">
                <h2 className="text-3xl font-bold text-center mb-12">How AgriSense Works</h2>
                <div className="max-w-4xl mx-auto">
                    <div className="grid gap-8">
                        {/* Step 1 */}
                        <div className="flex items-center gap-6 bg-white p-6 rounded-lg shadow">
                            <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                                1
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Onboarding</h3>
                                <p className="text-gray-600">Select your role and input information about your farm, products, or research needs.</p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex items-center gap-6 bg-white p-6 rounded-lg shadow">
                            <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                                2
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
                                <p className="text-gray-600">Our models analyze your data along with weather, soil, and market conditions.</p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex items-center gap-6 bg-white p-6 rounded-lg shadow">
                            <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                                3
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Personalized Insights</h3>
                                <p className="text-gray-600">Receive tailored recommendations specific to your needs and context.</p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="flex items-center gap-6 bg-white p-6 rounded-lg shadow">
                            <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                                4
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Continuous Improvement</h3>
                                <p className="text-gray-600">Our AI continuously learns and adapts to provide better recommendations over time.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white py-8 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <p className="text-gray-600">© 2024 AgriSense. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
} 