"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ArrowRight, Mail, Lock, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    startTransition(async () => {
      try {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          setError("Invalid credentials");
        } else {
          router.push("/");
          router.refresh();
        }
      } catch (err) {
        setError("Something went wrong");
      }
    });
  }

  return (
    <div className="glass rounded-3xl p-8 border border-white/10 shadow-2xl animate-in fade-in zoom-in duration-500">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gradient mb-2">Welcome Back</h1>
        <p className="text-muted-foreground">Sign in to your Dravo account</p>
      </div>

      <form action={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium ml-1 text-foreground">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              name="email"
              type="email"
              required
              placeholder="name@example.com"
              className="w-full bg-background/50 border border-border rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-foreground"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center ml-1">
            <label className="text-sm font-medium text-foreground">
              Password
            </label>
            <Link href="#" className="text-xs text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full bg-background/50 border border-border rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-foreground"
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-lg text-center">
            {error}
          </div>
        )}

        <button
          disabled={isPending}
          className="cursor-pointer w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group disabled:opacity-50"
        >
          {isPending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Sign In
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="text-primary font-medium hover:underline"
        >
          Sign up for free
        </Link>
      </div>
    </div>
  );
}
