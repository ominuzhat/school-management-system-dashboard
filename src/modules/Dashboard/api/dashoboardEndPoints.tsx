import api from "../../../app/api/api";
import { FilterTypes } from "../../../app/features/filterSlice";
import { ApiResponse } from "../../../app/utils/constant";
import { TagTypes } from "../../../app/utils/tagTypes";
import { InstitutionDashboardProps } from "../types/dashboardTypes";

const dashboardEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query<
      ApiResponse<InstitutionDashboardProps | any>,
      FilterTypes
    >({
      query: () => ({
        url: "/api/v1.0/base/dashboard-data/",
      }),
      providesTags: [
        {
          type: TagTypes.DASHBOARD,
          id: TagTypes.DASHBOARD + "_ID",
        },
      ],
    }),

    getOverviewAttendanceReport: builder.query<
      ApiResponse<any | any>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/base/attendance-reports/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.DASHBOARD,
          id: TagTypes.DASHBOARD + "_ID",
        },
      ],
    }),

    getFeeReport: builder.query<
      ApiResponse<InstitutionDashboardProps | any>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/base/fee-reports/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.DASHBOARD,
          id: TagTypes.DASHBOARD + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useGetDashboardDataQuery,
  useGetOverviewAttendanceReportQuery,
  useGetFeeReportQuery,
} = dashboardEndpoint;
