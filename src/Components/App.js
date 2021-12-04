import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cart from '../Pages/Cart';
import Payment from '../Pages/Payment';
import Main from '../Pages/Main';
import ProductDetail from '../Pages/ProductDetail';
import Order from '../Pages/Order';
import OrderDetail from '../Pages/OrderDetail';
import NavBar from './NavBar';
import GlobalStyles from './GlobalStyles';
import PaymentComplete from '../Pages/PaymentComplete';

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='cart' element={<Cart />} />
          <Route path='product/:id' element={<ProductDetail />} />
          <Route path='payment' element={<Payment />} />
          <Route path='complete' element={<PaymentComplete />} />
          <Route path='order' element={<Order />} />
          <Route path='order/:orderId' element={<OrderDetail />} />
          <Route path='*' element={<Navigate to='/' replace={true} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
