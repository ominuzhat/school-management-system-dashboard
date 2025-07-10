
import api from "../../../../../app/api/api";
import { FilterTypes } from "../../../../../app/features/filterSlice";
import { ApiResponse, PaginatedResponse } from "../../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../../app/utils/tagTypes";

const scheduleEndPoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getSchedule: builder.query<
      ApiResponse<PaginatedResponse<any[]>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/admissions/leaves/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.SCHEDULE,
          id: TagTypes.SCHEDULE + "_ID",
        },
      ],
    }),

    createSchedule: builder.mutation<ApiResponse<any>, any>({
      query: (data) => ({
        url: "/api/v1.0/admissions/leaves/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.SCHEDULE,
          id: TagTypes.SCHEDULE + "_ID",
        },
      ],
    }),

    getSingleSchedule: builder.query<
      ApiResponse<PaginatedResponse<any>>,
      number
    >({
      query: (examId) => ({
        url: `/api/v1.0/admissions/leaves/${examId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.SCHEDULE,
          id: TagTypes.SCHEDULE + "_ID",
        },
      ],
    }),

    deleteSchedules: builder.mutation<ApiResponse<any>, { id: any }>({
      query: ({ id }) => ({
        url: `/api/v1.0/admissions/leaves/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [
        {
          type: TagTypes.SCHEDULE,
          id: TagTypes.SCHEDULE + "_ID",
        },
      ],
    }),

    updateSchedule: builder.mutation<
      ApiResponse<any>,
      { id: number | undefined; data: any }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/admissions/leaves/${id}/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.SCHEDULE,
          id: TagTypes.SCHEDULE + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useGetScheduleQuery,
  useCreateScheduleMutation,
  useUpdateScheduleMutation,
  useGetSingleScheduleQuery,
  useDeleteSchedulesMutation,
} = scheduleEndPoints;
