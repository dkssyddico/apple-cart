import items from '../data/items';
export const GET_PRODUCTS = 'GET_PRODUCTS';

export const getProducts = (dispatch) => {
  dispatch({ type: GET_PRODUCTS, payload: items });
};
