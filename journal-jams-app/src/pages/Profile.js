// import React from 'react';
import NavBar from "../Components/NewNavbar/Navbar"
import axios from 'axios';
import { Box, Button } from '@mui/material';
import { useState } from "react";

const Profile = () => {
	const [selectedImage, setSelectedImage] = useState(null);

	const handleImageChange = (event) => {
	setSelectedImage(event.target.files[0]);
	};

	const handleImageUpload = async () => {
	try {
		const formData = new FormData();
		formData.append('image', selectedImage);
		const response = await axios.post('/api/newProfilePic', formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
		});

		console.log('Image uploaded. ID:', response.data.id);
	} catch (error) {
		console.error('Failed to upload image', error);
	}
	};

	return (
		<Box class="my-profile-wrapper">
			<NavBar/>
			<input type="file" accept="image/*" onChange={handleImageChange} />
			<Button onClick={handleImageUpload}>Upload</Button>
				{/* <div class="my-profile-container"> */}
					{/* <!--Holds option to change profile picture and password  --> */}
				{/* </div> */}
			{/* </NavBar> */}
		</Box>
	);
};

export default Profile;
