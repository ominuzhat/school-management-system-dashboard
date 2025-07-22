import { Badge, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

interface Subject {
  id: number;
  name: string;
  grade_level: {
    id: number;
    name: string;
    description: string;
    class_teacher: any;
  };
}

interface ClassGroup {
  key: number;
  className: string;
  subjects: string[];
  count: number;
}

const TeacherSubjects = ({ data, isFetching, isLoading }: any) => {
  // Transform the data into grouped format
  const groupedData = groupSubjectsByClass(data?.subjects || []);

  const columns: ColumnsType<ClassGroup> = [
    {
      key: "0",
      title: "SL",
      align: "center",
      render: (_text, _record, index) => index + 1,
    },
    {
      key: "1",
      title: "Class",
      dataIndex: "className",
      align: "center",
      render: (className: string) => (
        <span style={{ fontWeight: 600 }}>{className || "-"}</span>
      ),
    },
    {
      key: "2",
      title: "Subjects",
      dataIndex: "subjects",
      align: "center",
      render: (subjects: string[]) => (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            justifyContent: "center",
          }}
        >
          {subjects.map((subject, idx) => (
            <Tag key={idx} color="blue" style={{ margin: 0 }}>
              {subject}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      key: "3",
      title: "Count",
      dataIndex: "count",
      align: "center",
      render: (count: number) => (
        <Badge count={count} style={{ backgroundColor: "#52c41a" }} />
      ),
    },
  ];

  return (
    <div>
      <Badge.Ribbon text="Subject Permissions" color="blue" placement="start">
        <Table
          className="py-5"
          rowKey="key"
          loading={isLoading || isFetching}
          dataSource={groupedData}
          columns={columns}
          bordered
          pagination={false}
        />
      </Badge.Ribbon>
    </div>
  );
};

export default TeacherSubjects;

export const groupSubjectsByClass = (subjects: Subject[]): ClassGroup[] => {
  const classMap = new Map<string, { subjects: string[]; count: number }>();

  subjects.forEach((subject) => {
    const className = subject.grade_level?.name || "Unknown Class";
    if (!classMap.has(className)) {
      classMap.set(className, { subjects: [], count: 0 });
    }
    const classData = classMap.get(className);
    if (classData) {
      classData.subjects.push(subject.name);
      classData.count += 1;
    }
  });

  return Array.from(classMap.entries()).map(
    ([className, { subjects, count }], index) => ({
      key: index + 1,
      className,
      subjects,
      count,
    })
  );
};
