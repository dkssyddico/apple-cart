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

  input {
    outline: none;
  }


  input[type="number" i] {
    padding: 0;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
  }

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

`;

export default GlobalStyles;
