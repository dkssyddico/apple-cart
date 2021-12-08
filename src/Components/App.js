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
import Section from './Section';

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <NavBar />
        <Section>
          <Routes>
            <Route path='/' element={<Main />}></Route>
            <Route path='cart' element={<Cart />} />
            <Route path='product/:id' element={<ProductDetail />} />
            <Route path='payment' element={<Payment />} />
            <Route path='complete/:orderId' element={<PaymentComplete />} />
            <Route path='order' element={<Order />} />
            <Route path='order/:orderId' element={<OrderDetail />} />
            <Route path='*' element={<Navigate to='/' replace={true} />} />
          </Routes>
        </Section>
      </Router>
    </>
  );
}

export default App;
