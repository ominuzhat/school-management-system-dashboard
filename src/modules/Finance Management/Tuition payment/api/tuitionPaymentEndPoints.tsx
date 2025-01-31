import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { ApiResponse, PaginatedResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../app/utils/tagTypes";
import {
  ICreateTuitionFeePayment,
  IGetTuitionFeePayment,
} from "../types/tuitionPaymentTypes";

const tuitionPaymentEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getTuitionFeePayment: builder.query<
      ApiResponse<PaginatedResponse<IGetTuitionFeePayment>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/admissions/tuition-payments/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.TUITION_FEES_PAYMENT,
          id: TagTypes.TUITION_FEES_PAYMENT + "_ID",
        },
      ],
    }),

    createTuitionFeePayment: builder.mutation<
      ApiResponse<ICreateTuitionFeePayment>,
      FormData
    >({
      query: (data) => ({
        url: "/api/v1.0/admissions/tuition-payments/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.TUITION_FEES_PAYMENT,
          id: TagTypes.TUITION_FEES_PAYMENT + "_ID",
        },
      ],
    }),

    getSingleTuitionFeePayment: builder.query<ApiResponse<any>, number>({
      query: (studId) => ({
        url: `/api/v1.0/admissions/tuition-payments/${studId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.TUITION_FEES_PAYMENT,
          id: TagTypes.TUITION_FEES_PAYMENT + "_ID",
        },
      ],
    }),

    updateTuitionFeePayment: builder.mutation<
      ApiResponse<ICreateTuitionFeePayment>,
      { id: number | undefined; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/admissions/tuition-payments/${id}/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.TUITION_FEES_PAYMENT,
          id: TagTypes.TUITION_FEES_PAYMENT + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useCreateTuitionFeePaymentMutation,
  useGetSingleTuitionFeePaymentQuery,
  useGetTuitionFeePaymentQuery,
  useUpdateTuitionFeePaymentMutation,
} = tuitionPaymentEndpoint;
