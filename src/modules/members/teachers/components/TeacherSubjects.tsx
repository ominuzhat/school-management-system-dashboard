import { Badge } from "antd";
import { Table } from "../../../../common/CommonAnt";
import useTeacherSubjectsColumns from "../utils/teacherSubjectsColumns";

const TeacherSubjects = ({ data }: any) => {
  return (
    <div>
      <Badge.Ribbon
        text="Subject Specialization"
        color="blue"
        placement="start"
      >
        <Table
          className="py-5"
          total={data?.subject_specializations?.length}
          dataSource={data?.subject_specializations}
          columns={useTeacherSubjectsColumns()}
        />{" "}
      </Badge.Ribbon>
    </div>
  );
};

export default TeacherSubjects;
