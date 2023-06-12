import React, { useState, useEffect, useContext } from "react";
import { Box, Button, TextField, List, ListItemText, ListItem} from '@mui/material';
import { UserContext } from "../contexts/user.context";

const Chatroom = (props) => {
  const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState("");
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  const handleFetchUser = async () => {
    try {
      const fetchedUser = await fetchUser();
      if (fetchedUser) {
        // console.log("Current User:", fetchedUser.profile.email);
        // console.log("Room Name: " + props.room);
        setCurrentUser(fetchedUser.profile.email);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleFetchMessages = async () => {
    try {
      const response = await fetch(`/api/allMessages/${props.room}`, { method: "GET" });
      const jsonRes = await response.json();
      // console.log(jsonRes);
      setMessages(jsonRes);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    handleFetchUser();
    handleFetchMessages();
  }, []);

  useEffect(() => {
    props.socket.on('chat message', (message) => {
      setMessages((prevMessages) => [...prevMessages, {user: message.user, message: message.message}]);
    });

    return () => {
      // Clean up event listener when the component unmounts
      props.socket.off('chat message');
    }
  }, [props.socket]);

  const handleSendChat = () => {
    if (text.trim() !== '') {
      // console.log("In handle sent chat ", props.roomInfo);
      props.sendChat(text, props.roomInfo);
      setText('');
    }
  }

  return (
    <Box sx={{ backgroundColor: '#F0F0F0' }}>
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <List key={index}>
            <ListItem sx={{border:"1px solid black", borderRadius: "30px"}} >
              <ListItemText primary={message.user} secondary={message.message} />
            </ListItem>
          </List>

        ))
      ) : (
        <p>No messages available</p>
      )}      
      <TextField
        id="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        label="Message"
        variant="outlined"
        style = {{width: "90%"}}
      />
      <Button onClick={handleSendChat}>Send</Button>
      <Button onClick={props.goBack}>Back</Button>
    </Box>
  );
};

export default Chatroom;
