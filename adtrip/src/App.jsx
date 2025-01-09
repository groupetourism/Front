import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router and Routes
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/Login/LoginPage';
import SignUpPage from './pages/SignUp/SignUp';
import DetailsPage from './pages/Details/DetailsPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define your routes */}
        <Route path="/" element={<HomePage/>} /> {/* Home page */}
        <Route path="/signup" element={<SignUpPage />} /> {/* Sign-up page */}
        <Route path="/login" element={<LoginPage />} /> {/* Login page */}
        <Route path="/sites/:id" element={<DetailsPage/>} />
      </Routes>
    </Router>
  );
}

export default App;