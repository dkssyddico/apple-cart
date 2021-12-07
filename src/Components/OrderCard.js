import React from 'react';
import styled from 'styled-components';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const Date = styled.h2`
  color: ${(props) => props.theme.color.darkGray};
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 1rem;
`;

const MetaContainer = styled.div`
  border: 1px solid ${(props) => props.theme.color.lightGray};
  padding: 1.2rem 1.5rem;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.color.lightGray};
  h3:first-child {
    font-weight: 500;
    font-size: 18px;
  }
  h3:last-child {
    font-size: 15px;
  }
`;

const InfoContainer = styled.div`
  padding-top: 1rem;
  display: flex;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
`;

const InfoBox = styled.div`
  padding: 0.8rem;
  h4 {
    font-size: 15px;
    margin-bottom: 0.8rem;
  }
`;

const Bold = styled.span`
  font-weight: 500;
  font-size: 16px;
`;

function OrderCard({ order }) {
  let { orderDate } = order;
  let firstItem = order.items[0];
  return (
    <Card>
      <Date>{`${orderDate}`}</Date>
      <MetaContainer>
        <Link to={`/order/${order.orderId}`}>
          <TitleContainer>
            <h3>
              {order.items.length > 1
                ? `${firstItem.name} and ${
                    order.items.length > 2
                      ? `${order.items.length - 1} more items`
                      : `${order.items.length - 1} item`
                  }`
                : `${firstItem.name}`}
            </h3>
            <h3>
              <FaArrowRight />
            </h3>
          </TitleContainer>
        </Link>
        <InfoContainer>
          <div>
            <Image src={`/images/${firstItem.image}`} alt='product' />
          </div>
          <InfoBox>
            <h4>
              Order No. <Bold>{order.orderId}</Bold>
            </h4>
            <h4>
              Total{' '}
              <Bold>
                {`$ ${order.items.reduce((prev, curr) => prev + curr.quantity * curr.price, 0)}`}
              </Bold>
            </h4>
          </InfoBox>
        </InfoContainer>
      </MetaContainer>
    </Card>
  );
}

export default OrderCard;
