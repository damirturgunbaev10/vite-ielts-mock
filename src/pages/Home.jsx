import React from "react";
import { Link } from "react-router-dom";
import GlassCard from "../components/layout/GlassCard";

const Home = () => {
  return (
    <div
      style={{
        padding: "100px 20px",
        maxWidth: "800px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h1 style={{ marginBottom: "40px" }}>IELTS Mock Platform</h1>
      <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
        <Link to="/test/reading" style={{ flex: 1 }}>
          <GlassCard
            style={{ cursor: "pointer", transition: "transform 0.2s" }}
          >
            <h2>Reading</h2>
          </GlassCard>
        </Link>
        <Link to="/test/listening" style={{ flex: 1 }}>
          <GlassCard
            style={{ cursor: "pointer", transition: "transform 0.2s" }}
          >
            <h2>Listening</h2>
          </GlassCard>
        </Link>
        <Link to="/test/writing" style={{ flex: 1 }}>
          <GlassCard
            style={{ cursor: "pointer", transition: "transform 0.2s" }}
          >
            <h2>Writing</h2>
          </GlassCard>
        </Link>
      </div>
    </div>
  );
};

export default Home;
