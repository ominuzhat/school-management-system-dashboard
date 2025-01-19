import { Table } from "../../../../common/CommonAnt";
import useTeacherSubjectsColumns from "../utils/teacherSubjectsColumns";

const TeacherSubjects = ({ data }: any) => {
  console.log(data);

  return (
    <div>
      <Table
        total={data?.subject_specializations?.length}
        dataSource={data?.subject_specializations}
        columns={useTeacherSubjectsColumns()}
      />{" "}
    </div>
  );
};

export default TeacherSubjects;
