import React from 'react';
import { ProductProvider } from './Product';
import { ShoppingProvider } from './Shopping';

function GlobalProvider({ children }) {
  return (
    <ProductProvider>
      <ShoppingProvider>{children}</ShoppingProvider>
    </ProductProvider>
  );
}

export default GlobalProvider;
