import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Login } from '../models/Login';
import { Logout } from '../models/Logout';
import { User } from '../models/User';

interface LoginArgs {
  email: string;
  password: string;
}

interface GetUser {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: string;
  contact_number: string;
  user: User;
}

interface UpdateUser {
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  gender?: string;
  contact_number?: string;
}

interface UpdatePass {
  current_password?: string;
  new_password?: string;
  confirm_new_password?: string;
}

console.log(process.env.REACT_APP_API_URL);

export const authentication = createApi({
  reducerPath: 'authentication',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    credentials: 'include',
  }),
  tagTypes: ['Authentication'],
  endpoints: (builder) => ({
    login: builder.mutation<Login, LoginArgs>({
      query: ({ email, password }) => ({
        url: `auth/admin/login`,
        method: 'POST',
        withCredentials: true,
        body: { email, password },
      }),
      invalidatesTags: ['Authentication'],
    }),
    logout: builder.mutation<Logout, void>({
      query: () => ({
        url: `auth/admin/logout`,
        method: 'POST',
        withCredentials: true,
      }),
      invalidatesTags: ['Authentication'],
    }),
    getUser: builder.query<GetUser, void>({
      query: () => ({
        url: `auth/admin/user`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Authentication'],
    }),
    updateUser: builder.mutation<UpdateUser, UpdateUser>({
      query: (details) => ({
        url: `auth/admin/user`,
        method: 'POST',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['Authentication'],
    }),
    updatePass: builder.mutation<UpdatePass, UpdatePass>({
      query: (details) => ({
        url: `auth/admin/password`,
        method: 'POST',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['Authentication'],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdatePassMutation,
} = authentication;
