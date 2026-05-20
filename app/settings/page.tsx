import { redirect } from "next/navigation";
import { getClaimStatus } from "@/lib/actions/token-actions";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Settings, User, Bell, Shield as ShieldIcon } from "lucide-react";

export default function SettingsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-32">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
            <Settings className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-4xl font-bold">Settings</h1>
        </div>

        <SettingsContent />
      </div>

      <Footer />
    </main>
  );
}

async function SettingsContent() {
  const claimStatus = await getClaimStatus();

  if (claimStatus.status === "unauthenticated") {
    redirect("/login");
  }

  const { user } = claimStatus;

  return (
    <div className="space-y-6">
      {/* Account Settings */}
      <div className="p-6 rounded-2xl glass border border-white/5">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
          <User className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Account Information</h2>
        </div>
        
        <div className="space-y-6 max-w-xl">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">Display Name</label>
            <input 
              type="text" 
              defaultValue={user.name || ""} 
              readOnly
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground/50 cursor-not-allowed"
            />
            <p className="text-xs text-muted-foreground mt-2">Your name is currently not editable in the demo.</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">Email Address</label>
            <input 
              type="email" 
              defaultValue={user.email || ""} 
              readOnly
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground/50 cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="p-6 rounded-2xl glass border border-white/5">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
          <Bell className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Notifications</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02]">
            <div>
              <p className="font-medium">Action Reminders</p>
              <p className="text-sm text-muted-foreground">Get notified when your 6-hour action is ready</p>
            </div>
            <div className="w-11 h-6 rounded-full bg-primary relative cursor-not-allowed opacity-50">
              <div className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white translate-x-5" />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02]">
            <div>
              <p className="font-medium">Security Alerts</p>
              <p className="text-sm text-muted-foreground">Receive emails about suspicious activity</p>
            </div>
            <div className="w-11 h-6 rounded-full bg-primary relative cursor-not-allowed opacity-50">
              <div className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white translate-x-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="p-6 rounded-2xl glass border border-white/5">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
          <ShieldIcon className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Security</h2>
        </div>
        
        <div className="space-y-4">
          <button className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium">
            Change Password
          </button>
          <p className="text-xs text-muted-foreground">Password changes are disabled in this demo environment.</p>
        </div>
      </div>
    </div>
  );
}
