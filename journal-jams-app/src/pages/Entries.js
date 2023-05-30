import React from 'react';
import NavBar from "../Components/NewNavbar/Navbar"
import { Box, Button } from '@mui/material';

const Entries = () => {
  return (
    <>
      <NavBar />
      <Box className="my-entries-wrapper">
        <Box className="new-entry-button-container">
          <Button className="new-entry-button">New Entry</Button>
        </Box>
        <Box className="my-entries-container">
          {/* Holds the entries of the user */}
        </Box>
      </Box>
    </>
  );
};

export default Entries;
