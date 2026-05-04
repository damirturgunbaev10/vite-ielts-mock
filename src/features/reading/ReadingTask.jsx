import React from "react";

const radioLabel = (selected) => ({
  display: "flex",
  alignItems: "center",
  padding: "10px 14px",
  borderRadius: "8px",
  background: selected ? "rgba(0, 122, 255, 0.08)" : "transparent",
  border: selected ? "1px solid #007AFF" : "1px solid rgba(0,0,0,0.08)",
  cursor: "pointer",
  fontSize: "15px",
  transition: "all 0.15s ease",
});

const questionWrapper = {
  marginBottom: "28px",
};

const questionNumberBadge = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#007AFF",
  color: "white",
  borderRadius: "50%",
  width: "26px",
  height: "26px",
  fontSize: "12px",
  fontWeight: "700",
  flexShrink: 0,
  marginRight: "10px",
};

const TFNQuestion = ({ q, userAnswers, onAnswerChange }) => (
  <div style={questionWrapper} id={`question-${q.id}`}>
    <p style={{ marginBottom: "12px", lineHeight: "1.6" }}>
      <span style={questionNumberBadge}>{q.id}</span>
      {q.questionText}
    </p>
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {["TRUE", "FALSE", "NOT GIVEN"].map((opt) => (
        <label key={opt} style={radioLabel(userAnswers[q.id] === opt)}>
          <input
            type="radio"
            name={`question-${q.id}`}
            value={opt}
            checked={userAnswers[q.id] === opt}
            onChange={() => onAnswerChange(q.id, opt)}
            style={{ marginRight: "10px", accentColor: "#007AFF" }}
          />
          {opt}
        </label>
      ))}
    </div>
  </div>
);

const YNNQuestion = ({ q, userAnswers, onAnswerChange }) => (
  <div style={questionWrapper} id={`question-${q.id}`}>
    <p style={{ marginBottom: "12px", lineHeight: "1.6" }}>
      <span style={questionNumberBadge}>{q.id}</span>
      {q.questionText}
    </p>
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {["YES", "NO", "NOT GIVEN"].map((opt) => (
        <label key={opt} style={radioLabel(userAnswers[q.id] === opt)}>
          <input
            type="radio"
            name={`question-${q.id}`}
            value={opt}
            checked={userAnswers[q.id] === opt}
            onChange={() => onAnswerChange(q.id, opt)}
            style={{ marginRight: "10px", accentColor: "#007AFF" }}
          />
          {opt}
        </label>
      ))}
    </div>
  </div>
);

/** Multiple Choice (A / B / C / D) */
const MCQQuestion = ({ q, userAnswers, onAnswerChange }) => (
  <div style={questionWrapper} id={`question-${q.id}`}>
    <p style={{ marginBottom: "12px", lineHeight: "1.6" }}>
      <span style={questionNumberBadge}>{q.id}</span>
      {q.questionText}
    </p>
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {q.options.map((opt) => (
        <label key={opt} style={radioLabel(userAnswers[q.id] === opt)}>
          <input
            type="radio"
            name={`question-${q.id}`}
            value={opt}
            checked={userAnswers[q.id] === opt}
            onChange={() => onAnswerChange(q.id, opt)}
            style={{ marginRight: "10px", accentColor: "#007AFF" }}
          />
          {opt}
        </label>
      ))}
    </div>
  </div>
);

const FillBlankQuestion = ({ q, userAnswers, onAnswerChange }) => {
  const parts = (q.questionText || "").split("__________");
  return (
    <div style={questionWrapper} id={`question-${q.id}`}>
      <p style={{ lineHeight: "1.9", fontSize: "15px" }}>
        <span style={questionNumberBadge}>{q.id}</span>
        {parts[0]}
        <input
          type="text"
          value={userAnswers[q.id] || ""}
          onChange={(e) => onAnswerChange(q.id, e.target.value)}
          placeholder="answer"
          style={{
            border: "none",
            borderBottom: "2px solid #007AFF",
            padding: "2px 8px",
            outline: "none",
            fontSize: "15px",
            minWidth: "120px",
            maxWidth: "220px",
            background: "transparent",
            color: "#007AFF",
            fontWeight: "600",
            marginInline: "4px",
          }}
        />
        {parts[1] || ""}
      </p>
    </div>
  );
};

const MatchingHeadingsQuestion = ({
  q,
  sharedOptions,
  userAnswers,
  onAnswerChange,
}) => (
  <div style={questionWrapper} id={`question-${q.id}`}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        flexWrap: "wrap",
      }}
    >
      <span style={questionNumberBadge}>{q.id}</span>
      <span style={{ fontWeight: "600", minWidth: "110px", fontSize: "15px" }}>
        {q.questionText}
      </span>
      <select
        value={userAnswers[q.id] || ""}
        onChange={(e) => onAnswerChange(q.id, e.target.value)}
        style={{
          flex: 1,
          minWidth: "220px",
          padding: "10px 12px",
          borderRadius: "8px",
          border: userAnswers[q.id] ? "1px solid #007AFF" : "1px solid #ddd",
          background: userAnswers[q.id] ? "rgba(0,122,255,0.05)" : "white",
          fontSize: "14px",
          color: "#333",
          cursor: "pointer",
          outline: "none",
        }}
      >
        <option value="">— Select a heading —</option>
        {sharedOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  </div>
);

