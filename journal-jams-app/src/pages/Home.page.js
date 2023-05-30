// import { Button } from '@mui/material'
// import { useContext } from 'react';
// import { UserContext } from '../contexts/user.context';
import {Box} from '@mui/material';
import NavBar from "../Components/NewNavbar/Navbar"
 
// export default function Home() {
const Home = () => {
    // const { logOutUser } = useContext(UserContext);
 
    // // This function is called when the user clicks the "Logout" button.
    // const logOut = async () => {
    //   try {
    //     // Calling the logOutUser function from the user context.
    //     const loggedOut = await logOutUser();
    //     // Now we will refresh the page, and the user will be logged out and
    //     // redirected to the login page because of the <PrivateRoute /> component.
    //     if (loggedOut) {
    //       window.location.reload(true);
    //     }
    //   } catch (error) {
    //     alert(error);
    //   }
    // }

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