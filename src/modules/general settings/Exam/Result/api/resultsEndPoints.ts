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

    getSingleResults: builder.query<
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
  useGetResultsQuery,
  useCreateResultsMutation,
  useGetSingleResultsQuery,
} = resultsEndpoint;
