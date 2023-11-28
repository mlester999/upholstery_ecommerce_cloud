import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../models/User';

interface GetCustomer {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: string;
  contact_number: string;
  user: User;
}

interface CreateCustomer {
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

interface UpdateCustomer {
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

export const crudCustomer = createApi({
  reducerPath: 'crudCustomer',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
  }),
  tagTypes: ['Customers'],
  endpoints: (builder) => ({
    getCustomers: builder.query<GetCustomer, void>({
      query: () => ({
        url: `customer/all`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Customers'],
    }),
    getCustomer: builder.query<GetCustomer, void>({
      query: (customerId) => ({
        url: `customer/${customerId}`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Customers'],
    }),
    createCustomer: builder.mutation<CreateCustomer, CreateCustomer>({
      query: (details) => ({
        url: `customer/add`,
        method: 'POST',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['Customers'],
    }),
    updateCustomer: builder.mutation<UpdateCustomer, UpdateCustomer>({
      query: (details) => ({
        url: `customer/update/${details?.id}`,
        method: 'PATCH',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['Customers'],
    }),
    deactivateCustomer: builder.mutation<number, UpdateCustomer>({
      query: (id) => ({
        url: `customer/deactivate/${id}`,
        method: 'PATCH',
        withCredentials: true,
      }),
      invalidatesTags: ['Customers'],
    }),
    activateCustomer: builder.mutation<number, UpdateCustomer>({
      query: (id) => ({
        url: `customer/activate/${id}`,
        method: 'PATCH',
        withCredentials: true,
      }),
      invalidatesTags: ['Customers'],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useGetCustomerQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useActivateCustomerMutation,
  useDeactivateCustomerMutation,
} = crudCustomer;
