import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { ApiResponse, PaginatedResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../app/utils/tagTypes";
import { ICreateShift, IGetShift } from "../type/shiftTypes";

const shiftEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getShift: builder.query<
      ApiResponse<PaginatedResponse<IGetShift[]>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/admissions/shifts/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.SHIFT,
          id: TagTypes.SHIFT + "_ID",
        },
      ],
    }),

    createShift: builder.mutation<ApiResponse<ICreateShift>, any>({
      query: (data) => ({
        url: "/api/v1.0/admissions/shifts/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.SHIFT,
          id: TagTypes.SHIFT + "_ID",
        },
      ],
    }),

    getSingleShift: builder.query<
      ApiResponse<PaginatedResponse<IGetShift>>,
      number
    >({
      query: (roleId) => ({
        url: `/api/v1.0/admissions/shifts/${roleId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.SHIFT,
          id: TagTypes.SHIFT + "_ID",
        },
      ],
    }),

    updateShift: builder.mutation<
      ApiResponse<IGetShift>,
      { id: number | undefined; data: any }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/admissions/shifts/${id}/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.SHIFT,
          id: TagTypes.SHIFT + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useGetShiftQuery,
  useCreateShiftMutation,
  useUpdateShiftMutation,
  useGetSingleShiftQuery,
} = shiftEndpoint;
