import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #111;
  padding: 1rem;
  border-bottom: 2px solid #0ff;
`;

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavLink = styled(Link)`
  color: #0ff;
  text-decoration: none;
  font-size: 1.2rem;
  
  &:hover {
    text-decoration: underline;
    color: #ff0;
  }
`;

function Navbar() {
  return (
    <Nav>
      <NavList>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/sightings">Sightings</NavLink></li>
        <li><NavLink to="/research">Research</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
      </NavList>
    </Nav>
  );
}

export default Navbar; 