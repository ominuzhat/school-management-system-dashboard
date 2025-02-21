import api from "../../../../../app/api/api";
import { FilterTypes } from "../../../../../app/features/filterSlice";
import { ApiResponse, PaginatedResponse } from "../../../../../app/utils/constant";
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
} = accountEndpoint;
