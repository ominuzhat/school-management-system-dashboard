import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { ApiResponse, PaginatedResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../app/utils/tagTypes";
import { IAdmission, ISingleAdmission } from "../type/admissionType";

const admissionEndPoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getAdmission: builder.query<
      ApiResponse<PaginatedResponse<IAdmission[]>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "api/v1.0/admissions/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.ADMISSION,
          id: TagTypes.ADMISSION + "_ID",
        },
        {
          type: TagTypes.COLLECT_FEE,
          id: TagTypes.COLLECT_FEE + "_ID",
        },
      ],
    }),

    createAdmission: builder.mutation<ApiResponse<IAdmission>, FormData>({
      query: (data) => ({
        url: "api/v1.0/admissions/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.ADMISSION,
          id: TagTypes.ADMISSION + "_ID",
        },
      ],
    }),

    getSingleAdmission: builder.query<ApiResponse<ISingleAdmission>, number>({
      query: (admissionId) => ({
        url: `api/v1.0/admissions/${admissionId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.ADMISSION,
          id: TagTypes.ADMISSION + "_ID",
        },
      ],
    }),

    getSingleAdmissionForm: builder.query<Blob, number>({
      query: (admissionId) => ({
        url: `/api/v1.0/admissions/generate-admission-form/?admission_id=${admissionId}`,
        responseHandler: async (response) => response.blob(), // Convert to Blob
        cache: "no-cache", // Ensures fresh data
      }),
      providesTags: [
        {
          type: TagTypes.ADMISSION,
          id: TagTypes.ADMISSION + "_ID",
        },
      ],
    }),

    deleteAdmission: builder.mutation<ApiResponse<any>, { id: any }>({
      query: ({ id }) => ({
        url: `/api/v1.0/admissions/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [
        {
          type: TagTypes.ADMISSION,
          id: TagTypes.ADMISSION + "_ID",
        },
      ],
    }),

    updateAdmission: builder.mutation<
      ApiResponse<IAdmission>,
      { id: number | undefined; data: any }
    >({
      query: ({ id, data }) => ({
        url: `api/v1.0/admissions/${id}/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.ADMISSION,
          id: TagTypes.ADMISSION + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useCreateAdmissionMutation,
  useGetAdmissionQuery,
  useLazyGetAdmissionQuery,
  useGetSingleAdmissionQuery,
  useUpdateAdmissionMutation,
  useGetSingleAdmissionFormQuery,
  useDeleteAdmissionMutation,
} = admissionEndPoint;
