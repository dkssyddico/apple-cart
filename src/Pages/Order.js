import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Context } from '../context/MyContext';
import { v4 as uuidv4 } from 'uuid';
import OrderCard from '../Components/OrderCard';
import Notification from '../Components/Notification';
import { getOrders } from '../context/Action';

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

const BtnContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ShowMoreBtn = styled.button`
  all: unset;
  padding: 10px 20px;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  border: 1px solid ${(props) => props.theme.color.lightGray};
  background-color: ${(props) => props.theme.color.whiteGray};
  color: ${(props) => props.theme.color.darkGray};
`;

function Order() {
  const { state, dispatch } = useContext(Context);
  const { selectedOrders, hasOrdersMore } = state;

  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    getOrders(dispatch, pageNumber);
  }, [dispatch, pageNumber]);

  const handleShowMoreClick = () => {
    setPageNumber((prevNum) => prevNum + 1);
  };

  return (
    <>
      <Title>Order History</Title>
      <Container>
        {selectedOrders && selectedOrders.length > 0 ? (
          <>
            {selectedOrders.map((order) => (
              <OrderCard key={uuidv4()} order={order} />
            ))}
            {hasOrdersMore && (
              <BtnContainer>
                <ShowMoreBtn onClick={handleShowMoreClick}>Show more</ShowMoreBtn>
              </BtnContainer>
            )}
          </>
        ) : (
          <Notification>No order yet</Notification>
        )}
      </Container>
    </>
  );
}

export default Order;
