import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Voucher } from '../models/Voucher';

interface CreateVoucher {
  voucher_id: string;
  voucher_code: string;
  title: string;
  description: string;
  amount: number;
  mode: string;
  type: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

interface UpdateVoucher {
  id?: number;
  voucher_id?: string;
  voucher_code?: string;
  title?: string;
  description?: string;
  amount?: number;
  mode?: string;
  type?: string;
  is_active?: number;
  created_at?: string;
  updated_at?: string;
}

export const crudVoucher = createApi({
  reducerPath: 'crudVoucher',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/',
    credentials: 'include',
  }),
  tagTypes: ['Vouchers'],
  endpoints: (builder) => ({
    getVouchers: builder.query<Voucher, void>({
      query: () => ({
        url: `voucher/all`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Vouchers'],
    }),
    getVoucher: builder.query<Voucher, void>({
      query: (voucherId) => ({
        url: `voucher/${voucherId}`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Vouchers'],
    }),
    createVoucher: builder.mutation<CreateVoucher, CreateVoucher>({
      query: (details) => ({
        url: `voucher/add/new`,
        method: 'POST',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['Vouchers'],
    }),
    updateVoucher: builder.mutation<UpdateVoucher, UpdateVoucher>({
      query: (details) => ({
        url: `voucher/update/${details?.id}`,
        method: 'PATCH',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['Vouchers'],
    }),
    deactivateVoucher: builder.mutation<number, UpdateVoucher>({
      query: (id) => ({
        url: `voucher/deactivate/${id}`,
        method: 'PATCH',
        withCredentials: true,
      }),
      invalidatesTags: ['Vouchers'],
    }),
    activateVoucher: builder.mutation<number, UpdateVoucher>({
      query: (id) => ({
        url: `voucher/activate/${id}`,
        method: 'PATCH',
        withCredentials: true,
      }),
      invalidatesTags: ['Vouchers'],
    }),
  }),
});

export const {
  useGetVouchersQuery,
  useGetVoucherQuery,
  useCreateVoucherMutation,
  useUpdateVoucherMutation,
  useActivateVoucherMutation,
  useDeactivateVoucherMutation,
} = crudVoucher;
