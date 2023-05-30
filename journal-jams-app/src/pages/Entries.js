import React from 'react';
import NavBar from "../Components/NewNavbar/Navbar"
import { Box, Button } from '@mui/material';
import {useState } from "react";
import Modal from 'react-modal';
import { useEffect } from 'react';

const Entries = () => {
  const [newEntryFlag, setnewEntryFlag] = useState(false);
  const [entries, setEntries] = useState([]);

  function openModal() {
    setnewEntryFlag(true);
  }

  function closeModal() {
    setnewEntryFlag(false);
    window.location.reload(true);
  }

  useEffect(() => {
    fetch('/api/getEntries') //error is coming from here
	// .then(res => res.text()) //check if wrong type coming through
	// .then(text => JSON.parse(text))
     .then(res => res.json()) 
     .then(entries_list => {
		setEntries(entries_list)});
 }, []); //dependency so that only updates once -> change to entries array to have the hook be called only when array updates
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
              // onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              contentLabel="Example Modal"
            >
          <button id="modal-close" onClick={closeModal}>X</button>
              <h2>New Entry</h2>
              <form>
                <div className="form-group">
                  <label className="modal-labels" htmlFor="exampleInputPassword1">Title</label>
                  <input className="form-control" name="title" id="title"/>
                </div>

                <div className="form-group">
                  <label className="modal-labels" htmlFor="exampleInputPassword1">Entry</label>
                  <textarea className="form-control" name="entry" id="entry"/>
                </div>
                <button type="submit" class="btn-primary">Submit</button>
              </form>
      </Modal>
        <Box className="my-entries-container">
          {/* Holds the entries of the user */}
          {entries.map((entry, i) => {
            return (
              <li> {entry.title }</li>
              )
            })}
        </Box>
      </Box>
    </>
  );
};

export default Entries;
