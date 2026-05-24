import { redirect } from "next/navigation";
import { getClaimStatus } from "@/lib/actions/token-actions";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Zap, History, Shield, Terminal } from "lucide-react";
import { TokenBalanceCard } from "@/components/web3/TokenBalanceCard";
import { DashboardCharts } from "@/components/web3/DashboardCharts";

export default function DashboardPage() {
  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-32">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-4xl font-bold">Dashboard</h1>
        </div>

        <DashboardContent />
      </div>

      <Footer />
    </main>
  );
}

async function DashboardContent() {
  const claimStatus = await getClaimStatus();

  if (claimStatus.status === "unauthenticated") {
    redirect("/login");
  }

  const { user, tokenBalance, transactions } = claimStatus;

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {/* Overview Column */}
      <div className="md:col-span-1 space-y-6">
        {/* Profile Card */}
        <div className="p-6 rounded-2xl glass border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Profile</h3>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-xl font-bold">
              {user.name?.[0] || user.email?.[0] || "?"}
            </div>
            <div>
              <p className="font-semibold text-lg">{user.name || "User"}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <TokenBalanceCard initialBalance={tokenBalance} />

        {/* Stats Card */}
        <div className="p-6 rounded-2xl glass border border-white/5">
           <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Activity Stats</h3>
           <div className="space-y-4">
             <div className="flex items-center justify-between">
               <span className="text-sm text-muted-foreground flex items-center gap-2"><History className="w-4 h-4"/> Extractions</span>
               <span className="font-semibold">{transactions.length}</span>
             </div>
             <div className="flex items-center justify-between">
               <span className="text-sm text-muted-foreground flex items-center gap-2"><Shield className="w-4 h-4"/> Status</span>
               <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full border border-green-500/30">Active</span>
             </div>
           </div>
        </div>
      </div>

      {/* History Column */}
      <div className="md:col-span-2 space-y-6">
        <div className="p-6 rounded-2xl glass border border-white/5 h-full">
          <div className="flex items-center gap-3 mb-6">
            <Terminal className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-xl font-semibold">Activity Overview</h2>
          </div>
          
          <div className="mb-8">
            <DashboardCharts transactions={transactions} />
          </div>
          
          <div className="flex items-center gap-3 mb-6 pt-6 border-t border-white/5">
            <History className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-xl font-semibold">Transaction History</h2>
          </div>

          {transactions.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground border border-white/5 border-dashed rounded-xl">
              <p>No transactions yet.</p>
              <p className="text-sm mt-2">Complete a 6-hour action to earn tokens!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-muted-foreground">
                    <th className="pb-3 font-medium uppercase tracking-wider text-xs">Date</th>
                    <th className="pb-3 font-medium uppercase tracking-wider text-xs">Action</th>
                    <th className="pb-3 font-medium uppercase tracking-wider text-xs text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 text-muted-foreground whitespace-nowrap">
                        {new Date(tx.createdAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </td>
                      <td className="py-4">
                        <span className="px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary/90 text-xs">
                          {tx.actionType}
                        </span>
                      </td>
                      <td className="py-4 text-right font-mono font-bold text-green-400">
                        +{tx.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
