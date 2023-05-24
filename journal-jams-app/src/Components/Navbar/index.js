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
        <NavLink to="/MyEntries" activestyle = "true">
          My Entries
        </NavLink>
        <NavLink to="/Friends" activestyle = "true">
          Friends
        </NavLink>
        <NavLink to="/Profile" activestyle = "true">
          Profile
        </NavLink>
          <CoverImg src={Default} alt = "Default profile picture"/>
      </Nav>
    </>
  );
};

export default Navbar;