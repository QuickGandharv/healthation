'use client';

import { useForm, Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface FieldProps {
    name: string;
    type: string;
    label: string;
    placeholder: string;
    required: boolean;
}

interface AuthFormProps<T extends Record<string, any>> {
    fields: FieldProps[];
    buttonText: string;
    onSubmit: (data: T) => Promise<void>; 
    showForgotPassword?: boolean;
    alternateLink?: {
        text: string;
        href: string;
        linkText: string;
    } | null;
    defaultValues?: Partial<T>; 
}

function AuthForm<T extends Record<string, any>>({
    fields,
    buttonText,
    onSubmit,
    showForgotPassword = false,
    alternateLink = null,
    defaultValues = {}
}: AuthFormProps<T>) {
    const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});

    // Build Zod schema
    const getFieldSchema = (field: FieldProps) => {
        let schema: z.ZodTypeAny;

        if (field.type === 'email') {
            schema = z.string().email('Invalid email address');
        } else if (field.type === 'password' && field.name === 'password') {
            schema = z.string().min(6, 'Password must be at least 6 characters');
        } else {
            schema = z.string();
        }

        if (field.required && field.type !== 'email' && field.type !== 'password') {
            schema = (schema as z.ZodString).min(1, `${field.label} is required`);
        }

        if (!field.required) {
            schema = schema.optional();
        }

        return schema;
    };

    // Create schema object
    const schemaObj: Record<string, z.ZodTypeAny> = {};
    fields.forEach(field => {
        schemaObj[field.name] = getFieldSchema(field);
    });

    // Add password match validation
    const finalSchema = fields.some(f => f.name === 'confirmPassword')
        ? z.object(schemaObj).refine(data => data.password === data.confirmPassword, {
            message: "Passwords do not match",
            path: ["confirmPassword"]
        })
        : z.object(schemaObj);

    type FormValues = z.infer<typeof finalSchema>;

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<FormValues>({
        resolver: zodResolver(finalSchema),
        defaultValues: fields.reduce((acc, field) => ({
            ...acc,
            [field.name]: (defaultValues as any)[field.name] || ''
        }), {}) as FormValues
    });

    const togglePasswordVisibility = (fieldName: string) => {
        setShowPasswords(prev => ({
            ...prev,
            [fieldName]: !prev[fieldName]
        }));
    };

    const getInputType = (field: FieldProps) => {
        if (field.type !== 'password') return field.type;
        return showPasswords[field.name] ? 'text' : 'password';
    };

    const onSubmitHandler = async (data: FormValues) => {
        try {
            await onSubmit(data as T);  // ✅ Cast to T
        } catch (error: any) {
            setError('root', {
                type: 'manual',
                message: error.message || 'Something went wrong'
            });
        }
    };

    // Helper function to get error message
    const getFieldError = (fieldName: string): string | undefined => {
        const error = errors[fieldName as keyof typeof errors];
        return error?.message;
    };

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-5">
            {errors.root && (
                <div className="bg-destructive/10 text-destructive p-3 rounded-lg text-sm border border-destructive/20">
                    {errors.root.message}
                </div>
            )}

            {fields.map((field) => {
                const fieldError = getFieldError(field.name);

                return (
                    <div key={field.name}>
                        <label className="block text-sm font-medium text-muted-foreground mb-1">
                            {field.label}
                            {field.required && <span className="text-destructive ml-1">*</span>}
                        </label>

                        <div className="relative">
                            <input
                                id={field.name}
                                type={getInputType(field)}
                                placeholder={field.placeholder}
                                className={`w-full px-4 py-2 bg-accent/30 text-foreground border rounded-lg transition ${fieldError
                                        ? 'border-destructive focus:ring-destructive'
                                        : 'border-border'
                                    } ${field.type === 'password' ? 'pr-10' : ''}`}
                                {...register(field.name as Path<FormValues>)}
                                disabled={isSubmitting}
                            />

                            {field.type === 'password' && (
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility(field.name)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                    tabIndex={-1}
                                >
                                    {showPasswords[field.name] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            )}
                        </div>

                        {fieldError && (
                            <p className="mt-1 text-xs text-destructive">
                                {fieldError}
                            </p>
                        )}
                    </div>
                );
            })}

            {showForgotPassword && (
                <div className="text-right">
                    <Link href="/forgot-password" className="text-sm text-primary hover:text-primary/80">
                        Forgot password?
                    </Link>
                </div>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2.5 rounded-lg disabled:opacity-50"
            >
                {isSubmitting ? 'Processing...' : buttonText}
            </button>

            {alternateLink && (
                <p className="text-center text-sm text-muted-foreground">
                    {alternateLink.text}{' '}
                    <Link href={alternateLink.href} className="text-primary hover:text-primary/80">
                        {alternateLink.linkText}
                    </Link>
                </p>
            )}
        </form>
    );
}

export default AuthForm;