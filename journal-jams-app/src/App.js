import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/user.context";
import Navbar from './Components/Navbar';
import Home from "./pages/Home.page";
import Login from "./pages/Login.page";
import Friends from './pages_2/Friends';
import Profile from './pages_2/Profile';
import MyEntries from './pages_2/index';
import PrivateRoute from "./pages/PrivateRoute.page";
import Signup from "./pages/Signup.page";
import NoPage from './pages_2/NoPage';
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
          {/* <Navbar /> */}
          <Route exact path="/" element={<Home />} />
          <Route path='/myentries' element={<MyEntries/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/friends' element={<Friends/>} />
          <Route path="*" element={<NoPage />} />
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
