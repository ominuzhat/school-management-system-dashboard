import api from "../../../../../app/api/api";
import { ApiResponse } from "../../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../../app/utils/tagTypes";
import { IResultMigration } from "../type/resultMigrationTypes";

const resultMigrationEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const { useCreateResultMigrationMutation } = resultMigrationEndpoint;
