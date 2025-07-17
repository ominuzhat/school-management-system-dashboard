
import api from "../../../../../app/api/api";
import { FilterTypes } from "../../../../../app/features/filterSlice";
import { ApiResponse, PaginatedResponse } from "../../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../../app/utils/tagTypes";
import { ICreateSchedule } from "../types/scheduleTypes";

const scheduleEndPoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getSchedule: builder.query<
      ApiResponse<PaginatedResponse<any[]>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/employees/schedules/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.SCHEDULE,
          id: TagTypes.SCHEDULE + "_ID",
        },
      ],
    }),

    createSchedule: builder.mutation<ApiResponse<any>, ICreateSchedule>({
      query: (data) => ({
        url: "/api/v1.0/employees/schedules/",
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
        url: `/api/v1.0/employees/schedules/${examId}/`,
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
        url: `/api/v1.0/employees/schedules/${id}/`,
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
        url: `/api/v1.0/employees/schedules/${id}/`,
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
