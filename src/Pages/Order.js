import React, { useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../context/MyContext';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

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

const Span = styled.span`
  font-weight: 500;
  font-size: 16px;
`;

const NoOrderContainer = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-weight: 500;
  }
`;

function Order() {
  const { state } = useContext(Context);
  const { orders } = state;
  return (
    <Section>
      <Title>Order History</Title>
      <Container>
        {orders && orders.length > 0 ? (
          orders.map((order) => {
            let { orderDate } = order;
            let firstItem = order.items[0];
            return (
              <Card key={uuidv4()}>
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
                        Order No. <Span>{order.orderId}</Span>
                      </h4>
                      <h4>
                        Total{' '}
                        <Span>
                          {`$ ${order.items.reduce(
                            (prev, curr) => prev + curr.quantity * curr.price,
                            0
                          )}`}
                        </Span>
                      </h4>
                    </InfoBox>
                  </InfoContainer>
                </MetaContainer>
              </Card>
            );
          })
        ) : (
          <NoOrderContainer>
            <span>No order</span>
          </NoOrderContainer>
        )}
      </Container>
    </Section>
  );
}

export default Order;
