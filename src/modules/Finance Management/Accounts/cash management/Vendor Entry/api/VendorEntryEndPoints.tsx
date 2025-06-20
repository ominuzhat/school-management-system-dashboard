import api from "../../../../../../app/api/api";
import { FilterTypes } from "../../../../../../app/features/filterSlice";
import {
  ApiResponse,
  PaginatedResponse,
} from "../../../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../../../app/utils/tagTypes";
import { ICreateVendorEntry, IGetVendorEntry } from "../types/vendorEntryTypes";

const vendorEntryEndPoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getVendorEntries: builder.query<
      ApiResponse<PaginatedResponse<IGetVendorEntry[]>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/accounts/financial-entries/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.VENDOR_ENTRY,
          id: TagTypes.VENDOR_ENTRY + "_ID",
        },
      ],
    }),

    createVendorEntry: builder.mutation<ApiResponse<ICreateVendorEntry>, any>({
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
          type: TagTypes.VENDOR_ENTRY,
          id: TagTypes.VENDOR_ENTRY + "_ID",
        },
        {
          type: TagTypes.ACCOUNT,
          id: TagTypes.ACCOUNT + "_ID",
        },
      ],
    }),

    getSingleVendorEntry: builder.query<
      ApiResponse<PaginatedResponse<IGetVendorEntry>>,
      number
    >({
      query: (roleId) => ({
        url: `/api/v1.0/accounts/financial-entries/${roleId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.VENDOR_ENTRY,
          id: TagTypes.VENDOR_ENTRY + "_ID",
        },
      ],
    }),

    updateVendorEntry: builder.mutation<
      ApiResponse<IGetVendorEntry>,
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
          type: TagTypes.VENDOR_ENTRY,
          id: TagTypes.VENDOR_ENTRY + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useGetVendorEntriesQuery,
  useCreateVendorEntryMutation,
  useUpdateVendorEntryMutation,
  useGetSingleVendorEntryQuery,
} = vendorEntryEndPoints;
