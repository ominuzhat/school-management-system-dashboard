import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { ApiResponse, PaginatedResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../app/utils/tagTypes";
import { ICreateRules, IGetRules } from "../types/rulesTypes";

const rulesEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getRule: builder.query<
      ApiResponse<PaginatedResponse<IGetRules>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/institutions/rules/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.RULES,
          id: TagTypes.RULES + "_ID",
        },
      ],
    }),

    createRule: builder.mutation<ApiResponse<ICreateRules>, FormData>({
      query: (data) => ({
        url: "/api/v1.0/institutions/rules/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.RULES,
          id: TagTypes.RULES + "_ID",
        },
      ],
    }),

    getSingleRule: builder.query<ApiResponse<any>, number>({
      query: (studId) => ({
        url: `/api/v1.0/institutions/rules/${studId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.RULES,
          id: TagTypes.RULES + "_ID",
        },
      ],
    }),

    deleteRule: builder.mutation<ApiResponse<any>, { id: any }>({
      query: ({ id }) => ({
        url: `/api/v1.0/institutions/rules/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [
        {
          type: TagTypes.RULES,
          id: TagTypes.RULES + "_ID",
        },
      ],
    }),

    updateRule: builder.mutation<
      ApiResponse<any>,
      { id: number | undefined; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/institutions/rules/${id}/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.RULES,
          id: TagTypes.RULES + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useCreateRuleMutation,
  useGetRuleQuery,
  useGetSingleRuleQuery,
  useUpdateRuleMutation,
  useDeleteRuleMutation,
} = rulesEndpoint;
