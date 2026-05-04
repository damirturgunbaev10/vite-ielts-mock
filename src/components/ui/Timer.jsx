import React, { useState, useEffect } from "react";

const Timer = ({ initialMinutes, onTimeUp }) => {
  const [seconds, setSeconds] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    setSeconds(initialMinutes * 60);
  }, [initialMinutes]);

  useEffect(() => {
    let interval = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
      onTimeUp();
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, onTimeUp]);

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleReset = () => {
    setIsActive(false);
    setSeconds(initialMinutes * 60);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <button
        onClick={() => setIsActive(!isActive)}
        style={{
          background: isActive ? "#FF9500" : "#34C759",
          color: "white",
          border: "none",
          borderRadius: "6px",
          padding: "5px 10px",
          cursor: "pointer",
          fontSize: "12px",
          fontWeight: "bold",
        }}
      >
        {isActive ? "PAUSE" : "RESUME"}
      </button>

      <button
        onClick={handleReset}
        style={{
          background: "#8E8E93",
          color: "white",
          border: "none",
          borderRadius: "6px",
          padding: "5px 10px",
          cursor: "pointer",
          fontSize: "12px",
          fontWeight: "bold",
        }}
      >
        RESET
      </button>

      <div
        style={{
          background: seconds < 300 ? "#FF3B30" : "#1C1C1E",
          color: "#fff",
          padding: "6px 14px",
          borderRadius: "8px",
          fontFamily: "monospace",
          fontSize: "1.1rem",
          fontWeight: "bold",
          minWidth: "70px",
          textAlign: "center",
          transition: "background 0.3s",
        }}
      >
        {formatTime(seconds)}
      </div>
    </div>
  );
};

export default Timer;
