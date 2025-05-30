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
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useGetSingleTransactionQuery,
} = transactionENdPoints;
