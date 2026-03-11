// auth/components/AuthLayout.jsx
import Link from 'next/link';
import { ReactNode } from 'react';

interface AuthLayoutProps {
    title: string;
    subtitle?: string;
    children: ReactNode;
}

const AuthLayout = ({ title, subtitle, children }: AuthLayoutProps) => {
    return (
        <div className="min-h-screen">
            <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-xl">
                    
                    {/* Card Container */}
                    <div className="mt-8 bg-white py-8 px-6 shadow-xl rounded-xl sm:px-10">
                        {/* Header */}
                        <div className="mb-6 text-center">
                            <h2 className="text-2xl font-bold text-primary">{title}</h2>
                            {subtitle && (
                                <p className="mt-2 text-sm text-primary">{subtitle}</p>
                            )}
                        </div>

                        {/* Content (Form / Message) */}
                        {children}
                    </div>

                    {/* Footer Links */}
                    <div className="mt-6 text-center text-sm text-gray-600">
                        <Link href="/" className="hover:text-blue-600 transition-colors">
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;