'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AuthForm from '@/components/auth/AuthForm';
import AuthLayout from '@/components/auth/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, CheckCircle, ArrowLeft } from 'lucide-react';

interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    gender: string;
    dateOfBirth: string;
    mobileNo: string;
}

const RegisterPage = () => {
    const router = useRouter();
    const [imageError, setImageError] = useState(false);
    
    // Email & OTP state
    const [email, setEmail] = useState('');
    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [otpError, setOtpError] = useState('');
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [countdown, setCountdown] = useState(0);

    // Registration form data
    const [formData, setFormData] = useState<RegisterFormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: '',
        mobileNo: ''
    });

    // Handle email submission - shows OTP field
    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            // API call to send OTP
            console.log('Sending OTP to:', email);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API
            
            setShowOtp(true); // Show OTP field after email submit
            startCountdown();
        } catch (error) {
            console.error('Error sending OTP:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Start countdown for resend
    const startCountdown = () => {
        setResendDisabled(true);
        setCountdown(30);
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setResendDisabled(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // Handle OTP input change
    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return;
        
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    // Handle OTP verification
    const handleOtpVerify = async () => {
        setIsLoading(true);
        setOtpError('');

        const otpString = otp.join('');
        if (otpString.length !== 6) {
            setOtpError('Please enter complete 6-digit OTP');
            setIsLoading(false);
            return;
        }

        try {
            // API call to verify OTP
            console.log('Verifying OTP:', otpString);
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setIsEmailVerified(true); // Mark email as verified
        } catch (error) {
            setOtpError('Invalid OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Handle resend OTP
    const handleResendOtp = async () => {
        if (resendDisabled) return;
        
        setIsLoading(true);
        try {
            console.log('Resending OTP to:', email);
            await new Promise(resolve => setTimeout(resolve, 1000));
            startCountdown();
        } catch (error) {
            console.error('Error resending OTP:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle registration submission
    const handleRegister = async (data: RegisterFormData) => {
        console.log('Register data:', { ...data, email });
        // API call will go here
        router.push('/login?registered=true');
    };

    // Fields for registration form (only shown after email verification)
    const registrationFields = [
        {
            name: 'firstName',
            type: 'text',
            label: 'First Name',
            placeholder: 'Enter your first name',
            required: true
        },
        {
            name: 'lastName',
            type: 'text',
            label: 'Last Name',
            placeholder: 'Enter your last name',
            required: true
        },
        {
            name: 'email',
            type: 'email',
            label: 'Email Address',
            placeholder: 'Enter your email',
            required: true,
            disabled: true, // Email is already verified
            value: email // Pre-fill with verified email
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
        },
        {
            name: 'mobileNo',
            type: 'tel',
            label: 'Mobile Number',
            placeholder: 'Enter your mobile number',
            required: true
        },
        {
            name: 'gender',
            type: 'select',
            label: 'Gender',
            placeholder: 'Select gender',
            required: true,
            options: [
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' }
            ]
        },
        {
            name: 'dateOfBirth',
            type: 'date',
            label: 'Date of Birth',
            placeholder: 'Select your date of birth',
            required: true
        }
    ];

    return (
        <AuthLayout title="" subtitle="">
            {/* Header with Logo */}
            <div className="text-center mb-8">
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
                        <div className="flex items-center space-x-3">
                            <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center shadow-md">
                                <span className="text-2xl font-bold text-primary-foreground">A</span>
                            </div>
                            <span className="text-2xl font-bold text-foreground">AppName</span>
                        </div>
                    )}
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                    {!isEmailVerified 
                        ? 'Verify your email to get started' 
                        : 'Complete your profile'
                    }
                </p>
            </div>

            {/* Email Verification Section - Only shown if email not verified */}
            {!isEmailVerified && (
                
                    <CardContent className="pt-6">
                        <form onSubmit={handleEmailSubmit} className="space-y-4">
                            {/* Email Input - Always visible */}
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setShowOtp(false); // Hide OTP when email changes
                                        }}
                                        className="pl-9"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            {/* Continue Button */}
                            {!showOtp && (
                                <Button
                                    type="submit"
                                    className="w-full bg-primary hover:bg-primary/90"
                                    disabled={isLoading || !email}
                                >
                                    {isLoading ? 'Sending...' : 'Continue'}
                                </Button>
                            )}
                            {/* OTP Section - Shows conditionally after email submit */}
                            {showOtp && (
                                <div className="mt-6 pt-6 border-t border-border space-y-4">
                                    
                                    {/* OTP Input Fields */}
                                    <div className="flex justify-center gap-2">
                                        {otp.map((digit, index) => (
                                            <Input
                                                key={index}
                                                id={`otp-${index}`}
                                                type="text"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                                className="w-12 h-12 text-center text-lg font-semibold"
                                                required
                                                disabled={isLoading}
                                            />
                                        ))}
                                    </div>

                                    {otpError && (
                                        <p className="text-sm text-destructive text-center">{otpError}</p>
                                    )}

                                    {/* Verify Button */}
                                    <Button 
                                        type="button"
                                        onClick={handleOtpVerify}
                                        className="w-full bg-primary hover:bg-primary/90"
                                        disabled={isLoading || otp.join('').length !== 6}
                                    >
                                        {isLoading ? 'Verifying...' : 'Verify Email'}
                                    </Button>

                                    {/* Resend Option */}
                                    <div className="text-center">
                                        <button
                                            type="button"
                                            onClick={handleResendOtp}
                                            disabled={resendDisabled || isLoading}
                                            className="text-sm text-primary hover:text-primary/80 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {resendDisabled ? `Resend in ${countdown}s` : 'Resend Code'}
                                        </button>
                                    </div>

                                    {/* Back to Edit Email */}
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setShowOtp(false)}
                                        className="w-full"
                                    >
                                        <ArrowLeft className="h-4 w-4 mr-2" />
                                        Change Email
                                    </Button>
                                </div>
                            )}
                        </form>
                    </CardContent>
               
            )}

            {/* Success Message - Shown after email verification */}
            {isEmailVerified && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <p className="text-sm text-green-700">Email verified successfully! Complete your profile.</p>
                </div>
            )}

            {/* Registration Form - Only shown after email verification */}
            {isEmailVerified && (
                <AuthForm
                    fields={registrationFields}
                    buttonText="Create Account"
                    onSubmit={handleRegister}
                    defaultValues={{ email }} // Pass verified email
                    alternateLink={{
                        text: "Already have an account?",
                        href: "/login",
                        linkText: "Sign in"
                    }}
                />
            )}
        </AuthLayout>
    );
};

export default RegisterPage;