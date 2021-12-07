import React from 'react';
import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
`;

const Card = styled(FlexContainer)`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1.5rem;
  border-bottom: 0.5px solid lightgray;
  margin-bottom: 2rem;
`;

const MetaContainer = styled(FlexContainer)`
  flex-basis: 80%;
`;

const ImgContainer = styled(FlexContainer)`
  margin-right: 1rem;
  justify-items: center;
  align-items: center;
`;

const ProductImg = styled.img`
  width: 80px;
  height: 80px;
`;

const InfoBox = styled.div`
  h3 {
    margin-bottom: 1rem;
  }
  p {
    color: ${(props) => props.theme.color.darkGray};
    font-size: 14px;
  }
`;

const PriceContainer = styled.div`
  flex-basis: 20%;
`;

function CheckoutCard({ item }) {
  const { image, quantity, price } = item;

  return (
    <Card>
      <MetaContainer>
        <ImgContainer>
          <ProductImg src={`/images/${image}`} alt='product' />
        </ImgContainer>
        <InfoBox>
          <h3>{item.name}</h3>
          <p>Qty : {quantity}</p>
        </InfoBox>
      </MetaContainer>
      <PriceContainer>$ {quantity * price}</PriceContainer>
    </Card>
  );
}

export default CheckoutCard;
