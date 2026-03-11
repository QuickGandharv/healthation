'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AuthForm from '@/components/auth/AuthForm';
import SocialLogin from '@/components/auth/SocialLogin';
import AuthLayout from '@/components/auth/AuthLayout';


interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterPage = () => {
    const router = useRouter();
    const [imageError, setImageError] = useState(false);


    const fields = [
        {
            name: 'name',
            type: 'text',
            label: 'Full Name',
            placeholder: 'Enter your full name',
            required: true
        },
        {
            name: 'email',
            type: 'email',
            label: 'Email Address',
            placeholder: 'Enter your email',
            required: true
        },
        {
            name: 'password',
            type: 'password',
            label: 'Password',
            placeholder: 'Create a password',
            required: true
        },
        {
            name: 'confirmPassword',
            type: 'password',
            label: 'Confirm Password',
            placeholder: 'Confirm your password',
            required: true
        }
    ];

    const handleRegister = async (data: RegisterFormData) => {
        console.log('Register data:', data);
        // API call will go here
    };

    return (
        <AuthLayout title="" subtitle="">
            {/* Header with Logo */}
            <div className="text-center mb-8">
                {/* Logo Section */}
                <div className="flex justify-center">
                    {!imageError ? (
                        <Image
                            src="/assets/icon/logo-light.png"
                            alt="Company Logo"
                            width={120}
                            height={40}
                            priority
                            className="w-auto h-16"
                            onError={() => setImageError(true)}
                            unoptimized
                        />
                    ) : (
                        /* Fallback Text Logo */
                        <div className="flex items-center space-x-3">
                            <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center shadow-md">
                                <span className="text-2xl font-bold text-primary-foreground">A</span>
                            </div>
                            <span className="text-2xl font-bold text-foreground">AppName</span>
                        </div>
                    )}
                </div>

                <p className="text-sm text-muted-foreground mt-3">
                    Join us today and get started
                </p>
            </div>

            {/* Registration Form */}
            <AuthForm
                fields={fields}
                buttonText="Sign Up"
                onSubmit={handleRegister}
                alternateLink={{
                    text: "Already have an account?",
                    href: "/login",
                    linkText: "Sign in"
                }}
            />

            {/* Social Login Options */}
            <SocialLogin />
        </AuthLayout>
    );
};

export default RegisterPage;