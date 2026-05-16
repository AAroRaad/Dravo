"use client";

import React, { useActionState } from "react";
import Link from "next/link";
import { signUp } from "@/lib/actions/auth-actions";
import { ArrowRight, Mail, Lock, User, Loader2 } from "lucide-react";

export default function SignUpPage() {
  const [state, action, isPending] = useActionState(signUp, undefined);

  return (
    <div className="glass rounded-3xl p-8 border border-white/10 shadow-2xl animate-in fade-in zoom-in duration-500">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gradient mb-2">
          Create Account
        </h1>
        <p className="text-muted-foreground">Join the future of NFTs on Dravo</p>
      </div>

      <form action={action} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium ml-1 text-foreground">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              name="name"
              type="text"
              required
              placeholder="John Doe"
              className="w-full bg-background/50 border border-border rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-foreground"
            />
          </div>
        </div>

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
          <label className="text-sm font-medium ml-1 text-foreground">
            Password
          </label>
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

        {state?.error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-lg text-center">
            {state.error}
          </div>
        )}

        <button
          disabled={isPending}
          className="w-full cursor-pointer bg-primary text-primary-foreground font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group disabled:opacity-50 mt-2"
        >
          {isPending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Create Account
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-primary font-medium hover:underline"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
