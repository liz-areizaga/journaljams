import React, { useEffect, useState, useContext  } from 'react';
import './Pages.css';
import NavBar from "../Components/NewNavbar/Navbar"
import { Box, Button, Modal } from '@mui/material';
import { io } from 'socket.io-client';
import Chatroom from './Chatroom';
import { UserContext } from "../contexts/user.context";


const Lobby = () => {
  const [roomInfo, setRoomInfo] = useState({ username: "default", room: "default" });
  const [socket, setSocket] = useState(undefined);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [createdRooms, setCreatedRooms] = useState([]);

  const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);

//   const loadUser = async () => {
//     const currentUser = await fetchUser().then(console.log("User", roomInfo.username));
//     if (currentUser) {
//             console.log("Current user ", currentUser._profile.data.email);
//             setRoomInfo({ username: currentUser._profile.data.email});
//             // console.log("User", roomInfo.username);
//     }
//   }

  const roomSelect = (room, userName) => {
    socket.emit("join", { room, userName });
    setRoomInfo({ userName, room });
    setChatModalOpen(true);
  }

  const createRoom = (name) => {
    document.getElementById("room-name-input").value ="";
    const newRoom = `Room ${name}`;
    setCreatedRooms([...createdRooms, newRoom]);
    socket.emit('createRoom', newRoom);
  }

  const sendChat = (text, roomInfo) => {
    console.log("in sendChat", roomInfo);
    fetch('/api/newMessage', {
        method:"POST",
        body: JSON.stringify({username: roomInfo.username, room: roomInfo.room, message: text}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    console.log("in front", text);
    socket.emit("chat message", text);
  }

  const handleChange = (e) => {
    setRoomInfo({room: e.target.value});
  }

  useEffect(() => {
    setSocket(io('http://localhost:1234'));
    console.log("set up socket in front end");
  }, []);

  const handleCloseModal = () => {
        console.log("In close modal", roomInfo.username);
        setChatModalOpen(false);
  }

  return (
    <>
      <NavBar />
      <Box className="lobby-wrapper">
      <Box>
          <input type='text' id='room-name-input' onChange={handleChange}/>
          {/* {let name = document.getElementById("room-name-input").value;} */}
          <Button onClick={() => createRoom(roomInfo.room)}>Create Room</Button>
        </Box>
        <Box className="lobby-container">
          {/* Display created room buttons */}
          {createdRooms.map((room, index) => (
            <Button key={index} onClick={() => roomSelect(room, roomInfo.username)}>
              {room}
            </Button>
          ))}

          {/* Chat Room Modal */}
          <Modal open={chatModalOpen} onClose={handleCloseModal}>
            <Chatroom socket={socket} roomInfo={roomInfo} sendChat={sendChat} goBack={handleCloseModal} />
          </Modal>
        </Box>
      </Box>
    </>
  );
};

export default Lobby;
