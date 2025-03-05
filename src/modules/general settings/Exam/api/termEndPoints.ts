import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { ApiResponse, PaginatedResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../app/utils/tagTypes";
import { ICreateTerm, IGetTerm } from "../type/termType";

const termEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getTerm: builder.query<
      ApiResponse<PaginatedResponse<IGetTerm[]>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/exams/terms/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.TERM,
          id: TagTypes.TERM + "_ID",
        },
      ],
    }),

    createTerm: builder.mutation<ApiResponse<ICreateTerm>, any>({
      query: (data) => ({
        url: "/api/v1.0/exams/terms/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.TERM,
          id: TagTypes.TERM + "_ID",
        },
      ],
    }),

    getSingleTerm: builder.query<
      ApiResponse<PaginatedResponse<IGetTerm>>,
      number
    >({
      query: (roleId) => ({
        url: `/api/v1.0/exams/terms/${roleId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.TERM,
          id: TagTypes.TERM + "_ID",
        },
      ],
    }),

    updateTerm: builder.mutation<
      ApiResponse<IGetTerm>,
      { id: number | undefined; data: any }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/exams/terms/${id}/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.TERM,
          id: TagTypes.TERM + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useGetTermQuery,
  useCreateTermMutation,
  useUpdateTermMutation,
  useGetSingleTermQuery,
} = termEndpoint;
