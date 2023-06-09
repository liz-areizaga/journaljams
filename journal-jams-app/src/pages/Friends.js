import React from 'react';
import './Pages.css';
import NavBar from "../Components/NewNavbar/Navbar"
import { Box, Button } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
// import {main} from '../pages_2/SpotifyNLP.js';

const Friends = () => {
  const [entriesList, setEntriesList] = useState([
  {
  title: "",
      text: "",
      mood: "" 
    }
  ]);

  useEffect(() => {
    fetch('/api/allEntries', {method:"GET"})
      .then(response => response.json())
      .then((jsonRes) => setEntriesList(jsonRes))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <NavBar />
      <Box className="my-friends-wrapper">
		<Box>
			<Button> Add Friend </Button> 
		</Box>
        <Box className="my-friends-container">
          {/* Holds the friends of the user and search bar for sending friend requests */}
          {entriesList.map((entry, i) => (
            <li key={i}> <p> {entry.title} <br/> {entry.text} </p> </li>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Friends;
