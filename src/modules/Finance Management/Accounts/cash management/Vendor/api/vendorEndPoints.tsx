import api from "../../../../../../app/api/api";
import { FilterTypes } from "../../../../../../app/features/filterSlice";
import {
  ApiResponse,
  PaginatedResponse,
} from "../../../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../../../app/utils/tagTypes";
import { ICreateVendor, IGetVendor } from "../types/vendorTypes";

const vendorEndPoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getVendor: builder.query<
      ApiResponse<PaginatedResponse<IGetVendor[]>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/accounts/financial-entries/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.VENDOR,
          id: TagTypes.VENDOR + "_ID",
        },
      ],
    }),

    createVendor: builder.mutation<ApiResponse<ICreateVendor>, any>({
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
          type: TagTypes.VENDOR,
          id: TagTypes.VENDOR + "_ID",
        },
      ],
    }),

    getSingleVendor: builder.query<
      ApiResponse<PaginatedResponse<IGetVendor>>,
      number
    >({
      query: (roleId) => ({
        url: `/api/v1.0/accounts/financial-entries/${roleId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.VENDOR,
          id: TagTypes.VENDOR + "_ID",
        },
      ],
    }),

    updateVendor: builder.mutation<
      ApiResponse<IGetVendor>,
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
          type: TagTypes.VENDOR,
          id: TagTypes.VENDOR + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useGetVendorQuery,
  useCreateVendorMutation,
  useUpdateVendorMutation,
  useGetSingleVendorQuery,
} = vendorEndPoints;
