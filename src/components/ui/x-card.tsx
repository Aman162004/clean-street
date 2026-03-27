import React from "react";
import { CardCanvas, Card } from "./animated-glow-card";
import { cn } from "@/lib/utils";

interface XCardProps {
  title: string;
  description?: string;
  badge?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const XCard: React.FC<XCardProps> = ({ title, description, badge, icon, children, className }) => {
  return (
    <CardCanvas className={cn("p-[1px]", className)}>
      <Card className="flex flex-col gap-3 p-4 md:p-6">
        <div className="flex items-center gap-2 text-sm text-gray-300">
          {icon}
          {badge && <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/80">{badge}</span>}
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white md:text-xl">{title}</h3>
          {description && <p className="text-sm text-gray-400 md:text-base">{description}</p>}
        </div>
        {children && <div className="text-sm text-gray-200">{children}</div>}
      </Card>
    </CardCanvas>
  );
};

export { XCard };
