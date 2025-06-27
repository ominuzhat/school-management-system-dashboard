/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ColumnsType } from "antd/es/table";
import { Badge, Tooltip } from "antd";
import dayjs from "dayjs";

const ATTENDANCE_STATUS = {
  P: { text: "Present", color: "green", status: "success" },
  L: { text: "Late", color: "orange", status: "warning" },
  A: { text: "Absent", color: "red", status: "error" },
  H: { text: "Half-day", color: "blue", status: "processing" },
  default: { text: "-", color: "gray", status: "default" }
};

const useAttendanceReportColumns = (data: any[] = []): ColumnsType<any> => {
  const allDates = Array.from(
    new Set(
      data.flatMap(student => 
        student.attendances ? Object.keys(student.attendances) : []
      )
    )
  ).sort((a, b) => dayjs(a).isAfter(dayjs(b)) ? 1 : -1);

  const baseColumns: ColumnsType<any> = [
    {
      key: "sl",
      title: "SL",
      align: "center",
      width: 60,
      fixed: 'left',
      render: (_, __, index) => index + 1,
    },
    {
      title: "Student Id",
      dataIndex: "username",
      key: "username",
      align: "center",
      fixed: 'left',
      width: 100,
      render: (username) => username || "N/A",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "left",
      fixed: 'left',
      width: 150,
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
      align: "center",
      fixed: 'left',
      width: 120,
      render: (mobile) => {
        if (!mobile || mobile === "-") return "N/A";
        return mobile.startsWith('880') ? mobile.substring(3) : mobile;
      },
    },
    {
      title: "Summary",
      key: "summary",
      align: "center",
      fixed: 'left',
      width: 200,
      render: (_, record) => {
        if (!record.attendances) return "-";
        
        const counts = (Object.values(record.attendances) as { status: string }[]).reduce(
          (acc: Record<string, number>, curr: { status: string }) => {
            const status = curr.status;
            acc[status as keyof typeof ATTENDANCE_STATUS] = 
              (acc[status as keyof typeof ATTENDANCE_STATUS] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>
        );

        return (
          <div className="flex gap-2 justify-center">
            {Object.entries(ATTENDANCE_STATUS).map(([key, { color, text }]) => {
              if (key === 'default') return null;
              const count = counts[key] || 0;
              return count > 0 ? (
                <Tooltip 
                  key={key} 
                  title={`${text}: ${count}`}
                  placement="top"
                  mouseEnterDelay={0.1}
                  mouseLeaveDelay={0.1}
                >
                  <span 
                    style={{ 
                      color, 
                      cursor: 'help',
                      padding: '2px 4px',
                      borderRadius: '2px',
                      backgroundColor: 'rgba(0,0,0,0.05)'
                    }}
                  >
                    {count}{key}
                  </span>
                </Tooltip>
              ) : null;
            })}
          </div>
        );
      },
    },
  ];

  const dateColumns: ColumnsType<any> = allDates.map(date => ({
    title: (
      <Tooltip 
        title={dayjs(date).format('dddd, MMMM D, YYYY')}
        placement="top"
        mouseEnterDelay={0.1}
        mouseLeaveDelay={0.1}
      >
        <div className="flex flex-col items-center cursor-help">
          <div>{dayjs(date).format('MMM')}</div>
          <div className="font-bold">{dayjs(date).format('D')}</div>
          <div className="text-xs">{dayjs(date).format('ddd')}</div>
        </div>
      </Tooltip>
    ),
    key: `attendance-${date}`,
    dataIndex: ['attendances', date],
    align: "center",
    width: 100,
    render: (attendance: any) => {
      if (!attendance) {
        return (
          <Tooltip 
            title={`No attendance record for ${dayjs(date).format('MMM D, YYYY')}`}
            placement="top"
            mouseEnterDelay={0.1}
            mouseLeaveDelay={0.1}
          >
            <span style={{ color: '#ccc', cursor: 'help' }}>-</span>
          </Tooltip>
        );
      }
      
      const { status, check_in, check_out, duration } = attendance;
      const { text, color, status: badgeStatus } = 
        ATTENDANCE_STATUS[status as keyof typeof ATTENDANCE_STATUS] || ATTENDANCE_STATUS.default;
      
      const tooltipContent = (
        <div>
          <div><strong>{dayjs(date).format('MMM D, YYYY')}</strong></div>
          <div>Status: {text}</div>
          {check_in && <div>Check-in: {check_in}</div>}
          {check_out && <div>Check-out: {check_out}</div>}
          {duration && <div>Duration: {duration}</div>}
        </div>
      );

      return (
        <Tooltip 
          title={tooltipContent}
          placement="top"
          mouseEnterDelay={0.1}
          mouseLeaveDelay={0.1}
          overlayStyle={{ maxWidth: '300px' }}
        >
          <div style={{ cursor: 'help' }}>
            <Badge 
              status={badgeStatus as any}
              text={<span style={{ color }}>{status || "-"}</span>}
            />
          </div>
        </Tooltip>
      );
    },
  }));

  return [...baseColumns, ...dateColumns];
};

export default useAttendanceReportColumns;