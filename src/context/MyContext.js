import { createContext, useReducer } from 'react';
import { GET_PRODUCTS, GET_PRODUCT, ADD_CART, ADD_QUANTITY } from './Action';

const initialState = {
  productList: {},
  loading: true,
  product: {},
  cart: [],
};

export const Context = createContext({});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        productList: action.payload,
        loading: false,
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };

    case ADD_CART:
      return {
        ...state,
        cart: [action.payload, ...state.cart],
      };

    case ADD_QUANTITY:
      let { productId, quantity } = action.payload;

      let newCart = state.cart.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );
      return {
        ...state,
        cart: newCart,
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
