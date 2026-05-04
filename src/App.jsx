import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import TestPage from "./pages/TestPage";

import "./styles/global.scss";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/test/:type" element={<TestPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
