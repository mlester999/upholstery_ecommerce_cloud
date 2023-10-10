import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../models/Product';

interface CreateProduct {
  name: string;
  description: string;
  price: number;
  category_id: string;
  seller_id: string;
  image_name: string;
  image_file: string;
}

interface UpdateProduct {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  category_id?: string;
  seller_id?: string;
  image_name?: string;
  image_file?: string;
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
      query: (details) => {
        const formData = new FormData();
        formData.append(
          'image_file',
          details.image_file,
          details.image_file.name
        );
        formData.append('details', JSON.stringify(details));

        return {
          url: `product/add`,
          method: 'POST',
          withCredentials: true,
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ['Products'],
    }),
    updateProduct: builder.mutation<UpdateProduct, UpdateProduct>({
      query: (details) => {
        const formData = new FormData();

        if (details?.image_file) {
          formData.append(
            'image_file',
            details.image_file,
            details.image_file.name
          );
        }
        formData.append('details', JSON.stringify(details));

        return {
          url: `product/update/${details?.id}`,
          method: 'PATCH',
          withCredentials: true,
          body: formData,
          formData: true,
        };
      },
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
