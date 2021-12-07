import React, { useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../context/MyContext';
import { v4 as uuidv4 } from 'uuid';
import OrderCard from '../Components/OrderCard';
import Notification from '../Components/Notification';

const Title = styled.h1`
  font-size: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 3px solid black;
  margin-bottom: 2rem;
  font-weight: 500;
  text-align: center;
`;

const Container = styled.div`
  padding: 1rem 0;
`;

function Order() {
  const { state } = useContext(Context);
  const { orders } = state;
  return (
    <>
      <Title>Order History</Title>
      <Container>
        {orders && orders.length > 0 ? (
          <>
            {orders.map((order) => (
              <OrderCard key={uuidv4()} order={order} />
            ))}
            <div>hi</div>
          </>
        ) : (
          <Notification>No order yet</Notification>
        )}
      </Container>
    </>
  );
}

export default Order;
