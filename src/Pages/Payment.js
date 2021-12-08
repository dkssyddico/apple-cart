import React, { useContext, useEffect } from 'react';
import { Context } from '../context/MyContext';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { addOrder } from '../context/Action';
import SummaryCard from '../Components/SummaryCard';
import CheckoutCard from '../Components/CheckoutCard';

const Title = styled.h1`
  font-size: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 3px solid black;
  margin-bottom: 2rem;
  font-weight: 500;
  text-align: center;
`;

const FlexContainer = styled.div`
  display: flex;
`;

const Container = styled(FlexContainer)`
  justify-content: space-between;
  flex-wrap: wrap;
`;

const CartItemContainer = styled.div`
  flex-basis: 60%;
  @media screen and (max-width: 767px) {
    flex-basis: 100%;
  }
`;

const ItemsContainer = styled(FlexContainer)`
  flex-direction: column;
  text-align: left;
`;

const Subtitle = styled.h2`
  width: 100%;
  border-bottom: 2px solid black;
  padding-bottom: 1rem;
  margin: 2rem 0;
  font-weight: 500;
`;

function Payment() {
  const { state, dispatch } = useContext(Context);
  const { checkout, orders } = state;
  const navigate = useNavigate();

  useEffect(() => {
    if (checkout.length === 0) {
      alert('구매하실 상품이 없습니다');
      navigate('/cart');
    }
  }, []);

  const handlePaymentClick = () => {
    let orderId = orders.length + 1;
    let orderDate = new Date();
    let year = orderDate.getFullYear();
    let month = orderDate.getMonth() + 1;
    let day = orderDate.getDate() < 10 ? `0${orderDate.getDate()}` : orderDate.getDate();
    let hours = orderDate.getHours();
    let mins = orderDate.getMinutes() < 10 ? `0${orderDate.getMinutes()}` : orderDate.getMinutes();

    let orderInfo = {
      orderId,
      orderDate: `${year}.${month}.${day}(${hours}:${mins})`,
      items: [...checkout],
    };
    addOrder(dispatch, orderInfo);
    navigate(`/complete/${orderId}`);
  };

  return (
    <>
      <Title>Payment</Title>
      <Container>
        <CartItemContainer>
          <ItemsContainer>
            <Subtitle>List</Subtitle>
            {checkout && checkout.map((item) => <CheckoutCard key={uuidv4()} item={item} />)}
          </ItemsContainer>
        </CartItemContainer>
        <SummaryCard items={checkout} handleBtnClick={handlePaymentClick} btnContent='Payment' />
      </Container>
    </>
  );
}

export default Payment;
