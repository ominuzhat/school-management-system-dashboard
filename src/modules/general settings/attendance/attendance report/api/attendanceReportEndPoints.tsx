import api from "../../../../../app/api/api";
import { FilterTypes } from "../../../../../app/features/filterSlice";
import { ApiResponse } from "../../../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../../../app/utils/tagTypes";

const attendanceReportEndPoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getAttendanceReport: builder.query<ApiResponse<any>, FilterTypes>({
      query: (params) => ({
        url: "/api/v1.0/admissions/attendances/attendance-data/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.ATTENDANCE_REPORT,
          id: TagTypes.ATTENDANCE_REPORT + "_ID",
        },
      ],
    }),

    getSingleAttendanceReport: builder.query<ApiResponse<any>, number>({
      query: (collectFeeId) => ({
        url: `/api/v1.0/admissions/fee-invoices/${collectFeeId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.ATTENDANCE_REPORT,
          id: TagTypes.ATTENDANCE_REPORT + "_ID",
        },
      ],
    }),

    getAttendanceReportPdf: builder.query<Blob, number>({
      query: () => ({
        url: `/api/v1.0/admissions/attendances/attendance-download`,
        responseHandler: async (response) => response.blob(),
        cache: "no-cache",
      }),

      providesTags: [
        {
          type: TagTypes.COLLECT_FEE,
          id: TagTypes.COLLECT_FEE + "_ID",
        },
      ],
    }),

    updateAttendanceReport: builder.mutation<
      ApiResponse<any>,
      { id: number | undefined; data: any }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/admissions/fee-invoices/${id}/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.ATTENDANCE_REPORT,
          id: TagTypes.ATTENDANCE_REPORT + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useGetAttendanceReportQuery,
  useUpdateAttendanceReportMutation,
  useGetSingleAttendanceReportQuery,
  useGetAttendanceReportPdfQuery,
} = attendanceReportEndPoints;
