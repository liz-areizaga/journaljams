import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './Pages';
import Friends from './Pages/Friends';
import Profile from './Pages/Profile';
import MyEntries from './Pages/index';
import NoPage from './Pages/NoPage';
  
function App() {
return (
    <Router>
    <Navbar />
    <Routes>
        <Route exact path='/' exact element={<Home />} />
        <Route path='/myentries' element={<MyEntries/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/friends' element={<Friends/>} />
        <Route path="*" element={<NoPage />} />
    </Routes>
    </Router>
);
}
  
export default App;