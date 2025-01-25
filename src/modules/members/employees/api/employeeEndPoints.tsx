import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { ApiResponse, PaginatedResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../app/utils/tagTypes";
import { ICreateEmployee } from "../types/employeeTypes";

const employeesEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getEmployee: builder.query<
      ApiResponse<PaginatedResponse<any>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/employees/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.EMPLOYEE,
          id: TagTypes.EMPLOYEE + "_ID",
        },
      ],
    }),

    createEmployee: builder.mutation<ApiResponse<ICreateEmployee>, FormData>({
      query: (data) => ({
        url: "/api/v1.0/employees/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.EMPLOYEE,
          id: TagTypes.EMPLOYEE + "_ID",
        },
      ],
    }),

    getSingleEmployee: builder.query<ApiResponse<any>, number>({
      query: (studId) => ({
        url: `/api/v1.0/employees/${studId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.EMPLOYEE,
          id: TagTypes.EMPLOYEE + "_ID",
        },
      ],
    }),

    updateEmployee: builder.mutation<
      ApiResponse<any>,
      { id: number | undefined; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/employees/${id}/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.EMPLOYEE,
          id: TagTypes.EMPLOYEE + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useCreateEmployeeMutation,
  useGetEmployeeQuery,
  useGetSingleEmployeeQuery,
  useUpdateEmployeeMutation,
} = employeesEndpoint;
