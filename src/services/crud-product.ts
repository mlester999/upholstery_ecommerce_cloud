import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../models/Product';

interface CreateProduct {
  name: string;
  description: string;
  price: number;
  category_id: string;
  seller_id: string;
  file_name: string;
}

interface UpdateProduct {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  category_id?: string;
  seller_id?: string;
  file_name?: string;
}

export const crudProduct = createApi({
  reducerPath: 'crudProduct',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/',
    credentials: 'include',
  }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<Product, void>({
      query: () => ({
        url: `product/all`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Products'],
    }),
    getProduct: builder.query<Product, void>({
      query: (productId) => ({
        url: `product/${productId}`,
        method: 'GET',
        withCredentials: true,
      }),
      providesTags: ['Products'],
    }),
    createProduct: builder.mutation<CreateProduct, CreateProduct>({
      query: (details) => ({
        url: `product/add`,
        method: 'POST',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['Products'],
    }),
    updateProduct: builder.mutation<UpdateProduct, UpdateProduct>({
      query: (details) => ({
        url: `product/update/${details?.id}`,
        method: 'PATCH',
        withCredentials: true,
        body: { details },
      }),
      invalidatesTags: ['Products'],
    }),
    deactivateProduct: builder.mutation<number, UpdateProduct>({
      query: (id) => ({
        url: `product/deactivate/${id}`,
        method: 'PATCH',
        withCredentials: true,
      }),
      invalidatesTags: ['Products'],
    }),
    activateProduct: builder.mutation<number, UpdateProduct>({
      query: (id) => ({
        url: `product/activate/${id}`,
        method: 'PATCH',
        withCredentials: true,
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useActivateProductMutation,
  useDeactivateProductMutation,
} = crudProduct;
