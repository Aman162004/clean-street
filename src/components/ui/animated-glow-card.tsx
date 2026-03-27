import React from "react";
import { cn } from "@/lib/utils";

const CardCanvas: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = "" }) => {
  return (
    <div className={cn("relative isolate", className)}>
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter width="3000%" x="-1000%" height="3000%" y="-1000%" id="unopaq">
          <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 3 0"></feColorMatrix>
        </filter>
      </svg>
      <div className="card-backdrop" />
      {children}
    </div>
  );
};

const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = "" }) => {
  return (
    <div className={cn("glow-card", className)}>
      <div className="border-element border-left" />
      <div className="border-element border-right" />
      <div className="border-element border-top" />
      <div className="border-element border-bottom" />
      <div className="card-content">{children}</div>
    </div>
  );
};

export { CardCanvas, Card };
