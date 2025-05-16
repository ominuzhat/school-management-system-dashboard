import {
  Form,
  Input,
  Row,
  Col,
  Switch,
  Divider,
  Typography,
  Button,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Text } = Typography;

const AdmissionFeeForm = () => {
  return (
    <div>
      <Text strong className="block mb-4">
        Fee Structure
      </Text>

      <Form.List name="fees">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => (
              <div key={key} className="mb-4">
                <Row gutter={[16, 16]} align="middle">
                  {/* Fee Name */}
                  <Col xs={24} sm={24} md={10} lg={8} xl={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "name"]}
                      label="Fee Name"
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Input placeholder="Fee name" />
                    </Form.Item>
                  </Col>

                  {/* Amount */}
                  <Col xs={24} sm={24} md={8} lg={6} xl={6}>
                    <Form.Item
                      {...restField}
                      name={[name, "amount"]}
                      label="Amount (৳)"
                      rules={[{ required: true, message: "Required" }]}
                    >
                      <Input type="number" placeholder="0.00" />
                    </Form.Item>
                  </Col>

                  {/* One-Time */}
                  <Col xs={24} sm={24} md={4} lg={2} xl={2}>
                    <Form.Item
                      {...restField}
                      name={[name, "one_time"]}
                      label="One-Time"
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                  </Col>

                  {/* Remove Button */}
                  <Col xs={24} sm={24} md={2} lg={2} xl={2}>
                    <MinusCircleOutlined
                      onClick={() => remove(name)}
                      className="text-red-500 mt-6"
                    />
                  </Col>
                </Row>
                {index < fields.length - 1 && <Divider className="my-2" />}
              </div>
            ))}

            <Form.Item>
              <Button
                type="dashed"
                onClick={() =>
                  add({
                    name: "",
                    amount: 0,
                    one_time: false,
                    effective_from: dayjs().format("YYYY-MM-DD"),
                  })
                }
                block
                icon={<PlusOutlined />}
              >
                Add Fee
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
};

export default AdmissionFeeForm;
// import {
//   Form,
//   Input,
//   Row,
//   Col,
//   Switch,
//   Divider,
//   Typography,
//   Button,
// } from "antd";
// import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
// // import { useEffect } from "react";
// import dayjs from "dayjs";

// const { Text } = Typography;

// const AdmissionFeeForm = ({
//   data,
//   // form,
//   feeType,
// }: {
//   data: any;
//   form: any;
//   feeType: string;
// }) => {
//   // useEffect(() => {
//   //   if (feeType === "custom" && form) {
//   //     form.setFieldsValue({
//   //       fees: [
//   //         {
//   //           name: "Registration Fee",
//   //           amount: 123145,
//   //           one_time: true,
//   //           effective_from: dayjs().format("YYYY-MM-DD"),
//   //         },
//   //         {
//   //           name: "Monthly Fee",
//   //           amount: 5456786700,
//   //           one_time: false,
//   //           effective_from: dayjs().format("YYYY-MM-DD"),
//   //         },
//   //       ],
//   //     });
//   //   }
//   // }, [feeType, form]);

//   return (
//     <div>
//       <Text strong className="block mb-4">
//         Admission Fee Structure ({data?.fee_type || feeType})
//       </Text>

//       <Form.List name="fees">
//         {(fields, { add, remove }) => (
//           <>
//             {fields.map(({ key, name, ...restField }, index) => (
//               <div key={key} className="mb-4">
//                 <Row gutter={[16, 16]} align="middle">
//                   <Col xs={24} sm={24} md={10} lg={8} xl={8}>
//                     <Form.Item
//                       {...restField}
//                       name={[name, "name"]}
//                       label="Fee Name"
//                       rules={[
//                         { required: true, message: "Fee name is required" },
//                       ]}
//                     >
//                       <Input placeholder="Fee name" />
//                     </Form.Item>
//                   </Col>

//                   <Col xs={24} sm={24} md={8} lg={6} xl={6}>
//                     <Form.Item
//                       {...restField}
//                       name={[name, "amount"]}
//                       label="Amount (৳)"
//                       rules={[
//                         { required: true, message: "Amount is required" },
//                       ]}
//                     >
//                       <Input type="number" placeholder="0.00" />
//                     </Form.Item>
//                   </Col>

//                   <Col xs={24} sm={24} md={4} lg={2} xl={2}>
//                     <Form.Item
//                       {...restField}
//                       name={[name, "one_time"]}
//                       label="One-Time"
//                       valuePropName="checked"
//                     >
//                       <Switch />
//                     </Form.Item>
//                   </Col>

//                   <Col xs={24} sm={24} md={2} lg={2} xl={2}>
//                     <MinusCircleOutlined
//                       onClick={() => remove(name)}
//                       className="text-red-500 mt-6"
//                     />
//                   </Col>
//                 </Row>
//                 {index < fields.length - 1 && <Divider className="my-2" />}
//               </div>
//             ))}

//             <Form.Item>
//               <Button
//                 type="dashed"
//                 onClick={() =>
//                   add({
//                     name: "",
//                     amount: 0,
//                     one_time: false,
//                     effective_from: dayjs().format("YYYY-MM-DD"),
//                   })
//                 }
//                 block
//                 icon={<PlusOutlined />}
//               >
//                 Add Fee
//               </Button>
//             </Form.Item>
//           </>
//         )}
//       </Form.List>
//     </div>
//   );
// };

// export default AdmissionFeeForm;
