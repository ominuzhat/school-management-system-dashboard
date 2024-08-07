import api from "../../../app/api/api";
import { ApiResponse } from "../../../app/utils/constant";
import { ProfileTypes } from "../types/profileTypes";

const profileEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ApiResponse<ProfileTypes>, void>({
      query: () => ({
        url: "/user/me",
      }),
      providesTags: [{ type: "Profile", id: "PROFILE_ID" }],
    }),

    updateProfile: builder.mutation<ApiResponse<ProfileTypes>, ProfileTypes>({
      query: (data) => ({
        url: "/user/me",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [{ type: "Profile", id: "PROFILE_ID" }],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileEndpoint;
