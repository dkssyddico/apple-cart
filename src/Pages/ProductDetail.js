import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../context/Action';
import { Context } from '../context/MyContext';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import styled from 'styled-components';

const Section = styled.section`
  padding: 8rem 10rem 5rem;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 4%;
  @media screen and (max-width: 1023px) {
    padding: 8rem 4rem 5rem;
  }
  @media screen and (max-width: 767px) {
    padding: 8rem 1.5rem 5rem;
  }
`;

const ImgContainer = styled.div`
  flex-basis: 48%;
  @media screen and (max-width: 767px) {
    flex-basis: 100%;
  }
`;

const ProductImg = styled.img`
  width: 100%;
  height: 350px;
`;

const FlexContainer = styled.div`
  display: flex;
`;

const MetaContainer = styled(FlexContainer)`
  height: 350px;
  flex-basis: 48%;
  flex-direction: column;
  justify-content: space-between;
  h2 {
    font-size: 20px;
  }
  @media screen and (max-width: 767px) {
    margin-top: 1rem;
    height: 300px;
    flex-basis: 100%;
  }
`;

const PriceContainer = styled(FlexContainer)`
  justify-content: space-between;
  font-size: 18px;
  h3:last-child {
    font-weight: 700;
  }
`;

const QtyContainer = styled(FlexContainer)`
  justify-content: space-between;
  align-items: center;
`;

const QtyBtnContainer = styled.div`
  width: 140px;
  height: 40px;
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

const TotalPriceContainer = styled(FlexContainer)`
  justify-content: space-between;
  align-items: center;
  p:last-child {
    font-size: 24px;
    font-weight: 700;
    color: red;
  }
`;

const BtnContainer = styled(FlexContainer)`
  gap: 4px;
`;

const Btn = styled.button`
  all: unset;
  padding: 12px;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
`;

const CartBtn = styled(Btn)`
  flex: 1 1 45%;
  background-color: ${(props) => props.theme.green};
  color: white;
`;

const CheckoutBtn = styled(Btn)`
  flex: 1 1 45%;
  border: 1px solid black;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: black;
    color: white;
  }
`;

function ProductDetail() {
  let { id: productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const {
    state: { product },
    dispatch,
  } = useContext(Context);

  useEffect(() => {
    getProduct(dispatch, productId);
  }, []);

  const handleQtyChange = (event) => {
    const { value } = event.target;
    setQuantity(value);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (parseInt(prev) === 1 ? 1 : parseInt(prev) - 1));
  };

  const handleIncrement = () => {
    setQuantity((prev) => parseInt(prev) + 1);
  };

  const handleCartClick = () => {
    let item = {
      productId,
      quantity,
    };
    console.log(item);
  };

  return (
    <>
      {product && (
        <Section>
          <ImgContainer>
            <ProductImg src={`/images/${product.image}`} alt='product' />
          </ImgContainer>
          <MetaContainer>
            <h2>{product.name}</h2>
            <PriceContainer>
              <h3>Price</h3>
              <h3>$ {product.price}</h3>
            </PriceContainer>
            <QtyContainer>
              <h3>Quantity</h3>
              <QtyBtnContainer>
                <SmallBtn onClick={handleDecrement}>
                  <AiOutlineMinus />
                </SmallBtn>
                <Input type='number' value={quantity} onChange={handleQtyChange} />
                <SmallBtn onClick={handleIncrement}>
                  <AiOutlinePlus />
                </SmallBtn>
              </QtyBtnContainer>
            </QtyContainer>
            <TotalPriceContainer>
              <p>Total Price</p>
              <p>$ {product.price * quantity}</p>
            </TotalPriceContainer>
            <BtnContainer>
              <CartBtn onClick={handleCartClick}>Add to cart</CartBtn>
              <CheckoutBtn>Shop now</CheckoutBtn>
            </BtnContainer>
          </MetaContainer>
        </Section>
      )}
    </>
  );
}

export default ProductDetail;
