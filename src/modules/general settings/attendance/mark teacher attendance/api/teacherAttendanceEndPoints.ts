import api from "../../../../../app/api/api";
import { FilterTypes } from "../../../../../app/features/filterSlice";
import {
  ApiResponse,
  PaginatedResponse,
} from "../../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../../app/utils/tagTypes";

const teacherAttendanceEndPoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getTeacherAttendanceList: builder.query<
      ApiResponse<PaginatedResponse<any[]>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/employees/attendances/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.TEACHER_ATTENDANCE,
          id: TagTypes.TEACHER_ATTENDANCE + "_ID",
        },
      ],
    }),

    getTeacherAttendance: builder.query<
      ApiResponse<PaginatedResponse<any[]>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/employees/attendances/mark-attendance/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.TEACHER_ATTENDANCE,
          id: TagTypes.TEACHER_ATTENDANCE + "_ID",
        },
      ],
    }),

    getMarkTeacherAttendance: builder.query<
      ApiResponse<PaginatedResponse<any[]>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "api/v1.0/employees/attendances/mark-attendance/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.TEACHER_ATTENDANCE,
          id: TagTypes.TEACHER_ATTENDANCE + "_ID",
        },
      ],
    }),

    createTeacherAttendance: builder.mutation<ApiResponse<any>, FormData>({
      query: (data) => ({
        url: "api/v1.0/employees/attendances/mark-attendance/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.TEACHER_ATTENDANCE,
          id: TagTypes.TEACHER_ATTENDANCE + "_ID",
        },
      ],
    }),

    getSingleEmployeeAttendance: builder.query<ApiResponse<any>, number>({
      query: (roleId) => ({
        url: `api/v1.0/employees/attendances/${roleId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.TEACHER_ATTENDANCE,
          id: TagTypes.TEACHER_ATTENDANCE + "_ID",
        },
      ],
    }),
    getSingleTeacherAttendanceList: builder.query<ApiResponse<any>, number>({
      query: (attendanceId) => ({
        url: `api/v1.0/employees/attendances/mark-attendance/${attendanceId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.TEACHER_ATTENDANCE,
          id: TagTypes.TEACHER_ATTENDANCE + "_ID",
        },
      ],
    }),

    updateTeacherAttendance: builder.mutation<
      ApiResponse<any>,
      { id: number | undefined; data: any }
    >({
      query: ({ id, data }) => ({
        url: `api/v1.0/employees/attendances/mark-attendance/${id}/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.TEACHER_ATTENDANCE,
          id: TagTypes.TEACHER_ATTENDANCE + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useGetTeacherAttendanceListQuery,
  useGetMarkTeacherAttendanceQuery,
  useLazyGetMarkTeacherAttendanceQuery,
  useGetSingleTeacherAttendanceListQuery,

  useCreateTeacherAttendanceMutation,
  useGetSingleEmployeeAttendanceQuery,
  useGetTeacherAttendanceQuery,
  useLazyGetTeacherAttendanceQuery,
  useUpdateTeacherAttendanceMutation,
} = teacherAttendanceEndPoint;
