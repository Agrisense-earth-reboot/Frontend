import Link from 'next/link';

interface FooterProps {
    simplified?: boolean;
}

export default function Footer({ simplified = false }: FooterProps) {
    if (simplified) {
        return (
            <footer className="bg-gray-800 text-white py-4">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} AgriSense. All rights reserved.
                    </p>
                </div>
            </footer>
        );
    }

    return (
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
    );
} 