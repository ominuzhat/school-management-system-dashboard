import api from "../../../app/api/api";
import { FilterTypes } from "../../../app/features/filterSlice";
import { ApiResponse } from "../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../app/utils/onQueryStartedHandler";
import { TServiceDataTypes } from "../types/serviceTypes";

const serviceEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getService: builder.query<ApiResponse<TServiceDataTypes[]>, FilterTypes>({
      query: (params) => ({
        url: "/our-service",
        params,
      }),
      providesTags: [{ type: "Service", id: "Service_ID" }],
    }),

    singleServiceItem: builder.query<ApiResponse<any>, { id: number }>({
      query: ({ id }) => ({
        url: `/our-service/${id}`,
      }),
      providesTags: [{ type: "Service", id: "Service_ID" }],
    }),

    deleteServiceItem: builder.mutation<
      ApiResponse<TServiceDataTypes>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/our-service/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Service", id: "Service_ID" }],
    }),

    createService: builder.mutation<ApiResponse<TServiceDataTypes>, FormData>({
      query: (data) => ({
        url: "/our-service",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [{ type: "Service", id: "Service_ID" }],
    }),

    updateService: builder.mutation<
      ApiResponse<TServiceDataTypes>,
      { id: number | undefined; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/our-service/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [{ type: "Service", id: "Service_ID" }],
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useDeleteServiceItemMutation,
  useGetServiceQuery,
  useUpdateServiceMutation,
  useSingleServiceItemQuery,
} = serviceEndpoint;
