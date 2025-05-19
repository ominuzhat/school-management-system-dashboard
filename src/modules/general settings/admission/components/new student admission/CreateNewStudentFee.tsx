import {
  Card,
  Col,
  Row,
  Select,
  Form as AntForm,
  Input,
  Badge,
  Typography,
  Space,
  Switch,
  Button,
} from "antd";
import { useEffect, useState } from "react";
import {
  useCreateAdmissionFeeMutation,
  useCreateNewStudentAdmissionMutation,
} from "../../api/admissionEndPoints";
import { useAppSelector } from "../../../../../app/store";
import CustomFeeForm from "../CustomFeeForm";
import AdmissionFeeForm from "../AdmissionFeeForm";
import { useDispatch } from "react-redux";
import {
  resetStudent,
  updateFeeField,
} from "../../../../../app/features/studentAdmissionSlice";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const CreateNewStudentFee = () => {
  const [form] = AntForm.useForm();
  const dispatch = useDispatch();
  const admission = useAppSelector((state) => state.student.admission);
  const student = useAppSelector((state) => state.student.student);
  const fee = useAppSelector((state) => state.student.fee);

  const [create, { isSuccess }] = useCreateNewStudentAdmissionMutation();

  const [forceUpdate, setForceUpdate] = useState(0);
  const [isRegularFee, setIsRegularFee] = useState(true);

  const discountType = AntForm.useWatch("discount_type", form);
  const feeType = AntForm.useWatch("fee_type", form);
  const customFees = AntForm.useWatch("customFees", form);

  const [createAdmissionFee, { data: admissionFee }] =
    useCreateAdmissionFeeMutation();

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

  useEffect(() => {
    const setupFees = () => {
      if (!isRegularFee) {
        // Clear existing fee list in store
        dispatch(
          updateFeeField({
            field: "fees",
            value: [], // Clear previous data
          })
        );

        // Dispatch customFees if available
        if (customFees) {
          dispatch(
            updateFeeField({
              field: "fees",
              value: customFees,
            })
          );
        }
      } else if (admissionFee?.data?.fees?.length) {
        const incomingFees = admissionFee.data.fees;

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
  }, [
    feeType,
    admissionFee?.data.fees,
    customFees,
    form,
    dispatch,
    admission.feeType,
    isRegularFee,
  ]);

  // Handle toggle
  const handleToggleFeeType = (checked: boolean) => {
    setIsRegularFee(checked);

    dispatch(
      updateFeeField({
        field: "fee_type",
        value: checked ? "" : "custom", // class/subject will be selected via dropdown later
      })
    );
  };

  // Handle fee_type dropdown (for regular fee only)
  const handleFeeTypeChange = (value: string) => {
    dispatch(
      updateFeeField({
        field: "fee_type",
        value,
      })
    );
  };

  const onFinish = (values: any): void => {
    const formData = new FormData();

    console.log(values);
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
          subjects: admission.subjects || [],
          fees: fee.fees?.map((f: any) => ({
            ...f,
            effective_from: dayjs(f.effective_from).format("YYYY-MM-DD"),
          })),
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

  useEffect(() => {
    if (isSuccess) {
      dispatch(resetStudent());
    }
  }, [isSuccess, dispatch]);

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
                onChange={handleToggleFeeType}
                checkedChildren="Regular"
                unCheckedChildren="Custom"
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
                <Select
                  placeholder="Select fee type"
                  onChange={handleFeeTypeChange}
                >
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

        <br />
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
        </Row>

        {/* Fee Configuration Section */}

        {/* Submit Button */}
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
