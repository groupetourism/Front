import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router and Routes
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/Login/LoginPage';
import SignUpPage from './pages/SignUp/SignUp';
import DetailsPage from './pages/Details/DetailsPage';
import EventPage from './pages/Event/EventPage';
import EventDetailsPage from './pages/Details/EventDetailsPage';
import MapPage from './pages/Map/MapPage';
import UserProfilePage from './pages/User/UserProfilePage';
import { UserProvider } from './context/AuthContext'; // Adjust the path as needed
import TourPlanPage from './pages/Tour/TourplanPage';
import ViewingPage from './pages/AllView/ViewAll';
import ContactUsPage from './pages/ContactUs/ContactUs';
import AllAccommodationsPage from './pages/AllView/ViewAllAccomodations';
function App() {
  return (
    <Router>
      <UserProvider> {/* Add this line */}
        <Routes>
          {/* Define your routes */}
          <Route path="/" element={<HomePage />} /> {/* Home page */}
          <Route path="/signup" element={<SignUpPage />} /> {/* Sign-up page */}
          <Route path="/login" element={<LoginPage />} /> {/* Login page */}
          <Route path="/details/:type/:id" element={<DetailsPage />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/eventdetails/:events/:id" element={<EventDetailsPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/plans" element={<TourPlanPage />} />
          <Route path="/all-sites" element={<ViewingPage/>} />
          <Route path="/all-accommodations" element={<AllAccommodationsPage/>} />
          <Route path="/map" element={<MapPage/>} />
          <Route path="/contact" element={<ContactUsPage/>} />
          <Route path="/sign-up" element={<SignUpPage/>} />
        </Routes>
      </UserProvider> {/* Add this line */}
    </Router>
  );
}
export default App;