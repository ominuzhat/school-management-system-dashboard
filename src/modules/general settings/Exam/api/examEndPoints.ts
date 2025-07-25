import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { ApiResponse, PaginatedResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../app/utils/tagTypes";
import { ICreateExam, IGetExam } from "../type/examType";

const examEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getExam: builder.query<
      ApiResponse<PaginatedResponse<IGetExam[]>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/exams/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.EXAM,
          id: TagTypes.EXAM + "_ID",
        },
      ],
    }),

    createExam: builder.mutation<ApiResponse<ICreateExam>, any>({
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
          type: TagTypes.EXAM,
          id: TagTypes.EXAM + "_ID",
        },
      ],
    }),

    getSingleExam: builder.query<
      ApiResponse<PaginatedResponse<IGetExam>>,
      FilterTypes
    >({
      query: ({ examId, ...params }) => ({
        url: `/api/v1.0/exams/${examId}/`,
        params,
      }),

      providesTags: [
        {
          type: TagTypes.EXAM,
          id: TagTypes.EXAM + "_ID",
        },
      ],
    }),

        getSingleExamWithGradeLevelPdf: builder.query<Blob, any>({
      query: ({id,grade_level}) => ({
        url: `/api/v1.0/exams/${id}/download-grade-routine/${grade_level}/`,
        responseHandler: async (response) => response.blob(),
        cache: "no-cache",
      }),
      providesTags: [
   {
          type: TagTypes.EXAM,
          id: TagTypes.EXAM + "_ID",
        },
      ],
    }),

        getGradeRoutinePdf: builder.query<Blob, {id: number}>({
      query: (id) => ({
        url: `/api/v1.0/exams/${id}/download-grade-routine/`,
        responseHandler: async (response) => response.blob(),
        cache: "no-cache",
      }),
      providesTags: [
   {
          type: TagTypes.EXAM,
          id: TagTypes.EXAM + "_ID",
        },
      ],
    }),

        getExamRoutinePdf: builder.query<Blob, {id: number}>({
      query: (id) => ({
        url: `/api/v1.0/exams/${id}/download-exam-routine/`,
        responseHandler: async (response) => response.blob(),
        cache: "no-cache",
      }),
      providesTags: [
   {
          type: TagTypes.EXAM,
          id: TagTypes.EXAM + "_ID",
        },
      ],
    }),

    deleteExam: builder.mutation<ApiResponse<any>, { id: any }>({
      query: ({ id }) => ({
        url: `/api/v1.0/exams/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [
        {
          type: TagTypes.EXAM,
          id: TagTypes.EXAM + "_ID",
        },
      ],
    }),

    updateExam: builder.mutation<
      ApiResponse<IGetExam>,
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
          type: TagTypes.EXAM,
          id: TagTypes.EXAM + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useGetExamQuery,
  useCreateExamMutation,
  useUpdateExamMutation,
  useGetSingleExamQuery,
  useDeleteExamMutation,
  useLazyGetSingleExamWithGradeLevelPdfQuery,
  useLazyGetExamRoutinePdfQuery,
  useLazyGetGradeRoutinePdfQuery
} = examEndpoint;
