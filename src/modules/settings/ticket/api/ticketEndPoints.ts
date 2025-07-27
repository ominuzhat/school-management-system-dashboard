import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { ApiResponse, PaginatedResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../app/utils/tagTypes";
import { ICreateTicket } from "../types/ticketType";

const ticketEndPoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getTicket: builder.query<ApiResponse<PaginatedResponse<any>>, FilterTypes>(
      {
        query: (params) => ({
          url: "/api/v1.0/supports/tickets/",
          params,
        }),
        providesTags: [
          {
            type: TagTypes.TICKET,
            id: TagTypes.TICKET + "_ID",
          },
        ],
      }
    ),

    createTicket: builder.mutation<ApiResponse<ICreateTicket>, FormData>({
      query: (data) => ({
        url: "/api/v1.0/supports/tickets/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.TICKET,
          id: TagTypes.TICKET + "_ID",
        },
      ],
    }),

    getSingleTicket: builder.query<ApiResponse<any>, number>({
      query: (ticketID) => ({
        url: `/api/v1.0/supports/tickets/${ticketID}/`,
      }),

      providesTags: [
        {
          type: TagTypes.TICKET,
          id: TagTypes.TICKET + "_ID",
        },
      ],
    }),

    deleteTicket: builder.mutation<ApiResponse<any>, { id: any }>({
      query: ({ id }) => ({
        url: `/api/v1.0/supports/tickets/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [
        {
          type: TagTypes.TICKET,
          id: TagTypes.TICKET + "_ID",
        },
      ],
    }),

    updateStatusTicket: builder.mutation<
      ApiResponse<any>,
      { id: number | undefined; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/supports/tickets/${id}/update-status/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.TICKET,
          id: TagTypes.TICKET + "_ID",
        },
      ],
    }),


    addCommentTicket: builder.mutation<
      ApiResponse<any>,
      { id: number | undefined; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/supports/tickets/${id}/add-comment/`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.TICKET,
          id: TagTypes.TICKET + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useGetTicketQuery,
  useCreateTicketMutation,
  useGetSingleTicketQuery,
  useAddCommentTicketMutation,
  useDeleteTicketMutation,
  useUpdateStatusTicketMutation
} = ticketEndPoint
