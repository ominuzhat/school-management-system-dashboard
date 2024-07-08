import api from "../../../app/api/api";
import { ApiResponse } from "../../../app/utils/constant";
import { LoginTypes } from "../types/authTypes";

const loginEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<LoginTypes>, LoginTypes>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Profile", id: "PROFILE_ID" }],
    }),
  }),
});

export const { useLoginMutation } = loginEndpoint;
