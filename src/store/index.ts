import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authentication } from '../services/authentication';
import { crudCategory } from '../services/crud-category';
import { crudCustomer } from '../services/crud-customer';
import { crudProduct } from '../services/crud-product';
import { crudSeller } from '../services/crud-seller';

export const store = configureStore({
  reducer: {
    [authentication.reducerPath]: authentication.reducer,
    [crudCustomer.reducerPath]: crudCustomer.reducer,
    [crudSeller.reducerPath]: crudSeller.reducer,
    [crudCategory.reducerPath]: crudCategory.reducer,
    [crudProduct.reducerPath]: crudProduct.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authentication.middleware)
      .concat(crudCustomer.middleware)
      .concat(crudSeller.middleware)
      .concat(crudCategory.middleware)
      .concat(crudProduct.middleware),
});

setupListeners(store.dispatch);
