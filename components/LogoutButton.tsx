"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="cursor-pointer p-2 rounded-xl bg-white/5 hover:bg-red-500/10 hover:text-red-500 transition-all border border-white/10 group"
      title="Logout"
    >
      <LogOut className="w-4 h-4" />
    </button>
  );
}
