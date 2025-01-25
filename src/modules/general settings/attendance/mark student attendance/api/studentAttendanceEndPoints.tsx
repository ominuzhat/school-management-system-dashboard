import api from "../../../../../app/api/api";
import { FilterTypes } from "../../../../../app/features/filterSlice";
import {
  ApiResponse,
  PaginatedResponse,
} from "../../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../../app/utils/tagTypes";
import { TAttendanceData } from "../type/markStudentAttendanceType";

const studentAttendanceEndPoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getStudentAttendance: builder.query<
      ApiResponse<PaginatedResponse<TAttendanceData[]>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/admissions/attendances/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.STUDENT_ATTENDANCE,
          id: TagTypes.STUDENT_ATTENDANCE + "_ID",
        },
      ],
    }),
    getMarkStudentAttendance: builder.query<
      ApiResponse<PaginatedResponse<TAttendanceData[]>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "api/v1.0/admissions/attendances/mark-attendance/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.STUDENT_ATTENDANCE,
          id: TagTypes.STUDENT_ATTENDANCE + "_ID",
        },
      ],
    }),

    createStudentAttendance: builder.mutation<
      ApiResponse<TAttendanceData>,
      FormData
    >({
      query: (data) => ({
        url: "api/v1.0/admissions/attendances/mark-attendance/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.STUDENT_ATTENDANCE,
          id: TagTypes.STUDENT_ATTENDANCE + "_ID",
        },
      ],
    }),

    getSingleStudentAttendance: builder.query<
      ApiResponse<TAttendanceData>,
      number
    >({
      query: (roleId) => ({
        url: `api/v1.0/admissions/attendances/mark-attendance/${roleId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.STUDENT_ATTENDANCE,
          id: TagTypes.STUDENT_ATTENDANCE + "_ID",
        },
      ],
    }),

    updateStudentAttendance: builder.mutation<
      ApiResponse<TAttendanceData>,
      { id: number | undefined; data: any }
    >({
      query: ({ id, data }) => ({
        url: `api/v1.0/admissions/attendances/mark-attendance/${id}/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.STUDENT_ATTENDANCE,
          id: TagTypes.STUDENT_ATTENDANCE + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useGetMarkStudentAttendanceQuery,
  useLazyGetMarkStudentAttendanceQuery,

  useCreateStudentAttendanceMutation,
  useGetSingleStudentAttendanceQuery,
  useGetStudentAttendanceQuery,
  useLazyGetStudentAttendanceQuery,
  useUpdateStudentAttendanceMutation,
} = studentAttendanceEndPoint;
