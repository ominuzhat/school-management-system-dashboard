import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { ApiResponse, PaginatedResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../app/utils/tagTypes";
import { ICreateRoutine, IGetRoutine } from "../type/routineTypes";

const routineEndPoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getRoutine: builder.query<
      ApiResponse<PaginatedResponse<IGetRoutine[]>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/admissions/routines/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.ROUTINE,
          id: TagTypes.ROUTINE + "_ID",
        },
      ],
    }),

    createRoutine: builder.mutation<ApiResponse<ICreateRoutine>, any>({
      query: (data) => ({
        url: "/api/v1.0/admissions/routines/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.ROUTINE,
          id: TagTypes.ROUTINE + "_ID",
        },
      ],
    }),

    getSingleRoutine: builder.query<
      ApiResponse<PaginatedResponse<IGetRoutine>>,
      number
    >({
      query: (roleId) => ({
        url: `/api/v1.0/admissions/routines/${roleId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.ROUTINE,
          id: TagTypes.ROUTINE + "_ID",
        },
      ],
    }),

    updateRoutine: builder.mutation<
      ApiResponse<ICreateRoutine>,
      { id: number | undefined; data: any }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/admissions/routines/${id}/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.ROUTINE,
          id: TagTypes.ROUTINE + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useGetRoutineQuery,
  useCreateRoutineMutation,
  useUpdateRoutineMutation,
  useGetSingleRoutineQuery,
} = routineEndPoint;
