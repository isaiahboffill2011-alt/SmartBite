import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import Dashboard from './pages/Dashboard.jsx';

const requireAuth = (element) => {
  try {
    const u = localStorage.getItem('sb_user');
    if (!u) return <Navigate to="/login" replace />;
    return element;
  } catch (e) {
    return <Navigate to="/login" replace />;
  }
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />
      <Route path="/dashboard" element={requireAuth(<Dashboard />)} />
    </Routes>
  );
}

export default App;
