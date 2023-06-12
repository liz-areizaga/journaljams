import { UserContext } from '../contexts/user.context';
import React, { useState , useEffect, useContext} from 'react';
import {Box, Button} from '@mui/material';
import NavBar from "../Components/NewNavbar/Navbar"
 
const Account = () => {
  const [currentUser, setCurrentUser] = useState("");
  const { fetchUser, emailSendPasswordReset} = useContext(UserContext);

  const handleFetchUser = async () => {
    try {
      const fetchedUser = await fetchUser();
      if(fetchedUser) {
        console.log("Current User:", fetchedUser.profile.email);
        setCurrentUser(fetchedUser.profile.email);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
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

  useEffect(() => {
    handleFetchUser();
  }, []);

  return (
      <>
        <NavBar />
        <Box>                
            <Button variant="contained" sx={{margin:"10px"}} onClick={onSubmit}> Reset Password </Button>
        </Box>
      </>
  );
};

export default Account;

