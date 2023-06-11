import React, { useEffect, useState, useContext } from 'react';
import './Pages.css';
import NavBar from "../Components/NewNavbar/Navbar"
import { Box, Button, Modal, TextField} from '@mui/material';
import { io } from 'socket.io-client';
import Chatroom from './Chatroom';
import { UserContext } from "../contexts/user.context";


const Lobby = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");
  const [socket, setSocket] = useState(undefined);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [createdRooms, setCreatedRooms] = useState([]);
  const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);
  var selectedRoom = "";

  const handleFetchUser = async () => {
    try {
      const fetchedUser = await fetchUser();
      if(fetchedUser) { console.log("Current User:", fetchedUser.profile.email); 
        setCurrentUser(fetchedUser.profile.email);
        fetchUserRooms(fetchedUser.profile.email);
      }
    } catch (err) {
      console.log(err);
    }
  }
  
  const fetchUserRooms = (user) => {
    fetch(`/api/allRooms/${user}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("User's Rooms: " + data.rooms);
        // Update the createdRooms state with the received data
        setCreatedRooms(data.rooms);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const roomSelect = (room, userName) => {
    selectedRoom = room;
    setCurrentRoom(room);
    socket.emit("join", { room, userName });
    // console.log("In room select: " + room);    
    setChatModalOpen(true);
  }

  const createRoom = (name) => {
    document.getElementById("room-name-input").value ="";
    const newRoom = `Room ${name}`;
    if(!createdRooms.includes(newRoom)) {
      setCreatedRooms([...createdRooms, newRoom]);
      socket.emit('createRoom', newRoom);
      fetch(`/api/newRoom/${currentUser}/${newRoom}`, {
        method: 'POST',
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Sent your room to the DB!', data);
        })
        .catch((error) => {
          console.log(error);
        }); 
    }
  }

  const sendChat = (text) => {
    // console.log("in sendChat: ", selectedRoom);
    fetch('/api/newMessage', {
        method:"POST",
        body: JSON.stringify({username: currentUser, room: currentRoom, message: text}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    console.log("in front", text);
    socket.emit("chat message", {user: currentUser, message: text});
  }

  const handleChange = (e) => {
    selectedRoom = e.target.value;
    setCurrentRoom(e.target.value);
  }

  useEffect(() => {
    handleFetchUser();
    setSocket(io('http://localhost:1234'));
    console.log("set up socket in front end");
  }, []);

  const handleCloseModal = () => {
        console.log("In close modal: ", currentUser);
        setChatModalOpen(false);
  }

  return (
    <>
      <NavBar />
      <Box className="lobby-wrapper">
      <Box  sx={{marginLeft: "10px", marginTop: "10px"}}>
          {/* <input type='text' id='room-name-input' onChange={handleChange}/> */}
          <TextField id="room-name-input" label="Enter Room Name" variant="outlined" onChange={handleChange}/>
          {/* {let name = document.getElementById("room-name-input").value;} */}
          <Button variant="contained" onClick={() => createRoom(document.getElementById("room-name-input").value)} sx={{marginLeft: "10px", marginTop: "10px"}} >Create Room</Button>
        </Box>
          <Box className="lobby-container">
            {/* Display created room buttons */}
            {createdRooms.map((room, index) => (
              <Button sx={{marginLeft:"10px", marginTop: "10px"}} variant="contained" key={index} onClick={() => roomSelect(room, currentUser)}>
                {room}
              </Button>              
            ))}
            {/* Chat Room Modal */}
          </Box>
            <Modal open={chatModalOpen} onClose={handleCloseModal} 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Box
                sx={{
                  backgroundColor: 'white',
                  border: '1px solid black',
                  borderRadius: '4px',
                  outline: 'none',
                  width: '90%',
                  maxHeight: '80vh',
                  overflowY: 'auto',
                  p: 2,
                }}
              >
                <Chatroom socket={socket} room={currentRoom} sendChat={sendChat} goBack={handleCloseModal} />
              </Box>
            </Modal>
      </Box>
    </>
  );
};

export default Lobby;
