import React, { useEffect, useState, useContext} from 'react';
import './Pages.css';
import NavBar from "../Components/NewNavbar/Navbar";
import { Box, Button, Typography, List, ListItemButton, ListItemText} from '@mui/material';import Modal from 'react-modal';
import SearchBar from "../Components/Searchbar/Searchbar";
import { UserContext } from "../contexts/user.context";

const Friends = () => {  

  const { fetchUser } = useContext(UserContext);
  const [newEntryFlag, setNewEntryFlag] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isEntryOpen, setIsEntryOpen] = useState(false);  
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [selectedFriend, setSelectedFriend] = useState("");
  const [friendList, setFriendList] = useState([]);
  const [entriesList, setEntriesList] = useState([
    {
        id: "",
        title: "",
        text: "",
      }
    ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFriends, setShowFriends] = useState(false);

  var templist = [];
  var tempSelectedFriend = "";

  const handleFetchUser = async () => {
    try {
      const fetchedUser = await fetchUser();
      if(fetchedUser) { console.log("Current User:", fetchedUser.profile.email); 
        setCurrentUser(fetchedUser.profile.email);
        await fetch('/api/allUsers', {method:"GET"})
          .then(response => response.json())
          // .then((jsonRes) => setData(jsonRes))
          // .then((jsonRes) => console.log(jsonRes))          
          .then((jsonRes) => setData(jsonRes.filter((user => !user.email.includes(fetchedUser.profile.email)))))
          .catch(err => console.log(err));
        await fetch(`/api/userfriendList/${fetchedUser.profile.email}`, {method:"GET"})
          .then(response => response.json())
          .then((jsonRes) => {
            setFriendList(jsonRes)
          })
          .catch(err => console.log(err));                
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => () => { handleFetchUser();}, );

  const filterData = (query, data) => {
    if (!query) {
      return data;
    } else {
      const lowercaseQuery = query.toLowerCase();
      return data.filter((d) => d.email.toLowerCase().includes(lowercaseQuery));
    }
  };
  const dataFiltered = filterData(searchQuery, data);
  
  function openModal() {
    setNewEntryFlag(true);
  }

  function closeModal() {
    setNewEntryFlag(false);
    // window.location.reload(true);
    handleFetchUser();
  }

  const handleFriendClick = (friend) => {
    // friend = "lojason71@gmail.com"
    tempSelectedFriend = friend;
    setSelectedFriend(friend);
    fetch(`/api/allEntries/${tempSelectedFriend}`, {method:"GET"})
      .then(response => response.json())
      .then((jsonRes) => {
        // tempEntriesList = jsonRes;
        setEntriesList(jsonRes);
      });
    console.log(entriesList);
    setIsModalOpen(true);
  };

  const closeFriendModal = () => {
    setIsModalOpen(false);
  };

  const handleEntryClick = (entry) => {
    setSelectedEntry(entry);
    setIsEntryOpen(true);
  };

  const closeEntryModal = () => {
    setIsEntryOpen(false);
  };

  const onSubmit = (user, friendList) => {
    try {
      fetch(`/api/newUserFriendList/${user}`, {
        method: "POST",
        body: JSON.stringify({ email: user, friends: friendList }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          console.log('Friend list saved successfully');
          // Handle the response from the API
        } else {
          throw new Error('Failed to save friend list');
        }
      });
    } catch (error) {
      console.error('Error saving friend list:', error);
      alert(error);
    }
  };
  
  const addFriend = (friend) => {
    if(!friendList.includes(friend)) {
      setFriendList([...friendList, friend]);
      templist = [...friendList, friend];
      onSubmit(currentUser, templist)
    }
  };

  const removeFriend = (friend) => {
    if(friendList.includes(friend)) {
      setFriendList(friendList.filter((item) => item !== friend));
      templist = friendList.filter((item) => item !== friend);
      onSubmit(currentUser, templist)
    }
  };

  function toggleFriends() {
    setShowFriends(!showFriends);
  }

  return (
    <>
      <NavBar />
      <Box className="my-friends-wrapper">
        <Box className="new-entry-button-container">
          <Button variant="contained" className="new-entry-button" onClick={openModal} style={{ marginTop: '10px', marginRight: '10px' }}>Add Friend</Button>
          <Button variant="contained" onClick={toggleFriends} style={{ marginTop: '10px' }}>
            {showFriends ? 'Hide Friends' : 'Show Friends'}
          </Button>
        </Box>
        <Modal
          isOpen={newEntryFlag}
          ariaHideApp={false}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
        >
          <Button
            variant="contained"
            color="error"
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px'
            }}
            onClick={closeModal}
          >
            X
          </Button>
          <Typography variant="h4" gutterBottom> Add Friend </Typography>
          <SearchBar searchlabel="Enter a user email" searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Box style={{ padding: 3 }}>
            {dataFiltered.map((d) => (
              <Box
                className="text"
                sx={{
                  padding: 2,
                  fontSize: 20,
                  color: "blue",
                  margin: 1,
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                }}
                key={d.id}
              >
                <Typography sx={{ marginRight: 2, font: "Roboto",}}>{d.email}</Typography>
                <Button variant="contained" sx={{ marginLeft: 2 }} onClick={() => {addFriend(d.email);}}> Add User </Button>
              </Box>
            ))}
          </Box>
        </Modal>
        {showFriends && (
          <Box className="my-friends-container" style={{ marginTop: '10px' }}>
            <List>
              {friendList.map((friend) => (
                <Box display="flex" alignItems="center">
                  <ListItemButton onClick={() => handleFriendClick(friend)}> 
                    <ListItemText primary={friend}/> 
                  </ListItemButton >
                  <Button style={{marginLeft: '10px', marginRight: '10px'}}variant="contained" color="error" onClick={() => {removeFriend(friend)}}> Remove </Button>
                </Box>
              ))}              
            </List>    
            <Modal
                isOpen={isModalOpen}
                ariaHideApp={false}
                onRequestClose={closeFriendModal}
                contentLabel="Example Modal"
            >
              <Button
                  variant="contained"
                  color="error"
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px'
                  }}
                  onClick={closeFriendModal}
                >
                  X
              </Button> 
              <Typography variant="h4" gutterBottom> {`${selectedFriend}'s Entries` } </Typography>                
                <Box>               
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
                        {/* {console.log(entry)} */}
                    </Box>
                    ))}      
                  </List>
                  <Modal
                    isOpen={isEntryOpen}
                    ariaHideApp={false}
                    onRequestClose={closeEntryModal}
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
            </Modal>        
          </Box>
        )}
      </Box>
    </>
  );
};

export default Friends;
