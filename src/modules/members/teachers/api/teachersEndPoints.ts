import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { ApiResponse, PaginatedResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../app/utils/tagTypes";
import { ICreateTeacher } from "../types/teacherType";

const teacherEndPoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getTeacher: builder.query<ApiResponse<PaginatedResponse<any>>, FilterTypes>(
      {
        query: (params) => ({
          url: "/api/v1.0/teachers/",
          params,
        }),
        providesTags: [
          {
            type: TagTypes.TEACHER,
            id: TagTypes.TEACHER + "_ID",
          },
        ],
      }
    ),

    createTeacher: builder.mutation<ApiResponse<ICreateTeacher>, FormData>({
      query: (data) => ({
        url: "/api/v1.0/teachers/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.TEACHER,
          id: TagTypes.TEACHER + "_ID",
        },
      ],
    }),

    getSingleSTeacher: builder.query<ApiResponse<any>, number>({
      query: (studId) => ({
        url: `/api/v1.0/teachers/${studId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.TEACHER,
          id: TagTypes.TEACHER + "_ID",
        },
      ],
    }),

    updateTeacher: builder.mutation<
      ApiResponse<any>,
      { id: number | undefined; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/teachers/${id}/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.TEACHER,
          id: TagTypes.TEACHER + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useGetTeacherQuery,
  useCreateTeacherMutation,
  useGetSingleSTeacherQuery,
  useUpdateTeacherMutation,
} = teacherEndPoint;
