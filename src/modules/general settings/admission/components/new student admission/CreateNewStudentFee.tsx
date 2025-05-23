import {
  Card,
  Col,
  Row,
  Form as AntForm,
  Typography,
  Form,
  Button,
  Space,
  Switch,
  Badge,
} from "antd";
import { useEffect, useState } from "react";
import {
  useCreateAdmissionFeeMutation,
  useCreateNewStudentAdmissionMutation,
} from "../../api/admissionEndPoints";
import { useAppSelector } from "../../../../../app/store";
import AdmissionFeeForm from "../AdmissionFeeForm";
import { useDispatch } from "react-redux";
import {
  resetStudent,
  updateFeeField,
} from "../../../../../app/features/studentAdmissionSlice";
import { useNavigate } from "react-router-dom";
import { showModal } from "../../../../../app/features/modalSlice";
import NewStudentAdmissionPreview from "./NewStudentAdmissionPreview";
import CustomFeeForm from "../CustomFeeForm";
import dayjs from "dayjs";

const { Title, Text } = Typography;

interface CreateStudentInformationProps {
  onValidationChange: (isValid: boolean) => void;
}

const CreateNewStudentFee: React.FC<CreateStudentInformationProps> = ({
  onValidationChange,
}) => {
  const navigate = useNavigate();
  const [form] = AntForm.useForm();
  const dispatch = useDispatch();
  const [isRegularFee, setIsRegularFee] = useState<boolean>(true);
  const admission = useAppSelector((state) => state.student.admission);
  const student = useAppSelector((state) => state.student.student);
  const fee = useAppSelector((state) => state.student.fee);
  const [create, { data: newStudentData, isSuccess }] =
    useCreateNewStudentAdmissionMutation();
  const customFees = AntForm.useWatch("customFees", form);
  const [createAdmissionFee, { data: admissionFee }] =
    useCreateAdmissionFeeMutation();

  const [forceUpdate, setForceUpdate] = useState(0);

  const feeType = AntForm.useWatch("fee_type", form);
  const fees = AntForm.useWatch("fees", form);

  const allValues = Form.useWatch([], form);

  useEffect(() => {
    const validate = async () => {
      try {
        await form.validateFields(); // Only validates required fields
        onValidationChange(true);
      } catch {
        onValidationChange(false);
      }
    };

    validate();
  }, [allValues]);

  useEffect(() => {
    if (admission.grade_level && admission.subjects) {
      createAdmissionFee({
        grade_level: admission.grade_level || "",
        subjects: admission.subjects || [],
        fee_type: "class",
      } as any);
    }
  }, [createAdmissionFee, admission.grade_level, admission.subjects]);

  useEffect(() => {
    if (fees) {
      dispatch(
        updateFeeField({
          field: "fees",
          value: fees,
        })
      );
    }
  }, [fees, dispatch]);

  useEffect(() => {
    const setupFees = () => {
      if (admissionFee?.data?.fees?.length) {
        const incomingFees = admissionFee?.data?.fees;

        // Set form values
        form.setFieldsValue({ fees: incomingFees });

        // Dispatch class or subject fees
        dispatch(
          updateFeeField({
            field: "fees",
            value: incomingFees,
          })
        );
      }

      setForceUpdate((prev) => prev + 1);
    };

    setupFees();
  }, [feeType, admissionFee?.data.fees, form, dispatch, admission.feeType]);

  // Handle fee_type dropdown (for regular fee only)
  // const handleFeeTypeChange = (value: string) => {
  //   dispatch(
  //     updateFeeField({
  //       field: "fee_type",
  //       value,
  //     })
  //   );
  // };

  const onFinish = (values: any): void => {
    const formData = new FormData();

    const isCustom =
      customFees && Array.isArray(customFees) && customFees.length > 0;

    const sourceFees = isCustom ? customFees : values.fees || [];


    const formattedData: any = {
      student: {
        first_name: student.first_name || null,
        last_name: student.last_name || null,
        email: student.email || null,
        phone_number: student.phone_number || null,
        date_of_birth: student.date_of_birth || null,
        mother_name: student.mother_name || null,
        father_name: student.father_name || null,
        mother_profession: student.mother_profession || null,
        father_profession: student.father_profession || null,
        mother_phone_number: student.mother_phone_number || null,
        father_number: student.father_number || null,
        local_guardian_name: student.local_guardian_name || null,
        local_guardian_phone_number:
          student.local_guardian_phone_number || null,
        local_guardian_relation: student.local_guardian_relation || null,
        gender: student.gender || "M",
        religion: student.religion || null,
        present_address: student.present_address || null,
        permanent_address: student.permanent_address || null,
        is_active: true,
        current_grade_level: admission.grade_level || null,
        current_session: admission.session || null,
        current_section: admission.section || null,
        current_shift: admission.shift || null,
        current_roll: admission.roll || null,
      },
      ...(fee && {
        admission: {
          ...fee,
          fee_type: isRegularFee ? "class" : "custom",
          status: admission.status,
          subjects: admission.subjects || [],
          fees: sourceFees.map((fee: any) => ({
            ...fee,
            effective_from: isCustom
              ? dayjs(fee.effective_from).format("YYYY-MM-DD")
              : undefined,
            is_active: true,
          })),
          // fees: fee.fees?.map((f: any) => ({
          //   ...f,
          //   // effective_from: dayjs(f.effective_from).format("YYYY-MM-DD"),
          // })),
        },
      }),
    };

    formData.append("student", JSON.stringify(formattedData?.student));
    formData.append("admission", JSON.stringify(formattedData?.admission));

    if (student?.image?.[0]) {
      const file =
        (student.image[0] as any).originFileObj instanceof File
          ? (student.image[0] as any).originFileObj
          : student.image[0];
      if (file instanceof File) {
        formData.append("image", file);
      }
    }

    create(formData);
  };

  const handleFeeTypeChange = (checked: boolean) => {
    setIsRegularFee(checked);
  };

  useEffect(() => {
    if (isSuccess && newStudentData?.admission?.id) {
      dispatch(resetStudent());
      navigate(`/collect-fee?admission_id=${newStudentData?.admission?.id}`);
      setIsRegularFee(true);
    }
  }, [isSuccess, newStudentData?.admission?.id, dispatch, navigate]);

  return (
    <Card>
      <AntForm
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          discount_value: 0,
          discount_type: "amount",
          fee_type: "class",
          customFees: [
            {
              name: "Registration Fee",
              amount: 100,
              one_time: true,
              effective_from: dayjs(),
            },
            {
              name: "Monthly Fee",
              amount: 500,
              one_time: false,
              effective_from: dayjs(),
            },
          ],
          fees: [],
        }}
      >
        {/* Discount Section */}

        <Title level={4}>Fee Configuration</Title>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Space>
              <Text strong>Fee Type:</Text>
              <Switch
                checked={isRegularFee}
                onChange={handleFeeTypeChange}
                checkedChildren="Class Fee"
                unCheckedChildren="Custom Fee"
              />
            </Space>
          </Col>

          {isRegularFee ? (
            <Card className="w-full">
              <AdmissionFeeForm key={forceUpdate} />
            </Card>
          ) : (
            // <Col span={24}>
            //   <Form.Item
            //     label="Fee Structure Type"
            //     name="fee_type"
            //     rules={[
            //       { required: true, message: "Please select fee type" },
            //     ]}
            //   >
            //     <Select>
            //       <Option value="class">Class Fee</Option>
            //       <Option value="subject">Subject Fee</Option>
            //       <Option value="custom">Custom Fee</Option>
            //       <Option value="student">Student-specific Fee</Option>
            //     </Select>
            //   </Form.Item>
            // </Col>
            <Col span={24}>
              <Badge.Ribbon text="Custom Fee" color="blue" placement="start">
                <Card className="pt-4">
                  <CustomFeeForm />
                </Card>
              </Badge.Ribbon>
            </Col>
          )}

          {/* {isRegularFee ? (
            <Col span={24}>
              <Form.Item
                label="Fee Structure Type"
                name="fee_type"
                rules={[{ required: true, message: "Please select fee type" }]}
              >
                <Select>
                  <Select.Option value="class">Class Fee</Select.Option>
                  <Select.Option value="subject">Subject Fee</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          ) : (
            <Col span={24}>
              <Badge.Ribbon text="Custom Fee" color="blue" placement="start">
                <Card className="pt-4">
                  <CustomFeeForm />
                </Card>
              </Badge.Ribbon>
            </Col>
          )} */}
        </Row>

        {/* {admissionFee?.data && isRegularFee && (
          <Card>
    
            <AdmissionFeeForm key={forceUpdate} />
          </Card>
        )} */}

        {/* <Col span={24}>
            <Space>
              <Text strong>Fee Type:</Text>
              <Switch
                checked={isRegularFee}
                // onChange={handleToggleFeeType}
                checkedChildren="Regular"
                unCheckedChildren="Custom"
              />
            </Space>
          </Col>

          <Col span={24}>
            <AntForm.Item
              label="Fee Structure Type"
              name="fee_type"
              rules={[{ required: true, message: "Please select fee type" }]}
            >
              <Select
                placeholder="Select fee type"
                onChange={handleFeeTypeChange}
              >
                <Select.Option value="class">Class Fee</Select.Option>
                <Select.Option value="subject">Subject Fee</Select.Option>
              </Select>
            </AntForm.Item>
          </Col>
        </Row>

        {admissionFee?.data && (
          <Card className="mt-4">
            <AdmissionFeeForm key={forceUpdate} />
          </Card>
        )} */}

        {/* <br />
        <Title level={4}>Discount Information</Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <AntForm.Item label="Discount Type" name="discount_type">
              <Select
                placeholder="Select type"
                onChange={(value) =>
                  dispatch(
                    updateFeeField({
                      field: "discount_type",
                      value,
                    })
                  )
                }
              >
                <Select.Option value="amount">Fixed Amount</Select.Option>
                <Select.Option value="percent">Percentage</Select.Option>
              </Select>
            </AntForm.Item>
          </Col>
          <Col xs={24} sm={12}>
            <AntForm.Item
              label={`Discount Value (${
                discountType === "percent" ? "%" : "৳"
              })`}
              name="discount_value"
              rules={[
                () => ({
                  validator(_, value) {
                    if (discountType === "percent" && value > 100) {
                      return Promise.reject("Discount cannot exceed 100%");
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input
                type="number"
                min={0}
                onChange={(e) =>
                  dispatch(
                    updateFeeField({
                      field: "discount_value",
                      value: e.target.value,
                    })
                  )
                }
              />
            </AntForm.Item>
          </Col>
        </Row> */}

        {/* Submit Button */}
        <Row justify="end" gutter={[16, 16]}>
          {/* <Col>
            <Button type="dashed">Submit & Download PDF</Button>
          </Col> */}

          <Col>
            <Button
              type="dashed"
              onClick={() =>
                dispatch(
                  showModal({
                    title: "Admission Preview",
                    content: <NewStudentAdmissionPreview />,
                  })
                )
              }
            >
              Preview
            </Button>
          </Col>

          <Col>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </AntForm>
    </Card>
  );
};

export default CreateNewStudentFee;
