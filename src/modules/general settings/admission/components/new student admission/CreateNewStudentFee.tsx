import {
  Card,
  Col,
  Row,
  Select,
  Form as AntForm,
  Input,
  Badge,
  Typography,
  Divider,
  Space,
  Switch,
  Button,
} from "antd";
import { useEffect, useState } from "react";
import { useCreateAdmissionFeeMutation } from "../../api/admissionEndPoints";
import dayjs from "dayjs";
import { useAppSelector } from "../../../../../app/store";
import CustomFeeForm from "../CustomFeeForm";
import AdmissionFeeForm from "../AdmissionFeeForm";

const { Title, Text } = Typography;

const CreateNewStudentFee = () => {
  const [form] = AntForm.useForm();
  const [forceUpdate, setForceUpdate] = useState(0);
  const [isRegularFee, setIsRegularFee] = useState(true);
  // const [selectAll, setSelectAll] = useState(true);
  // const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const discountType = AntForm.useWatch("discount_type", form);
  const feeType = AntForm.useWatch("fee_type", form);
  const customFees = AntForm.useWatch("customFees", form);

  const [createAdmissionFee, { data: admissionFee }] =
    useCreateAdmissionFeeMutation();

  const admission = useAppSelector((state) => state.student.admission);
  console.log(admission);

  useEffect(() => {
    if (
      admission.grade_level &&
      admission.subjects &&
      (feeType === "class" || feeType === "subject")
    ) {
      createAdmissionFee({
        grade_level: admission.grade_level || "",
        subjects: admission.subjects || [],
        fee_type: feeType,
      } as any);
    }
  }, [feeType, createAdmissionFee, admission.grade_level, admission.subjects]);

  // useEffect(() => {
  //   if (gradeLevel) {
  //     setSelectAll(true);
  //   } else {
  //     setSelectedSubjects([]);
  //     setSelectAll(false);
  //   }
  // }, [gradeLevel]);

  useEffect(() => {
    const setupFees = () => {
      if (admissionFee?.data?.fees) {
        form.setFieldsValue({ fees: admissionFee.data.fees });
      }
      setForceUpdate((prev) => prev + 1);
    };

    setupFees();
  }, [feeType, admissionFee?.data?.fees, form]);

  const onFinish = (values: any): void => {
    const isCustom =
      customFees && Array.isArray(customFees) && customFees.length > 0;
    const sourceFees = isCustom ? customFees : values.fees || [];

    const formattedValues = {
      ...values,
      admission_date: dayjs().format("YYYY-MM-DD"),
      fee_type: isCustom ? "custom" : values?.fee_type,
      fees: sourceFees.map((fee: any) => ({
        ...fee,
        effective_from: isCustom
          ? dayjs(fee.effective_from).format("YYYY-MM-DD")
          : undefined,
        is_active: true,
      })),
    };

    delete formattedValues.customFees;

    // Handle submit logic here
    console.log("Final Payload:", formattedValues);
    // create(formattedValues);
  };

  return (
    <Card>
      <Title level={3}>Create New Student Fee</Title>

      <AntForm form={form} layout="vertical" onFinish={onFinish}>
        {/* Discount Section */}
        <Divider />
        <Title level={4}>Discount Information</Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <AntForm.Item label="Discount Type" name="discount_type">
              <Select placeholder="Select type">
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
                { required: true, message: "Please enter discount value" },
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
              <Input type="number" min={0} />
            </AntForm.Item>
          </Col>
        </Row>

        {/* Fee Configuration Section */}
        <Divider />
        <Title level={4}>Fee Configuration</Title>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Space>
              <Text strong>Fee Type:</Text>
              <Switch
                checked={isRegularFee}
                onChange={setIsRegularFee}
                checkedChildren="Regular Fee"
                unCheckedChildren="Custom Fee"
              />
            </Space>
          </Col>

          {isRegularFee ? (
            <Col span={24}>
              <AntForm.Item
                label="Fee Structure Type"
                name="fee_type"
                rules={[{ required: true, message: "Please select fee type" }]}
              >
                <Select placeholder="Select fee type">
                  <Select.Option value="class">Class Fee</Select.Option>
                  <Select.Option value="subject">Subject Fee</Select.Option>
                </Select>
              </AntForm.Item>
            </Col>
          ) : (
            <Col span={24}>
              <Badge.Ribbon text="Custom Fee" color="blue">
                <Card className="pt-4">
                  <CustomFeeForm />
                </Card>
              </Badge.Ribbon>
            </Col>
          )}
        </Row>

        {admissionFee?.data && isRegularFee && (
          <Card className="mt-4">
            <AdmissionFeeForm key={forceUpdate} />
          </Card>
        )}

        {/* Submit Button */}
        <Divider />
        <Row justify="end">
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

// import {
//   Card,
//   Col,
//   Row,
//   Select,
//   Form as AntForm,
//   Input,
//   Badge,
//   Typography,
//   Divider,
//   Space,
//   Switch,
//   Form,
// } from "antd";
// import { useEffect, useState } from "react";
// import { useCreateAdmissionFeeMutation } from "../../api/admissionEndPoints";
// import dayjs from "dayjs";
// import { useAppSelector } from "../../../../../app/store";
// import CustomFeeForm from "../CustomFeeForm";
// import AdmissionFeeForm from "../AdmissionFeeForm";

// const { Title, Text } = Typography;

// const CreateNewStudentFee = () => {
//   const [form] = AntForm.useForm();
//   const [forceUpdate, setForceUpdate] = useState(0);
//   const [isRegularFee, setIsRegularFee] = useState(true);
//   const [selectAll, setSelectAll] = useState(true);
//   const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
//   const gradeLevel = AntForm.useWatch("grade_level", form);
//   const discountType = AntForm.useWatch("discount_type", form);
//   const feeType = AntForm.useWatch("fee_type", form);
//   const customFees = AntForm.useWatch("customFees", form);

//   // API calls

//   const [createAdmissionFee, { data: admissionFee }] =
//     useCreateAdmissionFeeMutation();

//   useEffect(() => {
//     if (
//       gradeLevel &&
//       selectedSubjects &&
//       (feeType === "class" || feeType === "subject")
//     ) {
//       createAdmissionFee({
//         grade_level: gradeLevel,
//         subjects: selectedSubjects,
//         fee_type: feeType,
//       } as any);
//     }
//   }, [gradeLevel, selectedSubjects, feeType, createAdmissionFee]);

//   // const [create, { isLoading, isSuccess }] = useCreateAdmissionMutation();

//   // Handle subject selection when grade level changes
//   useEffect(() => {
//     if (gradeLevel) {
//       setSelectAll(true);
//     } else {
//       setSelectedSubjects([]);
//       setSelectAll(false);
//     }
//   }, [gradeLevel]);

//   // Update selections when selectAll or subjects change

//   // Reset form on success
//   // useEffect(() => {
//   //   if (isSuccess) {
//   //     form.resetFields();
//   //     setSelectAll(true);
//   //     setSelectedSubjects([]);
//   //     setIsRegularFee(true);
//   //   }
//   // }, [isSuccess, form]);

//   useEffect(() => {
//     const setupFees = () => {
//       if (admissionFee?.data?.fees) {
//         form.setFieldsValue({ fees: admissionFee.data.fees });
//       }

//       setForceUpdate((prev) => prev + 1);
//     };

//     setupFees();
//   }, [feeType, admissionFee?.data?.fees, form]);

//   const onFinish = (values: any): void => {
//     const isCustom =
//       customFees && Array.isArray(customFees) && customFees.length > 0;

//     const sourceFees = isCustom ? customFees : values.fees || [];

//     const formattedValues = {
//       ...values,
//       admission_date: dayjs().format("YYYY-MM-DD"),
//       fee_type: isCustom ? "custom" : values?.fee_type,
//       fees: sourceFees.map((fee: any) => ({
//         ...fee,
//         effective_from: isCustom
//           ? dayjs(fee.effective_from).format("YYYY-MM-DD")
//           : undefined,
//         is_active: true,
//       })),
//     };

//     // Remove customFees from payload (clean up)
//     delete formattedValues.customFees;

//     // create(formattedValues);
//   };

//   const admission = useAppSelector((state) => state.student.admission);
//   return (
//     <div>
//   <Form>

//   </Form>
//       {/* Discount Section */}
//       <Divider />
//       <Title level={4} className="mb-4">
//         Discount Information
//       </Title>
//       <Row gutter={[16, 16]}>
//         <Col xs={24} sm={24} md={12} lg={8} xl={12} xxl={12}>
//           <Form.Item<any> label="Discount Type" name="discount_type">
//             <Select>
//               <Select.Option value="amount">Fixed Amount</Select.Option>
//               <Select.Option value="percent">Percentage</Select.Option>
//             </Select>
//           </Form.Item>
//         </Col>
//         <Col xs={24} sm={24} md={12} lg={8} xl={12} xxl={12}>
//           <Form.Item<any>
//             label={`Discount Value (${discountType === "percent" ? "%" : "৳"})`}
//             name="discount_value"
//             rules={[
//               { required: true, message: "Please enter discount value" },
//               () => ({
//                 validator(_, value: any) {
//                   if (discountType === "percent" && value > 100) {
//                     return Promise.reject(
//                       new Error("Discount cannot exceed 100%")
//                     );
//                   }
//                   return Promise.resolve();
//                 },
//               }),
//             ]}
//           >
//             <Input type="number" min={0} />
//           </Form.Item>
//         </Col>
//       </Row>
//       Fee Configuration Section
//       <Divider />
//       <Title level={4} className="mb-4">
//         Fee Configuration
//       </Title>
//       <Row gutter={[16, 16]} align="middle">
//         <Col span={24}>
//           <Space>
//             <Text strong>Fee Type:</Text>
//             <Switch
//               checked={isRegularFee}
//               onChange={setIsRegularFee}
//               checkedChildren="Regular Fee"
//               unCheckedChildren="Custom Fee"
//             />
//           </Space>
//         </Col>

//         {isRegularFee ? (
//           <Col span={24}>
//             <Form.Item
//               label="Fee Structure Type"
//               name="fee_type"
//               rules={[{ required: true, message: "Please select fee type" }]}
//             >
//               <Select>
//                 <Select.Option value="class">Class Fee</Select.Option>
//                 <Select.Option value="subject">Subject Fee</Select.Option>
//               </Select>
//             </Form.Item>
//           </Col>
//         ) : (
//           <Col span={24}>
//             <Badge.Ribbon text="Custom Fee" color="blue" placement="start">
//               <Card className="pt-4">
//                 <CustomFeeForm />
//               </Card>
//             </Badge.Ribbon>
//           </Col>
//         )}
//       </Row>

//       {admissionFee?.data && isRegularFee && (
//                 <Card>
//                   <AdmissionFeeForm key={forceUpdate} />
//                 </Card>
//               )}
//     </div>
//   );
// };

// export default CreateNewStudentFee;
