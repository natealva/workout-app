"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = (formData.get("email") as string) ?? "";
    const password = (formData.get("password") as string) ?? "";

    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("Supabase signIn response:", response);

    setLoading(false);

    if (response.error) {
      setError(response.error.message);
      return;
    }

    router.refresh();
    window.location.href = "/home";
  }

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12">
      <div className="mx-auto w-full max-w-sm">
        <h1 className="text-2xl font-bold text-foreground">Log in</h1>
        <p className="mt-1 text-sm text-foreground/70">
          Sign in to your account to continue.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          {error && (
            <p className="rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={loading}
              className="mt-1.5 block w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-foreground placeholder:text-foreground/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              disabled={loading}
              className="mt-1.5 block w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-foreground placeholder:text-foreground/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-accent px-4 py-3 font-semibold text-white transition-colors hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-foreground/70">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-accent hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
