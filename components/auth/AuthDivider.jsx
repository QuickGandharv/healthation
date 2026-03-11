// auth/login/page.jsx
'use client';

import { useRouter } from 'next/navigation';


const LoginPage = () => {
    const router = useRouter();

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

    const handleLogin = async (data) => {
        // Implement login logic here
        console.log('Login data:', data);
        // router.push('/dashboard');
    };

    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Sign in to your account to continue"
        >
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
            <SocialLogin />
        </AuthLayout>
    );
};

export default LoginPage;