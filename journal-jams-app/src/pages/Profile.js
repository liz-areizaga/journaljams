import { UserContext } from '../contexts/user.context';
import NavBar from "../Components/NewNavbar/Navbar";
import { Box, Button, TextField, Typography} from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';

const Profile = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [birthday, setBirthday] = useState("");
  const { fetchUser, emailSendPasswordReset } = useContext(UserContext);

  const handleFetchUser = async () => {
    try {
      const fetchedUser = await fetchUser();
      if (fetchedUser) {
        console.log("Current User:", fetchedUser.profile.email);        
        setCurrentUser(fetchedUser.profile.email);           
      }
      await fetch(`/api/getUserInfo/${fetchedUser.profile.email}`, {method:"GET"})
        .then(response => response.json())
        .then((jsonRes) => {
          console.log("Fetched UserInfo: " + jsonRes.aboutme + " " + jsonRes.birthday);
          setAboutMe(jsonRes.aboutme);
          setBirthday(jsonRes.birthday);
        }); 
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    handleFetchUser();
  }, []);

  const handleAboutMeChange = (event) => {
    setAboutMe(event.target.value); // Update the aboutMe state when the TextField value changes
  };

  const handleBirthdayChange = (event) => {
    setBirthday(event.target.value); // Update the aboutMe state when the TextField value changes	
  };

  const handleAboutMeSubmit = async () => {
    // Perform the submission to the database or API endpoint here
    try {
      // Example submission using fetch API
      const response = await fetch(`/api/updateAboutMe/${currentUser}/${aboutMe}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: currentUser, aboutMe: aboutMe }),
      });

      // Handle the response or perform further actions
      if (response.ok) {
        alert("About Me updated successfully!");
      } else {
        console.error("Error updating About Me:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating About Me:", error);
    }
  };

  const handleBirthdaySubmit = async () => {
    // Perform the submission to the database or API endpoint here
    try {
      // Example submission using fetch API
      const response = await fetch(`/api/updateBirthday/${currentUser}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: currentUser, birthday: birthday }) ,
      });
      // Handle the response or perform further actions
      if (response.ok) {
        alert("Birthday updated successfully!");
      } else {
        console.error("Error updating About Me:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating About Me:", error);
    }
  };


  const onSubmit = async () => {
	try {
	  await emailSendPasswordReset(currentUser);
	  alert("Password reset email sent!");
	} catch (error) {
	  console.error("Error sending password reset email:", error);
	}
  };

  return (
    <Box className="my-profile-wrapper">
      <NavBar />
      <h1 style={{ marginLeft: "10px" }}>{currentUser}'s Profile</h1>
      <Typography variant="h5" gutterBottom style={{ marginLeft: "10px", fontWeight:'bold'}}> About Me: <Typography variant="h6" style={{ marginLeft: "10px" }}> {aboutMe || "About Me is not set"} </Typography> </Typography>
      <Typography variant="h5" gutterBottom style={{ marginLeft: "10px", fontWeight:'bold' }}> Birthday: <Typography variant="h6" style={{ marginLeft: "10px" }}> {birthday || "Birthday is not set"} </Typography> </Typography>

      <TextField
        label="About Me"
        variant="outlined"
        value={aboutMe}
        onChange={handleAboutMeChange}
        style={{ marginLeft: "10px" }}
      />
      <Button variant="contained" sx={{ margin: "10px" }} onClick={handleAboutMeSubmit}>Update About Me</Button>
      <TextField
        label="Birthday"
        variant="outlined"
        value={birthday}
        type={"date"}
        InputLabelProps={{ shrink: true}}
        onChange={handleBirthdayChange}
        style={{ marginLeft: "10px" }}
        // defaultValue={birthdayTemp}
      />
      <Button variant="contained" sx={{ margin: "10px" }} onClick={handleBirthdaySubmit}>Update Birthday</Button>	  
      <Button variant="contained" sx={{ margin: "10px" }} onClick={onSubmit}>Reset Password</Button>
    </Box>
  );
};

export default Profile;


