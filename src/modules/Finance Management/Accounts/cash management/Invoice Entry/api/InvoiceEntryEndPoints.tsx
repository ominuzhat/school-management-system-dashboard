import api from "../../../../../../app/api/api";
import { FilterTypes } from "../../../../../../app/features/filterSlice";
import {
  ApiResponse,
  PaginatedResponse,
} from "../../../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../../../app/utils/tagTypes";
import { ICreateInvoiceEntry, IGetInvoiceEntry } from "../types/invoiceEntryTypes";

const invoiceEntryEndPoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getInvoiceEntries: builder.query<
      ApiResponse<PaginatedResponse<IGetInvoiceEntry[]>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/vendors/invoices/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.INVOICE_ENTRY,
          id: TagTypes.INVOICE_ENTRY + "_ID",
        },
      ],
    }),

    createInvoiceEntry: builder.mutation<ApiResponse<ICreateInvoiceEntry>, any>({
      query: (data) => ({
        url: "/api/v1.0/vendors/invoices/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.INVOICE_ENTRY,
          id: TagTypes.INVOICE_ENTRY + "_ID",
        },
        {
          type: TagTypes.ACCOUNT,
          id: TagTypes.ACCOUNT + "_ID",
        },
      ],
    }),

    getSingleInvoiceEntry: builder.query<
      ApiResponse<PaginatedResponse<IGetInvoiceEntry>>,
      number
    >({
      query: (roleId) => ({
        url: `/api/v1.0/vendors/invoices/${roleId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.INVOICE_ENTRY,
          id: TagTypes.INVOICE_ENTRY + "_ID",
        },
      ],
    }),

    updateInvoiceEntry: builder.mutation<
      ApiResponse<IGetInvoiceEntry>,
      { id: number | undefined; data: any }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/vendors/invoices/${id}/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.INVOICE_ENTRY,
          id: TagTypes.INVOICE_ENTRY + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useGetInvoiceEntriesQuery,
  useCreateInvoiceEntryMutation,
  useUpdateInvoiceEntryMutation,
  useGetSingleInvoiceEntryQuery,
} = invoiceEntryEndPoints;
