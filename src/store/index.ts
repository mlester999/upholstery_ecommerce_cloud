import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authentication } from '../services/authentication';
import { crudCategory } from '../services/crud-category';
import { crudCustomer } from '../services/crud-customer';
import { crudOrder } from '../services/crud-order';
import { crudProduct } from '../services/crud-product';
import { crudSeller } from '../services/crud-seller';
import { crudShop } from '../services/crud-shop';
import { crudVoucher } from '../services/crud-voucher';

export const store = configureStore({
  reducer: {
    [authentication.reducerPath]: authentication.reducer,
    [crudCustomer.reducerPath]: crudCustomer.reducer,
    [crudSeller.reducerPath]: crudSeller.reducer,
    [crudCategory.reducerPath]: crudCategory.reducer,
    [crudProduct.reducerPath]: crudProduct.reducer,
    [crudOrder.reducerPath]: crudOrder.reducer,
    [crudVoucher.reducerPath]: crudVoucher.reducer,
    [crudShop.reducerPath]: crudShop.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authentication.middleware)
      .concat(crudCustomer.middleware)
      .concat(crudSeller.middleware)
      .concat(crudCategory.middleware)
      .concat(crudProduct.middleware)
      .concat(crudOrder.middleware)
      .concat(crudVoucher.middleware)
      .concat(crudShop.middleware),
});

setupListeners(store.dispatch);
