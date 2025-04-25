import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { ApiResponse, PaginatedResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../app/utils/tagTypes";
import { ICreateNotice, IGetNotice } from "../types/noticeTypes";

const noticeEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotice: builder.query<
      ApiResponse<PaginatedResponse<IGetNotice>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/institutions/notice-boards/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.NOTICE,
          id: TagTypes.NOTICE + "_ID",
        },
      ],
    }),

    createNotice: builder.mutation<ApiResponse<ICreateNotice>, FormData>({
      query: (data) => ({
        url: "/api/v1.0/institutions/notice-boards/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.NOTICE,
          id: TagTypes.NOTICE + "_ID",
        },
      ],
    }),

    getSingleNotice: builder.query<ApiResponse<any>, number>({
      query: (studId) => ({
        url: `/api/v1.0/institutions/notice-boards/${studId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.NOTICE,
          id: TagTypes.NOTICE + "_ID",
        },
      ],
    }),

    deleteNotice: builder.mutation<ApiResponse<any>, { id: any }>({
      query: ({ id }) => ({
        url: `/api/v1.0/institutions/notice-boards/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [
        {
          type: TagTypes.NOTICE,
          id: TagTypes.NOTICE + "_ID",
        },
      ],
    }),

    updateNotice: builder.mutation<
      ApiResponse<any>,
      { id: number | undefined; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/institutions/notice-boards/${id}/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.NOTICE,
          id: TagTypes.NOTICE + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useCreateNoticeMutation,
  useGetNoticeQuery,
  useGetSingleNoticeQuery,
  useUpdateNoticeMutation,
  useDeleteNoticeMutation,
} = noticeEndpoint;
