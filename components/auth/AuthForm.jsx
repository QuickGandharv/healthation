// auth/components/AuthForm.jsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

// Dynamic schema builder based on fields
const createValidationSchema = (fields) => {
    const shape = {};

    fields.forEach(field => {
        let validator = z.string();

        // Required check
        if (field.required) {
            validator = validator.min(1, `${field.label} is required`);
        } else {
            validator = validator.optional();
        }

        // Email validation
        if (field.type === 'email') {
            validator = validator.email('Invalid email address');
        }

        // Password validation
        if (field.type === 'password' && field.name === 'password') {
            validator = validator.min(6, 'Password must be at least 6 characters');
        }

        // Confirm password - special handling
        if (field.name === 'confirmPassword') {
            validator = z.string();
        }

        shape[field.name] = validator;
    });

    // Add confirm password validation
    if (fields.some(f => f.name === 'confirmPassword')) {
        return z.object(shape).refine(
            (data) => data.password === data.confirmPassword,
            {
                message: "Passwords do not match",
                path: ["confirmPassword"],
            }
        );
    }

    return z.object(shape);
};

const AuthForm = ({
    fields,
    buttonText,
    onSubmit,
    showForgotPassword = false,
    alternateLink = null,
    defaultValues = {}
}) => {
    // State for password visibility
    const [showPasswords, setShowPasswords] = useState({});

    // Create validation schema
    const validationSchema = createValidationSchema(fields);

    // Initialize form
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        clearErrors
    } = useForm({
        resolver: zodResolver(validationSchema),
        defaultValues: fields.reduce((acc, field) => ({
            ...acc,
            [field.name]: defaultValues[field.name] || ''
        }), {})
    });

    const togglePasswordVisibility = (fieldName) => {
        setShowPasswords(prev => ({
            ...prev,
            [fieldName]: !prev[fieldName]
        }));
    };

    const getInputType = (field) => {
        if (field.type !== 'password') return field.type;
        return showPasswords[field.name] ? 'text' : 'password';
    };

    const onSubmitHandler = async (data) => {
        try {
            await onSubmit(data);
        } catch (error) {
            // Handle API errors
            if (error.response?.data?.errors) {
                // Set field errors from API
                Object.entries(error.response.data.errors).forEach(([field, message]) => {
                    setError(field, {
                        type: 'manual',
                        message: message
                    });
                });
            } else {
                // Set general form error
                setError('root', {
                    type: 'manual',
                    message: error.message || 'Something went wrong'
                });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-5">
            {/* Root form error */}
            {errors.root && (
                <div className="bg-destructive/10 text-destructive p-3 rounded-lg text-sm border border-destructive/20">
                    {errors.root.message}
                </div>
            )}

            {fields.map((field) => (
                <div key={field.name}>
                    <label
                        htmlFor={field.name}
                        className="block text-sm font-medium text-muted-foreground mb-1"
                    >
                        {field.label}
                        {field.required && <span className="text-destructive ml-1">*</span>}
                    </label>

                    <div className="relative">
                        <input
                            id={field.name}
                            type={getInputType(field)}
                            placeholder={field.placeholder}
                            className={`w-full px-4 py-2 bg-accent/30 text-foreground border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition ${errors[field.name]
                                    ? 'border-destructive focus:ring-destructive'
                                    : 'border-border'
                                } ${field.type === 'password' ? 'pr-10' : ''}`}
                            {...register(field.name)}
                            disabled={isSubmitting}
                        />

                        {/* Password visibility toggle */}
                        {field.type === 'password' && (
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility(field.name)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                tabIndex="-1"
                            >
                                {showPasswords[field.name] ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        )}
                    </div>

                    {errors[field.name] && (
                        <p className="mt-1 text-xs text-destructive">
                            {errors[field.name].message}
                        </p>
                    )}
                </div>
            ))}

            {/* Forgot Password Link */}
            {showForgotPassword && (
                <div className="text-right">
                    <Link
                        href="/forgot-password"
                        className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                        Forgot password?
                    </Link>
                </div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium py-2.5 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                    </span>
                ) : buttonText}
            </button>

            {/* Alternate Link (Sign Up / Sign In) */}
            {alternateLink && (
                <p className="text-center text-sm text-muted-foreground">
                    {alternateLink.text}{' '}
                    <Link
                        href={alternateLink.href}
                        className="text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                        {alternateLink.linkText}
                    </Link>
                </p>
            )}
        </form>
    );
};

export default AuthForm;