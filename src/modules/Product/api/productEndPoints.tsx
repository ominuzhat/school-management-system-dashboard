import api from "../../../app/api/api";
import { FilterTypes } from "../../../app/features/filterSlice";
import { ApiResponse } from "../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../app/utils/onQueryStartedHandler";
import { ProductDataTypes, TCreateProductTypes } from "../types/ProductTypes";

const productEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query<ApiResponse<ProductDataTypes[]>, FilterTypes>({
      query: (params) => ({
        url: "/product",
        params,
      }),
      providesTags: [{ type: "Product", id: "Product_ID" }],
    }),

    singleProductItem: builder.query<ApiResponse<any>, { id: number }>({
      query: ({ id }) => ({
        url: `/product/${id}`,
      }),
      providesTags: [{ type: "Product", id: "Product_ID" }],
    }),

    deleteProductItem: builder.mutation<
      ApiResponse<ProductDataTypes>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Product", id: "Product_ID" }],
    }),

    createProduct: builder.mutation<ApiResponse<TCreateProductTypes>, FormData>(
      {
        query: (data) => ({
          url: "/product",
          method: "POST",
          body: data,
        }),
        async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
          await handleOnQueryStarted(queryFulfilled, dispatch);
        },
        invalidatesTags: [{ type: "Product", id: "Product_ID" }],
      }
    ),

    updateProduct: builder.mutation<
      ApiResponse<TCreateProductTypes>,
      { id: number | undefined; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/product/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [{ type: "Product", id: "Product_ID" }],
    }),
  }),
});

export const {
  useGetProductQuery,
  useDeleteProductItemMutation,
  useSingleProductItemQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} = productEndpoint;
