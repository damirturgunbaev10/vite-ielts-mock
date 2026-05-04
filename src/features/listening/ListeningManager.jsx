import React from "react";
import ListeningTask from "./ListeningTask";

const ListeningManager = ({
  data,
  currentPart,
  userAnswers,
  onAnswerChange,
}) => {
  const currentPartData = data.parts[currentPart];

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "0 20px 100px 20px",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          padding: "15px",
          borderRadius: "15px",
          border: "1px solid #eee",
          position: "sticky",
          top: "20px",
          zIndex: 10,
          marginBottom: "30px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
        }}
      >
        <h4 style={{ marginBottom: "10px", color: "#333" }}>Listening Audio</h4>
        <audio controls style={{ width: "100%" }}>
          <source src={data.audioUrl} type="audio/mpeg" />
        </audio>
      </div>

      <div style={{ animation: "fadeIn 0.5s ease" }}>
        <h2 style={{ marginBottom: "10px", color: "#007AFF" }}>
          {currentPartData.title}
        </h2>
        {currentPartData.instruction && (
          <p
            style={{ color: "#666", fontStyle: "italic", marginBottom: "25px" }}
          >
            {currentPartData.instruction}
          </p>
        )}

        <ListeningTask
          data={currentPartData}
          userAnswers={userAnswers}
          onAnswerChange={onAnswerChange}
        />
      </div>
    </div>
  );
};

export default ListeningManager;
