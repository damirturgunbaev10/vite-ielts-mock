import React from "react";

const WritingEditor = ({ partNumber, userAnswers, onAnswerChange }) => {
  const currentKey = `task-${partNumber}`;
  const text = userAnswers[currentKey] || "";

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <span style={{ fontWeight: "bold" }}>Your Response:</span>
        <span style={{ color: "#666" }}>
          Words: <b>{wordCount}</b>
        </span>
      </div>

      <textarea
        value={text}
        onChange={(e) => onAnswerChange(currentKey, e.target.value)}
        placeholder="Type your essay here..."
        style={{
          flex: 1,
          width: "100%",
          padding: "20px",
          borderRadius: "12px",
          border: "1px solid #ddd",
          fontSize: "16px",
          lineHeight: "1.5",
          resize: "none",
          outline: "none",
          fontFamily: "inherit",
        }}
      />
    </div>
  );
};

export default WritingEditor;
