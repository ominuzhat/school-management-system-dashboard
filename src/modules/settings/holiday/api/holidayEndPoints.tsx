import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { ApiResponse, PaginatedResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../app/utils/tagTypes";

const holidayEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getHoliday: builder.query<ApiResponse<PaginatedResponse<any>>, FilterTypes>(
      {
        query: (params) => ({
          url: "/api/v1.0/institutions/holiday/",
          params,
        }),
        providesTags: [
          {
            type: TagTypes.HOLIDAY,
            id: TagTypes.HOLIDAY + "_ID",
          },
        ],
      }
    ),

    createHoliday: builder.mutation<ApiResponse<any>, any>({
      query: (data) => ({
        url: "/api/v1.0/institutions/holiday/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.HOLIDAY,
          id: TagTypes.HOLIDAY + "_ID",
        },
      ],
    }),

    getSingleHoliday: builder.query<ApiResponse<any>, number>({
      query: (studId) => ({
        url: `/api/v1.0/institutions/holiday/${studId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.HOLIDAY,
          id: TagTypes.HOLIDAY + "_ID",
        },
      ],
    }),

    deleteHoliday: builder.mutation<ApiResponse<any>, { id: any }>({
      query: ({ id }) => ({
        url: `/api/v1.0/institutions/holiday/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [
        {
          type: TagTypes.HOLIDAY,
          id: TagTypes.HOLIDAY + "_ID",
        },
      ],
    }),

    updateHoliday: builder.mutation<
      ApiResponse<any>,
      { id: number | undefined; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/institutions/holiday/${id}/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.HOLIDAY,
          id: TagTypes.HOLIDAY + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useCreateHolidayMutation,
  useGetHolidayQuery,
  useGetSingleHolidayQuery,
  useUpdateHolidayMutation,
  useDeleteHolidayMutation,
} = holidayEndpoint;
