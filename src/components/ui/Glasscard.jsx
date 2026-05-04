import React from "react";

export const GlassCard = ({ children, className = "", style = {} }) => {
  return (
    <div
      className={className}
      style={{
        background: "var(--glass-bg)",
        backdropFilter: "var(--glass-blur)",
        WebkitBackdropFilter: "var(--glass-blur)",
        border: "1px solid var(--glass-border)",
        boxShadow: "var(--glass-shadow)",
        borderRadius: "16px",
        padding: "24px",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
