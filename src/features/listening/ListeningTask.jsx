import React from "react";

const ListeningTask = ({ data, userAnswers, onAnswerChange }) => {
  if (!data || !data.questions) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
      {data.questions.map((q) => (
        <div
          key={q.id}
          id={`question-${q.id}`}
          style={{
            padding: "20px",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}
          >
            <span
              style={{
                background: "#007AFF",
                color: "white",
                borderRadius: "50%",
                width: "24px",
                height: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                flexShrink: 0,
                marginTop: "2px",
              }}
            >
              {q.id}
            </span>

            <div style={{ flex: 1 }}>
              {q.question && (
                <p style={{ marginBottom: "12px", fontWeight: "500" }}>
                  {q.question}
                </p>
              )}

              {q.type === "input" ? (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  {q.label && <span>{q.label}</span>}
                  <input
                    type="text"
                    value={userAnswers[q.id] || ""}
                    onChange={(e) => onAnswerChange(q.id, e.target.value)}
                    style={{
                      border: "none",
                      borderBottom: "2px solid #ddd",
                      padding: "5px 10px",
                      outline: "none",
                      width: "100%",
                      maxWidth: "300px",
                      fontSize: "16px",
                    }}
                    placeholder="Write your answer..."
                  />
                </div>
              ) : q.type === "radio" ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {q.options.map((option) => (
                    <label
                      key={option}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        checked={userAnswers[q.id] === option}
                        onChange={() => onAnswerChange(q.id, option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              ) : q.type === "checkbox" ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {q.options.map((option) => {
                    const currentAnswers = Array.isArray(userAnswers[q.id])
                      ? userAnswers[q.id]
                      : [];
                    const isChecked = currentAnswers.includes(option);
                    return (
                      <label
                        key={option}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          cursor: "pointer",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            let newAnswers = [...currentAnswers];
                            if (e.target.checked) {
                              if (
                                !q.maxSelect ||
                                newAnswers.length < q.maxSelect
                              ) {
                                newAnswers.push(option);
                              }
                            } else {
                              newAnswers = newAnswers.filter(
                                (a) => a !== option,
                              );
                            }
                            onAnswerChange(q.id, newAnswers);
                          }}
                        />
                        {option}
                      </label>
                    );
                  })}
                </div>
              ) : q.type === "select" ? (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  {q.label && <span>{q.label}</span>}
                  <select
                    value={userAnswers[q.id] || ""}
                    onChange={(e) => onAnswerChange(q.id, e.target.value)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                      outline: "none",
                      fontSize: "16px",
                      background: "rgba(255, 255, 255, 0.5)",
                      backdropFilter: "blur(10px)",
                      cursor: "pointer",
                    }}
                  >
                    <option value="">Select an option...</option>
                    {q.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListeningTask;
