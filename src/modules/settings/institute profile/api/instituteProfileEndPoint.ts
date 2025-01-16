import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { ApiResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../app/utils/tagTypes";
import { IInstituteProfile } from "../type/InstituteProfile";

const instituteProfileEndPoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getInstituteProfile: builder.query<
      ApiResponse<IInstituteProfile>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/institutions/me/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.INSTITUTE_PROFILE,
          id: TagTypes.INSTITUTE_PROFILE + "_ID",
        },
      ],
    }),

    updateInstituteProfile: builder.mutation<
      ApiResponse<IInstituteProfile>,
      { data: FormData }
    >({
      query: ({ data }) => ({
        url: `/api/v1.0/institutions/me/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.INSTITUTE_PROFILE,
          id: TagTypes.INSTITUTE_PROFILE + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useGetInstituteProfileQuery,
  useUpdateInstituteProfileMutation,
} = instituteProfileEndPoint;
