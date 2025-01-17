import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { ApiResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../app/utils/tagTypes";
import { ISubjects } from "../type/subjectsType";

const subjectsEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getSubjects: builder.query<ApiResponse<ISubjects[]>, FilterTypes>({
      query: (params) => ({
        url: "/api/v1.0/institutions/subjects/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.SUBJECTS,
          id: TagTypes.SUBJECTS + "_ID",
        },
      ],
    }),

    createSubjects: builder.mutation<ApiResponse<ISubjects>, FormData>({
      query: (data) => ({
        url: "/api/v1.0/institutions/subjects/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.SUBJECTS,
          id: TagTypes.SUBJECTS + "_ID",
        },
      ],
    }),

    getSingleSubjects: builder.query<ApiResponse<ISubjects>, number>({
      query: (roleId) => ({
        url: `/api/v1.0/institutions/subjects/${roleId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.SUBJECTS,
          id: TagTypes.SUBJECTS + "_ID",
        },
      ],
    }),

    updateSubjects: builder.mutation<
      ApiResponse<ISubjects>,
      { id: number | undefined; data: any }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/institutions/subjects/${id}/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.SUBJECTS,
          id: TagTypes.SUBJECTS + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useGetSubjectsQuery,
  useCreateSubjectsMutation,
  useUpdateSubjectsMutation,
  useGetSingleSubjectsQuery,
} = subjectsEndpoint;
