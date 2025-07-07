import api from "../../../../../app/api/api";
import { FilterTypes } from "../../../../../app/features/filterSlice";
import {
  ApiResponse,
  PaginatedResponse,
} from "../../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../../app/utils/tagTypes";
import { ICreateTransaction, IGetTransaction } from "../types/transactionTypes";

const transactionENdPoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getTransaction: builder.query<
      ApiResponse<PaginatedResponse<IGetTransaction[]>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/accounts/transactions/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.TRANSACTION,
          id: TagTypes.TRANSACTION + "_ID",
        },
      ],
    }),

    getPendingTransaction: builder.query<
      ApiResponse<PaginatedResponse<IGetTransaction[]>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/accounts/transfer-requests/stats/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.TRANSACTION,
          id: TagTypes.TRANSACTION + "_ID",
        },
      ],
    }),
    getTransferRequest: builder.query<
      ApiResponse<PaginatedResponse<IGetTransaction[]>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/accounts/transfer-requests/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.TRANSFER_REQUEST,
          id: TagTypes.TRANSFER_REQUEST + "_ID",
        },
      ],
    }),

    createFundTransaction: builder.mutation<
      ApiResponse<ICreateTransaction>,
      any
    >({
      query: (data) => ({
        url: "/api/v1.0/accounts/transfer-requests/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.TRANSACTION,
          id: TagTypes.TRANSACTION + "_ID",
        },
        {
          type: TagTypes.ACCOUNT,
          id: TagTypes.ACCOUNT + "_ID",
        },
      ],
    }),

    createTransaction: builder.mutation<ApiResponse<ICreateTransaction>, any>({
      query: (data) => ({
        url: "/api/v1.0/accounts/transactions/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.TRANSACTION,
          id: TagTypes.TRANSACTION + "_ID",
        },
        {
          type: TagTypes.ACCOUNT,
          id: TagTypes.ACCOUNT + "_ID",
        },
      ],
    }),

    createTransferApproval: builder.mutation<
      ApiResponse<ICreateTransaction>,
      any
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/accounts/transfer-requests/${id}/approve/`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.TRANSACTION,
          id: TagTypes.TRANSACTION + "_ID",
        },
        {
          type: TagTypes.ACCOUNT,
          id: TagTypes.ACCOUNT + "_ID",
        },
        {
          type: TagTypes.TRANSFER_REQUEST,
          id: TagTypes.TRANSFER_REQUEST + "_ID",
        },
      ],
    }),

    createTransferReject: builder.mutation<
      ApiResponse<ICreateTransaction>,
      any
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/accounts/transfer-requests/${id}/reject/`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.TRANSACTION,
          id: TagTypes.TRANSACTION + "_ID",
        },
        {
          type: TagTypes.ACCOUNT,
          id: TagTypes.ACCOUNT + "_ID",
        },
        {
          type: TagTypes.TRANSFER_REQUEST,
          id: TagTypes.TRANSFER_REQUEST + "_ID",
        },
      ],
    }),

    createTransactionApproval: builder.mutation<
      ApiResponse<ICreateTransaction>,
      any
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/accounts/transactions/${id}/approve-transaction/`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.TRANSACTION,
          id: TagTypes.TRANSACTION + "_ID",
        },
        {
          type: TagTypes.ACCOUNT,
          id: TagTypes.ACCOUNT + "_ID",
        },
      ],
    }),

    getSingleTransaction: builder.query<
      ApiResponse<PaginatedResponse<IGetTransaction>>,
      number
    >({
      query: (roleId) => ({
        url: `/api/v1.0/accounts/transactions/${roleId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.TRANSACTION,
          id: TagTypes.TRANSACTION + "_ID",
        },
      ],
    }),

    getTransactionsForm: builder.query<
      Blob,
      {
        end_date: string;
        start_date: string;
        transaction_type: string;
        file_format: string;
        account_id: any;
        year_month: any;
      }
    >({
      query: ({
        end_date,
        start_date,
        transaction_type,
        file_format,
        account_id,
        year_month,
      }) => ({
        url: `/api/v1.0/accounts/transactions/download-transfer-history/`,
        responseHandler: async (response) => response.blob(),
        cache: "no-cache",
        params: {
          end_date,
          start_date,
          transaction_type,
          file_format,
          account_id,
          year_month,
        },
      }),

      providesTags: [
        {
          type: TagTypes.TRANSACTION,
          id: TagTypes.TRANSACTION + "_ID",
        },
      ],
    }),

    updateTransaction: builder.mutation<
      ApiResponse<IGetTransaction>,
      { id: number | undefined; data: any }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/accounts/transactions/${id}/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.TRANSACTION,
          id: TagTypes.TRANSACTION + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useGetTransactionQuery,
  useGetTransferRequestQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useGetSingleTransactionQuery,
  useCreateTransactionApprovalMutation,
  useGetPendingTransactionQuery,
  useCreateFundTransactionMutation,
  useCreateTransferApprovalMutation,
  useCreateTransferRejectMutation,
  useLazyGetTransactionsFormQuery,
} = transactionENdPoints;
