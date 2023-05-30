import React from "react";
import styled from 'styled-components'
import { Nav, NavLink } from "./NavBarElements";
import Default from './default-profile.jpeg'
  
const CoverImg = styled.img`
  height: 65%;
  border-radius: 50%;
  margin-left: -19%;
  margin-top: -0.5%;
`
const Navbar = () => {
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
          <CoverImg src={Default} alt = "Default profile picture"/>
      </Nav>
    </>
  );
};

export default Navbar;