import { Clock, Zap, Target, Flame } from "lucide-react";

const steps = [
  {
    icon: Clock,
    title: "1. The 6-Hour Cooldown",
    description: "The Dravo Core charges automatically. Check the live dashboard and wait for the 6-hour cycle to complete.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    icon: Zap,
    title: "2. Unlock the Sequence",
    description: "Once the countdown hits zero, the extraction sequence becomes available. Click the start button to enter the mini-game.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  {
    icon: Target,
    title: "3. Extract the Tokens",
    description: "Rapidly tap the glowing core 50 times to stabilize the matrix. Completing this active mini-game mints your 10 unique tokens.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  {
    icon: Flame,
    title: "4. Build your Streak",
    description: "Repeat the cycle up to 4 times a day. Stay consistent to build your streak, unlock achievements, and accumulate tokens.",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
];

export function Collection() {
  return (
    <section id="how-it-works" className="px-6 py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="text-sm text-secondary uppercase tracking-widest mb-3">
            The Mechanics
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            How to <span className="text-gradient">extract</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm">
            Master the 6-hour action cycle to earn your proof-of-action tokens.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article
                key={step.title}
                className="group relative rounded-3xl overflow-hidden border border-white/5 transition hover:-translate-y-2 hover:border-white/20 p-8 flex flex-col gap-6"
                style={{
                  background: "var(--gradient-card)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                {/* Connecting Line between steps (hidden on mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-14 left-[calc(100%-2rem)] w-full h-[2px] bg-white/5 pointer-events-none z-0" />
                )}

                {/* Icon */}
                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center border ${step.bg} ${step.border} transition-transform group-hover:scale-110`}
                  >
                    <Icon className={`w-8 h-8 ${step.color}`} />
                  </div>
                </div>

                {/* Text */}
                <div className="flex-1 relative z-10">
                  <h3 className="font-bold text-xl mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
