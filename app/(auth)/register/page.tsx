// auth/register/page.jsx
'use client';

import AuthForm from '@/components/auth/AuthForm';
import AuthLayout from '@/components/auth/AuthLayout';
import SocialLogin from '@/components/auth/SocialLogin';
import { useRouter } from 'next/navigation';


const RegisterPage = () => {
    const router = useRouter();

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

    const handleRegister = async (data) => {
        // Implement registration logic here
        console.log('Register data:', data);

        // Example API call
        // const response = await fetch('/api/register', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(data)
        // });

        // if (!response.ok) {
        //   const error = await response.json();
        //   throw new Error(error.message);
        // }

        // router.push('/auth/verify-email');
    };

    return (
        <AuthLayout
            title="Create Account"
            subtitle="Join us today and get started"
        >
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
            <SocialLogin />
        </AuthLayout>
    );
};

export default RegisterPage;