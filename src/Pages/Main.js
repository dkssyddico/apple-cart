import React, { useEffect } from 'react';
import { useContext } from 'react/cjs/react.development';
import styled from 'styled-components';
import ProductCard from '../Components/ProductCard';
import { getProducts } from '../context/Action';
import { Context } from '../context/MyContext';

const Section = styled.section`
  padding: 8rem 8rem 5rem;
  transition: all 0.3s ease-in-out;
  @media screen and (max-width: 1023px) {
    padding: 8rem 4rem 5rem;
  }
  @media screen and (max-width: 767px) {
    padding: 8rem 1.5rem 5rem;
  }
`;

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
  const {
    state: { loading, productList },
    dispatch,
  } = useContext(Context);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  return (
    <Section>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <Container>
          {productList.map((item) => (
            <CardContainer key={item.id}>
              <ProductCard id={item.id} image={item.image} name={item.name} price={item.price} />
            </CardContainer>
          ))}
        </Container>
      )}
    </Section>
  );
}

export default Main;
