import { createContext, useReducer } from 'react';
import {
  GET_PRODUCTS,
  GET_PRODUCT,
  ADD_CART,
  CHANGE_QUANTITY,
  DELETE_ITEM,
  CHANGE_CHECKED_STATUS,
  CHANGED_ALL_CHECKED,
} from './Action';

const LS_CART = 'cart';

const initialState = {
  productList: {},
  loading: true,
  product: {},
  cart: localStorage.getItem(LS_CART) ? JSON.parse(localStorage.getItem(LS_CART)) : [],
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
      let cartAdded = [action.payload, ...state.cart];
      localStorage.setItem(LS_CART, JSON.stringify(cartAdded));
      return {
        ...state,
        cart: cartAdded,
      };
    case CHANGE_QUANTITY:
      let { productId, quantity } = action.payload;
      let cartChangedQty = state.cart.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );
      localStorage.setItem(LS_CART, JSON.stringify(cartChangedQty));
      return {
        ...state,
        cart: cartChangedQty,
      };
    case DELETE_ITEM:
      let deletedItemId = action.payload;
      let remained = state.cart.filter((item) => item.productId !== deletedItemId);
      localStorage.setItem(LS_CART, JSON.stringify(remained));
      return {
        ...state,
        cart: remained,
      };
    case CHANGE_CHECKED_STATUS:
      let itemCheckedChanged = action.payload;
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.productId === itemCheckedChanged.productId
            ? { ...item, selected: itemCheckedChanged.selected }
            : item
        ),
      };
    case CHANGED_ALL_CHECKED:
      let allChecked = action.payload;
      return {
        ...state,
        cart: state.cart.map((item) => {
          return { ...item, selected: !allChecked };
        }),
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
