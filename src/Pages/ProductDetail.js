import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addCart, addCheckout } from '../Actions/Shopping';
import { changeFavorite, getProduct } from '../Actions/Product';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { HiArrowLeft, HiHeart, HiOutlineHeart } from 'react-icons/hi';
import styled from 'styled-components';
import { ProductContext } from '../Contexts/Product';
import { ShoppingContext } from '../Contexts/Shopping';

const FlexContainer = styled.div`
  display: flex;
`;

const Section = styled(FlexContainer)`
  flex-wrap: wrap;
  gap: 4%;
`;

const Btn = styled.button`
  all: unset;
  padding: 12px;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
`;

const BackContainer = styled(FlexContainer)`
  margin-bottom: 2rem;
`;

const BackBtn = styled(Btn)`
  display: flex;
  padding: 0px;
  align-items: center;
`;

const BackBtnText = styled.p`
  margin-left: 0.5rem;
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
  border-radius: 16px;
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

const TopContainer = styled(FlexContainer)`
  justify-content: space-between;
  align-items: center;
`;

const FavoriteBtn = styled.button`
  all: unset;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  font-size: 1.5rem;
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
  border: 1px solid ${(props) => props.theme.color.lightGray};
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
    color: ${(props) => props.theme.color.red};
  }
`;

const BtnContainer = styled(FlexContainer)`
  gap: 4px;
`;

const CartBtn = styled(Btn)`
  flex: 1 1 45%;
  background-color: ${(props) => props.theme.color.green};
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
  const { state: productState, dispatch: productDispatch } = useContext(ProductContext);
  const { state: shoppingState, dispatch: shoppingDispatch } = useContext(ShoppingContext);
  const { product } = productState;
  const { cart } = shoppingState;
  let navigate = useNavigate();

  useEffect(() => {
    getProduct(productDispatch, productId);
  }, [productDispatch, productId]);

  const handleBackClick = () => {
    navigate('/');
  };

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
    let existence = cart.filter((item) => item.productId === productId).length > 0 ? true : false;
    if (existence) {
      let confirm = window.confirm(
        '이미 장바구니에 담겨있는 상품입니다. 장바구니로 이동하시겠습니까?'
      );
      if (confirm) {
        navigate('/cart');
      }
    } else {
      let item = {
        productId,
        name: product.name,
        quantity,
        price: product.price,
        image: product.image,
        selected: true,
      };
      addCart(shoppingDispatch, item);
      let confirm = window.confirm('상품이 장바구니에 담겼습니다. 장바구니로 이동하시겠습니까?');
      if (confirm) {
        navigate('/cart');
      }
    }
  };

  const handleShopNowClick = () => {
    let item = {
      productId,
      name: product.name,
      quantity,
      price: product.price,
      image: product.image,
      selected: true,
      favorite: product.favorite,
    };
    addCheckout(shoppingDispatch, [item]);
    navigate('/payment');
  };

  const handleFavoriteClick = () => {
    let favorite = product.favorite;
    let itemInfo = {
      productId,
      favorite: !favorite,
    };
    changeFavorite(shoppingDispatch, itemInfo);
  };

  return (
    product && (
      <>
        <BackContainer>
          <BackBtn onClick={handleBackClick}>
            <HiArrowLeft />
            <BackBtnText>Back to Main</BackBtnText>
          </BackBtn>
        </BackContainer>
        <Section>
          <ImgContainer>
            <ProductImg src={`/images/${product.image}`} alt='product' />
          </ImgContainer>
          <MetaContainer>
            <TopContainer>
              <h2>{product.name}</h2>
              <FavoriteBtn onClick={handleFavoriteClick}>
                {product.favorite ? <HiHeart /> : <HiOutlineHeart />}
              </FavoriteBtn>
            </TopContainer>
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
              <CheckoutBtn onClick={handleShopNowClick}>Shop now</CheckoutBtn>
            </BtnContainer>
          </MetaContainer>
        </Section>
      </>
    )
  );
}

export default ProductDetail;
