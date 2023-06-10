import React, { useState , useEffect, useContext} from 'react';
import NavBar from "../Components/NewNavbar/Navbar";
import Modal from 'react-modal';
import { Box, Button, TextField, InputLabel, Typography, List, ListItemButton, ListItemText } from '@mui/material';
import { UserContext } from "../contexts/user.context";

const Entries = () => {
  const { fetchUser } = useContext(UserContext);
  const [newEntryFlag, setNewEntryFlag] = useState(false);
  const [showEntries, setShowEntries] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [currentUser, setCurrentUser] = useState("");
  const [entriesList, setEntriesList] = useState([
    {
        id: "",
        title: "",
        text: "",
      }
    ]);
  
  const handleFetchUser = async () => {
    try {
      const fetchedUser = await fetchUser();
      if(fetchedUser) {
        console.log("Current User:", fetchedUser.profile.email);
        setCurrentUser(fetchedUser.profile.email);
        fetch(`/api/allEntries/${fetchedUser.profile.email}`, {method:"GET"})
          .then(response => response.json())
          .then((jsonRes) => {
            const transformedEntries = jsonRes.map((entry) => ({
              id: entry._id,
              title: entry.title,
              text: entry.text,
            }));
            setEntriesList(transformedEntries);
          })
          // .then((jsonRes) => console.log(jsonRes))
          // console.log(entriesList)
          .catch(err => console.log(err));
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    handleFetchUser();
  }, []);

  const handleEntryClick = (entry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  };

  const closeEntryModal = () => {
    setIsModalOpen(false);
  };

  function openModal() {
    setNewEntryFlag(true);
  }

  function closeModal() {
    setNewEntryFlag(false);
    // window.location.reload(true);
    handleFetchUser();
  }

  function toggleEntries() {
    setShowEntries(!showEntries);
  }

  const deleteEntry = (entry) => {
    console.log("Deleting entry:", entry.id);
    fetch(`/api/deleteEntry/${entry.id}`, {method:"DELETE"})
      .then(response => response.json())
      .then((jsonRes) => {
        console.log(jsonRes);
        setEntriesList((prevEntries) =>
          prevEntries.filter((prevEntry) => prevEntry.id !== entry.id)
        );
      })
      .catch(err => console.log(err));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    fetch('/api/newEntry', {
      method: 'POST',
      body: JSON.stringify({ 
        user: currentUser,
        title: document.getElementById('title').value,
        entry: document.getElementById('entry').value,
       }),
       headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      if (response.ok) {
        console.log('Entry submitted successfully');
        closeModal();
        // Handle the response from the API
      } else {
        throw new Error('Failed to submit entry');
      }
    })
    .catch((error) => {
      console.error('Error submitting entry:', error);
      alert(error);
    });
  };  

  return (
    <>
      <NavBar />
      <Box className="my-entries-wrapper">
        <Box className="new-entry-button-container">
          <Button variant="contained" className="new-entry-button" onClick={openModal} style={{ marginTop: '10px', marginRight: '10px' }}>New Entry</Button>
          <Button variant="contained" onClick={toggleEntries} style={{ marginTop: '10px' }}>
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
          {/* <form id="new-entry-form" action='http://localhost:1234/api/newEntry' method="POST"> */}
          <form id="new-entry-form" onSubmit={onSubmit}>
            <Box mb={2}>
              <InputLabel className="modal-labels" htmlFor="exampleInputPassword1">Title</InputLabel>
              <TextField id="title" name="title" variant="outlined" fullWidth />
            </Box>
            <Box mb={2}>
              <InputLabel className="modal-labels" htmlFor="exampleInputPassword1">Entry</InputLabel>
              <TextField id="entry" name="entry" fullWidth multiline rows={20} />
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <Button variant="contained" color="error" style={{ marginTop: '10px', marginRight: '10px' }} onClick={closeModal}>Close</Button>
              <Button variant="contained" style={{ marginTop: '10px', marginRight: '10px' }} type="submit">Submit</Button>
            </Box>
          </form>
        </Modal>
        <Box className="my-entries-container" style={{ display: showEntries ? 'block' : 'none', marginTop: '10px' }}>
          <List>
            <ListItemText> 
              <Typography variant="body1" style={{ fontWeight: 'bold', marginLeft: '10px' }}>
                Title 
              </Typography>
            </ListItemText> 
            {entriesList.map((entry) => (
              <Box display="flex" alignItems="center">
                <ListItemButton key={entry.title} onClick={() => handleEntryClick(entry)}>
                  <ListItemText primary={entry.title} />
                </ListItemButton>
              <Button style={{marginLeft: '10px', marginRight: '10px'}} variant="contained" color="error" onClick={() => {deleteEntry(entry)}}> Remove </Button>              
             </Box>
            ))}      
          </List>
          <Modal
            isOpen={isModalOpen}
            ariaHideApp={false}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
          >
            <Typography variant="h4" gutterBottom> Entry Details </Typography>
            {selectedEntry && (
              <>
                <Typography variant="h5" gutterBottom> Title: {selectedEntry.title} </Typography>
                <Typography variant="body1" gutterBottom> Text: {selectedEntry.text} </Typography>
              </>
            )}
            <Button variant="contained" color="error" style={{ marginTop: '10px', marginRight: '10px' }} onClick={closeEntryModal}>Close</Button>
          </Modal>  
        </Box>
      </Box>
    </>
  );
};

export default Entries;
