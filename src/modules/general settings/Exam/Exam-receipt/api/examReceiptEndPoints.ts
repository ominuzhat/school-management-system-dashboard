import api from "../../../../../app/api/api";
import { FilterTypes } from "../../../../../app/features/filterSlice";
import {
  ApiResponse,
  PaginatedResponse,
} from "../../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../../app/utils/tagTypes";
import {
  ICreateExamReceipt,
  IGetExamReceipt,
} from "../types/examReceiptsTypes";

const examReceiptEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getExamReceipt: builder.query<
      ApiResponse<PaginatedResponse<IGetExamReceipt[]>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/exams/receipts/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.EXAM_Receipts,
          id: TagTypes.EXAM_Receipts + "_ID",
        },
      ],
    }),

    createExamReceipt: builder.mutation<ApiResponse<ICreateExamReceipt>, any>({
      query: (data) => ({
        url: "/api/v1.0/exams/receipts/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.EXAM_Receipts,
          id: TagTypes.EXAM_Receipts + "_ID",
        },
      ],
    }),

    getSingleExamReceipts: builder.query<
      ApiResponse<PaginatedResponse<IGetExamReceipt>>,
      number
    >({
      query: (roleId) => ({
        url: `/api/v1.0/exams/receipts/${roleId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.EXAM_Receipts,
          id: TagTypes.EXAM_Receipts + "_ID",
        },
      ],
    }),

    updateExamReceipts: builder.mutation<
      ApiResponse<IGetExamReceipt>,
      { id: number | undefined; data: any }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/exams/receipts/${id}/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.EXAM_Receipts,
          id: TagTypes.EXAM_Receipts + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useCreateExamReceiptMutation,
  useGetExamReceiptQuery,
  useUpdateExamReceiptsMutation,
  useGetSingleExamReceiptsQuery,
} = examReceiptEndpoint;
