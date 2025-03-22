import api from "../../../../../app/api/api";
import { FilterTypes } from "../../../../../app/features/filterSlice";
import {
  ApiResponse,
  PaginatedResponse,
} from "../../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../../app/utils/tagTypes";
import { IFailCriteria } from "../types/GradeTypes";

const failEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getFailMark: builder.query<
      ApiResponse<PaginatedResponse<IFailCriteria[]>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/exams/fail-criteria/me/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.FAIL_MARK,
          id: TagTypes.FAIL_MARK + "_ID",
        },
      ],
    }),

    createFailMark: builder.mutation<ApiResponse<any>, any>({
      query: (data) => ({
        url: "/api/v1.0/exams/fail-criteria/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.FAIL_MARK,
          id: TagTypes.FAIL_MARK + "_ID",
        },
      ],
    }),
  }),
});

export const { useCreateFailMarkMutation, useGetFailMarkQuery } = failEndpoint;
