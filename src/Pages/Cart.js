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
  addCheckout,
} from '../context/Action';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

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

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AllCheckInput = styled.input`
  margin-right: 0.5rem;
`;

const RemoveBtn = styled.button`
  all: unset;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid black;
  font-size: 14px;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: black;
    color: white;
  }
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
  justify-items: center;
  display: flex;
  align-items: center;
`;

const ProductImg = styled.img`
  width: 80px;
  height: 80px;
`;

const QtyContainer = styled.div`
  flex-basis: 20%;
`;

const QtyBtnContainer = styled.div`
  width: 90px;
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
  font-size: 14px;
`;

const PriceContainer = styled.div`
  flex-basis: 20%;
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
  border: 1px solid #dddddd;
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
  background-color: ${(props) => (props.disabled ? '#b2bec3' : props.theme.green)};
  color: white;
  font-weight: 500;
`;

function Cart() {
  const { state, dispatch } = useContext(Context);
  const [allChecked, setAllChecked] = useState(true);
  let navigate = useNavigate();

  console.log(state);
  const { cart } = state;

  useEffect(() => {
    cart.filter((item) => item.selected).length !== cart.length
      ? setAllChecked(false)
      : setAllChecked(true);
  }, [cart]);

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

  const handleSelectedRemove = () => {
    let confirm = window.confirm('선택한 상품을 삭제하시겠습니까?');
    if (confirm) {
      let selected = cart.filter((item) => item.selected);
      deleteSelected(dispatch, selected);
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

  const handleCheckoutClick = () => {
    let selected = cart.filter((item) => item.selected);
    addCheckout(dispatch, selected);
    navigate('/payment');
  };

  return (
    <Section>
      <Title>Cart</Title>
      <Container>
        <CartItemContainer>
          <TopContainer>
            <label htmlFor='selectAll'>
              <AllCheckInput
                id='selectAll'
                type='checkbox'
                checked={allChecked ? true : false}
                onChange={() => handleAllCheckedChange()}
              />
              <span>
                Select All {`${cart.filter((item) => item.selected).length} / ${cart.length}`}
              </span>
            </label>
            <RemoveBtn onClick={() => handleSelectedRemove()}>Remove</RemoveBtn>
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
                  <PriceContainer>$ {item.quantity * item.price}</PriceContainer>
                  <IconContainer>
                    <HiOutlineTrash onClick={() => handleDeleteClick(item)} />
                  </IconContainer>
                </Card>
              ))}
          </ItemsContainer>
        </CartItemContainer>
        <SummaryContainer>
          <h2>
            {cart.filter((item) => item.selected).length > 1
              ? `${cart.filter((item) => item.selected).length} items`
              : `${cart.filter((item) => item.selected).length} item`}
          </h2>
          <TotalContainer>
            <h2>Total</h2>
            <h2>
              {`$ ${cart
                .filter((item) => item.selected)
                .reduce((prev, curr) => prev + curr.quantity * curr.price, 0)}`}
            </h2>
          </TotalContainer>
          <PayNowBtn
            onClick={() => handleCheckoutClick()}
            disabled={cart.filter((item) => item.selected).length === 0 ? true : false}
          >
            Checkout
          </PayNowBtn>
        </SummaryContainer>
      </Container>
    </Section>
  );
}

export default Cart;
