import { Terminal } from "lucide-react";

export function DashboardSkeleton() {
  return (
    <div className="grid md:grid-cols-3 gap-8 animate-pulse" aria-hidden="true">
      <div className="md:col-span-1 space-y-6">
        <div className="p-6 rounded-2xl border border-white/5 bg-white/5 h-32" />
        <div className="p-6 rounded-2xl border border-white/5 bg-white/5 h-40" />
        <div className="p-6 rounded-2xl border border-white/5 bg-white/5 h-32" />
      </div>
      <div className="md:col-span-2 space-y-6">
        <div className="p-6 rounded-2xl border border-white/5 bg-white/5 h-full min-h-[400px]">
          <div className="flex items-center gap-3 mb-6">
            <Terminal className="w-5 h-5 text-muted-foreground/50" />
            <div className="h-6 w-40 bg-white/10 rounded" />
          </div>
          <div className="h-64 bg-white/5 rounded-xl mb-8" />
          <div className="space-y-4">
            <div className="h-4 w-full bg-white/10 rounded" />
            <div className="h-4 w-full bg-white/10 rounded" />
            <div className="h-4 w-full bg-white/10 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
