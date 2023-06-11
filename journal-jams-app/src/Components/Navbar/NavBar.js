import React from "react";
import styled from 'styled-components';
import { Nav, NavLink } from "./NavBarElements";
import Default from './default-profile.jpeg';
import { Image } from '../../Models/ProfilePics';
import axios from 'axios';
import { useState, useEffect } from 'react';  
const CoverImg = styled.img`
  height: 65%;
  border-radius: 50%;
  margin-left: -19%;
  margin-top: -0.5%;
`
const Navbar = () => {
  
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

  return (
    <>
      <Nav>
        <NavLink to="/" activeStyle> 
          Home
        </NavLink>
        <NavLink to="/MyEntries" activeStyle>
          My Entries
        </NavLink>
        <NavLink to="/Friends" activeStyle>
          Friends
        </NavLink>
        <NavLink to="/Profile" activeStyle>
          Profile
        </NavLink>
          {imageData ? (
          <CoverImg src={`data:${contentType};base64,${imageData}`} alt="Queried Image" />
          ) : (
            <CoverImg src='./default-profile.jpeg' alt="Default Image" />
          )}
      </Nav>
    </>
  );
};

export default Navbar;