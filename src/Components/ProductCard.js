import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HiOutlineHeart } from 'react-icons/hi';

const Card = styled.div`
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
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MetaLeft = styled.div`
  h2 {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
  h3 {
    font-weight: 500;
  }
`;

const MetaRight = styled.div`
  font-size: 1.3rem;
`;

function ProductCard({ id, image, name, price }) {
  return (
    <Link to={`/product/${id}`}>
      <Card>
        <div>
          <ProductImg src={`/images/${image}`} alt='product' />
        </div>
        <MetaContainer>
          <MetaLeft>
            <h2>{name}</h2>
            <h3>$ {price}</h3>
          </MetaLeft>
          <MetaRight>
            <HiOutlineHeart />
          </MetaRight>
        </MetaContainer>
      </Card>
    </Link>
  );
}

export default ProductCard;
