import api from "../../../app/api/api";
import { FilterTypes } from "../../../app/features/filterSlice";
import { ApiResponse } from "../../../app/utils/constant";
import { ProductDataTypes } from "../types/ProductTypes";

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

    // createRestaurant: builder.mutation<ApiResponse<RestaurantTypes>, FormData>({
    //   query: (data) => ({
    //     url: "/admin/restaurants",
    //     method: "POST",
    //     body: data,
    //   }),
    //   async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
    //     await handleOnQueryStarted(queryFulfilled, dispatch);
    //   },
    //   invalidatesTags: [{ type: "Restaurant", id: "RESTAURANT_ID" }],
    // }),

    // updateRestaurant: builder.mutation<
    //   ApiResponse<RestaurantTypes>,
    //   { id: number | undefined; data: FormData }
    // >({
    //   query: ({ id, data }) => ({
    //     url: `/admin/restaurants/${id}`,
    //     method: "PATCH",
    //     body: data,
    //   }),
    //   async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
    //     await handleOnQueryStarted(queryFulfilled, dispatch);
    //   },
    //   invalidatesTags: [{ type: "Restaurant", id: "RESTAURANT_ID" }],
    // }),
  }),
});

export const {
  useGetProductQuery,
  useDeleteProductItemMutation,
  useSingleProductItemQuery,
} = productEndpoint;
