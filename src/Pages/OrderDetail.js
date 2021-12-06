import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { Context } from '../context/MyContext';
import { addCart, getOrder } from '../context/Action';
import { v4 as uuidv4 } from 'uuid';

const Section = styled.section`
  padding: 8rem 10rem 5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease-in-out;
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

const Card = styled.div`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid ${(props) => props.theme.color.lightGray};
`;

const CardContainer = styled.div`
  display: flex;
  padding: 1rem 1.5rem;
  transition: all 0.3s ease-in-out;
  @media screen and (max-width: 767px) {
    padding: 0.8rem 1rem;
  }
`;

const ImgContainer = styled.div`
  flex-basis: 10%;
  display: flex;
  /* justify-content: center; */
  align-items: center;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
`;

const MetaContainer = styled.div`
  flex-basis: 60%;
  padding: 1.2rem 1.5rem;
  display: flex;
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

function OrderDetail() {
  let { orderId } = useParams();
  const { state, dispatch } = useContext(Context);
  const { order, cart } = state;

  let navigate = useNavigate();

  useEffect(() => {
    getOrder(dispatch, orderId);
  }, []);

  const handleCartClick = (item) => {
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
    <Section>
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
              order.items.map((item) => (
                <Card key={uuidv4()}>
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
                      <CartBtn onClick={() => handleCartClick(item)}>Add to cart</CartBtn>
                    </BtnContainer>
                  </CardContainer>
                </Card>
              ))}
          </CardsContainer>
        </Container>
      )}
    </Section>
  );
}

export default OrderDetail;
