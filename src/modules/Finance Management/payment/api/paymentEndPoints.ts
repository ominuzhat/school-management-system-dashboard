import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { ApiResponse, PaginatedResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../app/utils/tagTypes";
import { ICreatePayment, IGetPayment } from "../types/paymentTypes";

const paymentEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getPayment: builder.query<
      ApiResponse<PaginatedResponse<IGetPayment>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/payrolls/payments/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.PAYMENT,
          id: TagTypes.PAYMENT + "_ID",
        },
      ],
    }),

    createPayment: builder.mutation<ApiResponse<ICreatePayment>, FormData>({
      query: (data) => ({
        url: "/api/v1.0/payrolls/payments/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.PAYMENT,
          id: TagTypes.PAYMENT + "_ID",
        },
      ],
    }),

    getSinglePayment: builder.query<ApiResponse<any>, number>({
      query: (studId) => ({
        url: `/api/v1.0/payrolls/payments/${studId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.PAYMENT,
          id: TagTypes.PAYMENT + "_ID",
        },
      ],
    }),

    updatePayment: builder.mutation<
      ApiResponse<ICreatePayment>,
      { id: number | undefined; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/payrolls/payments/${id}/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.PAYMENT,
          id: TagTypes.PAYMENT + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useCreatePaymentMutation,
  useGetPaymentQuery,
  useGetSinglePaymentQuery,
  useUpdatePaymentMutation,
} = paymentEndpoint;
