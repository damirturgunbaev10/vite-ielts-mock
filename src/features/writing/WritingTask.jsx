import React from "react";
import GlassCard from "../../components/layout/GlassCard";

const WritingTask = ({ data }) => {
  if (!data) return null;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#007AFF", marginBottom: "10px" }}>{data.title}</h2>
      <p style={{ fontStyle: "italic", color: "#666", marginBottom: "20px" }}>
        {data.instruction}
      </p>
      <div
        style={{
          background: "rgba(0,0,0,0.02)",
          padding: "20px",
          borderRadius: "12px",
          lineHeight: "1.6",
          fontSize: "1.1rem",
        }}
      >
        {data.prompt}
      </div>
    </div>
  );
};

export default WritingTask;
