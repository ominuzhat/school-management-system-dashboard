import api from "../../../../../app/api/api";
import { FilterTypes } from "../../../../../app/features/filterSlice";
import {
  ApiResponse,
  PaginatedResponse,
} from "../../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../../app/utils/tagTypes";
import { IGradeMarks } from "../types/GradeTypes";

const gradeMarkEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getGradeMark: builder.query<
      ApiResponse<PaginatedResponse<IGradeMarks[]>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/exams/grades/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.GRADE_MARK,
          id: TagTypes.GRADE_MARK + "_ID",
        },
      ],
    }),

    createGradeMark: builder.mutation<ApiResponse<any>, any>({
      query: (data) => ({
        url: "/api/v1.0/exams/grades/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.GRADE_MARK,
          id: TagTypes.GRADE_MARK + "_ID",
        },
      ],
    }),
  }),
});

export const { useGetGradeMarkQuery, useCreateGradeMarkMutation } =
  gradeMarkEndpoint;
