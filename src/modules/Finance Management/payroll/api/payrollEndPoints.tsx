import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { ApiResponse, PaginatedResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../app/utils/tagTypes";
import { IGetPayroll } from "../type/payrollType";

const payrollEndPoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getPayroll: builder.query<
      ApiResponse<PaginatedResponse<IGetPayroll[]>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/payrolls/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.PAYROLL,
          id: TagTypes.PAYROLL + "_ID",
        },
      ],
    }),

    createPayroll: builder.mutation<ApiResponse<IGetPayroll>, any>({
      query: (data) => ({
        url: "/api/v1.0/payrolls/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.PAYROLL,
          id: TagTypes.PAYROLL + "_ID",
        },
      ],
    }),

    getSinglePayroll: builder.query<ApiResponse<any>, number>({
      query: (payrollId) => ({
        url: `/api/v1.0/payrolls/${payrollId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.PAYROLL,
          id: TagTypes.PAYROLL + "_ID",
        },
      ],
    }),

    updatePayroll: builder.mutation<
      ApiResponse<any>,
      { id: number | undefined; data: any }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/payrolls/${id}/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.PAYROLL,
          id: TagTypes.PAYROLL + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useCreatePayrollMutation,
  useGetPayrollQuery,
  useGetSinglePayrollQuery,
  useUpdatePayrollMutation,
} = payrollEndPoints;
