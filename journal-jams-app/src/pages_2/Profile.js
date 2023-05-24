import React from 'react';
import './Pages.css';
import { Button } from '@mui/material'
import { useContext } from 'react';
import { UserContext } from '../contexts/user.context';
import Box from '@mui/material/Box';


const Profile = () => {
	const { logOutUser } = useContext(UserContext);
 
    // This function is called when the user clicks the "Logout" button.
    const logOut = async () => {
      try {
        // Calling the logOutUser function from the user context.
        const loggedOut = await logOutUser();
        // Now we will refresh the page, and the user will be logged out and
        // redirected to the login page because of the <PrivateRoute /> component.
        if (loggedOut) {
          window.location.reload(true);
        }
      } catch (error) {
        alert(error);
      }
    }
return (
	<div className="my-profile-wrapper">
		<div className="my-profile-container">
			{/* <!--Holds option to change profile picture and password  --> */}
			<div className="profile-title">
				<div className="profile-text">
				&nbsp;Change profile picture
				</div>
				<div className='pfp-file'>
				&nbsp; &nbsp; <input type="file" id="pfp-file" name="pfp-file"/>
				</div>
			</div>
			<div className="profile-title">
				<div className="profile-text">
				&nbsp;Change password
				</div>
				<div className='pfp-file'>
				{/* &nbsp; &nbsp; <input type="file" id="pfp-file" name="pfp-file"/> */}
				</div>
			</div>
			<div id='logout-container'> 
				<Box>
					{/* <img src = "journaljamslogo.png" alt="Journal Jams Logo"/>      
					<h1>Welcome to JournalJams</h1> */}
					<Button variant="contained" onClick={logOut}>Logout</Button>
				</Box>
			</div> 
		</div>
	</div>
    );
};

export default Profile;
