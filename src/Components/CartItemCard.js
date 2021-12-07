import React, { useContext } from 'react';
import styled from 'styled-components';
import { HiOutlineTrash } from 'react-icons/hi';
import { changeChecked, changeQty, deleteItem } from '../context/Action';
import { Context } from '../context/MyContext';

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
  flex-basis: 7%;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 55%;
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
  flex-basis: 18%;
`;

const QtyBtnContainer = styled.div`
  width: 90px;
  height: 30px;
  border: 1px solid ${(props) => props.theme.color.lightGray};
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
  flex-basis: 15%;
  padding-left: 1rem;
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

function CartItemCard({ item }) {
  const { selected, image, quantity, price, productId } = item;

  const { dispatch } = useContext(Context);

  const handleQtyBtnClick = (event) => {
    const { name } = event.target;
    switch (name) {
      case 'increment':
        let incrementInfo = {
          productId,
          quantity: parseInt(quantity) + 1,
        };
        changeQty(dispatch, incrementInfo);
        break;
      case 'decrement':
        if (parseInt(quantity) - 1 < 1) {
          alert('상품 수량은 1개 이상이어야 합니다.');
        } else {
          let decrementInfo = {
            productId,
            quantity: parseInt(quantity) - 1,
          };
          changeQty(dispatch, decrementInfo);
        }
        break;
      default:
        break;
    }
  };

  const handleDeleteClick = () => {
    deleteItem(dispatch, productId);
  };

  const handleCheckedChange = () => {
    let itemInfo = {
      productId,
      selected: !selected,
    };
    changeChecked(dispatch, itemInfo);
  };

  return (
    <Card>
      <SelectContainer>
        <label htmlFor='selectItem'>
          <input type='checkbox' checked={selected ? true : false} onChange={handleCheckedChange} />
        </label>
      </SelectContainer>
      <InfoContainer>
        <ImgContainer>
          <ProductImg src={`/images/${image}`} alt='product' />
        </ImgContainer>
        <h3>{item.name}</h3>
      </InfoContainer>
      <QtyContainer>
        <QtyBtnContainer onClick={(event) => handleQtyBtnClick(event)}>
          <SmallBtn name='decrement'>-</SmallBtn>
          <QtyBox>
            <span>{parseInt(quantity)}</span>
          </QtyBox>
          <SmallBtn name='increment'>+</SmallBtn>
        </QtyBtnContainer>
      </QtyContainer>
      <PriceContainer>$ {quantity * price}</PriceContainer>
      <IconContainer>
        <HiOutlineTrash onClick={handleDeleteClick} />
      </IconContainer>
    </Card>
  );
}

export default CartItemCard;
