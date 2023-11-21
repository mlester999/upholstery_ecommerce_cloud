import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authentication } from '../services/authentication';
import { crudAdmin } from '../services/crud-admin';
import { crudCategory } from '../services/crud-category';
import { crudCustomer } from '../services/crud-customer';
import { crudOrder } from '../services/crud-order';
import { crudProduct } from '../services/crud-product';
import { crudSeller } from '../services/crud-seller';
import { crudShop } from '../services/crud-shop';
import { crudVoucher } from '../services/crud-voucher';
import { crudActivityLog } from '../services/crud-activity-log';
import { crudReturnRefund } from '../services/crud-return-refund';
import { crudBankAccount } from '../services/crud-bank-account';
import { crudSellerBalance } from '../services/crud-seller-balance';
import { crudSellerWithdrawal } from '../services/crud-seller-withdrawal';
import { crudReview } from '../services/crud-review';

export const store = configureStore({
  reducer: {
    [authentication.reducerPath]: authentication.reducer,
    [crudAdmin.reducerPath]: crudAdmin.reducer,
    [crudCustomer.reducerPath]: crudCustomer.reducer,
    [crudSeller.reducerPath]: crudSeller.reducer,
    [crudCategory.reducerPath]: crudCategory.reducer,
    [crudProduct.reducerPath]: crudProduct.reducer,
    [crudOrder.reducerPath]: crudOrder.reducer,
    [crudVoucher.reducerPath]: crudVoucher.reducer,
    [crudShop.reducerPath]: crudShop.reducer,
    [crudActivityLog.reducerPath]: crudActivityLog.reducer,
    [crudReturnRefund.reducerPath]: crudReturnRefund.reducer,
    [crudBankAccount.reducerPath]: crudBankAccount.reducer,
    [crudSellerBalance.reducerPath]: crudSellerBalance.reducer,
    [crudSellerWithdrawal.reducerPath]: crudSellerWithdrawal.reducer,
    [crudReview.reducerPath]: crudReview.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authentication.middleware)
      .concat(crudAdmin.middleware)
      .concat(crudCustomer.middleware)
      .concat(crudSeller.middleware)
      .concat(crudCategory.middleware)
      .concat(crudProduct.middleware)
      .concat(crudOrder.middleware)
      .concat(crudVoucher.middleware)
      .concat(crudShop.middleware)
      .concat(crudActivityLog.middleware)
      .concat(crudReturnRefund.middleware)
      .concat(crudBankAccount.middleware)
      .concat(crudSellerBalance.middleware)
      .concat(crudSellerWithdrawal.middleware)
      .concat(crudReview.middleware),
});

setupListeners(store.dispatch);
