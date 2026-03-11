"use client";

import AuthLayout from "@/components/auth/AuthLayout";
import AuthForm from "@/components/auth/AuthForm";

type ResetPasswordClientProps = {
  token: string;
};

export default function ResetPasswordClient({
  token,
}: ResetPasswordClientProps) {
  const fields = [
    {
      name: "password",
      type: "password",
      label: "New Password",
      placeholder: "Enter new password",
      required: true,
    },
    {
      name: "confirmPassword",
      type: "password",
      label: "Confirm Password",
      placeholder: "Confirm new password",
      required: true,
    },
  ];

  const handleResetPassword = async (data: {
    password: string;
    confirmPassword: string;
  }) => {
    console.log("Reset password:", { ...data, token });
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
          linkText: "Sign in",
        }}
      />
    </AuthLayout>
  );
}