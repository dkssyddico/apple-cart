import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../context/MyContext';
import styled from 'styled-components';
import { HiOutlineTrash } from 'react-icons/hi';
import {
  changeQty,
  deleteItem,
  changeChecked,
  changeAllChecked,
  deleteSelected,
} from '../context/Action';
import { v4 as uuidv4 } from 'uuid';

const Section = styled.section`
  padding: 8rem 10rem 5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  @media screen and (max-width: 1023px) {
    padding: 8rem 4rem 5rem;
  }
  @media screen and (max-width: 767px) {
    padding: 8rem 1.5rem 5rem;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 3px solid black;
  margin-bottom: 2rem;
  font-weight: 500;
`;

const Container = styled.div`
  display: flex;
  gap: 4%;
`;

const CartItemContainer = styled.div`
  flex-basis: 66%;
  /* border: 1px solid black; */
  padding: 1.5rem 1rem;
`;

const ItemsContainer = styled.div`
  display: flex;
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

const Card = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1.5rem;
  border-bottom: 0.5px solid lightgray;
  margin-bottom: 2rem;
`;

const MetaContainer = styled.div`
  display: flex;
  /* align-items: center; */
  flex-basis: 80%;
`;

const ImgContainer = styled.div`
  margin-right: 1rem;
  justify-items: center;
  display: flex;
  align-items: center;
`;

const ProductImg = styled.img`
  width: 80px;
  height: 80px;
`;

const InfoBox = styled.div`
  h3 {
    margin-bottom: 1rem;
  }
  p {
    color: #576574;
    font-size: 14px;
  }
`;

const PriceContainer = styled.div`
  flex-basis: 20%;
`;

const SummaryContainer = styled.div`
  height: 200px;
  flex-basis: 30%;
  border: 1px solid #f2f2f2;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h2 {
    align-self: flex-end;
  }
`;

const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  font-size: 20px;
`;

const PayNowBtn = styled.button`
  all: unset;
  padding: 12px;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
  background-color: ${(props) => props.theme.green};
  color: white;
  font-weight: 500;
`;

function Payment() {
  const { state, dispatch } = useContext(Context);
  const { checkout } = state;
  console.log(checkout);
  return (
    <Section>
      <Title>Payment</Title>
      <Container>
        <CartItemContainer>
          <ItemsContainer>
            <Subtitle>Items</Subtitle>
            {checkout &&
              checkout.map((item) => (
                <Card key={uuidv4()}>
                  <MetaContainer>
                    <ImgContainer>
                      <ProductImg src={`/images/${item.image}`} alt='product' />
                    </ImgContainer>
                    <InfoBox>
                      <h3>{item.name}</h3>
                      <p>Qty : {item.quantity}</p>
                    </InfoBox>
                  </MetaContainer>
                  <PriceContainer>$ {item.quantity * item.price}</PriceContainer>
                </Card>
              ))}
          </ItemsContainer>
        </CartItemContainer>
        <SummaryContainer>
          <h2>{checkout.length > 1 ? `${checkout.length} items` : `${checkout.length} item`}</h2>
          <TotalContainer>
            <h2>Total</h2>
            <h2>{`$ ${checkout.reduce((prev, curr) => prev + curr.quantity * curr.price, 0)}`}</h2>
          </TotalContainer>
          <PayNowBtn>Payment</PayNowBtn>
        </SummaryContainer>
      </Container>
    </Section>
  );
}

export default Payment;
