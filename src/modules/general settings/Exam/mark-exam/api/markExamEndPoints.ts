import { ICreateExamMark, IGetMarkExam } from "./../types/markExamTypes";
import api from "../../../../../app/api/api";
import { FilterTypes } from "../../../../../app/features/filterSlice";
import {
  ApiResponse,
  PaginatedResponse,
} from "../../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../../app/utils/tagTypes";

const examMarkEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getExamMark: builder.query<
      ApiResponse<PaginatedResponse<IGetMarkExam[]>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/exams/marks/mark-exam/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.EXAM_MARK,
          id: TagTypes.EXAM_MARK + "_ID",
        },
      ],
    }),

    createExamMark: builder.mutation<ApiResponse<ICreateExamMark>, any>({
      query: (data) => ({
        url: "/api/v1.0/exams/marks/mark-exam/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.EXAM_MARK,
          id: TagTypes.EXAM_MARK + "_ID",
        },
      ],
    }),

    getSingleExamMarks: builder.query<
      ApiResponse<PaginatedResponse<IGetMarkExam>>,
      FilterTypes
    >({
      query: ({ roleId, ...params }) => ({
        url: `/api/v1.0/exams/marks/mark-exam/?exam=${roleId}`,
        params,
      }),
      providesTags: [
        {
          type: TagTypes.EXAM_MARK,
          id: TagTypes.EXAM_MARK + "_ID",
        },
      ],
    }),

    updateExamMarks: builder.mutation<
      ApiResponse<IGetMarkExam>,
      { id: number | undefined; data: any }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/exams/marks/mark-exam/${id}/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.EXAM_MARK,
          id: TagTypes.EXAM_MARK + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useCreateExamMarkMutation,
  useGetExamMarkQuery,
  useUpdateExamMarksMutation,
  useGetSingleExamMarksQuery,
} = examMarkEndpoint;
