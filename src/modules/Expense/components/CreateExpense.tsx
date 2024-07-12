import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Select,
  Upload,
  UploadProps,
} from "antd";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import { Form } from "../../../common/CommonAnt";
import { useCreateRestaurantMutation } from "../../Restaurants/api/restaurantsEndpoint";
import {
  CommonPaymentMethod,
  DatePickerWithOptionalToday,
} from "../../../common/CommonAnt/CommonSearch/CommonSearch";
import TextArea from "antd/es/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";
import CreateExpenseSelectedItem from "./CreateExpenseSelectedItem";

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

const CreateExpense = () => {
  const [create, { isLoading, isSuccess }] = useCreateRestaurantMutation();

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
      <Card>
        <Form
          onFinish={onFinish}
          isLoading={isLoading}
          isSuccess={isSuccess}
          initialValues={{ users: [{}] }}
          className="space-y-5"
        >
          <Card>
            <CreateExpenseSelectedItem />
          </Card>
          <Card>
            <Row gutter={[16, 16]}>
              <Col lg={4}>
                <Form.Item<any>
                  label="Search Payment"
                  name="dueDate"
                  rules={[
                    { required: true, message: "Please input your Payment!" },
                  ]}
                >
                  <CommonPaymentMethod />
                </Form.Item>
              </Col>
              <Col lg={4}>
                <Form.Item<any>
                  label="Account"
                  name="dueDate"
                  rules={[
                    { required: true, message: "Please input your Account!" },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Search Account"
                    filterOption={(input, option: any) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={[
                      {
                        value: "1",
                        label: <p>Cash </p>,
                      },
                      {
                        value: "1",
                        label: <p>bank </p>,
                      },
                      {
                        value: "mobile_banking",
                        label: <p>Mobile Banking</p>,
                      },
                      {
                        value: "credit_card",
                        label: <p>Credit Card</p>,
                      },
                      {
                        value: "credit_card",
                        label: <p>Cheque</p>,
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col lg={4}>
                <Form.Item<any>
                  label="Available Balance"
                  name=""
                  rules={[
                    {
                      required: true,
                      message: "Enter Available Balance",
                    },
                  ]}
                >
                  <Input placeholder="Available Balance" />
                </Form.Item>
              </Col>
              <Col lg={4}>
                <Form.Item<any>
                  label="Total Amount"
                  name=""
                  rules={[
                    {
                      required: true,
                      message: "Enter Total Amount",
                    },
                  ]}
                >
                  <Input placeholder="Total Amount" />
                </Form.Item>
              </Col>
              <Col lg={4}>
                <Form.Item<any>
                  label="Date"
                  name=""
                  rules={[
                    {
                      required: true,
                      message: "Enter Date",
                    },
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
              <Col lg={4}>
                <Form.Item<any> label="Notes" name="">
                  <TextArea placeholder="Note Something" />
                </Form.Item>
              </Col>
              <Col lg={4}>
                <Form.Item<any> label="Voucher" name="">
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Form>
      </Card>
    </div>
  );
};

export default CreateExpense;
