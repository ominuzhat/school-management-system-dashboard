import api from "../../../app/api/api";
import { FilterTypes } from "../../../app/features/filterSlice";
import { ApiResponse } from "../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../app/utils/onQueryStartedHandler";
import { UsersTypes } from "../types/UsersTypes";

const usersEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<ApiResponse<UsersTypes[]>, FilterTypes>({
      query: (params) => ({
        url: "/admin/users",
        params,
      }),
      providesTags: [{ type: "Users", id: "USERS_ID" }],
    }),

    createUser: builder.mutation<ApiResponse<UsersTypes>, UsersTypes>({
      query: (data) => ({
        url: "/admin/users",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [{ type: "Users", id: "USERS_ID" }],
    }),

    updateUser: builder.mutation<
      ApiResponse<UsersTypes>,
      { id: number; data: UsersTypes }
    >({
      query: ({ id, data }) => ({
        url: `/admin/users/${id}`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [{ type: "Users", id: "USERS_ID" }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} = usersEndpoint;
