// auth/forgot-password/page.jsx
'use client';

import { useState } from 'react';
import AuthLayout from '../../../components/auth/AuthLayout';
import AuthForm from '../../../components/auth/AuthForm';


const ForgotPasswordPage = () => {
    const [submitted, setSubmitted] = useState(false);

    const fields = [
        {
            name: 'email',
            type: 'email',
            label: 'Email Address',
            placeholder: 'Enter your email',
            required: true
        }
    ];

    const handleForgotPassword = async (data) => {
  
        console.log('Forgot password:', data);

       
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <AuthLayout title="Check Your Email">
                <div className="text-center space-y-4">
                    <div className="bg-primary/10 text-primary p-4 rounded-lg border border-primary/20">
                        <p>We've sent a password reset link to your email.</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Didn't receive the email?{' '}
                        <button
                            onClick={() => setSubmitted(false)}
                            className="text-primary hover:text-primary/80 font-medium"
                        >
                            Try again
                        </button>
                    </p>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout
            title="Forgot Password?"
            subtitle="Enter your email and we'll send you a reset link"
        >
            <AuthForm
                fields={fields}
                buttonText="Send Reset Link"
                onSubmit={handleForgotPassword}
                alternateLink={{
                    text: "Remember your password?",
                    href: "/login",
                    linkText: "Sign in"
                }}
            />
        </AuthLayout>
    );
};

export default ForgotPasswordPage;