import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from '@mui/material';

const Chatroom = (props) => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    props.socket.on('chat message', (message) => {
      setMessages([...messages, message]);
    });

    return () => {
      // Clean up event listener when the component unmounts
      props.socket.off('chat message');
    }
  }, [props.socket, messages]);

  const handleSendChat = () => {
    if (text.trim() !== '') {
      props.sendChat(text);
      setText('');
    }
  }

  return (
    <Box sx={{ backgroundColor:'#F0F0F0'}}> 
    {/*<span className="myClass" style={{float : 'left', paddingRight : '5px'}} > </span> */}
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <TextField
        id="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        label="Message"
        variant="outlined"
      />
      <Button onClick={handleSendChat}>Send</Button>
      <Button onClick={props.goBack}>Back</Button>
    </Box>
  );
};

export default Chatroom;
