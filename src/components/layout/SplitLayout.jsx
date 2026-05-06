import React, { useState, useRef, useEffect } from "react";

const SplitLayout = ({
  leftPanel,
  rightPanel,
  initialLeftWidth = 50,
}) => {
  const [leftWidth, setLeftWidth] = useState(initialLeftWidth);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const startResizing = (e) => {
    setIsDragging(true);
  };

  const stopResizing = () => {
    setIsDragging(false);
  };

  const resize = (e) => {
    if (isDragging && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth =
        ((e.clientX - containerRect.left) / containerRect.width) * 100;

      if (newWidth > 10 && newWidth < 90) {
        setLeftWidth(newWidth);
      }
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", resize);
      window.addEventListener("mouseup", stopResizing);
    } else {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    }

    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        height: "calc(100vh - 80px)",
        width: "100%",
        padding: "0 20px 20px 20px",
        boxSizing: "border-box",
        userSelect: isDragging ? "none" : "auto",
        cursor: isDragging ? "col-resize" : "default",
        background: "transparent",
      }}
    >
      <div
        style={{
          width: `${leftWidth}%`,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {leftPanel}
      </div>

      <div
        onMouseDown={startResizing}
        style={{
          width: "8px",
          cursor: "col-resize",
          backgroundColor: isDragging ? "#007bff" : "transparent",
          transition: "background-color 0.2s",
          margin: "0 4px",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "2px",
            height: "100px",
            backgroundColor: "#ccc",
            borderRadius: "2px",
          }}
        />
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {rightPanel}
      </div>
    </div>
  );
};

export default SplitLayout;