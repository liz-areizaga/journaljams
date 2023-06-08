import React, { useEffect, useState } from 'react';
import './Pages.css';
import NavBar from "../Components/NewNavbar/Navbar";
import { Box, Button } from '@mui/material';

const Friends = () => {
  const [entriesList, setEntriesList] = useState([
    {
      title: "",
      text: "",
      mood: ""
    }
  ]);
  const [showFriends, setShowFriends] = useState(false);

  useEffect(() => {
    fetch('/api/allEntries', { method: "GET" })
      .then(response => response.json())
      .then((jsonRes) => setEntriesList(jsonRes))
      .catch(err => console.log(err));
  }, []);

  function toggleFriends() {
    setShowFriends(!showFriends);
  }

  return (
    <>
      <NavBar />
      <Box className="my-friends-wrapper">
        <Box className="new-entry-button-container">
          <Button variant="outlined" className="new-entry-button" style={{ marginTop: '10px', marginRight: '10px' }}>Add Friend</Button>
          <Button variant="outlined" onClick={toggleFriends} style={{ marginTop: '10px' }}>
            {showFriends ? 'Hide Friends' : 'Show Friends'}
          </Button>
        </Box>
        {showFriends && (
          <Box className="my-friends-container" style={{ marginTop: '10px' }}>
            {/* Holds the friends of the user and search bar for sending friend requests */}
            {/* {entriesList.map((entry, i) => (
              <li key={i}> <p> {entry.title} <br /> {entry.text} </p> </li>
            ))} */}
          </Box>
        )}
      </Box>
    </>
  );
};

export default Friends;
