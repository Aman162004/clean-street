import React from "react";
import { Button } from "./button";
import { CardCanvas, Card } from "./animated-glow-card";
import { cn } from "@/lib/utils";

interface AnimatedHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctaPrimary?: { label: string; onClick?: () => void; href?: string };
  ctaSecondary?: { label: string; onClick?: () => void; href?: string };
  children?: React.ReactNode;
  className?: string;
}

const AnimatedHero: React.FC<AnimatedHeroProps> = ({ eyebrow, title, subtitle, ctaPrimary, ctaSecondary, children, className }) => {
  const renderButton = (cta: AnimatedHeroProps["ctaPrimary"], variant: "default" | "outline" = "default") => {
    if (!cta) return null;
    const content = cta.label;
    if (cta.href) {
      return (
        <Button asChild variant={variant} className="min-w-[120px]">
          <a href={cta.href}>{content}</a>
        </Button>
      );
    }
    return (
      <Button variant={variant} className="min-w-[120px]" onClick={cta.onClick}>
        {content}
      </Button>
    );
  };

  return (
    <CardCanvas className={cn("p-[1px]", className)}>
      <Card className="relative overflow-hidden px-5 py-8 md:px-10 md:py-14">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-purple-500/5 to-cyan-500/5 opacity-50" />
        <div className="relative z-10 grid gap-6 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            {eyebrow && <span className="inline-flex rounded-full bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">{eyebrow}</span>}
            <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">{title}</h1>
            {subtitle && <p className="text-base text-gray-300 md:text-lg">{subtitle}</p>}
            <div className="flex flex-wrap gap-3">
              {renderButton(ctaPrimary, "default")}
              {renderButton(ctaSecondary, "outline")}
            </div>
          </div>
          <div className="relative">
            {children}
          </div>
        </div>
      </Card>
    </CardCanvas>
  );
};

export { AnimatedHero };
