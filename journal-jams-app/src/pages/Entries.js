import React, { useState , useEffect} from 'react';
import NavBar from "../Components/NewNavbar/Navbar";
import Modal from 'react-modal';
import { Box, Button, TextField, InputLabel, Typography } from '@mui/material';

const Entries = () => {
  const [newEntryFlag, setNewEntryFlag] = useState(false);
  const [showEntries, setShowEntries] = useState(false);

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

  function openModal() {
    setNewEntryFlag(true);
  }

  function closeModal() {
    setNewEntryFlag(false);
    window.location.reload(true);
  }

  function toggleEntries() {
    setShowEntries(!showEntries);
  }

  return (
    <>
      <NavBar />
      <Box className="my-entries-wrapper">
        <Box className="new-entry-button-container">
          <Button variant="outlined" className="new-entry-button" onClick={openModal} style={{ marginTop: '10px', marginRight: '10px' }}>New Entry</Button>
          <Button variant="outlined" onClick={toggleEntries} style={{ marginTop: '10px' }}>
            {showEntries ? 'Hide Entries' : 'Show Entries'}
          </Button>
        </Box>
        <Modal
          isOpen={newEntryFlag}
          ariaHideApp={false}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
        >
          <Typography variant="h4" gutterBottom> New Entry </Typography>
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
              <Button onClick={closeModal}>Close</Button>
              <Button type="submit">Submit</Button>
            </Box>
          </form>
        </Modal>
        <Box className="my-entries-container" style={{ display: showEntries ? 'block' : 'none', marginTop: '10px' }}>
          {/* Holds the entries of the user */}
          {/* {entriesList.map((entry, i) => (
            <li key={i}> <p> {entry.title} <br/> {entry.text} </p> </li>
          ))} */}
        </Box>
      </Box>
    </>
  );
};

export default Entries;
