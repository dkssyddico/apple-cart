import items from '../data/items';

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCT = 'GET_PRODUCT';
export const ADD_CART = 'ADD_CART';
export const CHANGE_QUANTITY = 'CHANGE_QUANTITY';
export const DELETE_ITEM = 'CART/DELETE_ITEM';
export const CHANGE_CHECKED_STATUS = 'CHANGE_CHECKED_STATUS';
export const CHANGED_ALL_CHECKED = 'CHANGED_ALL_CHECKED';
export const DELETE_SELECTED = 'DELETE_SELECTED';
export const ADD_CHECKOUT = 'ADD_CHECKOUT';
export const ADD_ORDER = 'ADD_ORDER';

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

export const deleteItem = (dispatch, productId) => {
  dispatch({ type: DELETE_ITEM, payload: productId });
};

export const changeChecked = (dispatch, itemInfo) => {
  dispatch({ type: CHANGE_CHECKED_STATUS, payload: itemInfo });
};

export const changeAllChecked = (dispatch, checked) => {
  dispatch({ type: CHANGED_ALL_CHECKED, payload: checked });
};

export const deleteSelected = (dispatch, items) => {
  dispatch({ type: DELETE_SELECTED, payload: items });
};

export const addCheckout = (dispatch, items) => {
  dispatch({ type: ADD_CHECKOUT, payload: items });
};

export const addOrder = (dispatch, orderInfo) => {
  dispatch({ type: ADD_ORDER, payload: orderInfo });
};
