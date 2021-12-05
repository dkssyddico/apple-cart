import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  width: 100%;
  background-color: ${(props) => props.theme.green};
  color: ${(props) => props.theme.white};
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
`;

const NavContainer = styled.div`
  padding: 2rem 8rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease-in-out;
  @media screen and (max-width: 1023px) {
    padding: 2rem 4rem 1rem;
  }
  @media screen and (max-width: 767px) {
    padding: 2rem 1.5rem 1rem;
  }
`;

const NavLeft = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
`;

const NavRight = styled.div`
  display: flex;
`;

const MenuItem = styled.li`
  margin-left: 3rem;
  font-weight: 500;
`;

function NavBar() {
  return (
    <Nav>
      <NavContainer>
        <NavLeft>
          <Link to='/'>Apple Cart</Link>
        </NavLeft>
        <NavRight>
          <MenuItem>
            <Link to='cart'>Cart</Link>
          </MenuItem>
          <MenuItem>
            <Link to='order'>Order</Link>
          </MenuItem>
        </NavRight>
      </NavContainer>
    </Nav>
  );
}

export default NavBar;
