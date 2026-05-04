import React from "react";

const ReadingContent = ({ data }) => {
  if (!data) return null;

  return (
    <div className="reading-content">
      <h2 style={{ marginBottom: "10px", color: "#1a1a1a" }}>{data.title}</h2>
      <h4 style={{ marginBottom: "20px", color: "#666" }}>{data.subtitle}</h4>

      {data.paragraphs.map((para) => (
        <p
          key={para.id}
          style={{
            marginBottom: "1.5rem",
            lineHeight: "1.6",
            fontSize: "1.1rem",
            textAlign: "justify",
          }}
        >
          <strong style={{ marginRight: "10px" }}>{para.id}</strong>
          {para.text}
        </p>
      ))}
    </div>
  );
};

export default ReadingContent;
