import { createContext, useReducer } from 'react';
import { GET_PRODUCTS, GET_PRODUCT } from './Action';

const initialState = {
  productList: {},
  loading: true,
  product: {},
};

export const Context = createContext({});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        productList: action.payload,
        loading: false,
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    default:
      return initialState;
  }
};

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
