import api from "../../../app/api/api";
import { FilterTypes } from "../../../app/features/filterSlice";
import { ApiResponse } from "../../../app/utils/constant";
import { CartTypes } from "../types/CartTypes";

const cartEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<ApiResponse<CartTypes[]>, FilterTypes>({
      query: (params) => ({
        url: "/cart",
        params,
      }),
      providesTags: [{ type: "Cart", id: "Cart_ID" }],
    }),

    deleteCartItem: builder.mutation<ApiResponse<CartTypes>, { id: string }>({
      query: ({ id }) => ({
        url: `/cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Cart", id: "Cart_ID" }],
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

export const { useGetCartQuery, useDeleteCartItemMutation } = cartEndpoint;
