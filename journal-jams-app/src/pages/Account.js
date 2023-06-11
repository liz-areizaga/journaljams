import { UserContext } from '../contexts/user.context';
import { useContext } from 'react';
import {Box} from '@mui/material';
import NavBar from "../Components/NewNavbar/Navbar"
 
const Profile = () => {

    const { changePassword } = useContext(UserContext);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const oldPassword = e.target.elements.oldPassword.value;
      const newPassword = e.target.elements.newPassword.value;
  
      try {
        await changePassword(oldPassword, newPassword);
        console.log("Password changed successfully");
        // Password changed successfully
      } catch (error) {
        // Handle error
      }
    };

    return (
        <>
            <NavBar />
                <Box>                
                    <form onSubmit={handleSubmit}>
                        <input  name="oldPassword" placeholder="Old Password" />
                        <input  name="newPassword" placeholder="New Password" />
                        <button type="submit">Change Password</button>
                    </form>
                </Box>
        </>
    );
};

export default Profile;

