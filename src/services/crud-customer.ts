import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../models/User';

interface GetUser {
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

export const crudCustomer = createApi({
  reducerPath: 'crudCustomer',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getCustomers: builder.query<GetUser, void>({
      query: () => ({
        url: `customer/all`,
        method: 'GET',
        withCredentials: true,
      }),
    }),
    getCustomer: builder.query<GetUser, void>({
      query: (customerId) => ({
        url: `customer/${customerId}`,
        method: 'GET',
        withCredentials: true,
      }),
    }),
    createCustomer: builder.mutation<CreateCustomer, CreateCustomer>({
      query: (details) => ({
        url: `customer/add`,
        method: 'POST',
        withCredentials: true,
        body: { details },
      }),
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useGetCustomerQuery,
  useCreateCustomerMutation,
} = crudCustomer;
