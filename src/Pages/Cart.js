import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../context/MyContext';
import styled from 'styled-components';
import { changeAllChecked, deleteSelected, addCheckout } from '../context/Action';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import Notification from '../Components/Notification';
import CartItemCard from '../Components/CartItemCard';
import SummaryCard from '../Components/SummaryCard';

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

const TopContainer = styled(FlexContainer)`
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

function Cart() {
  const { state, dispatch } = useContext(Context);
  const [allChecked, setAllChecked] = useState(true);
  let navigate = useNavigate();

  const { cart } = state;

  useEffect(() => {
    cart.filter((item) => item.selected).length !== cart.length
      ? setAllChecked(false)
      : setAllChecked(true);
  }, [cart]);

  const handleSelectedRemove = () => {
    let selected = cart.filter((item) => item.selected);
    if (selected.length > 0) {
      let confirm = window.confirm('선택한 상품을 삭제하시겠습니까?');
      if (confirm) {
        deleteSelected(dispatch, selected);
      }
    } else {
      alert('삭제할 상품이 없습니다.');
    }
  };

  const handleAllCheckedChange = () => {
    setAllChecked((prev) => !prev);
    changeAllChecked(dispatch, allChecked);
  };

  const handleCheckOutClick = () => {
    let selected = cart.filter((item) => item.selected);
    addCheckout(dispatch, selected);
    navigate('/payment');
  };

  return (
    <>
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
            <Subtitle>List</Subtitle>
            {cart && cart.length > 0 ? (
              cart.map((item) => <CartItemCard key={uuidv4()} item={item} />)
            ) : (
              <Notification>No item in cart</Notification>
            )}
          </ItemsContainer>
        </CartItemContainer>
        <SummaryCard
          items={cart.filter((item) => item.selected)}
          handleBtnClick={handleCheckOutClick}
          btnContent='Checkout'
        />
      </Container>
    </>
  );
}

export default Cart;
