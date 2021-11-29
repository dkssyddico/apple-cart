import items from '../data/items';
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCT = 'GET_PRODUCT';

export const getProducts = (dispatch) => {
  dispatch({ type: GET_PRODUCTS, payload: items });
};

export const getProduct = (dispatch, id) => {
  dispatch({ type: GET_PRODUCT, payload: items[id] });
};
