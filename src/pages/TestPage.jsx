import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { SplitLayout } from "../components/layout/SplitLayout";
import { GlassCard } from "../components/ui/GlassCard";

import ReadingContent from "../features/reading/ReadingContent";
import ReadingTask from "../features/reading/ReadingTask";
import WritingTask from "../features/writing/WritingTask";
import WritingEditor from "../features/writing/WritingEditor";
import ListeningManager from "../features/listening/ListeningManager";
import QuestionNav from "../components/layout/QuestionNav";
import Timer from "../components/ui/Timer";

const TestPage = () => {
  const { type } = useParams();
  const [testData, setTestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [currentPart, setCurrentPart] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [userName, setUserName] = useState("");
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await import(`../data/${type}-1.json`);
        setTestData(data.default);
      } catch (e) {
        console.error("Download error:", e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [type]);

  const sendToTelegram = async (userAnswers) => {
    const BOT_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN";
    const CHAT_ID = "YOUR_TELEGRAM_CHAT_ID";

    let message = `<b>📊 Your answer: ${userName}</b>\n`;
    message += `<code>--------------------------</code>\n`;
    message += `<b>Modul:</b> ${type.toUpperCase()}\n`;
    message += `<b>Time finished:</b> ${new Date().toLocaleTimeString()}\n`;
    message += `<code>--------------------------</code>\n\n`;

    if (type === "writing") {
      message += `<b>📝 Esse text:</b>\n\n`;
      Object.entries(userAnswers).forEach(([taskId, text]) => {
        const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
        message += `<b>${taskId.toUpperCase()}:</b>\n<code>${text}</code>\n`;
        message += `<i>(Слов: ${wordCount})</i>\n\n`;
      });
    } else {
      testData.parts.forEach((part) => {
        message += `<b>📍 Part ${part.partNumber}</b>\n`;
        part.questions.forEach((q) => {
          const answer = userAnswers[q.id] || "Нет ответа";
          message += `${q.id}. <code>${answer}</code>\n`;
        });
        message += `\n`;
      });
    }

    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: "HTML",
        }),
      });
      setIsFinished(true);
    } catch (e) {
      alert("Ошибка отправки. Пожалуйста, попробуйте еще раз.");
    }
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  if (loading)
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>Loading...</div>
    );

  if (!isStarted) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f0f2f5",
        }}
      >
        <GlassCard
          style={{
            padding: "40px",
            textAlign: "center",
            maxWidth: "400px",
            width: "90%",
          }}
        >
          <h2 style={{ marginBottom: "10px" }}>IELTS {type.toUpperCase()}</h2>
          <p style={{ color: "#666", marginBottom: "25px" }}>
            Please enter your name to start the test.
          </p>
          <input
            type="text"
            placeholder="Your Full Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              width: "100%",
              fontSize: "16px",
              outline: "none",
            }}
          />
          <button
            disabled={!userName.trim()}
            onClick={() => setIsStarted(true)}
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "12px",
              background: userName.trim() ? "#007AFF" : "#ccc",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Start Test
          </button>
        </GlassCard>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f0f2f5",
        }}
      >
        <GlassCard
          style={{ padding: "50px", textAlign: "center", maxWidth: "500px" }}
        >
          <div style={{ fontSize: "50px", marginBottom: "20px" }}>✅</div>
          <h2 style={{ marginBottom: "15px" }}>Test Submitted!</h2>
          <p style={{ color: "#666", lineHeight: "1.6" }}>
            Thank you, <b>{userName}</b>. Your answers will be sent to teacher
            for the checking.
          </p>
          <Link
            to="/"
            style={{
              display: "inline-block",
              marginTop: "30px",
              padding: "10px 25px",
              background: "#007AFF",
              color: "white",
              textDecoration: "none",
              borderRadius: "8px",
              fontWeight: "500",
            }}
          >
            Back to Home
          </Link>
        </GlassCard>
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <header
        style={{
          padding: "10px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid #eee",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Link
            to="/"
            style={{ textDecoration: "none", color: "#666", fontWeight: "500" }}
          >
            ← Exit
          </Link>
          <span style={{ fontWeight: "600", color: "#333" }}>
            IELTS {type.toUpperCase()}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
          <Timer
            initialMinutes={testData?.timeLimitMinutes || 60}
            onTimeUp={() => sendToTelegram(answers)}
          />
          <button
            onClick={() => {
              if (window.confirm("Finish and submit answers?"))
                sendToTelegram(answers);
            }}
            style={{
              padding: "8px 20px",
              background: "#34C759",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Submit Test
          </button>
        </div>
      </header>

      <main
        style={{
          flex: 1,
          overflowY: "auto",
          background: "#f0f2f5",
          margin: "10px",
        }}
      >
        {type === "listening" ? (
          <ListeningManager
            data={testData}
            currentPart={currentPart}
            userAnswers={answers}
            onAnswerChange={handleAnswerChange}
          />
        ) : (
          <SplitLayout
            leftPanel={
              <GlassCard style={{ height: "95%", overflowY: "auto" }}>
                {type === "reading" ? (
                  <ReadingContent data={testData.parts[currentPart]} />
                ) : (
                  <WritingTask data={testData.parts[currentPart]} />
                )}
              </GlassCard>
            }
            rightPanel={
              <GlassCard style={{ height: "95%", overflowY: "auto" }}>
                {type === "reading" ? (
                  <ReadingTask
                    data={testData.parts[currentPart]}
                    userAnswers={answers}
                    onAnswerChange={handleAnswerChange}
                  />
                ) : (
                  <WritingEditor
                    partNumber={testData.parts[currentPart].partNumber}
                    userAnswers={answers}
                    onAnswerChange={handleAnswerChange}
                  />
                )}
              </GlassCard>
            }
          />
        )}
      </main>

      {testData?.parts && (
        <QuestionNav
          parts={testData.parts}
          currentPartIndex={currentPart}
          onPartChange={setCurrentPart}
          userAnswers={answers}
          isFinished={false}
        />
      )}
    </div>
  );
};

export default TestPage;
