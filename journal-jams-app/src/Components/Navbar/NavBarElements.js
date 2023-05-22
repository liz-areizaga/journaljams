import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
    background-color: inherit;
    height: 50px;
    width: 100%;
    position: static;
    top: 0%;
    font-weight: bold;
    margin-top: 5%;

    display: flex;
    // flex: row;
    justify-content: center;
    // list-style: none;
    gap: 20%;
`;

export const NavLink = styled(Link)`
    color:black; 
    text-decoration: none;
    font-family:"Times New Roman";
    font-size:large;
    &:hover {
        text-decoration:underline;
    }
`;