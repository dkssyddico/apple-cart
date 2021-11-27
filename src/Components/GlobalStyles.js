import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}
  
  body {
    width: 100%;
    height: 100vh;
    font-family: 'Montserrat', sans-serif !important;
  }

  ul, li {
    list-style: none;
  }

  a {
    all: unset;
    cursor: pointer;
  }

`;

export default GlobalStyles;
