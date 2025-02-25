import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { ApiResponse, PaginatedResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../app/utils/tagTypes";
import { ICreateSms, IGetSms } from "../types/smsTypes";

const smsEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getSms: builder.query<ApiResponse<PaginatedResponse<IGetSms>>, FilterTypes>(
      {
        query: () => ({
          url: "/api/v1.0/supports/sms-configs/",
        }),
        providesTags: [
          {
            type: TagTypes.SMS,
            id: TagTypes.SMS + "_ID",
          },
        ],
      }
    ),

    createSms: builder.mutation<ApiResponse<ICreateSms>, FormData>({
      query: (data) => ({
        url: "/api/v1.0/supports/sms-configs/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.SMS,
          id: TagTypes.SMS + "_ID",
        },
      ],
    }),

    getSingleSms: builder.query<ApiResponse<IGetSms>, number>({
      query: (id) => ({
        url: `/api/v1.0/supports/sms-configs/${id}/`,
      }),

      providesTags: [
        {
          type: TagTypes.SMS,
          id: TagTypes.SMS + "_ID",
        },
      ],
    }),

    updateSms: builder.mutation<
      ApiResponse<any>,
      { id: number | undefined; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/supports/sms-configs/${id}/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.SMS,
          id: TagTypes.SMS + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useCreateSmsMutation,
  useGetSmsQuery,
  useGetSingleSmsQuery,
  useUpdateSmsMutation,
} = smsEndpoint;
