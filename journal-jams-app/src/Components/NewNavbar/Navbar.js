import * as React from 'react';
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../contexts/user.context';
// import { Image } from '../../Models/ProfilePics';
import axios from 'axios';
import {AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem} from '@mui/material'

const pages = ['Home', 'Entries', 'Friends'];
const settings = ['Profile', 'Account', 'Logout'];

function Navbar() {
    const [imageData, setImageData] = useState(null);
    const [contentType, setContentType] = useState('');

    useEffect(() => {
        // Call the API to query the image
        queryImage();
    }, []);

    const queryImage = async () => {
        try {
            const response = await axios.get('/api/newProfilePic/647ecdf649e7777dd09311e2'); // Replace with the actual API endpoint and image ID
            const { data, contentType } = response.data;
            setImageData(data);
            setContentType(contentType);
        } catch (error) {
            console.error('Failed to query image', error);
            // Handle error
        }
    };
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

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    // const handleOpenNavMenu = (event) => {
    //     setAnchorElNav(event.currentTarget);
    // };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
        <Container maxWidth="xl" >
            <Toolbar disableGutters>
                {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                {/* <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    }}
                >
                    LOGO
                </Typography> */}
                     <Box
                        component="img"
                        sx={{
                            height: 100,
                            width: 125,
                            // maxHeight: { xs: 233, md: 167 },
                            // maxWidth: { xs: 350, md: 250 },
                        }}
                        alt="Journal Jams Logo"
                        src="journaljamslogo.png"
                    />


            {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}> */}
            <Box sx={{ flexGrow: 0, textAlign: 'right' }}>
                {/* <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                    >
                    <MenuIcon />
                </IconButton> */}
                <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
                >
                {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                ))}
                </Menu>
            </Box>
            {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
            <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                LOGO
            </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                    <Link to={page === 'Home' ? '/' : `/${page}`} key={page}>
                        <Button
                        onClick={handleCloseNavMenu}
                        sx={{
                            my: 2,
                            color: 'white',
                            display: 'block',
                            ...(page === 'Home'
                            ? window.location.pathname === '/' && {
                                // '&:hover':{cursor:'default', disabled:true, pointerEvents: 'none',},
                                cursor:'not-allowed !important', disabled:true, pointerEvents: 'none',
                            }
                            : window.location.pathname === `/${page}` && {
                                // '&:hover':{cursor:'default', disabled:true, pointerEvents: 'none',},
                                input:{cursor:'pointer'}, disabled:true, pointerEvents: 'none',
                            }),
                        }}

                        >
                        {page}
                        </Button>
                    </Link>
                ))}
                </Box>

            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        {imageData ? (
                        <Avatar src={`data:${contentType};base64,${imageData}`} alt="Queried Image" />
                        ) : (
                            <Avatar src='./default-profile.png' alt="Default Image" />
                        )}
                        {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />  */}
                        {/* Change to set profile picture */}
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    >
                    {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        {setting === 'Logout' ? (
                        <Typography textAlign="center" onClick={logOut}>
                            {setting}
                        </Typography>
                        ) : (
                        <Link to={`/${setting}`}>
                            <Typography textAlign="center">{setting}</Typography>
                        </Link>
                        )}
                    </MenuItem>
                    ))}
                </Menu>
            </Box>
            </Toolbar>
        </Container>
        </AppBar>
    );
    }
export default Navbar;
