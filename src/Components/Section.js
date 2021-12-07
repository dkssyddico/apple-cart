import React from 'react';
import styled from 'styled-components';

const Container = styled.section`
  padding: 8rem 8rem 5rem;
  transition: all 0.3s ease-in-out;
  @media screen and (max-width: 1023px) {
    padding: 8rem 4rem 5rem;
  }
  @media screen and (max-width: 767px) {
    padding: 8rem 1.5rem 5rem;
  }
`;

function Section({ children }) {
  return <Container>{children}</Container>;
}

export default Section;
