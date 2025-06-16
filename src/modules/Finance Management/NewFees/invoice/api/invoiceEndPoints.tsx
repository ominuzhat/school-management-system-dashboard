import api from "../../../../../app/api/api";
import { FilterTypes } from "../../../../../app/features/filterSlice";
import { ApiResponse } from "../../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../../app/utils/tagTypes";

const invoiceEndPoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getInvoice: builder.query<ApiResponse<any>, FilterTypes>({
      query: (params) => ({
        url: "/api/v1.0/admissions/fee-invoices/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.INVOICE,
          id: TagTypes.INVOICE + "_ID",
        },
      ],
    }),

    getSingleInvoice: builder.query<ApiResponse<any>, number>({
      query: (collectFeeId) => ({
        url: `/api/v1.0/admissions/fee-invoices/${collectFeeId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.INVOICE,
          id: TagTypes.INVOICE + "_ID",
        },
      ],
    }),

    getInvoicePdf: builder.query<Blob, number>({
      query: (collectFeeId) => ({
        url: `/api/v1.0/admissions/fee-invoices/${collectFeeId}/download-pdf/`,
        responseHandler: async (response) => response.blob(),
        cache: "no-cache",
      }),

      providesTags: [
        {
          type: TagTypes.COLLECT_FEE,
          id: TagTypes.COLLECT_FEE + "_ID",
        },
      ],
    }),

    updateInvoice: builder.mutation<
      ApiResponse<any>,
      { id: number | undefined; data: any }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/admissions/fee-invoices/${id}/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.INVOICE,
          id: TagTypes.INVOICE + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useGetInvoiceQuery,
  useUpdateInvoiceMutation,
  useGetSingleInvoiceQuery,
  useGetInvoicePdfQuery,
} = invoiceEndPoints;
