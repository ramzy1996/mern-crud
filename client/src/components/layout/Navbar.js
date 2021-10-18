import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <NavbarContainer className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <Link className="navbar-brand" to="/">
          Mern-Crud
        </Link>
      </nav>
    </NavbarContainer>
  );
};

export default Navbar;

const NavbarContainer = styled.div`
  .nav-link {
    color: #fff !important;
    padding: 10px;
    &:hover {
      background: var(--light-green);
      border-radius: 5px;
      padding: 10px;
    }
  }
`;
