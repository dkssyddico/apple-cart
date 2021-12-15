import items from '../data/items';

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCT = 'GET_PRODUCT';
export const CHANGE_FAVORITE = 'CHANGE_FAVORITE';

const LS_PRODUCTS = 'products';

export const getProducts = (dispatch) => {
  let products = localStorage.getItem(LS_PRODUCTS)
    ? JSON.parse(localStorage.getItem(LS_PRODUCTS))
    : [...items];
  dispatch({ type: GET_PRODUCTS, payload: products });
};

export const getProduct = (dispatch, id) => {
  dispatch({ type: GET_PRODUCT, payload: id });
};

export const changeFavorite = (dispatch, itemInfo) => {
  dispatch({ type: CHANGE_FAVORITE, payload: itemInfo });
};
