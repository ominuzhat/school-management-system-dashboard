import api from "../../../../../app/api/api";
import { FilterTypes } from "../../../../../app/features/filterSlice";
import {
  ApiResponse,
  PaginatedResponse,
} from "../../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../../app/utils/tagTypes";
import { ICreateCash, IGetCash } from "../types/cashTypes";

const cashEndPoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getCash: builder.query<
      ApiResponse<PaginatedResponse<IGetCash[]>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/accounts/financial-entries/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.CASH,
          id: TagTypes.CASH + "_ID",
        },
      ],
    }),

    getIncomeExpenseForm: builder.query<
      Blob,
      { month?: string; file_format: any }
    >({
      query: ({ month, file_format }) => ({
        url: `/api/v1.0/accounts/financial-entries/download-ledger/`,
        responseHandler: async (response) => response.blob(),
        cache: "no-cache",
        params: {
          month,
          file_format,
        },
      }),

      providesTags: [
        {
          type: TagTypes.CASH,
          id: TagTypes.CASH + "_ID",
        },
      ],
    }),

    createCash: builder.mutation<ApiResponse<ICreateCash>, any>({
      query: (data) => ({
        url: "/api/v1.0/accounts/financial-entries/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.CASH,
          id: TagTypes.CASH + "_ID",
        },
        {
          type: TagTypes.ACCOUNT,
          id: TagTypes.ACCOUNT + "_ID",
        },
      ],
    }),

    getSingleCash: builder.query<
      ApiResponse<PaginatedResponse<IGetCash>>,
      number
    >({
      query: (roleId) => ({
        url: `/api/v1.0/accounts/financial-entries/${roleId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.CASH,
          id: TagTypes.CASH + "_ID",
        },
      ],
    }),

    updateCash: builder.mutation<
      ApiResponse<IGetCash>,
      { id: number | undefined; data: any }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/accounts/financial-entries/${id}/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.CASH,
          id: TagTypes.CASH + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useGetCashQuery,
  useCreateCashMutation,
  useUpdateCashMutation,
  useGetSingleCashQuery,
  useLazyGetIncomeExpenseFormQuery,
} = cashEndPoints;
