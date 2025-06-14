import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { ApiResponse, PaginatedResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../app/utils/tagTypes";
import { IClasses } from "../type/classesType";

const classesEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getClassesBigList: builder.query<
      ApiResponse<PaginatedResponse<IClasses[]>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/institutions/grade-levels/big-list/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.ClASSES,
          id: TagTypes.ClASSES + "_ID",
        },
        {
          type: TagTypes.SHIFT,
          id: TagTypes.SHIFT + "_ID",
        },
        {
          type: TagTypes.SECTION,
          id: TagTypes.SECTION + "_ID",
        },
      ],
    }),

    getClasses: builder.query<
      ApiResponse<PaginatedResponse<IClasses[]>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/institutions/grade-levels/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.ClASSES,
          id: TagTypes.ClASSES + "_ID",
        },
      ],
    }),

    createClasses: builder.mutation<ApiResponse<IClasses>, any>({
      query: (data) => ({
        url: "/api/v1.0/institutions/grade-levels/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.ClASSES,
          id: TagTypes.ClASSES + "_ID",
        },
      ],
    }),

    getSingleClasses: builder.query<
      ApiResponse<PaginatedResponse<IClasses>>,
      number
    >({
      query: (roleId) => ({
        url: `/api/v1.0/institutions/grade-levels/${roleId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.ClASSES,
          id: TagTypes.ClASSES + "_ID",
        },
      ],
    }),

    deleteClasses: builder.mutation<ApiResponse<any>, { id: any }>({
      query: ({ id }) => ({
        url: `/api/v1.0/institutions/grade-levels/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [
        {
          type: TagTypes.ClASSES,
          id: TagTypes.ClASSES + "_ID",
        },
      ],
    }),

    updateClasses: builder.mutation<
      ApiResponse<IClasses>,
      { id: number | undefined; data: any }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/institutions/grade-levels/${id}/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.ClASSES,
          id: TagTypes.ClASSES + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useGetClassesQuery,
  useCreateClassesMutation,
  useUpdateClassesMutation,
  useGetSingleClassesQuery,
  useDeleteClassesMutation,
  useGetClassesBigListQuery,
} = classesEndpoint;
