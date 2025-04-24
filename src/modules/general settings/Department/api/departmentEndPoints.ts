import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { ApiResponse, PaginatedResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../app/utils/tagTypes";
import { ICreateDepartment, IGetDepartment } from "../types/departmentType";

const departmentEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getDepartment: builder.query<
      ApiResponse<PaginatedResponse<IGetDepartment>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/employees/departments/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.DEPARTMENT,
          id: TagTypes.DEPARTMENT + "_ID",
        },
      ],
    }),

    createDepartment: builder.mutation<
      ApiResponse<ICreateDepartment>,
      FormData
    >({
      query: (data) => ({
        url: "/api/v1.0/employees/departments/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.DEPARTMENT,
          id: TagTypes.DEPARTMENT + "_ID",
        },
      ],
    }),

    getSingleDepartment: builder.query<ApiResponse<any>, number>({
      query: (studId) => ({
        url: `/api/v1.0/employees/departments/${studId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.DEPARTMENT,
          id: TagTypes.DEPARTMENT + "_ID",
        },
      ],
    }),

    deleteDepartment: builder.mutation<ApiResponse<any>, { id: any }>({
      query: ({ id }) => ({
        url: `/api/v1.0/employees/departments/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [
        {
          type: TagTypes.DEPARTMENT,
          id: TagTypes.DEPARTMENT + "_ID",
        },
      ],
    }),

    updateDepartment: builder.mutation<
      ApiResponse<ICreateDepartment>,
      { id: number | undefined; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/employees/departments/${id}/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.DEPARTMENT,
          id: TagTypes.DEPARTMENT + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useCreateDepartmentMutation,
  useGetDepartmentQuery,
  useGetSingleDepartmentQuery,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentEndpoint;
