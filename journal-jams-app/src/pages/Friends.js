import React, { useEffect, useState } from 'react';
import './Pages.css';
import NavBar from "../Components/NewNavbar/Navbar";
import { Box, Button, Typography} from '@mui/material';
import Modal from 'react-modal';


const Friends = () => {  
  const [newEntryFlag, setNewEntryFlag] = useState(false);

  function openModal() {
    setNewEntryFlag(true);
  }

  function closeModal() {
    setNewEntryFlag(false);
    window.location.reload(true);
  }

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
          <Button variant="outlined" className="new-entry-button" onClick={openModal} style={{ marginTop: '10px', marginRight: '10px' }}>Add Friend</Button>
          <Button variant="outlined" onClick={toggleFriends} style={{ marginTop: '10px' }}>
            {showFriends ? 'Hide Friends' : 'Show Friends'}
          </Button>
        </Box>
        <Modal
          isOpen={newEntryFlag}
          ariaHideApp={false}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
        >
          <Typography variant="h4" gutterBottom> Add Friend </Typography>
          {/*  Change to add friends
            <form id="new-entry-form" action='http://localhost:1234/api/newEntry' method="POST">
            <Box mb={2}>
              <InputLabel className="modal-labels" htmlFor="exampleInputPassword1">Title</InputLabel>
              <TextField id="title" name="title" variant="outlined" fullWidth />
            </Box>
            <Box mb={2}>
              <InputLabel className="modal-labels" htmlFor="exampleInputPassword1">Entry</InputLabel>
              <TextField id="entry" name="entry" fullWidth multiline rows={20} />
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <Button variant="outlined" style={{ marginTop: '10px', marginRight: '10px' }} onClick={closeModal}>Close</Button>
              <Button variant="outlined" style={{ marginTop: '10px', marginRight: '10px' }} type="submit">Submit</Button>
            </Box>
          </form> */}
        </Modal>
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
