import api from "../../../../../app/api/api";
import { FilterTypes } from "../../../../../app/features/filterSlice";
import {
  ApiResponse,
  PaginatedResponse,
} from "../../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../../app/utils/tagTypes";
import { IResults } from "../type/ResultsType";

const resultsEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getResults: builder.query<
      ApiResponse<PaginatedResponse<IResults[]>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/exams/results/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.RESULT,
          id: TagTypes.RESULT + "_ID",
        },
      ],
    }),

    getExamResultByTerm: builder.query<
      ApiResponse<PaginatedResponse<any[]>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/exams/results/term-exams/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.RESULT,
          id: TagTypes.RESULT + "_ID",
        },
      ],
    }),

    createResults: builder.mutation<ApiResponse<IResults>, any>({
      query: (data) => ({
        url: "/api/v1.0/exams/results/publish/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.RESULT,
          id: TagTypes.RESULT + "_ID",
        },
      ],
    }),

    deleteResult: builder.mutation<ApiResponse<any>, { id: any }>({
      query: ({ id }) => ({
        url: `/api/v1.0/exams/results/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [
        {
          type: TagTypes.ROUTINE,
          id: TagTypes.ROUTINE + "_ID",
        },
      ],
    }),

    getPublishResultForm: builder.query<Blob, any>({
      query: ({ params }) => ({
        url: `/api/v1.0/exams/results/generate-pdf/`,
        responseHandler: async (response) => response.blob(),
        cache: "no-cache",
        params
      }),

      providesTags: [
        {
          type: TagTypes.ROUTINE,
          id: TagTypes.ROUTINE + "_ID",
        },
      ],
    }),


       getSinglePublishResultForm: builder.query<Blob, any>({
      query: ({ id}) => ({
        url: `/api/v1.0/exams/results/${id}/generate-pdf/`,
        responseHandler: async (response) => response.blob(),
        cache: "no-cache",
       
      }),

      providesTags: [
        {
          type: TagTypes.ROUTINE,
          id: TagTypes.ROUTINE + "_ID",
        },
      ],
    }),


    getSinglePublishResults: builder.query<
      ApiResponse<PaginatedResponse<IResults>>,
      number
    >({
      query: (resultId) => ({
        url: `/api/v1.0/exams/results/${resultId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.RESULT,
          id: TagTypes.RESULT + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useGetExamResultByTermQuery,
  useGetResultsQuery,
  useCreateResultsMutation,
  useGetSinglePublishResultsQuery,
  useDeleteResultMutation,
  useLazyGetPublishResultFormQuery,
  useLazyGetSinglePublishResultFormQuery
} = resultsEndpoint;
