import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { ApiResponse, PaginatedResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../app/utils/tagTypes";
import { ICreateLeave, IGetLeave } from "../types/leaveTypes";

const leaveEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getLeave: builder.query<
      ApiResponse<PaginatedResponse<IGetLeave[]>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/exams/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.LEAVE,
          id: TagTypes.LEAVE + "_ID",
        },
      ],
    }),

    createLeave: builder.mutation<ApiResponse<ICreateLeave>, any>({
      query: (data) => ({
        url: "/api/v1.0/exams/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.LEAVE,
          id: TagTypes.LEAVE + "_ID",
        },
      ],
    }),

    getSingleLeave: builder.query<
      ApiResponse<PaginatedResponse<IGetLeave>>,
      number
    >({
      query: (examId) => ({
        url: `/api/v1.0/exams/${examId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.LEAVE,
          id: TagTypes.LEAVE + "_ID",
        },
      ],
    }),

    updateLeave: builder.mutation<
      ApiResponse<IGetLeave>,
      { id: number | undefined; data: any }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/exams/${id}/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.LEAVE,
          id: TagTypes.LEAVE + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useGetLeaveQuery,
  useCreateLeaveMutation,
  useUpdateLeaveMutation,
  useGetSingleLeaveQuery,
} = leaveEndpoint;
