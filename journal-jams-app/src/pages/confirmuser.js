import { UserContext } from '../contexts/user.context';
import React, { useState , useEffect, useContext} from 'react';
import {Box, TextField, Button} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
 

const ConfirmUser = () => {
    const navigate = useNavigate();
    const { emailResendConfirm, emailConfirmUser} = useContext(UserContext); 
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const tokenId = searchParams.get('tokenId');    
    const [showEmailInput, setShowEmailInput] = useState(false);
    const [email, setEmail] = useState('');

    const resendEmail = async () => {
        try {
            await emailResendConfirm(email);
            alert('Confirmation email sent!');
            navigate("/login");
            // if(resend) {
            //     alert('Confirmation email sent!');
            //     navigate("/login");
            // }
        } catch (error) {
            console.error('Error sending confirmation email:', error);
        }
    };

    const handleEmailInputChange = (e) => {
        setEmail(e.target.value);
    };

    const handleResendClick = () => {
        setShowEmailInput(true);
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        resendEmail();
    };

    useEffect(() => {
        if (!token || !tokenId) {
            throw new Error(
                "You can only call confirmUser() if the user followed a confirmation email link"
            );
        }
    }, []);
    
    const onSubmit = async () => {
        try {
            await emailConfirmUser(token, tokenId);
            console.log("User confirmation successful!");
            alert("User confirmed!");
            navigate("/login");            
        } catch (error) {
            console.error('Error confirming user:', error);
        }
    };

    return (
        <>
            <Box>
                <form
                    style={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '300px',
                    margin: 'auto',
                    }}
                >
                    <h1>Confirm User</h1>
                    <Button variant="contained" color="primary" onClick={onSubmit} sx={{margin:"10px"}}>
                            <p> Click to confirm user</p>
                    </Button>           
                    {showEmailInput ? (
                    <TextField
                        name="email"
                        label="Email"
                        type="email"
                        variant="outlined"
                        style={{ marginBottom: '1rem' }}
                        value={email}
                        onChange={handleEmailInputChange}
                    />
                    ) : null}
                    {showEmailInput ? (
                    <Button variant="contained" color="primary" onClick={handleEmailSubmit} sx={{margin:"10px"}}>
                        <p>Submit</p>
                    </Button>
                    ) : (
                    <Button variant="contained" color="primary" onClick={handleResendClick} sx={{margin:"10px"}}>
                        <p>Click to resend confirmation email</p>
                    </Button>
                    )}
                </form>
            </Box>
        </>
    );
};


export default ConfirmUser;

