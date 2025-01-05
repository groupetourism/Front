import './App.css'
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/Login/LoginPage';
import NavBar from './components/NavBar/NavBar';
import DummyCards from './components/Cards/DummyCard';
import SiteList from './components/SiteList/SiteList';
function App() {
  return (
    <>
      <div>
        {/* <LoginPage/> */}
        <HomePage/>
        {/* <SiteList /> */}
        {/* <NavBar/>
        <DummyCards></DummyCards> */}
       </div>
    </>
  )
}

export default App
