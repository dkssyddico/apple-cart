import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { getOrder } from '../Actions/Shopping';
import { v4 as uuidv4 } from 'uuid';
import OrderDetailCard from '../Components/OrderDetailCard';
import { ShoppingContext } from '../Contexts/Shopping';

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

const OrderInfoContainer = styled.div`
  height: 80px;
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border: 1px solid ${(props) => props.theme.color.lightGray};
  border-bottom: none;
  background-color: ${(props) => props.theme.color.whiteGray};
`;

const Strong = styled.span`
  font-weight: 500;
`;

const CardsContainer = styled.div`
  border: 1px solid ${(props) => props.theme.color.lightGray};
`;

function OrderDetail() {
  let { orderId } = useParams();
  const { state, dispatch } = useContext(ShoppingContext);
  const { order } = state;

  useEffect(() => {
    getOrder(dispatch, orderId);
  }, [dispatch, orderId]);

  return (
    <>
      <Title>Order Detail</Title>
      {order && (
        <Container>
          <OrderInfoContainer>
            <h2>
              Order No. <Strong> {order.orderId} </Strong>
            </h2>
            <h2>
              Order Date:
              <Strong> {order.orderDate}</Strong>
            </h2>
            <h2>
              Total Price:{' '}
              <Strong>
                {`$ ${
                  order.items
                    ? order.items.length > 1
                      ? order.items.reduce((prev, curr) => prev + curr.quantity * curr.price, 0)
                      : order.items[0].price
                    : ''
                }`}
              </Strong>
            </h2>
          </OrderInfoContainer>
          <CardsContainer>
            {order.items &&
              order.items.map((item) => <OrderDetailCard key={uuidv4()} item={item} />)}
          </CardsContainer>
        </Container>
      )}
    </>
  );
}

export default OrderDetail;
