import React, { useEffect, useState, useContext} from 'react';
import './Pages.css';
import NavBar from "../Components/NewNavbar/Navbar";
import { Box, Button, Typography, List, ListItemButton, ListItemText, TextField, ListItem, InputLabel } from '@mui/material';import Modal from 'react-modal';
import SearchBar from "../Components/Searchbar/Searchbar";
import { UserContext } from "../contexts/user.context";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'

const Friends = () => {  

  const { fetchUser } = useContext(UserContext);
  const [newEntryFlag, setNewEntryFlag] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isEntryOpen, setIsEntryOpen] = useState(false);  
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [comments, setComments] = useState([]) 
  const [isCommenting, setIsCommenting] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState("");
  const [friendBirthday, setFriendBirthday] = useState("");
  const [friendAboutMe, setFriendAboutMe] = useState("");  
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

  const increase = async (entry_id, index) => {
    await fetch(`/api/upVote/${entry_id}/${index}`, { method: "PUT" })
      .then((response) => {
        if (response.ok) {
          console.log('Comment updated successfully');
        } else {
          throw new Error('Failed to update comment');
        }
      });
  
    await fetch(`/api/getVote/${entry_id}/${index}`, { method: "GET" })
      .then(response => response.json())
      .then((jsonRes) => {
        const updatedComments = [...comments];
        updatedComments[index].rating = jsonRes.rating;
        setComments(updatedComments);
        console.log("Current Vote: " +  jsonRes.rating);
      });
  };
  
  const decrease = async (entry_id, index) => {
    await fetch(`/api/downVote/${entry_id}/${index}`, { method: "PUT" })
      .then((response) => {
        if (response.ok) {
          console.log('Comment updated successfully');
        } else {
          throw new Error('Failed to update comment');
        }
      });
  
    await fetch(`/api/getVote/${entry_id}/${index}`, { method: "GET" })
      .then(response => response.json())
      .then((jsonRes) => {
        const updatedComments = [...comments];
        updatedComments[index].rating = jsonRes.rating;
        setComments(updatedComments);
        console.log("Current Vote: " +  jsonRes.rating);
      });
  }; 

  const handleFetchUser = async () => {
    try {
      const fetchedUser = await fetchUser();
      if(fetchedUser) { console.log("Current User:", fetchedUser.profile.email); 
        setCurrentUser(fetchedUser.profile.email);
        await fetch('/api/allUsers', {method:"GET"})
          .then(response => response.json())     
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

  const handleFetchComments = async (entry) => {
    try {
      fetch(`/api/allComments/${entry}`, { method: "GET" }).then(response=>response.json())
        .then((jsonRes) => {
          setComments(jsonRes);
        })
    } catch (err) {
      console.log("Error in handleFechComments")
      console.log(err);
    }
  }

  useEffect(() => () => { handleFetchUser();}, []);

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
    fetch(`/api/getUserInfo/${tempSelectedFriend}`, {method:"GET"})
    .then(response => response.json())
    .then((jsonRes) => {
      setFriendAboutMe(jsonRes.aboutMe);
      setFriendBirthday(jsonRes.birthday);
    });    
    fetch(`/api/allEntries/${tempSelectedFriend}`, {method:"GET"})
      .then(response => response.json())
      .then((jsonRes) => {
        setEntriesList(jsonRes);
      });
    // console.log(entriesList);
    setIsModalOpen(true);
  };

  const closeFriendModal = () => {
    setIsModalOpen(false);
  };

  const handleEntryClick = (entry) => {
    setSelectedEntry(entry);
    setComments([]);
    handleFetchComments(entry._id);
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

  const addComment = (event) => {
    console.log(selectedEntry)
    event.preventDefault();
    fetch('/api/newComment', {
      method: 'POST',
      body: JSON.stringify({username: currentUser, entry_id: selectedEntry._id, comment: document.getElementById('comment').value, rating: 0}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      if (response.ok) {
        console.log('Comment submitted successfully');
        // Handle the response from the API
      } else {
        throw new Error('Failed to submit comment');
      }
    })
    .catch((error) => {
      console.error('Error submitting comment:', error);
      alert(error);
    })
    setComments([...comments, {user: currentUser, comment: document.getElementById('comment').value, rating: '0'}])
    document.getElementById('comment').value = "";
    setIsCommenting(false);
    // handleFetchComments(selectedEntry.id);
    // window.location.reload();
  }

  const handleComment = () => {
    setIsCommenting(!isCommenting);
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
              <Typography variant="h5" gutterBottom> About Me: <Typography variant="h6"> {friendAboutMe || "About Me is not set"} </Typography> </Typography>
              <Typography variant="h5" gutterBottom> Birthday: <Typography variant="h6"> {friendBirthday || "Birthday is not set"} </Typography> </Typography>
                <Box>               
                <List>
                  <ListItemText>
                    <Typography variant="body1" style={{ fontWeight: 'bold', marginLeft: '10px' }}>
                      Title
                    </Typography>
                  </ListItemText>
                  {entriesList.length > 0 ? (
                    entriesList.map((entry) => (
                      <Box display="flex" alignItems="center">
                        <ListItemButton key={entry.title} onClick={() => handleEntryClick(entry)}>
                          <ListItemText primary={entry.title} />
                        </ListItemButton>
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body1" style={{ marginLeft: '10px' }}>
                      Entry List is empty
                    </Typography>
                  )}
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
                    <Box>
                    { comments.length > 0 && (comments.map((comment, i) => (
                      <List key={i}>
                        <ListItem sx={{border:"1px solid black", borderRadius: "30px"}} >
                        <ListItemText
                        primary={
                          <Typography variant="h6" style={{ fontSize: '16px' }}>
                            {comment.user}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="h5" style={{ fontSize: '20px' }}>
                            {comment.comment}
                          </Typography>
                        }
                        />
                          <Box id = "arrow_container" style={{marginTop:'12px'}}>
                          <Stack direction="column" spacing = {2}>
                              <IconButton id = "arrows" onClick = {() => {increase(selectedEntry._id, i)}}>
                                  <KeyboardArrowUpIcon/> 
                              </IconButton>
                              <span id="vote" >{comment.rating}</span>
                              <IconButton id = "arrows" onClick = {() => {decrease(selectedEntry._id, i)}}>
                                  <KeyboardArrowDownIcon /> 
                              </IconButton>
                          </Stack>
                      </Box>
                        </ListItem>
                      </List>
                    )))}
                    </Box>
                    { isCommenting && 
                        (<form onSubmit={addComment}>
                          <Box mb={2}>
                            <InputLabel className="modal-labels" htmlFor="exampleInputPassword1">Comment</InputLabel>
                            <TextField id="comment" name="comment" variant="outlined" fullWidth />
                          </Box> 
                          <Box display="flex" justifyContent="flex-end">
                            <Button variant="contained" color="error" style={{ marginTop: '10px', marginRight: '10px' }} onClick={handleComment}>Close</Button>
                            <Button variant="contained" style={{ marginTop: '10px', marginRight: '10px' }} type="submit" >Submit</Button>
                          </Box>
                        </form> 
                      )}
                      <Button variant="contained" style={{ marginTop: '10px', marginRight: '10px' }} onClick={handleComment}>Comment</Button>
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
