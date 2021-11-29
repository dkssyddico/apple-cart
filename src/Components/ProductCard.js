import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HiOutlineHeart } from 'react-icons/hi';

const ProductImg = styled.img`
  width: 100%;
  height: 230px;
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
      <div>
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
      </div>
    </Link>
  );
}

export default ProductCard;
