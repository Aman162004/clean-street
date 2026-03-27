import React from "react";
import { Sparkles, Shield, MapPinned } from "lucide-react";
import { CardCanvas, Card } from "./animated-glow-card";
import { XCard } from "./x-card";
import { AnimatedHero } from "./animated-hero";

export const CardShowcase: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <AnimatedHero
        eyebrow="New"
        title="City cleanliness, reimagined."
        subtitle="Animated glow cards give every panel a premium border. Drop them around maps, stats, or announcements to make them pop against the dark canvas."
        ctaPrimary={{ label: "Report an Issue", href: "/report" }}
        ctaSecondary={{ label: "View Dashboard", href: "/dashboard" }}
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <MiniStat icon={<Sparkles className="h-4 w-4 text-cyan-300" />} label="Complaints resolved" value="92%" />
          <MiniStat icon={<MapPinned className="h-4 w-4 text-purple-300" />} label="Active zones" value="18" />
        </div>
      </AnimatedHero>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <XCard title="Smart prioritization" description="Auto-triages complaints by severity and location." badge="AI" icon={<Sparkles className="h-5 w-5 text-cyan-300" />} />
        <XCard title="Secure uploads" description="Media stays private with role-based access." badge="Security" icon={<Shield className="h-5 w-5 text-purple-300" />} />
        <XCard title="Live coverage" description="Track cleanliness status across Delhi districts." badge="Maps" icon={<MapPinned className="h-5 w-5 text-emerald-300" />} />
      </div>

      <CardCanvas>
        <Card className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-white/70">Announcement</p>
              <p className="text-base text-white/90">Weekend deep-clean drive starts Friday 6 PM.</p>
            </div>
            <a href="/complaints" className="text-sm font-medium text-cyan-300 hover:text-cyan-200">View details →</a>
          </div>
        </Card>
      </CardCanvas>
    </div>
  );
};

const MiniStat: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <CardCanvas>
    <Card className="flex items-center gap-3 p-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/80">{icon}</div>
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.2em] text-white/60">{label}</p>
        <p className="text-lg font-semibold text-white">{value}</p>
      </div>
    </Card>
  </CardCanvas>
);
