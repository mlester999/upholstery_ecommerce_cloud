import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Category } from '../models/Category';

interface CreateCategory {
  title: string;
  description: string;
}

interface UpdateCategory {
  id?: number;
  title?: string;
  description?: string;
}

export const crudCategory = createApi({
  reducerPath: 'crudCategory',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/',
    credentials: 'include',
  }),
  tagTypes: ['Categories'],
  endpoints: (builder) => ({
    getCategories: builder.query<Category, void>({
      query: () => ({
        url: `category/all`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Categories'],
    }),
    getCategory: builder.query<Category, void>({
      query: (categoryId) => ({
        url: `category/${categoryId}`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Categories'],
    }),
    createCategory: builder.mutation<CreateCategory, CreateCategory>({
      query: (details) => ({
        url: `category/add`,
        method: 'POST',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['Categories'],
    }),
    updateCategory: builder.mutation<UpdateCategory, UpdateCategory>({
      query: (details) => ({
        url: `category/update/${details?.id}`,
        method: 'PATCH',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['Categories'],
    }),
    deactivateCategory: builder.mutation<number, UpdateCategory>({
      query: (id) => ({
        url: `category/deactivate/${id}`,
        method: 'PATCH',
        withCredentials: true,
      }),
      invalidatesTags: ['Categories'],
    }),
    activateCategory: builder.mutation<number, UpdateCategory>({
      query: (id) => ({
        url: `category/activate/${id}`,
        method: 'PATCH',
        withCredentials: true,
      }),
      invalidatesTags: ['Categories'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useActivateCategoryMutation,
  useDeactivateCategoryMutation,
} = crudCategory;
