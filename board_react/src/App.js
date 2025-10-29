import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import BoardList from "./components/BosrdList";
import BoardDetail from "./components/BoardDetail";
import BoardWrite from "./components/BoardWrite";

function App() {
  return (
    <MainLayout>
      <Router>
        <Routes>
          <Route path="/" element={<BoardList />} />
          {/* <Route path="/posts" element={<BoardList />} /> */}
          <Route path="/posts/:id" element={<BoardDetail />} />
          <Route path="/posts/new" element={<BoardWrite />} />
        </Routes>
      </Router>
    </MainLayout>
  );
}

export default App;
