import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router and Routes
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/Login/LoginPage';
import SignUpPage from './pages/SignUp/SignUp';
import DetailsPage from './pages/Details/DetailsPage';
import EventPage from './pages/Event/EventPage';
import EventDetailsPage from './pages/Details/EventDetailsPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define your routes */}
        <Route path="/" element={<HomePage/>} /> {/* Home page */}
        <Route path="/signup" element={<SignUpPage />} /> {/* Sign-up page */}
        <Route path="/login" element={<LoginPage />} /> {/* Login page */}
        <Route path="/details/:type/:id" element={<DetailsPage/>} />
        <Route path="/events" element={<EventPage/>} />
        <Route path="/eventdetails/:events/:id" element={<EventDetailsPage/>} />
      </Routes>
    </Router>
  );
}

export default App;