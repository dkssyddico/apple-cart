import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <div>
        <Link to='/'>Apple Cart</Link>
      </div>
      <ul>
        <li>
          <Link to='cart'>Cart</Link>
        </li>
        <li>
          <Link to='order'>Order</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
