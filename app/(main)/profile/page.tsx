import { SignOutButton } from "@/components/SignOutButton";

export default function ProfilePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-foreground">Profile</h1>
      <p className="mt-2 text-foreground/80">Manage your account and settings.</p>
      <SignOutButton />
    </div>
  );
}
