import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { ApiResponse, PaginatedResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../app/utils/tagTypes";
import { ICreateSection, IGetSection } from "../types/sectionTypes";

const sectionEndPoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getSection: builder.query<
      ApiResponse<PaginatedResponse<IGetSection>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/admissions/sections/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.SECTION,
          id: TagTypes.SECTION + "_ID",
        },
      ],
    }),

    createSection: builder.mutation<ApiResponse<ICreateSection>, FormData>({
      query: (data) => ({
        url: "/api/v1.0/admissions/sections/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.SECTION,
          id: TagTypes.SECTION + "_ID",
        },
      ],
    }),

    getSingleSection: builder.query<
      ApiResponse<PaginatedResponse<IGetSection>>,
      number
    >({
      query: (roleId) => ({
        url: `/api/v1.0/admissions/sections/${roleId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.SECTION,
          id: TagTypes.SECTION + "_ID",
        },
      ],
    }),

    deleteSection: builder.mutation<ApiResponse<any>, { id: any }>({
      query: ({ id }) => ({
        url: `/api/v1.0/admissions/sections/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [
        {
          type: TagTypes.SECTION,
          id: TagTypes.SECTION + "_ID",
        },
      ],
    }),

    updateSection: builder.mutation<
      ApiResponse<IGetSection>,
      { id: number | undefined; data: any }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/admissions/sections/${id}/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.SECTION,
          id: TagTypes.SECTION + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useGetSectionQuery,
  useCreateSectionMutation,
  useUpdateSectionMutation,
  useGetSingleSectionQuery,
  useDeleteSectionMutation,
} = sectionEndPoint;
