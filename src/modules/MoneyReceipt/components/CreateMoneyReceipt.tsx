import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {
  Card,
  Col,
  Row,
  Form as AntForm,
  Select,
  Input,
  Upload,
  Button,
} from "antd";
import { Form } from "../../../common/CommonAnt";
import { useCreateRestaurantMutation } from "../../Restaurants/api/restaurantsEndpoint";
import SpecificInvoice from "./SpecificInvoice";
import {
  CommonPaymentMethod,
  DatePickerWithOptionalToday,
} from "../../../common/CommonAnt/CommonSearch/CommonSearch";
import type { UploadProps } from "antd";
import TextArea from "antd/es/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";
import SpecificTicket from "./SpecificTickets";

const props: UploadProps = {
  name: "file",
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const CreateMoneyReceipt = () => {
  const [create, { isLoading, isSuccess }] = useCreateRestaurantMutation();

  const [form] = AntForm.useForm();
  const payment = AntForm.useWatch("payment", form);

  const onFinish = (values: any): void => {
    const formData: FormData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (
        key === "restaurant_logo" &&
        Array.isArray(value) &&
        value[0]?.originFileObj
      ) {
        formData.append(key, value[0].originFileObj);
      } else {
        formData.append(key, value as string | Blob);
      }
    });

    create(formData);
  };

  return (
    <div>
      <div className="my-5">
        <BreadCrumb />
      </div>

      <Form
        form={form}
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        initialValues={{ users: [{}] }}
      >
        <Card>
          <Row gutter={[16, 16]} justify={"center"}>
            <Col lg={4}>
              <Form.Item<any>
                label="Select Client"
                name="dueDate"
                rules={[{ required: true, message: "Please input your Date!" }]}
              >
                <Select
                  showSearch
                  placeholder="Select Client"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    { value: "1", label: "Jack" },
                    { value: "2", label: "Lucy" },
                    { value: "3", label: "Tom" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col lg={4}>
              <Form.Item<any>
                label="Present Due"
                name="dueDate"
                rules={[{ required: true, message: "Please input your Date!" }]}
              >
                <Input placeholder="Present Due" />
              </Form.Item>
            </Col>
            <Col lg={4}>
              <Form.Item<any>
                label="Payment To"
                name="payment"
                rules={[{ required: true, message: "Please input your Date!" }]}
              >
                <Select
                  showSearch
                  placeholder="Payment To"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    { value: "overall", label: "Over All" },
                    { value: "advance-payment", label: "Advance Payment" },
                    { value: "specific-invoice", label: "Specific Invoice" },
                    { value: "specific-ticket", label: "Specific Tickets" },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        {payment === "specific-invoice" && (
          <Card>
            <SpecificInvoice />
          </Card>
        )}
        {payment === "specific-ticket" && (
          <Card>
            <SpecificTicket />
          </Card>
        )}

        <Row>
          <Col lg={12}>
            <Card>
              <Row gutter={[16, 16]}>
                <Col lg={8}>
                  <Form.Item<any>
                    label="Payment Type"
                    name="payment"
                    rules={[
                      { required: true, message: "Input your Payment Type!" },
                    ]}
                  >
                    <CommonPaymentMethod />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item<any>
                    label="Amount "
                    name="dueDate"
                    rules={[{ required: true, message: "Input your Amount !" }]}
                  >
                    <Input placeholder="Amount " />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item
                    label="Payment Date"
                    name="dueDate"
                    rules={[
                      { required: true, message: "Input your Payment Date!" },
                    ]}
                  >
                    <DatePickerWithOptionalToday
                      showToday={true}
                      onChange={(date, dateString) => {
                        console.log(
                          "Parent component received date change:",
                          date,
                          dateString
                        );
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item<any>
                    label="Service Charge (%)  "
                    name="dueDate"
                    rules={[
                      {
                        required: true,
                        message: "Input your Service Charge (%)  !",
                      },
                    ]}
                  >
                    <Input placeholder="Service Charge (%)  " />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item<any>
                    label="Total Amount "
                    name="dueDate"
                    rules={[
                      {
                        required: true,
                        message: "Input your Total Amount !",
                      },
                    ]}
                  >
                    <Input placeholder="Total Amount " />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col lg={12}>
            <Card>
              <Row gutter={[16, 16]}>
                <Col lg={8}>
                  <Form.Item<any>
                    label="Deposited Account Id"
                    name="payment"
                    rules={[
                      {
                        required: true,
                        message: "Input your Deposited Account Id!",
                      },
                    ]}
                  >
                    <CommonPaymentMethod />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item<any> label="Cash Memo Number " name="dueDate">
                    <Input placeholder="Cash Memo Number " />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item
                    label="Payment Date"
                    name="dueDate"
                    rules={[
                      { required: true, message: "Input your Payment Date!" },
                    ]}
                  >
                    <Upload {...props}>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </Form.Item>
                </Col>
                <Col lg={24}>
                  <Form.Item<any> label="Remarks" name="dueDate">
                    <TextArea rows={4} placeholder="Remarks" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateMoneyReceipt;
