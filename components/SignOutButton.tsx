"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="mt-4 rounded-lg border border-white/20 bg-white/5 px-4 py-3 font-medium text-foreground transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
    >
      Sign out
    </button>
  );
}
