import { UserContext } from '../contexts/user.context';
import React, { useState , useEffect, useContext} from 'react';
import {Box, TextField, Button} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
 
const ResetPassword = () => {
    const navigate = useNavigate();

    // const [currentUser, setCurrentUser] = useState("");
    const { emailPasswordReset, logOutUser} = useContext(UserContext);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const tokenId = searchParams.get('tokenId');

    // const handleFetchUser = async () => {
    // try {
    //     const fetchedUser = await fetchUser();
    //     if(fetchedUser) {
    //         console.log("Current User:", fetchedUser.profile.email);
    //         setCurrentUser(fetchedUser.profile.email);
    //     }
    // } catch (error) {
    //     console.error("Error fetching user:", error);
    // }
    // };

    useEffect(() => {
    // handleFetchUser();
        if (!token || !tokenId) {
            throw new Error(
            "You can only call resetPassword() if the user followed a confirmation email link"
            );
        }
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        const newPassword = e.target.elements.newPassword.value;
        try {
            await emailPasswordReset(token, tokenId, newPassword);
            alert('Password reset sent successfully');
            const logOut = await(logOutUser());
            if(logOut) {
                navigate("/login");
            }
            
        } catch (error) {
            console.error('Error sending password reset email:', error);
        }
    };

    return (
        <>
            <Box> 
                <form style={{ display: "flex", flexDirection: "column", maxWidth: "300px", margin: "auto" }} onSubmit={onSubmit}>
                    <h1>Reset Password</h1>
                    <TextField
                        name="newPassword"
                        label="New Password"
                        type="password"
                        variant="outlined"
                        style={{ marginBottom: "1rem" }}
                    />
                    <Button variant="contained" color="primary" type="submit">
                        <p> Set New Password  </p>
                    </Button>
                </form> 
            </Box>
        </>
    );
};

export default ResetPassword;

