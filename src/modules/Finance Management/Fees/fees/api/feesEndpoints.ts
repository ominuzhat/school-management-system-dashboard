import api from "../../../../../app/api/api";
import { FilterTypes } from "../../../../../app/features/filterSlice";
import { ApiResponse } from "../../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../../app/utils/tagTypes";

const feesEndPoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getFees: builder.query<ApiResponse<any[]>, FilterTypes>({
      query: (params) => ({
        url: "/api/v1.0/fees/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.FESS,
          id: TagTypes.FESS + "_ID",
        },
      ],
    }),

    createFees: builder.mutation<ApiResponse<any>, FormData>({
      query: (data) => ({
        url: "/api/v1.0/fees/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.FESS,
          id: TagTypes.FESS + "_ID",
        },
      ],
    }),

    getSingleFees: builder.query<ApiResponse<any>, number>({
      query: (studId) => ({
        url: `/api/v1.0/fees/${studId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.FESS,
          id: TagTypes.FESS + "_ID",
        },
      ],
    }),

    updateFees: builder.mutation<
      ApiResponse<any>,
      { id: number | undefined; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/fees/${id}/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.FESS,
          id: TagTypes.FESS + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useCreateFeesMutation,
  useGetFeesQuery,
  useGetSingleFeesQuery,
  useUpdateFeesMutation,
} = feesEndPoints;
