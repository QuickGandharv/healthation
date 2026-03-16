"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {

    const router = useRouter();
    const { user } = useAuth();

    const redirectToDashboard = () => {
      
        if (user?.role === "doctor") {
          router.push("/doctor/dashboard");
        } else if (user?.role === "patient") { 
          router.push("/patient/dashboard");
        }else{
            router.push("/login");
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-white text-black p-6">
            <div className="max-w-md w-full rounded-2xl shadow-lg border p-6 text-center">
                <h1 className="text-3xl font-bold mb-3">Telehealth App</h1>
                <p className="text-gray-600 mb-6">
                    This is my first Next.js PWA single-page app.
                </p>

                <button 
                    onClick={() => redirectToDashboard()}
                    className="px-5 py-3 rounded-xl bg-black text-white">
                    Get Started
                </button>
            </div>
        </main>
    )
}