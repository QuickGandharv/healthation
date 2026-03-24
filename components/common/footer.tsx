"use client";

import Link from "next/link";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-gray-200 py-6 mt-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Legal Links */}
                <div className="text-center md:text-left text-sm text-gray-600 order-2 md:order-1">
                    All Rights Reserved Brethren Design Co. {currentYear} • Site by
                    <Link href="https://deploymeta.com/" target="_blank" className="text-[#075bd9] font-semibold ml-1">Deploy Meta</Link>
                </div>

                <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-sm text-gray-600 order-1 md:order-2">
                    <Link href="/privacy-policy" className="hover:text-gray-900 transition-colors">
                        Privacy Policy
                    </Link>

                    <Link href="/terms-conditions" className="hover:text-gray-900 transition-colors">
                        Terms & Conditions
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;