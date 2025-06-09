import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import BoardListPage from "./pages/BoardListPage";
import BoardDetailPage from "./pages/BoardDetailPage";
import BoardPage from "./pages/BoardPage";

export default function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      
      <Routes>
        <Route path="/" element={<Navigate to="/api/auth/login" replace />} />
        <Route path="/api/auth/register" element={<RegisterPage />} />
        <Route path="/api/auth/login" element={<LoginPage />} />
        <Route path="/api/boards" element={<BoardListPage />} />
        <Route path="/boards/:boardId" element={<BoardDetailPage />} />
        <Route path="/api/columns/:boardId" element={<BoardPage />} />
      </Routes>
    </Router>
  );
}