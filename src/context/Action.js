import items from '../data/items';

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCT = 'GET_PRODUCT';
export const ADD_CART = 'ADD_CART';
export const CHANGE_QUANTITY = 'CHANGE_QUANTITY';

export const getProducts = (dispatch) => {
  dispatch({ type: GET_PRODUCTS, payload: items });
};

export const getProduct = (dispatch, id) => {
  dispatch({ type: GET_PRODUCT, payload: items[id] });
};

export const addCart = (dispatch, itemInfo) => {
  dispatch({ type: ADD_CART, payload: itemInfo });
};

export const changeQty = (dispatch, itemInfo) => {
  dispatch({ type: CHANGE_QUANTITY, payload: itemInfo });
};
