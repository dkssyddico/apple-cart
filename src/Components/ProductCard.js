import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { ProductContext } from '../Contexts/Product';
import { changeFavorite } from '../Actions/Product';

const Card = styled.div`
  position: relative;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 16px;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
  @media screen and (max-width: 1023px) {
    &:hover {
      /* transform: none; */
    }
  }
`;

const ProductImg = styled.img`
  width: 100%;
  height: 200px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

const MetaContainer = styled.div`
  padding: 1rem;
  h2 {
    margin-bottom: 0.8rem;
  }
`;

const FavoriteBox = styled.div`
  position: absolute;
  font-size: 1.8rem;
  bottom: 0.5rem;
  right: 0.8rem;
  z-index: 1;
  cursor: pointer;
  button {
    all: unset;
  }
`;

function ProductCard({ id, image, name, price, favorite }) {
  const { dispatch } = useContext(ProductContext);
  const handleFavoriteClick = () => {
    let itemInfo = {
      productId: id,
      favorite: !favorite,
    };
    changeFavorite(dispatch, itemInfo);
  };

  return (
    <Card>
      <Link to={`/product/${id}`}>
        <div>
          <ProductImg src={`/images/${image}`} alt='product' />
        </div>
        <MetaContainer>
          <h2>{name}</h2>
          <h3>$ {price}</h3>
        </MetaContainer>
      </Link>
      <FavoriteBox onClick={handleFavoriteClick}>
        <button>{favorite ? <HiHeart /> : <HiOutlineHeart />}</button>
      </FavoriteBox>
    </Card>
  );
}

export default ProductCard;
