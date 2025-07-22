import { useGetSingleHolidayQuery } from "../api/holidayEndPoints";
import {
  Card,
  Tag,
  List,
  Typography,
  Divider,
  Avatar,
  Skeleton,
  Descriptions,
  Tabs,
} from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  TeamOutlined,
  InfoCircleOutlined,
  SolutionOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const getEventColor = (eventType: string) => {
  switch (eventType) {
    case "holiday":
      return "gold";
    case "exam":
      return "red";
    case "event":
      return "blue";
    default:
      return "green";
  }
};

const renderPersonList = (data: any[], type: string) => {
  const colors = {
    student: { bg: "blue", text: "blue" },
    teacher: { bg: "purple", text: "purple" },
    employee: { bg: "orange", text: "orange" },
  };

  const currentColor = colors[type as keyof typeof colors] || colors.student;

  return (
    <List
      dataSource={data}
      renderItem={(person: any) => (
        <List.Item className="!px-0">
          <Card size="small" className="w-full hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <Avatar
                size="large"
                className={`bg-${currentColor.bg}-100 text-${currentColor.text}-600`}
              >
                {person.first_name?.charAt(0) || ""}
                {person.last_name?.charAt(0) || ""}
              </Avatar>
              <div className="flex-1 min-w-0">
                <Text strong ellipsis className="block">
                  {person.first_name} {person.last_name}
                </Text>
                <div className="flex flex-wrap gap-2 mt-1">
                  <Tag className="m-0">ID: {person.user?.username || "-"}</Tag>
                  <Tag className="m-0">Email: {person.email || "-"}</Tag>
                  <Tag className="m-0">Phone: {person.phone_number || "-"}</Tag>
                </div>
              </div>
            </div>
          </Card>
        </List.Item>
      )}
      grid={{ gutter: 16, xs: 1, sm: 2, md: 3 }}
    />
  );
};

const ViewHoliday = ({ record }: { record: string }) => {
  const { data, isLoading } = useGetSingleHolidayQuery<any>(Number(record));

  if (isLoading) {
    return (
      <div className="p-4">
        <Skeleton active paragraph={{ rows: 6 }} />
      </div>
    );
  }

  if (!data?.data) {
    return <div className="p-4">No holiday data found</div>;
  }

  const holiday = data.data;
  const eventColor = getEventColor(holiday.event_type);
  const hasSpecificPeople =
    holiday.specific_students?.length > 0 ||
    holiday.specific_teachers?.length > 0 ||
    holiday.specific_employees?.length > 0;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <Card
        title={
          <div className="flex items-center gap-4 flex-wrap">
            <Tag color={eventColor} className="text-lg">
              {holiday.event_type_display}
            </Tag>
            <Title level={3} className="!mb-0">
              {holiday.name}
            </Title>
          </div>
        }
        bordered={false}
        className="shadow-sm"
      >
        <Descriptions column={{ xs: 1, sm: 2, md: 3 }} size="small">
          <Descriptions.Item label={<Text strong>For</Text>}>
            <Tag icon={<TeamOutlined />} color="blue">
              {holiday.event_for_display}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label={<Text strong>Session</Text>}>
            {holiday.session?.name || "-"}
          </Descriptions.Item>
          <Descriptions.Item label={<Text strong>Date Range</Text>}>
            <div className="flex items-center gap-2">
              <CalendarOutlined />
              {dayjs(holiday.start_date).format("MMM D, YYYY")} -{" "}
              {dayjs(holiday.end_date).format("MMM D, YYYY")}
            </div>
          </Descriptions.Item>
        </Descriptions>

        {holiday.description && (
          <>
            <Divider orientation="left" className="!mt-6">
              <div className="flex items-center gap-2">
                <InfoCircleOutlined />
                <Text strong>Description</Text>
              </div>
            </Divider>
            <Text className="block p-2 bg-gray-50 rounded">
              {holiday.description}
            </Text>
          </>
        )}

        {hasSpecificPeople && (
          <>
            <Divider orientation="left" className="!mt-6">
              <TeamOutlined className="mr-2" />
              <Text strong>Participants</Text>
            </Divider>
            <Tabs defaultActiveKey="1" className="mt-4">
              {holiday.specific_students?.length > 0 && (
                <TabPane
                  tab={
                    <span>
                      <UserOutlined />
                      Students{" "}
                      <Tag className="ml-1">
                        {holiday.specific_students.length}
                      </Tag>
                    </span>
                  }
                  key="students"
                >
                  {renderPersonList(holiday.specific_students, "student")}
                </TabPane>
              )}
              {holiday.specific_teachers?.length > 0 && (
                <TabPane
                  tab={
                    <span>
                      <SolutionOutlined />
                      Teachers{" "}
                      <Tag className="ml-1">
                        {holiday.specific_teachers.length}
                      </Tag>
                    </span>
                  }
                  key="teachers"
                >
                  {renderPersonList(holiday.specific_teachers, "teacher")}
                </TabPane>
              )}
              {holiday.specific_employees?.length > 0 && (
                <TabPane
                  tab={
                    <span>
                      <IdcardOutlined />
                      Employees{" "}
                      <Tag className="ml-1">
                        {holiday.specific_employees.length}
                      </Tag>
                    </span>
                  }
                  key="employees"
                >
                  {renderPersonList(holiday.specific_employees, "employee")}
                </TabPane>
              )}
            </Tabs>
          </>
        )}

        <div className="mt-6 text-right text-gray-500 text-sm">
          <Text>
            Last updated:{" "}
            {dayjs(holiday.updated_at).format("MMM D, YYYY h:mm A")}
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default ViewHoliday;
