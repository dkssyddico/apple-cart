import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-weight: 500;
  }
`;

function Notification({ children }) {
  return (
    <Box>
      <span>{children}</span>
    </Box>
  );
}

export default Notification;
