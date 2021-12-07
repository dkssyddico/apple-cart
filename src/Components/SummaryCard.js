import React from 'react';
import styled from 'styled-components';

const SummaryContainer = styled.div`
  height: 200px;
  flex-basis: 30%;
  border: 1px solid ${(props) => props.theme.color.whiteGray};
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h2 {
    align-self: flex-end;
  }
  @media screen and (max-width: 767px) {
    flex-basis: 100%;
  }
`;

const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  font-size: 20px;
`;

const PayNowBtn = styled.button`
  all: unset;
  padding: 12px;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
  background-color: ${(props) => (props.disabled ? '#b2bec3' : props.theme.color.green)};
  color: white;
  font-weight: 500;
`;

function SummaryCard({ items, handleBtnClick, btnContent }) {
  const handleClick = () => {
    handleBtnClick();
  };

  return (
    <SummaryContainer>
      <h2>{items.length > 1 ? `${items.length} items` : `${items.length} item`}</h2>
      <TotalContainer>
        <h2>Total</h2>
        <h2>{`$ ${items.reduce((prev, curr) => prev + curr.quantity * curr.price, 0)}`}</h2>
      </TotalContainer>
      <PayNowBtn onClick={handleClick} disabled={items.length === 0 ? true : false}>
        {btnContent}
      </PayNowBtn>
    </SummaryContainer>
  );
}

export default SummaryCard;
