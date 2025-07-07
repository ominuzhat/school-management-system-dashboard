import api from "../../../../../app/api/api";
import { FilterTypes } from "../../../../../app/features/filterSlice";
import {
  ApiResponse,
  PaginatedResponse,
} from "../../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../../app/utils/tagTypes";
import { ICreateAccount, IGetAccount } from "../types/accountTypes";

const accountEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getAccount: builder.query<
      ApiResponse<PaginatedResponse<IGetAccount[]>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/accounts/accounts/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.ACCOUNT,
          id: TagTypes.ACCOUNT + "_ID",
        },
      ],
    }),

    getCollection: builder.query<
      ApiResponse<PaginatedResponse<any>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/accounts/daily-collections/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.ACCOUNT,
          id: TagTypes.ACCOUNT + "_ID",
        },
      ],
    }),

    getSingleCollection: builder.query<
      ApiResponse<PaginatedResponse<any>>,
      number
    >({
      query: (roleId) => ({
        url: `/api/v1.0/accounts/daily-collections/${roleId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.ACCOUNT,
          id: TagTypes.ACCOUNT + "_ID",
        },
      ],
    }),

    createAccount: builder.mutation<ApiResponse<ICreateAccount>, any>({
      query: (data) => ({
        url: "/api/v1.0/accounts/accounts/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.ACCOUNT,
          id: TagTypes.ACCOUNT + "_ID",
        },
      ],
    }),

    getSingleAccount: builder.query<
      ApiResponse<PaginatedResponse<IGetAccount>>,
      number
    >({
      query: (roleId) => ({
        url: `/api/v1.0/accounts/accounts/${roleId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.ACCOUNT,
          id: TagTypes.ACCOUNT + "_ID",
        },
      ],
    }),

    deleteAccount: builder.mutation<ApiResponse<any>, { id: any }>({
      query: ({ id }) => ({
        url: `/api/v1.0/accounts/accounts/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [
        {
          type: TagTypes.ACCOUNT,
          id: TagTypes.ACCOUNT + "_ID",
        },
      ],
    }),

    getStaffLedgerForm: builder.query<
      Blob,
      {
        start_date: any;
        end_date: any;
        year_month: any;
        collected_by: any;
      }
    >({
      query: ({ start_date, end_date, year_month, collected_by }) => ({
        url: `/api/v1.0/accounts/daily-collections/download-report/`,
        responseHandler: async (response) => response.blob(),
        cache: "no-cache",
        params: {
          start_date,
          end_date,
          year_month,
          collected_by,
        },
      }),

      providesTags: [
        {
          type: TagTypes.TRANSACTION,
          id: TagTypes.TRANSACTION + "_ID",
        },
      ],
    }),

    updateAccount: builder.mutation<
      ApiResponse<IGetAccount>,
      { id: number | undefined; data: any }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/accounts/accounts/${id}/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.ACCOUNT,
          id: TagTypes.ACCOUNT + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useGetAccountQuery,
  useCreateAccountMutation,
  useUpdateAccountMutation,
  useGetSingleAccountQuery,
  useDeleteAccountMutation,
  useGetCollectionQuery,
  useGetSingleCollectionQuery,
  useLazyGetStaffLedgerFormQuery
} = accountEndpoint;
