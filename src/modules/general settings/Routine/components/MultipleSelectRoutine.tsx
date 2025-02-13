import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row, Select, TimePicker } from "antd";
import { useGetTeacherQuery } from "../../../members/teachers/api/teachersEndPoints";
import { useGetSubjectsQuery } from "../../subjects/api/subjectsEndPoints";

const MultipleSelectRoutine = ({
  specificClass,
}: {
  specificClass: number;
}) => {
  const { data: teacherData } = useGetTeacherQuery({});
  const { data: subjectData } = useGetSubjectsQuery({
    grade_level: specificClass,
  });

  return (
    <div>
      <Form.List name="slot">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row key={key} gutter={[16, 16]} align="middle">
                {/* Start Time */}
                <Col span={5}>
                  <Form.Item
                    {...restField}
                    label="Start Time"
                    name={[name, "start_time"]}
                  >
                    <TimePicker format="h:mm A" use12Hours className="w-full" />
                  </Form.Item>
                </Col>

                {/* End Time */}
                <Col span={5}>
                  <Form.Item
                    {...restField}
                    label="End Time"
                    name={[name, "end_time"]}
                    // rules={[
                    //   { required: true, message: "Please select end time!" },
                    // ]}
                  >
                    <TimePicker
                      format="HH:mm A"
                      use12Hours
                      className="w-full"
                    />
                  </Form.Item>
                </Col>

                <Col span={5}>
                  <Form.Item
                    label="Select Subject"
                    name={[name, "subject"]}
                    {...restField}
                  >
                    <Select placeholder="Select Subject" className="w-full">
                      {subjectData?.data?.results?.map((subject: any) => (
                        <Select.Option key={subject.id} value={subject.id}>
                          {subject?.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item
                    label="Select Teacher"
                    name={[name, "teacher"]}
                    {...restField}
                  >
                    <Select placeholder="Select Teacher" className="w-full">
                      {teacherData?.data?.results?.map((teacher: any) => (
                        <Select.Option key={teacher.id} value={teacher.id}>
                          {teacher?.first_name} {teacher?.last_name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                {/* Remove Button */}
                <Col span={2} className="flex justify-end ">
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Col>
              </Row>
            ))}

            {/* Add New Routine Button */}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Routine
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
};

export default MultipleSelectRoutine;
