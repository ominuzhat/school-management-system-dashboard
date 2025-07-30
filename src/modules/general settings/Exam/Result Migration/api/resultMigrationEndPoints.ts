import api from "../../../../../app/api/api";
import { FilterTypes } from "../../../../../app/features/filterSlice";
import {
  ApiResponse,
  PaginatedResponse,
} from "../../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../../app/utils/tagTypes";
import { IResultMigration } from "../type/resultMigrationTypes";

const resultMigrationEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getMigrationResultList: builder.query<
      ApiResponse<PaginatedResponse<any[]>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/exams/migration-results/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.RESULT_MIGRATION,
          id: TagTypes.RESULT_MIGRATION + "_ID",
        },
      ],
    }),

    createResultMigration: builder.mutation<ApiResponse<IResultMigration>, any>(
      {
        query: (data) => ({
          url: "/api/v1.0/exams/results/migrate/",
          method: "POST",
          body: data,
        }),
        async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
          await handleOnQueryStarted(queryFulfilled, dispatch);
        },
        invalidatesTags: [
          {
            type: TagTypes.RESULT_MIGRATION,
            id: TagTypes.RESULT_MIGRATION + "_ID",
          },
        ],
      }
    ),

       getSingleMigrationResultForm: builder.query<Blob, any>({
      query: ({ id}) => ({
        url: `/api/v1.0/exams/migration-results/${id}/generate-pdf/`,
        responseHandler: async (response) => response.blob(),
        cache: "no-cache",
       
      }),

      providesTags: [
          {
            type: TagTypes.RESULT_MIGRATION,
            id: TagTypes.RESULT_MIGRATION + "_ID",
          },
      ],
    }),


        getMigrationResultForm: builder.query<Blob, any>({
      query: ({ params }) => ({
        url: `/api/v1.0/exams/migration-results/generate-pdf/`,
        responseHandler: async (response) => response.blob(),
        cache: "no-cache",
        params
      }),

      providesTags: [
          {
            type: TagTypes.RESULT_MIGRATION,
            id: TagTypes.RESULT_MIGRATION + "_ID",
          },
      ],
    }),


    getSingleResultMigration: builder.query<
      ApiResponse<PaginatedResponse<any>>,
      number
    >({
      query: (roleId) => ({
        url: `/api/v1.0/exams/migration-results/${roleId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.RESULT_MIGRATION,
          id: TagTypes.RESULT_MIGRATION + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useCreateResultMigrationMutation,
  useGetMigrationResultListQuery,
  useGetSingleResultMigrationQuery,
  useLazyGetMigrationResultFormQuery, 
  useLazyGetSingleMigrationResultFormQuery
} = resultMigrationEndpoint;
