import React, { useContext, useState } from 'react';
import { Context } from '../context/MyContext';
import styled from 'styled-components';
import { HiOutlineTrash } from 'react-icons/hi';
import { changeQty, deleteItem, changeChecked, changeAllChecked } from '../context/Action';
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
  display: flex;
`;

const SmallBtn = styled.button`
  border: none;
  width: 30%;
  height: 100%;
  cursor: pointer;
`;

const QtyBox = styled.div`
  border: none;
  text-align: center;
  width: 40%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
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
  const [allChecked, setAllChecked] = useState(true);

  console.log(state);
  const { cart } = state;

  const handleQtyBtnClick = (event, item) => {
    const { name } = event.target;
    switch (name) {
      case 'increment':
        let incrementInfo = {
          productId: item.productId,
          quantity: parseInt(item.quantity) + 1,
        };
        changeQty(dispatch, incrementInfo);
        break;
      case 'decrement':
        if (parseInt(item.quantity) - 1 < 1) {
          alert('상품 수량은 1개 이상이어야 합니다.');
        } else {
          let decrementInfo = {
            productId: item.productId,
            quantity: parseInt(item.quantity) - 1,
          };
          changeQty(dispatch, decrementInfo);
        }
        break;
      default:
        break;
    }
  };

  const handleDeleteClick = (item) => {
    let productId = item.productId;
    deleteItem(dispatch, productId);
  };

  const handleCheckedChange = (item) => {
    let itemInfo = {
      ...item,
      selected: !item.selected,
    };
    changeChecked(dispatch, itemInfo);
  };

  const handleAllCheckedChange = () => {
    setAllChecked((prev) => !prev);
    changeAllChecked(dispatch, allChecked);
  };

  return (
    <Section>
      <Title>Cart</Title>
      <Container>
        <CartItemContainer>
          <TopContainer>
            <label htmlFor='selectAll'>
              <input
                id='selectAll'
                type='checkbox'
                checked={allChecked ? true : false}
                onChange={() => handleAllCheckedChange()}
              />
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
                      <input
                        type='checkbox'
                        checked={item.selected ? true : false}
                        onChange={() => handleCheckedChange(item)}
                      />
                    </label>
                  </SelectContainer>
                  <InfoContainer>
                    <ImgContainer>
                      <ProductImg src={`/images/${item.image}`} alt='product' />
                    </ImgContainer>
                    <h3>{item.name}</h3>
                  </InfoContainer>
                  <QtyContainer>
                    <QtyBtnContainer onClick={(event) => handleQtyBtnClick(event, item)}>
                      <SmallBtn name='decrement'>-</SmallBtn>
                      <QtyBox>
                        <span>{parseInt(item.quantity)}</span>
                      </QtyBox>
                      <SmallBtn name='increment'>+</SmallBtn>
                    </QtyBtnContainer>
                  </QtyContainer>
                  <PriceContainer>$ {item.price}</PriceContainer>
                  <IconContainer>
                    <HiOutlineTrash onClick={() => handleDeleteClick(item)} />
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
