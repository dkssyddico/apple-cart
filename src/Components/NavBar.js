import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ShoppingContext } from '../Contexts/Shopping';

const Nav = styled.nav`
  width: 100%;
  background-color: ${(props) => props.theme.color.green};
  color: ${(props) => props.theme.color.white};
  position: fixed;
  z-index: 3;
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
  &:first-child {
    position: relative;
  }
`;

const CartCount = styled.div`
  position: absolute;
  top: -10px;
  left: 30px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.color.red};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  border: 1px solid white;
`;

function NavBar() {
  const { state } = useContext(ShoppingContext);
  const { cart } = state;

  return (
    <Nav>
      <NavContainer>
        <NavLeft>
          <Link to='/'>Apple Cart</Link>
        </NavLeft>
        <NavRight>
          <MenuItem>
            <Link to='cart'>Cart</Link>
            {cart && cart.length > 0 && <CartCount>{cart.length}</CartCount>}
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
