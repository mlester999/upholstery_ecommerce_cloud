import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authentication = createApi({
  reducerPath: 'authentication',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: `auth/login`,
        method: 'POST',
        withCredentials: true,
        body: { email, password },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `auth/logout`,
        method: 'POST',
        withCredentials: true,
      }),
    }),
    getUser: builder.query({
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
