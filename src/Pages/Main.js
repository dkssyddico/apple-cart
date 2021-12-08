import React, { useEffect } from 'react';
import { useContext } from 'react/cjs/react.development';
import styled from 'styled-components';
import ProductCard from '../Components/ProductCard';
import { getProducts } from '../Actions/Product';
import { ProductContext } from '../Contexts/Product';
import Notification from '../Components/Notification';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 3%;
`;

const CardContainer = styled.div`
  flex-basis: 22.5%;
  margin-bottom: 2rem;
  @media screen and (max-width: 1023px) {
    flex-basis: 48%;
  }
`;

function Main() {
  const { state, dispatch } = useContext(ProductContext);
  const { loading, productList } = state;

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Notification>Loading</Notification>
      ) : (
        <Container>
          {productList.map((item) => (
            <CardContainer key={item.id}>
              <ProductCard
                id={item.id}
                image={item.image}
                name={item.name}
                price={item.price}
                favorite={item.favorite}
              />
            </CardContainer>
          ))}
        </Container>
      )}
    </>
  );
}

export default Main;
