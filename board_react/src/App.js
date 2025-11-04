import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ScrollToTop from "./components/common/ScrollTop";
import MainLayout from "./components/common/MainLayout";
import BoardList from "./components/boards/BosrdList";
import BoardDetail from "./components/boards/BoardDetail";
import BoardWrite from "./components/boards/BoardWrite";
import BoardEdit from "./components/boards/BoardEdit";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainLayout>
          <ScrollToTop>
            <Routes>
              <Route path="/" element={<Navigate replace to="/login" />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/boards" element={<BoardList />} />
              <Route path="/boards/:id" element={<BoardDetail />} />
              <Route path="/boards/new" element={<BoardWrite />} />
              <Route path="/boards/:id/edit" element={<BoardEdit />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </ScrollToTop>
        </MainLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;
