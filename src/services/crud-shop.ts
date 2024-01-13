import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Shop } from '../models/Shop';

interface CreateShop {
  name: string;
  description: string;
}

interface UpdateShop {
  id?: number;
  name?: string;
  description?: string;
}

export const crudShop = createApi({
  reducerPath: 'crudShop',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
  }),
  tagTypes: ['Shops'],
  endpoints: (builder) => ({
    getShops: builder.query<Shop, void>({
      query: () => ({
        url: `shop/all`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Shops'],
    }),
    getShop: builder.query<Shop, void>({
      query: (shopId) => ({
        url: `shop/${shopId}`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Shops'],
    }),
    createShop: builder.mutation<CreateShop, CreateShop>({
      query: (details) => ({
        url: `shop/add`,
        method: 'POST',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['Shops'],
    }),
    updateShop: builder.mutation<UpdateShop, UpdateShop>({
      query: (details) => ({
        url: `shop/update/${details?.id}`,
        method: 'PATCH',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['Shops'],
    }),
    deactivateShop: builder.mutation<number, UpdateShop>({
      query: (id) => ({
        url: `shop/deactivate/${id}`,
        method: 'PATCH',
        withCredentials: true,
      }),
      invalidatesTags: ['Shops'],
    }),
    activateShop: builder.mutation<number, UpdateShop>({
      query: (id) => ({
        url: `shop/activate/${id}`,
        method: 'PATCH',
        withCredentials: true,
      }),
      invalidatesTags: ['Shops'],
    }),
  }),
});

export const {
  useGetShopsQuery,
  useGetShopQuery,
  useCreateShopMutation,
  useUpdateShopMutation,
  useActivateShopMutation,
  useDeactivateShopMutation,
} = crudShop;
