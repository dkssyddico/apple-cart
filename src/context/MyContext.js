import { createContext, useReducer } from 'react';
import {
  GET_PRODUCTS,
  GET_PRODUCT,
  ADD_CART,
  CHANGE_QUANTITY,
  DELETE_ITEM,
  CHANGE_CHECKED_STATUS,
  CHANGED_ALL_CHECKED,
  DELETE_SELECTED,
  ADD_CHECKOUT,
  ADD_ORDER,
} from './Action';

const LS_CART = 'cart';
const LS_ORDER = 'order';

const initialState = {
  productList: {},
  loading: true,
  product: {},
  cart: localStorage.getItem(LS_CART) ? JSON.parse(localStorage.getItem(LS_CART)) : [],
  checkout: [],
  order: localStorage.getItem(LS_ORDER) ? JSON.parse(localStorage.getItem(LS_ORDER)) : [],
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
    case DELETE_SELECTED:
      let selected = action.payload;
      for (let i = 0; i < selected.length; i++) {
        let item = selected[i];
        let idx = state.cart.findIndex((e) => e.productId === item.productId);
        state.cart.splice(idx, 1);
      }
      localStorage.setItem(LS_CART, JSON.stringify(state.cart));
      return {
        ...state,
      };
    case ADD_CHECKOUT:
      return {
        ...state,
        checkout: action.payload,
      };
    case ADD_ORDER:
      let newOrder = action.payload;
      let orderAdded = [newOrder, ...state.order];
      localStorage.setItem(LS_ORDER, JSON.stringify(orderAdded));
      for (let i = 0; i < newOrder.items.length; i++) {
        let item = newOrder.items[i];
        let idx = state.cart.findIndex((e) => e.productId === item.productId);
        state.cart.splice(idx, 1);
      }
      localStorage.setItem(LS_CART, JSON.stringify(state.cart));
      return {
        ...state,
        order: orderAdded,
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
