// auth/components/SocialLogin.jsx
'use client';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const SocialLogin = () => {
    const handleSocialLogin = (provider) => {
        // Implement social login logic here
        console.log(`Logging in with ${provider}`);
    };

    return (
        <div className="mt-6">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2  text-gray-500">Or continue with</span>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                    onClick={() => handleSocialLogin('google')}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <FcGoogle className="h-5 w-5" />
                    <span className="text-sm font-medium text-gray-700">Google</span>
                </button>

                <button
                    onClick={() => handleSocialLogin('github')}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <FaGithub className="h-5 w-5 text-gray-900" />
                    <span className="text-sm font-medium text-gray-700">GitHub</span>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;