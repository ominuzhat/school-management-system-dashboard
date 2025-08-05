import api from "../../../app/api/api";
import { ApiResponse } from "../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../app/utils/tagTypes";

const dashboardEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    createMarkAllNotification: builder.mutation<ApiResponse<any>, any>({
      query: (data) => ({
        url: `/api/v1.0/supports/notifications/mark_all_as_read/`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.NOTIFICATION,
          id: TagTypes.NOTIFICATION + "_ID",
        },
      ],
    }),

    createMarkAsReadNotification: builder.mutation<ApiResponse<any>, any>({
      query: (studId) => ({
        url: `/api/v1.0/supports/notifications/${studId}/mark_as_read/`,
        method: "POST",
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.NOTIFICATION,
          id: TagTypes.NOTIFICATION + "_ID",
        },
      ],
    }),

    getSingleNotification: builder.query<ApiResponse<any>, number>({
      query: (studId) => ({
        url: `/api/v1.0/supports/notifications/${studId}/mark_as_read/`,
      }),

      providesTags: [
        {
          type: TagTypes.NOTIFICATION,
          id: TagTypes.NOTIFICATION + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useCreateMarkAllNotificationMutation,
  useGetSingleNotificationQuery,
  useCreateMarkAsReadNotificationMutation
} = dashboardEndpoint;
