import './App.css'
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/Login/LoginPage';
import NavBar from './components/NavBar/NavBar';
import DummyCards from './components/Cards/DummyCard';
import SiteList from './components/SiteList/SiteList';
import EventSection from './components/Events/EventSection';
import SearchBar from './components/Search/Search';
function App() {
  return (
    <>
      <div>
        {/* <LoginPage/> */}
        <HomePage/>
        {/* <SearchBar /> */}
        {/* <SiteList /> */}
        {/* <NavBar/> */}
        {/*<DummyCards></DummyCards> */}
        {/* <EventSection /> */}
       </div>
    </>
  )
}

export default App
