import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../models/User';

interface GetAdmin {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: string;
  contact_number: string;
  user: User;
}

interface CreateAdmin {
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: string;
  contact_number: string;
}

interface UpdateAdmin {
  id?: number;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  gender?: string;
  contact_number?: string;
}

export const crudAdmin = createApi({
  reducerPath: 'crudAdmin',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_URL,
    credentials: 'include',
  }),
  tagTypes: ['Admins'],
  endpoints: (builder) => ({
    getAdmins: builder.query<GetAdmin, void>({
      query: () => ({
        url: `admin/all`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Admins'],
    }),
    getAdmin: builder.query<GetAdmin, void>({
      query: (adminId) => ({
        url: `admin/${adminId}`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Admins'],
    }),
    createAdmin: builder.mutation<CreateAdmin, CreateAdmin>({
      query: (details) => ({
        url: `admin/add`,
        method: 'POST',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['Admins'],
    }),
    updateAdmin: builder.mutation<UpdateAdmin, UpdateAdmin>({
      query: (details) => ({
        url: `admin/update/${details?.id}`,
        method: 'PATCH',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['Admins'],
    }),
    deactivateAdmin: builder.mutation<number, UpdateAdmin>({
      query: (id) => ({
        url: `admin/deactivate/${id}`,
        method: 'PATCH',
        withCredentials: true,
      }),
      invalidatesTags: ['Admins'],
    }),
    activateAdmin: builder.mutation<number, UpdateAdmin>({
      query: (id) => ({
        url: `admin/activate/${id}`,
        method: 'PATCH',
        withCredentials: true,
      }),
      invalidatesTags: ['Admins'],
    }),
  }),
});

export const {
  useGetAdminsQuery,
  useGetAdminQuery,
  useCreateAdminMutation,
  useUpdateAdminMutation,
  useActivateAdminMutation,
  useDeactivateAdminMutation,
} = crudAdmin;
