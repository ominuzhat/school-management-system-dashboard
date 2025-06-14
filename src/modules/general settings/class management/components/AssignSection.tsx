import {
  useAssignSectionMutation,
  useGetSectionQuery,
} from "../../Section/api/sectionEndPoints";
import { Col, Row, Select } from "antd";
import { Form } from "../../../../common/CommonAnt";

const AssignSection = ({ classId, shiftId }: any) => {
  const { data: sectionData, isFetching: isFetchingSections } =
    useGetSectionQuery({});

  const [create, { isLoading, isSuccess }] = useAssignSectionMutation();

  const onFinish = (values: any): void => {
    create({
      id: classId,
      data: {
        shift_id: shiftId,
        section_id: values?.section_id,
      },
    });
  };

  return (
    <div>
      <Form onFinish={onFinish} isLoading={isLoading} isSuccess={isSuccess}>
        <Row gutter={[16, 16]}>
          <Col lg={24}>
            <Form.Item<any>
              label="Section"
              name="section_id"
              rules={[{ required: true, message: "Please select a section" }]}
            >
              <Select loading={isFetchingSections} placeholder="Select section">
                {Array.isArray(sectionData?.data) &&
                  sectionData?.data?.map((section: any) => (
                    <Select.Option key={section.id} value={section.id}>
                      {section.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AssignSection;
