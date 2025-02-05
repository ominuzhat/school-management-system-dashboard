import api from "../../../../../app/api/api";
import { FilterTypes } from "../../../../../app/features/filterSlice";
import { ApiResponse } from "../../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../../app/utils/tagTypes";
import { CollectFee, ICreateCollectFee } from "../type/collectFeeType";

const collectFeeEndPoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getCollectFees: builder.query<ApiResponse<CollectFee[]>, FilterTypes>({
      query: (params) => ({
        url: "/api/v1.0/admissions/collect-fees/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.COLLECT_FEE,
          id: TagTypes.COLLECT_FEE + "_ID",
        },
      ],
    }),

    createCollectFees: builder.mutation<ApiResponse<ICreateCollectFee>, any>({
      query: (data) => ({
        url: "/api/v1.0/admissions/collect-fees/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.COLLECT_FEE,
          id: TagTypes.COLLECT_FEE + "_ID",
        },
      ],
    }),

    getCollectSingleFees: builder.query<ApiResponse<any>, number>({
      query: (studId) => ({
        url: `/api/v1.0/admissions/collect-fees/${studId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.COLLECT_FEE,
          id: TagTypes.COLLECT_FEE + "_ID",
        },
      ],
    }),

    deleteCollectItem: builder.mutation<
      ApiResponse<ICreateCollectFee>,
      { id: any }
    >({
      query: (id) => ({
        url: `/api/v1.0/admissions/collect-fees/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [
        {
          type: TagTypes.COLLECT_FEE,
          id: TagTypes.COLLECT_FEE + "_ID",
        },
      ],
    }),

    updateCollectFees: builder.mutation<
      ApiResponse<ICreateCollectFee>,
      { id: number | undefined; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/admissions/collect-fees/${id}/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.COLLECT_FEE,
          id: TagTypes.COLLECT_FEE + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useDeleteCollectItemMutation,
  useCreateCollectFeesMutation,
  useGetCollectFeesQuery,
  useGetCollectSingleFeesQuery,
  useUpdateCollectFeesMutation,
} = collectFeeEndPoints;
