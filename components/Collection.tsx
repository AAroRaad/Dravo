import { Dumbbell, BookOpen, Droplets, Wind, Moon, Cpu } from "lucide-react";

const challenges = [
  {
    icon: Dumbbell,
    title: "Morning Workout",
    description: "Complete 20 minutes of exercise before your first meal.",
    category: "Fitness",
    participants: "12.4K",
    difficulty: "Medium",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
  {
    icon: BookOpen,
    title: "Read & Reflect",
    description: "Read at least 10 pages of any book and jot down one insight.",
    category: "Learning",
    participants: "8.1K",
    difficulty: "Easy",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  {
    icon: Droplets,
    title: "Hydration Check",
    description: "Drink 500ml of water and log how you feel right now.",
    category: "Wellness",
    participants: "21.7K",
    difficulty: "Easy",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    icon: Wind,
    title: "Breathing Reset",
    description: "Do a 5-minute box-breathing session. Reset your nervous system.",
    category: "Mindfulness",
    participants: "6.3K",
    difficulty: "Easy",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  {
    icon: Moon,
    title: "Evening Wind-Down",
    description: "No screens for 30 minutes. Write tomorrow's top 3 priorities.",
    category: "Wellness",
    participants: "9.8K",
    difficulty: "Medium",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
  },
  {
    icon: Cpu,
    title: "Learn Something New",
    description: "Watch one educational video or read one article outside your field.",
    category: "Learning",
    participants: "14.2K",
    difficulty: "Easy",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
];

const diffColor: Record<string, string> = {
  Easy: "text-green-400 bg-green-500/10 border-green-500/30",
  Medium: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
  Hard: "text-red-400 bg-red-500/10 border-red-500/30",
};

export function Collection() {
  return (
    <section id="how-it-works" className="px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <div className="text-sm text-secondary uppercase tracking-widest mb-3">
              Pick your action
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Active <span className="text-gradient">challenges</span>
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Choose any challenge every 6 hours to earn your token.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((ch) => {
            const Icon = ch.icon;
            return (
              <article
                key={ch.title}
                className="group rounded-3xl overflow-hidden border border-white/5 transition hover:-translate-y-2 hover:border-white/20 p-6 flex flex-col gap-4"
                style={{
                  background: "var(--gradient-card)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                {/* Icon + category */}
                <div className="flex items-start justify-between">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${ch.bg} ${ch.border}`}
                  >
                    <Icon className={`w-6 h-6 ${ch.color}`} />
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border uppercase tracking-widest ${diffColor[ch.difficulty]}`}
                  >
                    {ch.difficulty}
                  </span>
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{ch.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {ch.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <span className="text-[11px] text-muted-foreground">
                    {ch.participants} participants
                  </span>
                  <a
                    href="#claim"
                    className="px-4 py-2 rounded-full text-xs font-semibold bg-white/5 hover:bg-white hover:text-black transition cursor-pointer"
                  >
                    Do this →
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
