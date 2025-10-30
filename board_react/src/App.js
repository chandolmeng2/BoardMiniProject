import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollTop";
import MainLayout from "./components/MainLayout";
import BoardList from "./components/BosrdList";
import BoardDetail from "./components/BoardDetail";
import BoardWrite from "./components/BoardWrite";
import BoardEdit from "./components/BoardEdit";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <MainLayout>
      <Router>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/boards" element={<BoardList />} />
            <Route path="/boards/:id" element={<BoardDetail />} />
            <Route path="/boards/new" element={<BoardWrite />} />
            <Route path="/boards/:id/edit" element={<BoardEdit />} />
          </Routes>
        </ScrollToTop>
      </Router>
    </MainLayout>
  );
}

export default App;
