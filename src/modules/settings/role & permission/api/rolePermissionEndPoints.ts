import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { ApiResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../app/utils/tagTypes";
import {
  IGetSingleRolePermission,
  IUpdateRolePermission,
  TGetPermission,
  TGetRolePermission,
} from "../type/rolePermissionTypes";

const rolePermissionEndPoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getPermission: builder.query<ApiResponse<TGetPermission[]>, FilterTypes>({
      query: (params) => ({
        url: "/api/v1.0/institutions/permissions/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.ROLE_PERMISSION,
          id: TagTypes.ROLE_PERMISSION + "_ID",
        },
      ],
    }),

    getRolePermission: builder.query<
      ApiResponse<TGetRolePermission[]>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/institutions/roles/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.ROLE_PERMISSION,
          id: TagTypes.ROLE_PERMISSION + "_ID",
        },
      ],
    }),

    getSingleRolePermission: builder.query<
      ApiResponse<IGetSingleRolePermission>,
      number
    >({
      query: (roleId) => ({
        url: `/api/v1.0/institutions/roles/${roleId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.ROLE_PERMISSION,
          id: TagTypes.ROLE_PERMISSION + "_ID",
        },
      ],
    }),

    // createRestaurant: builder.mutation<ApiResponse<RestaurantTypes>, FormData>({
    //   query: (data) => ({
    //     url: "/admin/restaurants",
    //     method: "POST",
    //     body: data,
    //   }),
    //   async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
    //     await handleOnQueryStarted(queryFulfilled, dispatch);
    //   },
    //   invalidatesTags: [{ type: "Restaurant", id: "RESTAURANT_ID" }],
    // }),

    updateRolePermission: builder.mutation<
      ApiResponse<IUpdateRolePermission>,
      { id: number | undefined; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/institutions/roles/${id}/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.ROLE_PERMISSION,
          id: TagTypes.ROLE_PERMISSION + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useGetRolePermissionQuery,
  useGetSingleRolePermissionQuery,
  useGetPermissionQuery,
  useUpdateRolePermissionMutation,
} = rolePermissionEndPoint;
