"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Schritt7() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.push("/portal/dashboard"), 3000);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div className="min-h-screen bg-warm-white flex items-center justify-center">
      <div className="text-center max-w-sm mx-auto px-6">
        {/* Animated checkmark */}
        <div className="w-24 h-24 bg-teal rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce-once">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-navy mb-3">Willkommen!</h1>
        <p className="text-text-light mb-2">Ihr Dashboard wird vorbereitet...</p>

        {/* Animated dots */}
        <div className="flex justify-center gap-1.5 mt-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-teal rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
