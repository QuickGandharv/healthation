"use client";

import { ShieldCheck, FileText } from "lucide-react";
import { useAppProfileScreens } from "@/queries/common/useAppProfileScreens";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import EmptyState from "@/components/ui/empty-state";

const Page = () => {
  const { data, isLoading, error } = useAppProfileScreens();

  const privacyPolicyData = data?.privacy_policy;

  return (
    <div className="min-h-screen bg-[#f8fafc] px-4 py-8 md:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8 flex justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <ShieldCheck className="h-6 w-6 text-blue-600" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Privacy Policy
              </h1>
              <p className="text-sm text-gray-500 md:text-base">
                Learn how we collect, use, and protect your information.
              </p>
            </div>
          </div>
          <Link href="/doctor/dashboard">
            <Button className="px-4 py-2 bg-primary text-white rounded-lg">
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="p-6 md:p-8 lg:p-10">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
                <p className="mt-4 text-sm text-gray-500">Loading privacy policy...</p>
              </div>
            ) : error ? (
              <EmptyState
                title="Error Loading Content"
                message={((error as any)?.response?.data?.errors?.message ??
                  (error as any)?.message ??
                  "Unable to load privacy policy. Please try again later.")}
                icon={<ShieldCheck className="h-10 w-10 text-red-500" />}
              />
            ) : !privacyPolicyData || privacyPolicyData.trim() === "" ? (
              <EmptyState
                title="No Privacy Policy Available"
                message="The privacy policy is currently not available. Please check back later or contact support for more information."
                icon={<FileText className="h-10 w-10 text-gray-400" />}
                actionLabel="Go to Dashboard"
                onAction={() => window.location.href = "/doctor/dashboard"}
              />
            ) : (
              <div
                className="html-content"
                dangerouslySetInnerHTML={{ __html: privacyPolicyData }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;