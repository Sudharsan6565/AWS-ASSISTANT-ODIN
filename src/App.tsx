import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDashboardStore } from './zustandStore';
import LoginPage from './pages/Login';
import Home from './pages/Home';

const App = () => {
  const { isAuthenticated } = useDashboardStore();

  return (
    <Router>
      <Routes>
        {/* Default route: redirect based on auth */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />

        {/* Login route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Dashboard route */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />

        {/* Catch-all: redirect unknown paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;

