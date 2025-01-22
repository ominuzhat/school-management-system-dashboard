import { Col, Input, Row, Select } from "antd";
import { Form } from "../../../../common/CommonAnt";
import { useCreateSubjectsMutation } from "../api/subjectsEndPoints";
import { ISubjects } from "../type/subjectsType";
import { useGetClassesQuery } from "../../classes/api/classesEndPoints";

const CreateSubject = () => {
  const { data: GetClassData } = useGetClassesQuery({});
  const [create, { isLoading, isSuccess }] = useCreateSubjectsMutation();

  const onFinish = (values: any): void => {
    create(values);
  };

  return (
    <div>
      <Form onFinish={onFinish} isLoading={isLoading} isSuccess={isSuccess}>
        <Row gutter={[16, 16]}>
          <Col lg={8}>
            <Form.Item<ISubjects>
              label="Subjects Name"
              name="name"
              rules={[{ required: true, message: "Subjects Name" }]}
            >
              <Input placeholder="Subjects Name" />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<ISubjects>
              label="Marks"
              name="marks"
              rules={[{ required: true, message: "Marks" }]}
            >
              <Input placeholder="Marks" />
            </Form.Item>
          </Col>

          <Col lg={8}>
            <Form.Item<ISubjects>
              label="Class "
              name="grade_level"
              rules={[{ required: true, message: "Select Class " }]}
            >
              <Select placeholder="Select Class" className="w-full">
                {GetClassData?.data?.results?.map(
                  (data: any, index: number) => (
                    <Select.Option key={index} value={data?.id}>
                      {data?.name}
                    </Select.Option>
                  )
                )}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateSubject;
