import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../models/User';

interface GetSeller {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: string;
  contact_number: string;
  user: User;
}

interface CreateSeller {
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: string;
  contact_number: string;
  birth_date: string;
  region: string;
  province: string;
  city: string;
  barangay: string;
  zip_code: string;
  street_address: string;
}

interface UpdateSeller {
  id?: number;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  gender?: string;
  contact_number?: string;
  birth_date?: string;
  region?: string;
  province?: string;
  city?: string;
  barangay?: string;
  zip_code?: string;
  street_address?: string;
}

export const crudSeller = createApi({
  reducerPath: 'crudSeller',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/',
    credentials: 'include',
  }),
  tagTypes: ['Sellers'],
  endpoints: (builder) => ({
    getSellers: builder.query<GetSeller, void>({
      query: () => ({
        url: `seller/all`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Sellers'],
    }),
    getSeller: builder.query<GetSeller, void>({
      query: (sellerId) => ({
        url: `seller/${sellerId}`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Sellers'],
    }),
    createSeller: builder.mutation<CreateSeller, CreateSeller>({
      query: (details) => ({
        url: `seller/add`,
        method: 'POST',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['Sellers'],
    }),
    updateSeller: builder.mutation<UpdateSeller, UpdateSeller>({
      query: (details) => ({
        url: `seller/update/${details?.id}`,
        method: 'PATCH',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['Sellers'],
    }),
    deactivateSeller: builder.mutation<number, UpdateSeller>({
      query: (id) => ({
        url: `seller/deactivate/${id}`,
        method: 'PATCH',
        withCredentials: true,
      }),
      invalidatesTags: ['Sellers'],
    }),
    activateSeller: builder.mutation<number, UpdateSeller>({
      query: (id) => ({
        url: `seller/activate/${id}`,
        method: 'PATCH',
        withCredentials: true,
      }),
      invalidatesTags: ['Sellers'],
    }),
  }),
});

export const {
  useGetSellersQuery,
  useGetSellerQuery,
  useCreateSellerMutation,
  useUpdateSellerMutation,
  useActivateSellerMutation,
  useDeactivateSellerMutation,
} = crudSeller;
