import React, { useContext } from 'react';
import { Context } from '../context/MyContext';
import styled from 'styled-components';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { HiOutlineTrash } from 'react-icons/hi';
import { addQty } from '../context/Action';
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
`;

const Container = styled.div`
  display: flex;
  gap: 4%;
`;

const CartItemContainer = styled.div`
  flex-basis: 66%;
  border: 1px solid black;
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
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
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

const SelectContainer = styled.div`
  flex-basis: 5%;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 50%;
`;

const ImgContainer = styled.div`
  margin-right: 1rem;
`;

const ProductImg = styled.img`
  width: 80px;
  height: 80px;
`;

const QtyContainer = styled.div`
  flex-basis: 20%;
`;

const QtyBtnContainer = styled.div`
  width: 100px;
  height: 30px;
  border: 1px solid #bdc3c7;
`;

const SmallBtn = styled.button`
  border: none;
  width: 30%;
  height: 100%;
  cursor: pointer;
`;

const Input = styled.input`
  border: none;
  text-align: center;
  width: 40%;
`;

const PriceContainer = styled.div`
  flex-basis: 10%;
`;

const IconContainer = styled.div`
  flex-basis: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  color: lightgrey;
  cursor: pointer;
`;

const SummaryContainer = styled.div`
  height: 200px;
  flex-basis: 30%;
  border: 1px solid black;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
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

function Cart() {
  const { state, dispatch } = useContext(Context);

  const { cart } = state;

  const handleIncrement = (item) => {
    let itemInfo = {
      productId: item.productId,
      quantity: parseInt(item.quantity) + 1,
    };
    addQty(dispatch, itemInfo);
  };

  const handleQtyChange = (event) => {
    console.log(event.target.value);
  };

  return (
    <Section>
      <Title>Cart</Title>
      <Container>
        <CartItemContainer>
          <TopContainer>
            <label htmlFor='selectAll'>
              <input id='selectAll' type='checkbox' />
              <span>Select All</span>
            </label>
            <button>Remove</button>
          </TopContainer>
          <ItemsContainer>
            <Subtitle>Items</Subtitle>
            {cart &&
              cart.map((item) => (
                <Card key={uuidv4()}>
                  <SelectContainer>
                    <label htmlFor='selectItem'>
                      <input type='checkbox' />
                    </label>
                  </SelectContainer>
                  <InfoContainer>
                    <ImgContainer>
                      <ProductImg src={`/images/${item.image}`} alt='product' />
                    </ImgContainer>
                    <h3>{item.name}</h3>
                  </InfoContainer>
                  <QtyContainer>
                    <QtyBtnContainer>
                      <SmallBtn>
                        <AiOutlineMinus />
                      </SmallBtn>
                      <Input
                        type='number'
                        onChange={(e) => handleQtyChange(e, item)}
                        value={parseInt(item.quantity)}
                      />
                      <SmallBtn onClick={() => handleIncrement(item)}>
                        <AiOutlinePlus />
                      </SmallBtn>
                    </QtyBtnContainer>
                  </QtyContainer>
                  <PriceContainer>$ {item.price}</PriceContainer>
                  <IconContainer>
                    <HiOutlineTrash />
                  </IconContainer>
                </Card>
              ))}
          </ItemsContainer>
        </CartItemContainer>
        <SummaryContainer>
          <h2>items</h2>
          <TotalContainer>
            <h2>Total</h2>
            <h2>$</h2>
          </TotalContainer>
          <button>Pay now</button>
        </SummaryContainer>
      </Container>
    </Section>
  );
}

export default Cart;
