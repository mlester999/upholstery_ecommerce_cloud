import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authentication } from '../services/authentication';
import { crudCustomer } from '../services/crud-customer';
import { crudSeller } from '../services/crud-seller';

export const store = configureStore({
  reducer: {
    [authentication.reducerPath]: authentication.reducer,
    [crudCustomer.reducerPath]: crudCustomer.reducer,
    [crudSeller.reducerPath]: crudSeller.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authentication.middleware)
      .concat(crudCustomer.middleware)
      .concat(crudSeller.middleware),
});

setupListeners(store.dispatch);
