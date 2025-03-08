import api from "../../../../../app/api/api";
import { FilterTypes } from "../../../../../app/features/filterSlice";
import {
  ApiResponse,
  PaginatedResponse,
} from "../../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../../app/utils/tagTypes";
import { ICreateExamHall, IGetExamHall } from "../Type/examHallType";

const examHallEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getExamHall: builder.query<
      ApiResponse<PaginatedResponse<IGetExamHall[]>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/exams/halls/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.EXAM_Hall,
          id: TagTypes.EXAM_Hall + "_ID",
        },
      ],
    }),

    createExamHall: builder.mutation<ApiResponse<ICreateExamHall>, any>({
      query: (data) => ({
        url: "/api/v1.0/exams/halls/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.EXAM_Hall,
          id: TagTypes.EXAM_Hall + "_ID",
        },
      ],
    }),

    getSingleExamHall: builder.query<
      ApiResponse<PaginatedResponse<IGetExamHall>>,
      number
    >({
      query: (examId) => ({
        url: `/api/v1.0/exams/halls/${examId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.EXAM_Hall,
          id: TagTypes.EXAM_Hall + "_ID",
        },
      ],
    }),

    updateExamHall: builder.mutation<
      ApiResponse<IGetExamHall>,
      { id: number | undefined; data: any }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/exams/halls/${id}/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.EXAM_Hall,
          id: TagTypes.EXAM_Hall + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useGetExamHallQuery,
  useCreateExamHallMutation,
  useUpdateExamHallMutation,
  useGetSingleExamHallQuery,
} = examHallEndpoint;
