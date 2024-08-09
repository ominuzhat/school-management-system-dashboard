import api from "../../../app/api/api";
import { FilterTypes } from "../../../app/features/filterSlice";
import { ApiResponse } from "../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../app/utils/onQueryStartedHandler";

const orderEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getOrder: builder.query<ApiResponse<any[]>, FilterTypes>({
      query: (params) => ({
        url: "/order",
        params,
      }),
      providesTags: [{ type: "Order", id: "Order_ID" }],
    }),

    singleOrderItem: builder.query<ApiResponse<any>, { id: number }>({
      query: ({ id }) => ({
        url: `/order/${id}`,
      }),
      providesTags: [{ type: "Order", id: "Order_ID" }],
    }),

    deleteOrderItem: builder.mutation<
      ApiResponse<any>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Order", id: "Order_ID" }],
    }),

    createOrder: builder.mutation<ApiResponse<any>, FormData>(
      {
        query: (data) => ({
          url: "/order",
          method: "POST",
          body: data,
        }),
        async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
          await handleOnQueryStarted(queryFulfilled, dispatch);
        },
        invalidatesTags: [{ type: "Order", id: "Order_ID" }],
      }
    ),

    updateOrder: builder.mutation<
      ApiResponse<any>,
      { id: number | undefined; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/order/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [{ type: "Order", id: "Order_ID" }],
    }),
  }),
});

export const {
  useGetOrderQuery,
  useDeleteOrderItemMutation,
  useSingleOrderItemQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
} = orderEndpoint;
