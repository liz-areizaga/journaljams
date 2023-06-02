import React from 'react';
import './Pages.css';
import {useState } from "react";
import Modal from 'react-modal';
import { useEffect } from 'react';

const MyEntries = () => {
const [newEntryFlag, setnewEntryFlag] = useState(false);
const [entries, setEntries] = useState([]);

function openModal() {
	setnewEntryFlag(true);
}

function closeModal() {
	setnewEntryFlag(false);
	window.location.reload(true);
}

return (

	<div className="my-entries-wrapper">
		<div className="new-entry-button-container">
			<button className="new-entry-button" onClick={openModal} >New Entry</button>
		</div>

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
		<div className="my-entries-container">
			{/* <!--Holds the entries of user  --> */}
			{entries.map((entry, i) => {
				return (
					<li> {entry.title }</li>
				)
			})}
		</div>
	</div>
    );
};

export default MyEntries;
