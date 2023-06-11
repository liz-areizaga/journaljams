import React from 'react';
import NavBar from "../Components/NewNavbar/Navbar"
import { Box, Button } from '@mui/material';
import {useState } from "react";
import Modal from 'react-modal';
import { useEffect } from 'react';
import {main} from '../pages_2/SpotifyNLP.js';

const Entries = () => {
  const [newEntryFlag, setnewEntryFlag] = useState(false);
  const [entries, setEntries] = useState([]);
  const [mood, setMood] = useState('');

  function openModal() {
    setnewEntryFlag(true);
  }

  function closeModal() {
    setnewEntryFlag(false);
    window.location.reload(true);
  }

  const getMood = () => {
    main(document.getElementById("entry").value).then((result)=> {
        setMood(result);
        fetch('/api/newEntry', {
          method: 'POST',
          body: JSON.stringify({ 
            title: document.getElementById('title').value,
            entry: document.getElementById('entry').value,
            mood: result
        }),
        headers: {
          'Content-Type': 'application/json'
        }
    })
    });
    // console.log(currMood.result)
  };

  return (
    <>
      <NavBar />
      <Box className="my-entries-wrapper">
        <Box className="new-entry-button-container">
          <Button className="new-entry-button" onClick={openModal}>New Entry</Button>
        </Box>
        <Modal
          isOpen={newEntryFlag}
          ariaHideApp={false}
              onRequestClose={closeModal}
              contentLabel="Example Modal"
            >
          <button id="modal-close" onClick={closeModal}>X</button>
              <h2>New Entry</h2>
              <form id="new-entry-form">
                <div className="form-group">
                  <label className="modal-labels" htmlFor="exampleInputPassword1">Title</label>
                  <input className="form-control" name="title" id="title"/>
                </div>

                <div className="form-group">
                  <label className="modal-labels" htmlFor="exampleInputPassword1">Entry</label>
                  <textarea className="form-control" name="entry" id="entry"/>
                </div>
              {/* <button type="submit" class="btn-primary" onClick={()=>{console.log(document.getElementById("entry").value);}}>Submit</button> */}
              <button type="submit" class="btn-primary" onClick={getMood}>Submit</button>
              </form>
      </Modal>
        <Box className="my-entries-container">
          {/* Holds the entries of the user */}
          {/* {entries.map((entry, i) => {
            return (
              <li> {entry.title }</li>
              )
            })} */}
        </Box>
      </Box>
    </>
  );
};

export default Entries;
