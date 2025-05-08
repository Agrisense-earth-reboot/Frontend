import Link from 'next/link';

export default function About() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header/Navigation */}
            <header className="bg-green-700 shadow-md">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <h1 className="text-white text-2xl font-bold">AgriSense</h1>
                    </div>
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
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="bg-gradient-to-b from-green-700 to-green-600 text-white py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">About AgriSense</h1>
                        <p className="text-xl max-w-3xl mx-auto">
                            An AI-powered platform for agricultural optimization and food waste reduction, built with a commitment to sustainability and food security.
                        </p>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Our Mission</h2>
                            <p className="text-lg text-gray-600 mb-6">
                                AgriSense aims to democratize access to artificial intelligence and data-driven insights for farmers, vendors, and organizations across the agricultural supply chain, with a particular focus on supporting smallholder farmers in low-resource regions.
                            </p>
                            <p className="text-lg text-gray-600 mb-6">
                                By providing open-source, accessible tools for crop yield optimization, post-harvest loss reduction, and supply chain efficiency, we're working to build a more sustainable and equitable global food system.
                            </p>
                            <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500 mt-8">
                                <h3 className="text-xl font-bold text-green-800 mb-2">Our Vision</h3>
                                <p className="text-gray-700">
                                    A world where every farmer has access to cutting-edge agricultural intelligence, where food loss is minimized through smart logistics, and where data-driven collaboration strengthens food security and environmental sustainability.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* The Problem & Solution */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">The Challenge We're Addressing</h2>

                        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                            <div>
                                <h3 className="text-xl font-bold text-red-700 mb-4">The Problem</h3>
                                <ul className="space-y-4">
                                    <li className="flex">
                                        <span className="text-red-600 mr-2">✗</span>
                                        <p>Lack of access to precision farming tools and data-driven insights in low-resource regions</p>
                                    </li>
                                    <li className="flex">
                                        <span className="text-red-600 mr-2">✗</span>
                                        <p>Inability to predict optimal planting schedules and potential yields</p>
                                    </li>
                                    <li className="flex">
                                        <span className="text-red-600 mr-2">✗</span>
                                        <p>Significant post-harvest losses due to poor logistics and lack of market visibility</p>
                                    </li>
                                    <li className="flex">
                                        <span className="text-red-600 mr-2">✗</span>
                                        <p>Fragmented agricultural data limiting informed decision-making</p>
                                    </li>
                                    <li className="flex">
                                        <span className="text-red-600 mr-2">✗</span>
                                        <p>Food wastage along the supply chain affecting both food security and environmental sustainability</p>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-green-700 mb-4">Our Solution</h3>
                                <ul className="space-y-4">
                                    <li className="flex">
                                        <span className="text-green-600 mr-2">✓</span>
                                        <p>Open-source AI-powered platform accessible to all farmers regardless of resources</p>
                                    </li>
                                    <li className="flex">
                                        <span className="text-green-600 mr-2">✓</span>
                                        <p>Smart crop planning with localized yield prediction and resource optimization</p>
                                    </li>
                                    <li className="flex">
                                        <span className="text-green-600 mr-2">✓</span>
                                        <p>Predictive logistics tools to reduce spoilage and improve market connectivity</p>
                                    </li>
                                    <li className="flex">
                                        <span className="text-green-600 mr-2">✓</span>
                                        <p>Integrated dashboards providing actionable insights for all supply chain actors</p>
                                    </li>
                                    <li className="flex">
                                        <span className="text-green-600 mr-2">✓</span>
                                        <p>Knowledge sharing across regions to promote best practices and sustainable approaches</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Technology Approach */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Our Technology Approach</h2>

                        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            <div className="bg-blue-50 rounded-lg p-6">
                                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl mb-4">
                                    🧠
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-blue-800">AI Models</h3>
                                <p className="text-gray-700">
                                    We use machine learning models including gradient boosted trees and neural networks trained on agricultural data to deliver precise predictions for crop yields, weather impacts, and spoilage risks.
                                </p>
                            </div>

                            <div className="bg-purple-50 rounded-lg p-6">
                                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white text-xl mb-4">
                                    🌐
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-purple-800">Open Data</h3>
                                <p className="text-gray-700">
                                    AgriSense leverages open datasets for weather, soil conditions, and market trends, while also enabling anonymous data sharing among users to continuously improve model accuracy.
                                </p>
                            </div>

                            <div className="bg-amber-50 rounded-lg p-6">
                                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white text-xl mb-4">
                                    📱
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-amber-800">Offline-First Design</h3>
                                <p className="text-gray-700">
                                    Our platform is built with an offline-first approach, ensuring that farmers in areas with limited connectivity can still access and use critical features when network access is unavailable.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sustainability Goals */}
                <section className="py-16 bg-green-700 text-white">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-8">Supporting Sustainable Development Goals</h2>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
                            <div className="bg-white rounded-lg p-4 text-green-800">
                                <h3 className="text-lg font-bold mb-2">SDG 1</h3>
                                <p className="text-sm">No Poverty</p>
                            </div>
                            <div className="bg-white rounded-lg p-4 text-green-800">
                                <h3 className="text-lg font-bold mb-2">SDG 2</h3>
                                <p className="text-sm">Zero Hunger</p>
                            </div>
                            <div className="bg-white rounded-lg p-4 text-green-800">
                                <h3 className="text-lg font-bold mb-2">SDG 9</h3>
                                <p className="text-sm">Industry, Innovation and Infrastructure</p>
                            </div>
                            <div className="bg-white rounded-lg p-4 text-green-800">
                                <h3 className="text-lg font-bold mb-2">SDG 12</h3>
                                <p className="text-sm">Responsible Consumption and Production</p>
                            </div>
                            <div className="bg-white rounded-lg p-4 text-green-800">
                                <h3 className="text-lg font-bold mb-2">SDG 13</h3>
                                <p className="text-sm">Climate Action</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team/Contributors */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Our Team & Contributors</h2>

                        <div className="text-center max-w-3xl mx-auto">
                            <p className="text-lg text-gray-600 mb-8">
                                AgriSense is built by a global community of developers, agricultural scientists, and sustainability advocates committed to improving food systems through open-source technology.
                            </p>
                            <p className="text-lg text-gray-600 mb-8">
                                Our contributors bring expertise from machine learning, agronomy, supply chain logistics, and community development to create a platform that addresses real-world agricultural challenges.
                            </p>
                            <Link href="https://github.com" className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold text-md hover:bg-gray-700 transition">
                                Join Our Open Source Community
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready to Get Started with AgriSense?</h2>
                        <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-600">
                            Whether you're a farmer looking to optimize crop yields, a vendor aiming to reduce waste, or an organization monitoring food systems, AgriSense offers tools tailored to your needs.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <Link href="/onboarding" className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition">
                                Create Your Account
                            </Link>
                            <Link href="/login" className="border border-green-600 text-green-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition">
                                Sign In
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">AgriSense</h3>
                            <p className="text-gray-400">
                                AI-powered platform for agricultural optimization and food waste reduction.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><Link href="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
                                <li><Link href="/about" className="text-gray-400 hover:text-white transition">About</Link></li>
                                <li><Link href="/onboarding" className="text-gray-400 hover:text-white transition">Get Started</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Resources</h4>
                            <ul className="space-y-2">
                                <li><Link href="#" className="text-gray-400 hover:text-white transition">Documentation</Link></li>
                                <li><Link href="#" className="text-gray-400 hover:text-white transition">API</Link></li>
                                <li><Link href="#" className="text-gray-400 hover:text-white transition">GitHub</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Connect</h4>
                            <ul className="space-y-2">
                                <li><Link href="#" className="text-gray-400 hover:text-white transition">Contact Us</Link></li>
                                <li><Link href="#" className="text-gray-400 hover:text-white transition">Twitter</Link></li>
                                <li><Link href="#" className="text-gray-400 hover:text-white transition">LinkedIn</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; {new Date().getFullYear()} AgriSense. All rights reserved.</p>
                        <p className="mt-2">An open-source platform supporting UN Sustainable Development Goals.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
} 