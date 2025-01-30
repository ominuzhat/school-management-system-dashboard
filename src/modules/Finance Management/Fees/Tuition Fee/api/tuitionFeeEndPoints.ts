import api from "../../../../../app/api/api";
import { FilterTypes } from "../../../../../app/features/filterSlice";
import { ApiResponse } from "../../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../../app/utils/tagTypes";

const tuitionFeeEndPoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getTuitionFees: builder.query<ApiResponse<any[]>, FilterTypes>({
      query: (params) => ({
        url: "/api/v1.0/admissions/tuition-payrolls/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.TUITION_FEES,
          id: TagTypes.TUITION_FEES + "_ID",
        },
      ],
    }),

    createTuitionFees: builder.mutation<ApiResponse<any>, any>({
      query: (data) => ({
        url: "/api/v1.0/admissions/tuition-payrolls/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.TUITION_FEES,
          id: TagTypes.TUITION_FEES + "_ID",
        },
      ],
    }),

    getTuitionSingleFees: builder.query<ApiResponse<any>, number>({
      query: (studId) => ({
        url: `/api/v1.0/admissions/tuition-payrolls/${studId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.TUITION_FEES,
          id: TagTypes.TUITION_FEES + "_ID",
        },
      ],
    }),

    updateTuitionFees: builder.mutation<
      ApiResponse<any>,
      { id: number | undefined; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/admissions/tuition-payrolls/${id}/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.TUITION_FEES,
          id: TagTypes.TUITION_FEES + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useCreateTuitionFeesMutation,
  useGetTuitionFeesQuery,
  useGetTuitionSingleFeesQuery,
  useUpdateTuitionFeesMutation,
} = tuitionFeeEndPoints;
