import React from "react";

const QuestionNav = ({
  parts,
  currentPartIndex,
  onPartChange,
  userAnswers,
  isFinished,
}) => {
  const scrollToQuestion = (id) => {
    const element = document.getElementById(`question-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const getButtonStatus = (q, isAnswered) => {
    if (!isFinished) {
      return {
        bg: isAnswered ? "#007AFF" : "transparent",
        color: isAnswered ? "#fff" : "#007AFF",
        border: "1px solid #007AFF",
      };
    }

    const isCorrect = userAnswers[q.id] === q.correctAnswer;
    return {
      bg: isCorrect ? "#4CD964" : "#FF3B30",
      color: "#fff",
      border: "none",
    };
  };

  return (
    <footer
      style={{
        padding: "15px 20px",
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)",
        borderTop: "1px solid #ddd",
        display: "flex",
        alignItems: "center",
        gap: "15px",
        height: "55px",
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: 100,
      }}
    >
      {parts.map((part, pIndex) => (
        <div
          key={pIndex}
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <button
            onClick={() => onPartChange(pIndex)}
            style={{
              border: "none",
              background:
                currentPartIndex === pIndex
                  ? "rgba(0, 122, 255, 0.1)"
                  : "transparent",
              fontWeight: "bold",
              cursor: "pointer",
              padding: "8px 12px",
              borderRadius: "8px",
              color: currentPartIndex === pIndex ? "#007AFF" : "#666",
            }}
          >
            Part {part.partNumber}
          </button>

          {currentPartIndex === pIndex && (
            <div style={{ display: "flex", gap: "6px" }}>
              {part.questions?.map((q) => {
                const isAnswered = !!userAnswers[q.id];
                const status = getButtonStatus(q, isAnswered);

                return (
                  <button
                    key={q.id}
                    onClick={() => scrollToQuestion(q.id)}
                    title={isFinished ? `Correct: ${q.correctAnswer}` : ""}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "6px",
                      border: status.border,
                      background: status.bg,
                      color: status.color,
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {q.id}
                  </button>
                );
              })}
            </div>
          )}
          {pIndex < parts.length - 1 && (
            <div style={{ width: "1px", height: "24px", background: "#eee" }} />
          )}
        </div>
      ))}
    </footer>
  );
};

export default QuestionNav;
