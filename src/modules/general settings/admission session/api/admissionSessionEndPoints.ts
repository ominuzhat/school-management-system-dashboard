import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { ApiResponse, PaginatedResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../app/utils/tagTypes";
import { IAdmissionSession } from "../type/admissionSessionType";

const admissionSessionEndPoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getAdmissionSession: builder.query<
      ApiResponse<PaginatedResponse<IAdmissionSession[]>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "api/v1.0/admissions/sessions/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.ADMISSION_SESSION,
          id: TagTypes.ADMISSION_SESSION + "_ID",
        },
      ],
    }),

    createAdmissionSession: builder.mutation<
      ApiResponse<IAdmissionSession>,
      FormData
    >({
      query: (data) => ({
        url: "api/v1.0/admissions/sessions/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.ADMISSION_SESSION,
          id: TagTypes.ADMISSION_SESSION + "_ID",
        },
      ],
    }),

    closedAdmissionSession: builder.mutation<
      ApiResponse<IAdmissionSession>,
      FormData
    >({
      query: (data) => ({
        url: "api/v1.0/admissions/sessions/close-sessions/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.ADMISSION_SESSION,
          id: TagTypes.ADMISSION_SESSION + "_ID",
        },
      ],
    }),

    openAdmissionSession: builder.mutation<
      ApiResponse<IAdmissionSession>,
      FormData
    >({
      query: (data) => ({
        url: "api/v1.0/admissions/sessions/open-sessions/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.ADMISSION_SESSION,
          id: TagTypes.ADMISSION_SESSION + "_ID",
        },
      ],
    }),

    getSingleCAdmissionSession: builder.query<
      ApiResponse<IAdmissionSession>,
      number
    >({
      query: (roleId) => ({
        url: `api/v1.0/admissions/sessions/${roleId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.ADMISSION_SESSION,
          id: TagTypes.ADMISSION_SESSION + "_ID",
        },
      ],
    }),

    deleteAdmissionSession: builder.mutation<ApiResponse<any>, { id: any }>({
      query: ({ id }) => ({
        url: `api/v1.0/admissions/sessions/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [
        {
          type: TagTypes.ADMISSION_SESSION,
          id: TagTypes.ADMISSION_SESSION + "_ID",
        },
      ],
    }),

    updateAdmissionSession: builder.mutation<
      ApiResponse<IAdmissionSession>,
      { id: number | undefined; data: any }
    >({
      query: ({ id, data }) => ({
        url: `api/v1.0/admissions/sessions/${id}/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.ADMISSION_SESSION,
          id: TagTypes.ADMISSION_SESSION + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useCreateAdmissionSessionMutation,
  useGetAdmissionSessionQuery,
  useGetSingleCAdmissionSessionQuery,
  useUpdateAdmissionSessionMutation,
  useClosedAdmissionSessionMutation,
  useOpenAdmissionSessionMutation,
  useDeleteAdmissionSessionMutation,
} = admissionSessionEndPoint;
