import React, { useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../context/MyContext';

const Section = styled.section`
  padding: 8rem 10rem 5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
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
`;

const Container = styled.div`
  padding: 1.5rem 0;
`;

function Order() {
  const { state } = useContext(Context);
  const { orders } = state;
  return (
    <Section>
      <Title>Order History</Title>
      <Container>
        {orders &&
          orders.map((order) => {
            let { orderDate } = order;
            let firstItem = order.items[0];
            return (
              <div>
                <h2>{`${orderDate}`}</h2>
                <div>
                  <div>
                    <h3>
                      {order.items.length > 1
                        ? `${firstItem.name} and ${
                            order.items.length > 2
                              ? `${order.items.length - 1} more items`
                              : `${order.items.length - 1} item`
                          }`
                        : `${firstItem.name}`}
                    </h3>
                    <h3>Go to Detail</h3>
                  </div>
                  <div></div>
                  <div>
                    <div>
                      <img width='50px' src={`/images/${firstItem.image}`} alt='product' />
                    </div>
                    <div>
                      <h4>
                        Order No. <span>{order.orderId}</span>
                      </h4>
                      <h4>
                        Total ${' '}
                        {order.items.reduce((prev, curr) => prev + curr.quantity * curr.price, 0)}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </Container>
    </Section>
  );
}

export default Order;
