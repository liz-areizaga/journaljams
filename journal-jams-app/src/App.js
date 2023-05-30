import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/user.context";
import Home from "./pages/Home.page";
import Login from "./pages/Login.page";
import Friends from './pages/Friends';
import Profile from './pages/Profile';
import Entries from './pages/Entries';
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
<<<<<<< Updated upstream
        <Route element={<PrivateRoute />}>
            <Route exact path="/" element={<Home />} />
            <Route path='/entries' element={<Entries/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/friends' element={<Friends/>} />
=======
      <Route element={<PrivateRoute />}>
          {/* <Route exact path="/" element={<Home />} /> */}
          <Route exact path="/" element={<><Navbar/><MyEntries/></>} />
          <Route path='/myentries' element={<><Navbar/><MyEntries/></>} />
          <Route path='/profile' element={<><Navbar/><Profile/></>} />
          <Route path='/friends' element={<><Navbar/><Friends/></>} />
          {/* <Route exact path='/add-entry' /> */}
          <Route path="*" element={<><Navbar/><NoPage/></>} />
>>>>>>> Stashed changes
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
