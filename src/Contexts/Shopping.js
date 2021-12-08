import { createContext, useReducer } from 'react';
import {
  ADD_CART,
  CHANGE_QUANTITY,
  DELETE_ITEM,
  CHANGE_CHECKED_STATUS,
  CHANGED_ALL_CHECKED,
  DELETE_SELECTED,
  ADD_CHECKOUT,
  ADD_ORDER,
  GET_ORDER,
  GET_ORDERS,
} from '../Actions/Shopping';

const LS_CART = 'cart';
const LS_ORDER = 'orders';

const setLocalStorage = (storageName, item) => {
  localStorage.setItem(storageName, JSON.stringify(item));
};

export const ShoppingContext = createContext({});

const initialState = {
  cart: localStorage.getItem(LS_CART) ? JSON.parse(localStorage.getItem(LS_CART)) : [],
  checkout: [],
  orders: localStorage.getItem(LS_ORDER) ? JSON.parse(localStorage.getItem(LS_ORDER)) : [],
  order: {},
  selectedOrders: [],
  hasOrdersMore: null,
};

const reducer = (state = initialState, action) => {
  let newCart;
  switch (action.type) {
    // Cart Part
    case ADD_CART:
      newCart = [action.payload, ...state.cart];
      setLocalStorage(LS_CART, newCart);
      return {
        ...state,
        cart: newCart,
      };
    case CHANGE_QUANTITY:
      let { productId, quantity } = action.payload;
      newCart = state.cart.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );
      setLocalStorage(LS_CART, newCart);
      return {
        ...state,
        cart: newCart,
      };
    case DELETE_ITEM:
      let deletedItemId = action.payload;
      newCart = state.cart.filter((item) => item.productId !== deletedItemId);
      setLocalStorage(LS_CART, newCart);
      return {
        ...state,
        cart: newCart,
      };
    case CHANGE_CHECKED_STATUS:
      let itemCheckedChanged = action.payload;
      newCart = state.cart.map((item) =>
        item.productId === itemCheckedChanged.productId
          ? { ...item, selected: itemCheckedChanged.selected }
          : item
      );
      setLocalStorage(LS_CART, newCart);
      return {
        ...state,
        cart: newCart,
      };
    case CHANGED_ALL_CHECKED:
      let allChecked = action.payload;
      newCart = state.cart.map((item) => {
        return { ...item, selected: !allChecked };
      });
      setLocalStorage(LS_CART, newCart);
      return {
        ...state,
        cart: newCart,
      };
    case DELETE_SELECTED:
      let selected = action.payload;
      for (let i = 0; i < selected.length; i++) {
        let item = selected[i];
        let idx = state.cart.findIndex((e) => e.productId === item.productId);
        state.cart.splice(idx, 1);
      }
      setLocalStorage(LS_CART, state.cart);
      return {
        ...state,
      };
    case ADD_CHECKOUT:
      return {
        ...state,
        checkout: action.payload,
      };

    // Order Part
    case ADD_ORDER:
      let newOrder = action.payload;
      let orderAdded = [newOrder, ...state.orders];
      setLocalStorage(LS_ORDER, orderAdded);
      newCart = [...state.cart];
      for (let i = 0; i < newOrder.items.length; i++) {
        let item = newOrder.items[i];
        let idx = newCart.findIndex((e) => e.productId === item.productId);
        newCart.splice(idx, 1);
      }
      setLocalStorage(LS_CART, newCart);
      return {
        ...state,
        cart: newCart,
        orders: orderAdded,
      };
    case GET_ORDERS:
      let pageNumber = action.payload;
      let selectedOrder = state.orders.slice(0, pageNumber * 3);
      return {
        ...state,
        selectedOrders: [...selectedOrder],
        hasOrdersMore: state.orders.length > selectedOrder.length ? true : false,
      };

    case GET_ORDER:
      let orderId = action.payload;
      let orderSelected = state.orders.filter((order) => String(order.orderId) === String(orderId));
      return {
        ...state,
        order: orderSelected[0],
      };

    default:
      return initialState;
  }
};

export const ShoppingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <ShoppingContext.Provider value={value}>{children}</ShoppingContext.Provider>;
};
