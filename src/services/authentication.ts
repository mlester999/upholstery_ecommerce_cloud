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

export const authentication = createApi({
  reducerPath: 'authentication',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    login: builder.mutation<Login, LoginArgs>({
      query: ({ email, password }) => ({
        url: `auth/admin/login`,
        method: 'POST',
        withCredentials: true,
        body: { email, password },
      }),
    }),
    logout: builder.mutation<Logout, void>({
      query: () => ({
        url: `auth/logout`,
        method: 'POST',
        withCredentials: true,
      }),
    }),
    getUser: builder.query<GetUser, void>({
      query: () => ({
        url: `auth/user`,
        method: 'GET',
        withCredentials: true,
      }),
    }),
    updateUser: builder.mutation<UpdateUser, UpdateUser>({
      query: (details) => ({
        url: `auth/user`,
        method: 'POST',
        withCredentials: true,
        body: { details },
      }),
    }),
    updatePass: builder.mutation<UpdatePass, UpdatePass>({
      query: (details) => ({
        url: `auth/password`,
        method: 'POST',
        withCredentials: true,
        body: { details },
      }),
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
