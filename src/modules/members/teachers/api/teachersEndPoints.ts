import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { ApiResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../app/utils/tagTypes";
import { ICreateTeacher } from "../types/teacherType";

const teacherEndPoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getTeacher: builder.query<ApiResponse<ICreateTeacher[]>, FilterTypes>({
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
    }),

    getRolePermission: builder.query<
      ApiResponse<TGetRolePermission[]>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/institutions/roles/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.ROLE_PERMISSION,
          id: TagTypes.ROLE_PERMISSION + "_ID",
        },
      ],
    }),

    getSingleRolePermission: builder.query<
      ApiResponse<IGetSingleRolePermission>,
      number
    >({
      query: (roleId) => ({
        url: `/api/v1.0/institutions/roles/${roleId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.ROLE_PERMISSION,
          id: TagTypes.ROLE_PERMISSION + "_ID",
        },
      ],
    }),

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
          type: TagTypes.ROLE_PERMISSION,
          id: TagTypes.ROLE_PERMISSION + "_ID",
        },
      ],
    }),

    updateRolePermission: builder.mutation<
      ApiResponse<IUpdateRolePermission>,
      { id: number | undefined; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/institutions/roles/${id}/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.ROLE_PERMISSION,
          id: TagTypes.ROLE_PERMISSION + "_ID",
        },
      ],
    }),
  }),
});

export const { useGetTeacherQuery, useCreateTeacherMutation } = teacherEndPoint;
