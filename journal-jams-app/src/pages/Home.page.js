// import { Button } from '@mui/material'
// import { useContext } from 'react';
// import { UserContext } from '../contexts/user.context';
import {Box} from '@mui/material';
import NavBar from "../Components/NewNavbar/Navbar"
 
// export default function Home() {
const Home = () => {

    return (
        <>
            <NavBar />
            <Box>
                <img src = "journaljamslogo.png" alt="Journal Jams Logo"/>      
                <h1>Welcome to JournalJams</h1>
                {/* <Button variant="contained" onClick={logOut}>Logout</Button> */}
            </Box>
        </>
    );
};

export default Home;

