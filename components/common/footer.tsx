"use client";

import Link from "next/link";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-gray-200 py-6 mt-auto">
            <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Legal Links */}
                <div className="text-center text-sm text-gray-600">
                    All Rights Reserved Brethren Design Co. {currentYear} • Site by
                    <Link href="https://deploymeta.com/" target="_blank" className="text-[#075bd9] font-semibold"> Deploy Meta</Link>
                </div>

                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600 mb-3">

                    <Link href="/privacy-policy" className="hover:text-gray-900 transition-colors">
                        Privacy Policy
                    </Link>

                    <Link href="/terms-conditions" className="hover:text-gray-900 transition-colors">
                        Terms & Conditions
                    </Link>
                </div>

                {/* Main Footer Text - Exactly as your image */}

            </div>
        </footer>
    );
};

export default Footer;