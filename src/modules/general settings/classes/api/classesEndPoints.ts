import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { ApiResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../app/utils/tagTypes";
import { IClasses } from "../classesType";

const classesEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getClasses: builder.query<ApiResponse<IClasses[]>, FilterTypes>({
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

    createClasses: builder.mutation<ApiResponse<IClasses>, FormData>({
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

    getSingleClasses: builder.query<ApiResponse<IClasses>, number>({
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
} = classesEndpoint;
