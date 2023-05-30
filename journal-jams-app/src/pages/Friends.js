import React from 'react';
import './Pages.css';
import NavBar from "../Components/NewNavbar/Navbar"
import { Box, Button } from '@mui/material';

const Friends = () => {
  return (
    <>
      <NavBar />
      <Box className="my-friends-wrapper">
		<Box>
			<Button> Add Friend </Button> 
		</Box>
        <Box className="my-friends-container">
          {/* Holds the friends of the user and search bar for sending friend requests */}
        </Box>
      </Box>
    </>
  );
};

export default Friends;
