import React, { useEffect, useState } from 'react';
import './Pages.css';
import NavBar from "../Components/NewNavbar/Navbar"
import { Box, Button, Modal } from '@mui/material';
import { io } from 'socket.io-client';
import Chatroom from './Chatroom';

const Lobby = () => {
  const [roomInfo, setRoomInfo] = useState({ userName: "default", room: "default" });
  const [socket, setSocket] = useState(undefined);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [createdRooms, setCreatedRooms] = useState([]);

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

  const sendChat = (text) => {
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
            <Button key={index} onClick={() => roomSelect(room, "John")}>
              {room}
            </Button>
          ))}

          {/* Chat Room Modal */}
          <Modal open={chatModalOpen} onClose={handleCloseModal}>
            <Chatroom socket={socket} sendChat={sendChat} goBack={handleCloseModal} />
          </Modal>
        </Box>
      </Box>
    </>
  );
};

export default Lobby;
