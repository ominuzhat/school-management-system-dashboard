import api from "../../../../../app/api/api";
import { FilterTypes } from "../../../../../app/features/filterSlice";
import {
  ApiResponse,
  PaginatedResponse,
} from "../../../../../app/utils/constant";
import { TagTypes } from "../../../../../app/utils/tagTypes";

const admitEndPoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getAdmit: builder.query<ApiResponse<PaginatedResponse<any[]>>, FilterTypes>(
      {
        query: (params) => ({
          url: "/api/v1.0/exams/receipts/admission-status/",
          params,
        }),
        providesTags: [
          {
            type: TagTypes.ADMIT,
            id: TagTypes.ADMIT + "_ID",
          },
        ],
      }
    ),

    getSingleAdmit: builder.query<ApiResponse<any>, number>({
      query: (payrollId) => ({
        url: `/api/v1.0/exams/receipts/admission-status/${payrollId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.ADMIT,
          id: TagTypes.ADMIT + "_ID",
        },
      ],
    }),

    getSingleAdmitForm: builder.query<Blob, number>({
      query: (id) => ({
        url: `/api/v1.0/exams/receipts/${id}/generate-admit-cards/`,
        responseHandler: async (response) => response.blob(),
        cache: "no-cache",
      }),

      providesTags: [
        {
          type: TagTypes.ADMIT,
          id: TagTypes.ADMIT + "_ID",
        },
      ],
    }),

    getAdmitForm: builder.query<Blob, any>({
      query: ({ params }: any) => ({
        url: `/api/v1.0/exams/receipts/generate-admit-cards/`,
        responseHandler: async (response) => response.blob(),
        cache: "no-cache",
        params,
      }),

      providesTags: [
        {
          type: TagTypes.ADMIT,
          id: TagTypes.ADMIT + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useGetAdmitQuery,
  useGetSingleAdmitQuery,
  useLazyGetAdmitFormQuery,
  useLazyGetSingleAdmitFormQuery,
} = admitEndPoints;
