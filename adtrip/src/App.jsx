import './App.css'
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/Login/LoginPage';
import NavBar from './components/NavBar/NavBar';
import DummyCards from './components/Cards/CardsList';
import SiteList from './components/SiteList/SiteList';
import EventSection from './components/Events/EventSection';
import SearchBar from './components/Search/Search';
import SignUpPage from './pages/SignUp/SignUp';
function App() {
  return (
    <>
      <div>
        {/* <LoginPage/> */}
        {/* <HomePage/> */}
        {/* <SearchBar /> */}
        <SignUpPage />
        {/* <SiteList /> */}
        {/* <NavBar/> */}
        {/*<DummyCards></DummyCards> */}
        {/* <EventSection /> */}
       </div>
    </>
  )
}

export default App
