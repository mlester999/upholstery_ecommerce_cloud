import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Login } from '../models/Login';
import { Logout } from '../models/Logout';
import { User } from '../models/User';

interface LoginArgs {
  email: string;
  password: string;
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
        url: `auth/login`,
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
    getUser: builder.query<User, void>({
      query: () => ({
        url: `auth/user`,
        method: 'GET',
        withCredentials: true,
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useGetUserQuery } =
  authentication;