const MatchingQuestion = ({
  q,
  sharedOptions,
  userAnswers,
  onAnswerChange,
}) => (
  <div style={questionWrapper} id={`question-${q.id}`}>
    <p style={{ marginBottom: "10px", lineHeight: "1.6" }}>
      <span style={questionNumberBadge}>{q.id}</span>
      {q.questionText}
    </p>
    <select
      value={userAnswers[q.id] || ""}
      onChange={(e) => onAnswerChange(q.id, e.target.value)}
      style={{
        width: "100%",
        maxWidth: "380px",
        padding: "10px 12px",
        borderRadius: "8px",
        border: userAnswers[q.id] ? "1px solid #007AFF" : "1px solid #ddd",
        background: userAnswers[q.id] ? "rgba(0,122,255,0.05)" : "white",
        fontSize: "14px",
        color: "#333",
        cursor: "pointer",
        outline: "none",
        display: "block",
      }}
    >
      <option value="">— Select —</option>
      {sharedOptions.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const renderQuestion = (q, group, userAnswers, onAnswerChange) => {
  const sharedOptions = group?.sharedOptions || [];
  switch (q.type) {
    case "TFN":
      return (
        <TFNQuestion
          key={q.id}
          q={q}
          userAnswers={userAnswers}
          onAnswerChange={onAnswerChange}
        />
      );
    case "YNN":
      return (
        <YNNQuestion
          key={q.id}
          q={q}
          userAnswers={userAnswers}
          onAnswerChange={onAnswerChange}
        />
      );
    case "MCQ":
      return (
        <MCQQuestion
          key={q.id}
          q={q}
          userAnswers={userAnswers}
          onAnswerChange={onAnswerChange}
        />
      );
    case "FillBlank":
      return (
        <FillBlankQuestion
          key={q.id}
          q={q}
          userAnswers={userAnswers}
          onAnswerChange={onAnswerChange}
        />
      );
    case "MatchingHeadings":
      return (
        <MatchingHeadingsQuestion
          key={q.id}
          q={q}
          sharedOptions={sharedOptions}
          userAnswers={userAnswers}
          onAnswerChange={onAnswerChange}
        />
      );
    case "Matching":
      return (
        <MatchingQuestion
          key={q.id}
          q={q}
          sharedOptions={sharedOptions}
          userAnswers={userAnswers}
          onAnswerChange={onAnswerChange}
        />
      );
    default:
      return (
        <TFNQuestion
          key={q.id}
          q={q}
          userAnswers={userAnswers}
          onAnswerChange={onAnswerChange}
        />
      );
  }
};

const GroupHeader = ({ group }) => {
  const first = group.questionIds[0];
  const last = group.questionIds[group.questionIds.length - 1];

  return (
    <div
      style={{
        marginBottom: "20px",
        paddingBottom: "16px",
        borderBottom: "2px solid #007AFF",
      }}
    >
      <p
        style={{
          fontWeight: "700",
          fontSize: "15px",
          color: "#007AFF",
          marginBottom: "6px",
        }}
      >
        Questions {first}–{last}
      </p>
      <p
        style={{
          color: "#444",
          lineHeight: "1.6",
          fontSize: "14px",
          fontStyle: "italic",
        }}
      >
        {group.instruction}
      </p>

      {group.sharedOptions && group.sharedOptions.length > 0 && (
        <div
          style={{
            marginTop: "14px",
            padding: "14px 16px",
            background: "#f0f6ff",
            borderRadius: "10px",
            border: "1px solid #cce0ff",
          }}
        >
          <p
            style={{
              fontWeight: "700",
              marginBottom: "10px",
              fontSize: "13px",
              color: "#007AFF",
            }}
          >
            {group.groupType === "MatchingHeadings"
              ? "List of Headings"
              : "List of Options"}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {group.sharedOptions.map((opt) => (
              <span
                key={opt}
                style={{ fontSize: "13px", color: "#333", lineHeight: "1.5" }}
              >
                {opt}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ReadingTask = ({ data, userAnswers, onAnswerChange }) => {
  if (!data || !data.questions) return null;

  const questionMap = {};
  data.questions.forEach((q) => {
    questionMap[q.id] = q;
  });

  const hasGroups =
    Array.isArray(data.questionGroups) && data.questionGroups.length > 0;

  return (
    <div className="reading-tasks">
      {hasGroups ? (
        data.questionGroups.map((group, gi) => (
          <div
            key={gi}
            style={{
              marginBottom: "40px",
              paddingBottom: "10px",
              borderBottom:
                gi < data.questionGroups.length - 1 ? "1px solid #eee" : "none",
            }}
          >
            <GroupHeader group={group} />
            {group.questionIds.map((qid) => {
              const q = questionMap[qid];
              if (!q) return null;
              return renderQuestion(q, group, userAnswers, onAnswerChange);
            })}
          </div>
        ))
      ) : (
        <>
          <h3 style={{ marginBottom: "20px" }}>
            Questions 1–{data.questions.length}
          </h3>
          {data.questions.map((q) =>
            renderQuestion(q, null, userAnswers, onAnswerChange),
          )}
        </>
      )}
    </div>
  );
};

export default ReadingTask;
