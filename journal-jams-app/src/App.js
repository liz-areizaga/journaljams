import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/user.context";
import Home from "./pages/Home.page";
import Login from "./pages/Login.page";
import Friends from './pages/Friends';
import Profile from './pages/Profile';
import Account from './pages/Account';
import Entries from './pages/Entries';
import Lobby from './pages/Lobby';
import PrivateRoute from "./pages/PrivateRoute.page";
import Signup from "./pages/Signup.page";

// import LoginPage from './login/login'


function App() {
  return (
    // <LoginPage className = "App">
    // </LoginPage>
    <BrowserRouter>
    {/* We are wrapping our whole app with UserProvider so that */}
    {/* our user is accessible through out the app from any page*/}
    <UserProvider>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        {/* We are protecting our Home Page from unauthenticated */}
        {/* users by wrapping it with PrivateRoute here. */}
        <Route element={<PrivateRoute />}>
            <Route exact path="/" element={<Home />} />
            <Route path='/entries' element={<Entries/>} />
            <Route path='/friends' element={<Friends/>} />
            <Route path='/lobby' element={<Lobby/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/Account' element={<Account/>} />
        </Route>
      </Routes>
    </UserProvider>
  </BrowserRouter>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
