import api from "../../../app/api/api";
import { FilterTypes } from "../../../app/features/filterSlice";
import { ApiResponse } from "../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../app/utils/onQueryStartedHandler";
import { RestaurantTypes } from "../types/RestaurantTypes";

const restaurantsEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getRestaurants: builder.query<ApiResponse<RestaurantTypes[]>, FilterTypes>({
      query: (params) => ({
        url: "/admin/restaurants",
        params,
      }),
      providesTags: [{ type: "Restaurant", id: "RESTAURANT_ID" }],
    }),

    createRestaurant: builder.mutation<ApiResponse<RestaurantTypes>, FormData>({
      query: (data) => ({
        url: "/admin/restaurants",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [{ type: "Restaurant", id: "RESTAURANT_ID" }],
    }),

    updateRestaurant: builder.mutation<
      ApiResponse<RestaurantTypes>,
      { id: number | undefined; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/admin/restaurants/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [{ type: "Restaurant", id: "RESTAURANT_ID" }],
    }),
  }),
});

export const {
  useGetRestaurantsQuery,
  useCreateRestaurantMutation,
  useUpdateRestaurantMutation,
} = restaurantsEndpoint;
