import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { addCart } from '../Actions/Shopping';
import { ShoppingContext } from '../Contexts/Shopping';

const Card = styled.div`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid ${(props) => props.theme.color.lightGray};
`;

const FlexContainer = styled.div`
  display: flex;
`;

const CardContainer = styled(FlexContainer)`
  padding: 1rem 1.5rem;
  transition: all 0.3s ease-in-out;
  @media screen and (max-width: 767px) {
    padding: 0.8rem 1rem;
  }
`;

const ImgContainer = styled(FlexContainer)`
  flex-basis: 10%;
  align-items: center;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
`;

const MetaContainer = styled(FlexContainer)`
  flex-basis: 60%;
  padding: 1.2rem 1.5rem;
  flex-direction: column;
  justify-content: space-around;
  transition: all 0.3s ease-in-out;
  @media screen and (max-width: 767px) {
    padding: 0.8rem 1rem;
  }
`;

const ItemName = styled.h3`
  font-weight: 500;
`;

const ItemDetail = styled.h3``;

const BtnContainer = styled.div`
  flex-basis: 35%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const CartBtn = styled.button`
  all: unset;
  padding: 12px;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
  background-color: ${(props) => props.theme.color.green};
  color: white;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
  @media screen and (max-width: 767px) {
    font-size: 14px;
  }
`;

function OrderDetailCard({ item }) {
  const { state, dispatch } = useContext(ShoppingContext);
  const { cart } = state;

  let navigate = useNavigate();

  const handleCartClick = () => {
    let existence =
      cart.filter((cartItem) => cartItem.productId === item.productId).length > 0 ? true : false;
    if (existence) {
      let confirm = window.confirm(
        '이미 장바구니에 담겨있는 상품입니다. 장바구니로 이동하시겠습니까?'
      );
      if (confirm) {
        navigate('/cart');
      }
    } else {
      let newItem = {
        productId: item.productId,
        name: item.name,
        quantity: 1,
        price: item.price,
        image: item.image,
        selected: true,
      };
      addCart(dispatch, newItem);
      let confirm = window.confirm('상품이 장바구니에 담겼습니다. 장바구니로 이동하시겠습니까?');
      if (confirm) {
        navigate('/cart');
      }
    }
  };

  return (
    <Card>
      <CardContainer>
        <ImgContainer>
          <Image src={`/images/${item.image}`} alt='product' />
        </ImgContainer>
        <MetaContainer>
          <ItemName>{item.name}</ItemName>
          <ItemDetail>
            <span>$ {item.quantity * item.price}</span> | {item.quantity}ea
          </ItemDetail>
        </MetaContainer>
        <BtnContainer>
          <CartBtn onClick={handleCartClick}>Add to cart</CartBtn>
        </BtnContainer>
      </CardContainer>
    </Card>
  );
}

export default OrderDetailCard;
