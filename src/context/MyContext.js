import { createContext, useReducer } from 'react';
import { GET_PRODUCTS } from './Action';

const initialState = {
  productList: {},
  loading: true,
};

export const Context = createContext({});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        productList: action.payload,
        loading: false,
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
