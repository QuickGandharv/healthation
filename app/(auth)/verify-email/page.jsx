// auth/verify-email/page.jsx
'use client';

import { useState } from 'react';
import AuthLayout from '../../../components/auth/AuthLayout';

const VerifyEmailPage = () => {
    const [resending, setResending] = useState(false);
    const [resendSuccess, setResendSuccess] = useState(false);

    const handleResendEmail = async () => {
        setResending(true);
        // Implement resend verification email logic
        await new Promise(resolve => setTimeout(resolve, 1000));
        setResending(false);
        setResendSuccess(true);
        setTimeout(() => setResendSuccess(false), 5000);
    };

    return (
        <AuthLayout title="Verify Your Email">
            <div className="space-y-6">
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                        <svg
                            className="h-6 w-6 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                    </div>

                    <p className="text-gray-600 mb-4">
                        We've sent a verification email to your email address.
                        Please check your inbox and click the verification link.
                    </p>

                    {resendSuccess && (
                        <div className="bg-green-50 text-green-800 p-3 rounded-lg text-sm mb-4">
                            Verification email sent successfully!
                        </div>
                    )}
                </div>

                <button
                    onClick={handleResendEmail}
                    disabled={resending}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition disabled:opacity-50"
                >
                    {resending ? 'Sending...' : 'Resend Verification Email'}
                </button>

                <p className="text-center text-sm text-gray-600">
                    Already verified?{' '}
                    <a href="/auth/login" className="text-blue-600 hover:text-blue-800">
                        Sign in
                    </a>
                </p>
            </div>
        </AuthLayout>
    );
};

export default VerifyEmailPage;