import { Badge } from "antd";
import { Table } from "../../../../common/CommonAnt";
import useTeacherSubjectsColumns from "../utils/teacherSubjectsColumns";

const TeacherSubjects = ({ data, isFetching, isLoading, refetch }: any) => {
  return (
    <div>
      <Badge.Ribbon text="Subject Permissions" color="blue" placement="start">
        <Table
          className="py-5"
          rowKey={"id"}
          loading={isLoading || isFetching}
          refetch={refetch}
          total={data?.subjects?.length}
          dataSource={data?.subjects}
          columns={useTeacherSubjectsColumns()}
        />{" "}
      </Badge.Ribbon>
    </div>
  );
};

export default TeacherSubjects;
