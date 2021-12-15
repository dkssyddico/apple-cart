import { createContext, useReducer } from 'react';
import items from '../data/items';
import { GET_PRODUCTS, GET_PRODUCT, CHANGE_FAVORITE } from '../Actions/Product';

const LS_CART = 'cart';
const LS_ORDER = 'orders';
const LS_PRODUCTS = 'products';

const setLocalStorage = (storageName, item) => {
  localStorage.setItem(storageName, JSON.stringify(item));
};

const initialState = {
  productList: localStorage.getItem(LS_PRODUCTS)
    ? JSON.parse(localStorage.getItem(LS_PRODUCTS))
    : [...items],
  loading: true,
  product: {},
  cart: localStorage.getItem(LS_CART) ? JSON.parse(localStorage.getItem(LS_CART)) : [],
  checkout: [],
  orders: localStorage.getItem(LS_ORDER) ? JSON.parse(localStorage.getItem(LS_ORDER)) : [],
  order: {},
  selectedOrders: [],
  hasOrdersMore: null,
};

export const ProductContext = createContext({});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      let products = action.payload;
      setLocalStorage(LS_PRODUCTS, products);
      return {
        ...state,
        productList: products,
        loading: false,
      };
    case GET_PRODUCT:
      const productId = action.payload;
      return {
        ...state,
        product: state.productList[productId],
      };
    case CHANGE_FAVORITE:
      let productFavoriteChanged = action.payload;
      let productChanged = state.productList[productFavoriteChanged.productId];
      productChanged.favorite = productFavoriteChanged.favorite;
      let listChanged = state.productList.filter((product) =>
        String(product.productId) === String(productFavoriteChanged.id)
          ? { ...product, favorite: productFavoriteChanged.favorite }
          : product
      );
      setLocalStorage(LS_PRODUCTS, listChanged);
      return {
        ...state,
        product: productChanged,
        productList: listChanged,
      };

    default:
      return initialState;
  }
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
