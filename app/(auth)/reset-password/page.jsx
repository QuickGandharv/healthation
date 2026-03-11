// auth/reset-password/page.jsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import AuthLayout from '../components/AuthLayout';
import AuthForm from '../components/AuthForm';

const ResetPasswordPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const fields = [
        {
            name: 'password',
            type: 'password',
            label: 'New Password',
            placeholder: 'Enter new password',
            required: true
        },
        {
            name: 'confirmPassword',
            type: 'password',
            label: 'Confirm Password',
            placeholder: 'Confirm new password',
            required: true
        }
    ];

    const handleResetPassword = async (data) => {
        // Implement reset password logic with token
        console.log('Reset password:', { ...data, token });

        // Example API call
        // const response = await fetch('/api/reset-password', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ ...data, token })
        // });

        // if (!response.ok) {
        //   const error = await response.json();
        //   throw new Error(error.message);
        // }

        // router.push('/auth/login?reset=success');
    };

    return (
        <AuthLayout
            title="Reset Password"
            subtitle="Enter your new password below"
        >
            <AuthForm
                fields={fields}
                buttonText="Reset Password"
                onSubmit={handleResetPassword}
                alternateLink={{
                    text: "Changed your mind?",
                    href: "/login",
                    linkText: "Sign in"
                }}
            />
        </AuthLayout>
    );
};

export default ResetPasswordPage;