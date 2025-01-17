import api from "../../../../app/api/api";
import { FilterTypes } from "../../../../app/features/filterSlice";
import { ApiResponse } from "../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../app/utils/tagTypes";
import { ICreateStudent, IStudents } from "../types/studentsType";

const studentsEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query<ApiResponse<IStudents[]>, FilterTypes>({
      query: (params) => ({
        url: "/api/v1.0/students/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.STUDENTS,
          id: TagTypes.STUDENTS + "_ID",
        },
      ],
    }),

    createStudent: builder.mutation<ApiResponse<ICreateStudent>, FormData>({
      query: (data) => ({
        url: "/api/v1.0/students/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.STUDENTS,
          id: TagTypes.STUDENTS + "_ID",
        },
      ],
    }),

    getSingleStudent: builder.query<ApiResponse<IStudents>, number>({
      query: (studId) => ({
        url: `/api/v1.0/students/${studId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.STUDENTS,
          id: TagTypes.STUDENTS + "_ID",
        },
      ],
    }),

    updateRestaurant: builder.mutation<
      ApiResponse<IStudents>,
      { id: number | undefined; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/admin/restaurants/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [{ type: "Restaurant", id: "RESTAURANT_ID" }],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useCreateStudentMutation,
  useUpdateRestaurantMutation,
  useGetSingleStudentQuery,
} = studentsEndpoint;
