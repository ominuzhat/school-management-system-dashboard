import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { ApiResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import {
  TCategoryDataTypes,
  TCreateCategoryTypes,
} from "../types/CategoryTypes";

const categoryEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query<ApiResponse<TCategoryDataTypes[]>, FilterTypes>({
      query: (params) => ({
        url: "/category",
        params,
      }),
      providesTags: [{ type: "Category", id: "Category_ID" }],
    }),

    singleCategoryItem: builder.query<ApiResponse<any>, { id: number }>({
      query: ({ id }) => ({
        url: `/category/${id}`,
      }),
      providesTags: [{ type: "Category", id: "Category_ID" }],
    }),

    deleteCategoryItem: builder.mutation<
      ApiResponse<TCategoryDataTypes>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Category", id: "Category_ID" }],
    }),

    createCategory: builder.mutation<
      ApiResponse<TCreateCategoryTypes>,
      FormData
    >({
      query: (data) => ({
        url: "/category",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [{ type: "Category", id: "Category_ID" }],
    }),

    updateCategory: builder.mutation<
      ApiResponse<TCreateCategoryTypes>,
      { id: number | undefined; data: TCreateCategoryTypes }
    >({
      query: ({ id, data }) => ({
        url: `/category/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [{ type: "Category", id: "Category_ID" }],
    }),
  }),
});

export const {
  useDeleteCategoryItemMutation,
  useGetCategoryQuery,
  useSingleCategoryItemQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} = categoryEndpoint;
