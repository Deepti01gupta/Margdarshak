import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CompanyPage from './pages/CompanyPage';
import PreparationPage from './pages/PreparationPage';
import AlumniPage from './pages/AlumniPage';
import ChatbotPage from './pages/ChatbotPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/"          element={<LandingPage />} />
          <Route path="/login"     element={<Login />} />
          <Route path="/register"  element={<Register />} />

          {/* Protected */}
          <Route path="/dashboard"   element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/company"     element={<ProtectedRoute><CompanyPage /></ProtectedRoute>} />
          <Route path="/preparation" element={<ProtectedRoute><PreparationPage /></ProtectedRoute>} />
          <Route path="/alumni"      element={<ProtectedRoute><AlumniPage /></ProtectedRoute>} />
          <Route path="/chatbot"     element={<ProtectedRoute><ChatbotPage /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
