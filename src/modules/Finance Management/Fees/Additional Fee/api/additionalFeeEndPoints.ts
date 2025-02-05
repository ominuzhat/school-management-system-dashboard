import api from "../../../../../app/api/api";
import { FilterTypes } from "../../../../../app/features/filterSlice";
import { ApiResponse } from "../../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../../app/utils/tagTypes";
import {
  ICreateAdditionalFee,
  IGetAdditionalFee,
} from "../type/additionalFeeTypes";

const additionalFeeEndPoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getAdditionalFees: builder.query<
      ApiResponse<IGetAdditionalFee[]>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/admissions/add-ons/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.ADDITIONAL_FEE,
          id: TagTypes.ADDITIONAL_FEE + "_ID",
        },
      ],
    }),

    createAdditionalFees: builder.mutation<
      ApiResponse<ICreateAdditionalFee>,
      any
    >({
      query: (data) => ({
        url: "/api/v1.0/admissions/add-ons/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.ADDITIONAL_FEE,
          id: TagTypes.ADDITIONAL_FEE + "_ID",
        },
      ],
    }),

    getAdditionalSingleFees: builder.query<ApiResponse<any>, number>({
      query: (studId) => ({
        url: `/api/v1.0/admissions/add-ons/${studId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.ADDITIONAL_FEE,
          id: TagTypes.ADDITIONAL_FEE + "_ID",
        },
      ],
    }),

    deleteAdditionalItem: builder.mutation<
      ApiResponse<ICreateAdditionalFee>,
      { id: any }
    >({
      query: (id) => ({
        url: `/api/v1.0/admissions/add-ons/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [
        {
          type: TagTypes.ADDITIONAL_FEE,
          id: TagTypes.ADDITIONAL_FEE + "_ID",
        },
      ],
    }),

    updateAdditionalFees: builder.mutation<
      ApiResponse<ICreateAdditionalFee>,
      { id: number | undefined; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/admissions/add-ons/${id}/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.ADDITIONAL_FEE,
          id: TagTypes.ADDITIONAL_FEE + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useDeleteAdditionalItemMutation,
  useCreateAdditionalFeesMutation,
  useGetAdditionalFeesQuery,
  useGetAdditionalSingleFeesQuery,
  useUpdateAdditionalFeesMutation,
} = additionalFeeEndPoints;
