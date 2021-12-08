import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { ShoppingContext } from '../Contexts/Shopping';

const FlexColumnBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InfoContainer = styled(FlexColumnBox)`
  height: 120px;
  justify-content: space-between;
  margin-bottom: 2rem;
  h1 {
    font-size: 2rem;
    font-weight: 500;
  }
`;

const OrderId = styled.span`
  font-weight: 500;
  color: ${(props) => props.theme.color.green};
`;

const BtnContainer = styled(FlexColumnBox)`
  width: 100%;
  height: 100px;
  justify-content: space-between;
`;

const Btn = styled.button`
  all: unset;
  width: 350px;
  padding: 12px;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
  background-color: ${(props) => props.theme.color.green};
  color: white;
  font-weight: 500;
`;

const MainBtn = styled(Btn)``;

const OrderDetailBtn = styled(Btn)`
  border: 1px solid ${(props) => props.theme.color.green};
  background-color: ${(props) => props.theme.color.white};
  color: ${(props) => props.theme.color.green};
`;

function PaymentComplete() {
  const { orderId } = useParams();
  const { state } = useContext(ShoppingContext);
  const currentOrder = state.orders[orderId - 1];

  return (
    <>
      <InfoContainer>
        <h1>Thank you for your order!</h1>
        <p>
          Order number is{' '}
          <Link to={`/order/${orderId}`}>
            <OrderId>{orderId}</OrderId>
          </Link>{' '}
        </p>
        <p>
          Total: $ {currentOrder.items.reduce((prev, curr) => prev + curr.quantity * curr.price, 0)}
        </p>
      </InfoContainer>
      <BtnContainer>
        <MainBtn>
          <Link to='/'>Go to Main</Link>
        </MainBtn>
        <OrderDetailBtn>
          <Link to={`/order/${orderId}`}>Go to order detail</Link>
        </OrderDetailBtn>
      </BtnContainer>
    </>
  );
}

export default PaymentComplete;
