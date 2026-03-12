'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AuthLayout from './AuthLayout';
import Image from 'next/image';
import AuthForm from './AuthForm';

// ✅ Define type
interface LoginFormData {
    email: string;
    password: string;
}

const LoginPage = () => {
    const [mounted, setMounted] = useState<boolean>(false);
    const [imageError, setImageError] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const fields = [
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
            placeholder: 'Enter your password',
            required: true
        }
    ];

    const handleLogin = async (data: LoginFormData) => {
        // Implement login logic here
        console.log('Login data:', data);
        // router.push('/dashboard');
    };

    return (
        <AuthLayout title="" subtitle="">
            <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                    {mounted && (
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
                    )}
                </div>

                {imageError && (
                    <div className="flex justify-center mb-4">
                        <div className="h-16 w-16 rounded-xl bg-primary flex items-center justify-center">
                            <span className="text-2xl font-bold text-primary-foreground">A</span>
                        </div>
                    </div>
                )}

                <p className="text-sm text-muted-foreground">
                    Sign in to your account to continue
                </p>
            </div>

            <AuthForm
                fields={fields}
                buttonText="Sign In"
                onSubmit={handleLogin}
                showForgotPassword={true}
                alternateLink={{
                    text: "Don't have an account?",
                    href: "/register",
                    linkText: "Sign up"
                }}
            />
        </AuthLayout>
    );
};

export default LoginPage;