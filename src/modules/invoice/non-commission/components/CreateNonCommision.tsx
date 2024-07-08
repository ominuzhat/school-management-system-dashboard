import React from "react";
import { Form } from "../../../../common/CommonAnt";
import { useCreateRestaurantMutation } from "../../../Restaurants/api/restaurantsEndpoint";
import { Badge, Card, Col, Input, InputNumber, Row, Select } from "antd";
import CommonClient from "../../../../common/commonCLient/CommonClient";
import {
  HarmonyOSOutlined,
  ManOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import CommonEmployee from "../../../../common/CommonAnt/commonEmployee/CommonEmployee";
import { DatePickerWithOptionalToday } from "../../../../common/CommonAnt/CommonSearch/CommonSearch";
import CommonAgent from "../../../../common/CommonAgent/CommonAgent";
const { Option } = Select;

const CreateNonCommision = () => {
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
    <React.Fragment>
      <Form
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        initialValues={[]}
      >
        <Badge.Ribbon text="Basic Information" color="blue" placement="start">
          <Card style={{ paddingTop: "20px" }} size="small">
            <Row gutter={[10, 10]}>
              <Col span={24} lg={4}>
                <Form.Item<any>
                  label="Search Client"
                  name="restaurant_name"
                  rules={[
                    { required: true, message: "Search Client is required" },
                  ]}
                >
                  <CommonClient />
                </Form.Item>
              </Col>
              <Col span={24} lg={4}>
                <Form.Item<any>
                  label="Create Employee"
                  name="restaurant_address"
                  rules={[
                    {
                      required: true,
                      message: "Create Employee is required",
                    },
                  ]}
                >
                  <CommonEmployee />
                </Form.Item>
              </Col>
              <Col span={24} lg={4}>
                <Form.Item<any>
                  label="Invoice No"
                  name="restaurant_address"
                  rules={[
                    {
                      required: true,
                      message: "Invoice is required",
                    },
                  ]}
                >
                  <Input placeholder="AIT-00000002" />
                </Form.Item>
              </Col>
              <Col span={24} lg={4}>
                <Form.Item<any> label="Sales Date" name="dueDate">
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
              <Col span={1} lg={4}>
                <Form.Item<any> label="Due Date" name="restaurant_address">
                  <DatePickerWithOptionalToday
                    showToday={false}
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
              <Col span={24} lg={4}>
                <Form.Item<any>
                  label="Select Agent"
                  name="restaurant_address"
                  rules={[
                    {
                      required: true,
                      message: "Select Agent is required",
                    },
                  ]}
                >
                  <CommonAgent />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Badge.Ribbon>

        <Badge.Ribbon text="Ticket Details" color="blue" placement="start">
          <Card style={{ paddingTop: "20px", marginTop: "15px" }} size="small">
            <Row gutter={[10, 10]}>
              <Col span={24} lg={6}>
                <Form.Item<any>
                  label="Ticket No"
                  name="restaurant_name"
                  rules={[{ required: true, message: "Ticket No is required" }]}
                >
                  <Input placeholder="TIcket No:" />
                </Form.Item>
              </Col>
              <Col span={24} lg={6}>
                <Form.Item<any>
                  label="Gross Fare (Sale):"
                  name="restaurant_address"
                  rules={[
                    {
                      required: true,
                      message: "Gross Fare (Sale) is required",
                    },
                  ]}
                >
                  <Input type="number" placeholder="Gross Fare (Sale)" />
                </Form.Item>
              </Col>
              <Col span={24} lg={6}>
                <Form.Item<any>
                  label="Base Fare (Buy)"
                  name="restaurant_address"
                  rules={[
                    {
                      required: true,
                      message: "Base Fare (Buy) is required",
                    },
                  ]}
                >
                  <Input placeholder="Base Fare (Buy)" />
                </Form.Item>
              </Col>
              <Col span={24} lg={6}>
                <Form.Item<any> label="Vendor" name="dueDate">
                  <CommonClient />
                </Form.Item>
              </Col>
              <Col span={24} lg={6}>
                <Form.Item<any> label="Airline" name="dueDate">
                  <Select
                    showSearch
                    placeholder="Search Airline"
                    filterOption={(input, option: any) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={[
                      {
                        value: "1",
                        label: (
                          <p>
                            <ManOutlined /> Male{" "}
                          </p>
                        ),
                      },
                      {
                        value: "2",
                        label: (
                          <p>
                            <WomanOutlined /> Female
                          </p>
                        ),
                      },
                      {
                        value: "3",
                        label: (
                          <p>
                            <HarmonyOSOutlined /> Others{" "}
                          </p>
                        ),
                      },
                    ]}
                  />
                </Form.Item>
              </Col>{" "}
              <Col span={24} lg={6}>
                <Form.Item<any>
                  label="Commission %"
                  name="restaurant_address"
                  rules={[
                    {
                      required: true,
                      message: "Commission % is required",
                    },
                  ]}
                >
                  <Input placeholder="Commission %" type="number" />
                </Form.Item>
              </Col>
              <Col span={24} lg={6}>
                <Form.Item<any>
                  label="Commission Amount"
                  name="restaurant_address"
                  rules={[
                    {
                      required: true,
                      message: "Commission Amount is required",
                    },
                  ]}
                >
                  <Input placeholder="Commission Amount" type="number" />
                </Form.Item>
              </Col>
              <Col span={24} lg={6}>
                <Form.Item<any>
                  label="Net Commission:"
                  name="restaurant_address"
                  rules={[
                    {
                      required: true,
                      message: "Net Commission is required",
                    },
                  ]}
                >
                  <Input placeholder="Net Commission" type="number" />
                </Form.Item>
              </Col>{" "}
              <Col span={24} lg={8}>
                <Form.Item<any>
                  label="AIT"
                  name="restaurant_address"
                  rules={[
                    {
                      required: true,
                      message: "AIT is required",
                    },
                  ]}
                >
                  <InputNumber
                    addonBefore={
                      <Select defaultValue="add" style={{ width: 130 }}>
                        <Option value="add">Profit</Option>
                        <Option value="minus">Client</Option>
                      </Select>
                    }
                    placeholder="ALT"
                    className="w-full"
                    // defaultValue={100}
                  />
                </Form.Item>
              </Col>
              <Col span={24} lg={8}>
                <Form.Item<any> label="Discount" name="restaurant_address">
                  <InputNumber
                    addonBefore={
                      <Select defaultValue="add" style={{ width: 150 }}>
                        <Option value="Amount">Amount</Option>
                        <Option value="percent">Percent(%)</Option>
                      </Select>
                    }
                    placeholder="ALT"
                    className="w-full"
                    // defaultValue={100}
                  />
                </Form.Item>
              </Col>
              <Col span={24} lg={8}>
                <Form.Item<any> label="Other Bonus" name="restaurant_address">
                  <InputNumber
                    addonBefore={
                      <Select defaultValue="add" style={{ width: 120 }}>
                        <Option value="add">Profit</Option>
                        <Option value="minus">Client</Option>
                      </Select>
                    }
                    placeholder="ALT"
                    className="w-full"
                    // defaultValue={100}
                  />
                </Form.Item>
              </Col>
              <Row className="w-full" gutter={[16, 16]}>
                <Col lg={18}>
                  <Row gutter={[8, 16]}>
                    <Col span={24} lg={6}>
                      <Form.Item<any>
                        label="Extra Fee:
"
                        name="restaurant_address"
                      >
                        <Input placeholder="Extra Fee" type="number" />
                      </Form.Item>
                    </Col>
                    <Col span={24} lg={6}>
                      <Form.Item<any>
                        label="Other Expense:"
                        name="restaurant_address"
                      >
                        <Input placeholder="Other Expense" type="number" />
                      </Form.Item>
                    </Col>
                    <Col span={24} lg={6}>
                      <Form.Item<any> label="Vat" name="restaurant_address">
                        <Input placeholder="Vat" type="number" />
                      </Form.Item>
                    </Col>
                    <Col span={24} lg={6}>
                      <Form.Item<any> label="Tax" name="restaurant_address">
                        <Input placeholder="Tax" type="number" />
                      </Form.Item>
                    </Col>
                    <Col span={24} lg={6}>
                      <Form.Item<any>
                        label="Route/Sector:"
                        name="restaurant_address"
                      >
                        <Select
                          showSearch
                          placeholder="Route/Sector"
                          filterOption={(input, option: any) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={[
                            {
                              value: "1",
                              label: (
                                <p>
                                  <ManOutlined /> Male{" "}
                                </p>
                              ),
                            },
                            {
                              value: "2",
                              label: (
                                <p>
                                  <WomanOutlined /> Female
                                </p>
                              ),
                            },
                            {
                              value: "3",
                              label: (
                                <p>
                                  <HarmonyOSOutlined /> Others{" "}
                                </p>
                              ),
                            },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24} lg={6}>
                      <Form.Item<any> label="PNR:" name="restaurant_address">
                        <Input placeholder="PNR" />
                      </Form.Item>
                    </Col>
                    <Col span={24} lg={6}>
                      <Form.Item<any> label="GDS :" name="restaurant_address">
                        <Select
                          showSearch
                          placeholder="GDS "
                          filterOption={(input, option: any) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={[
                            {
                              value: "1",
                              label: (
                                <p>
                                  <ManOutlined /> Male{" "}
                                </p>
                              ),
                            },
                            {
                              value: "2",
                              label: (
                                <p>
                                  <WomanOutlined /> Female
                                </p>
                              ),
                            },
                            {
                              value: "3",
                              label: (
                                <p>
                                  <HarmonyOSOutlined /> Others{" "}
                                </p>
                              ),
                            },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24} lg={6}>
                      <Form.Item<any>
                        label="Segment :"
                        name="restaurant_address"
                      >
                        <Input placeholder="Segment" />
                      </Form.Item>
                    </Col>
                    <Col span={24} lg={6}>
                      <Form.Item<any>
                        label="Issue Date "
                        name="restaurant_address"
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
                        />{" "}
                      </Form.Item>
                    </Col>
                    <Col span={24} lg={6}>
                      <Form.Item<any>
                        label="Journey Date "
                        name="restaurant_address"
                      >
                        <DatePickerWithOptionalToday
                          showToday={false}
                          onChange={(date, dateString) => {
                            console.log(
                              "Parent component received date change:",
                              date,
                              dateString
                            );
                          }}
                        />{" "}
                      </Form.Item>
                    </Col>
                    <Col span={24} lg={6}>
                      <Form.Item<any>
                        label="Return Date"
                        name="restaurant_address"
                      >
                        <DatePickerWithOptionalToday
                          showToday={false}
                          onChange={(date, dateString) => {
                            console.log(
                              "Parent component received date change:",
                              date,
                              dateString
                            );
                          }}
                        />{" "}
                      </Form.Item>
                    </Col>
                    <Col span={24} lg={6}>
                      <Form.Item<any>
                        label="Select air ticket class"
                        name="restaurant_address"
                      >
                        <Select
                          showSearch
                          placeholder="Select air ticket class"
                          filterOption={(input, option: any) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={[
                            {
                              value: "1",
                              label: (
                                <p>
                                  <ManOutlined /> Male{" "}
                                </p>
                              ),
                            },
                            {
                              value: "2",
                              label: (
                                <p>
                                  <WomanOutlined /> Female
                                </p>
                              ),
                            },
                            {
                              value: "3",
                              label: (
                                <p>
                                  <HarmonyOSOutlined /> Others{" "}
                                </p>
                              ),
                            },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24} lg={6}>
                      <Form.Item<any>
                        label="Select ticket type"
                        name="restaurant_address"
                      >
                        <Select
                          showSearch
                          placeholder="Select ticket type"
                          filterOption={(input, option: any) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={[
                            {
                              value: "1",
                              label: (
                                <p>
                                  <ManOutlined /> Male{" "}
                                </p>
                              ),
                            },
                            {
                              value: "2",
                              label: (
                                <p>
                                  <WomanOutlined /> Female
                                </p>
                              ),
                            },
                            {
                              value: "3",
                              label: (
                                <p>
                                  <HarmonyOSOutlined /> Others{" "}
                                </p>
                              ),
                            },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col lg={6} className=" border rounded py-5">
                  <Col span={24} lg={24}>
                    <Form.Item<any>
                      label="Client Price:"
                      name="restaurant_address"
                    >
                      <Input placeholder="Client Price" type="number" />
                    </Form.Item>
                  </Col>
                  <Col span={24} lg={24}>
                    <Form.Item<any>
                      label="Purchase Price:"
                      name="restaurant_address"
                    >
                      <Input placeholder="Purchase Price" type="number" />
                    </Form.Item>
                  </Col>
                  <Col span={24} lg={24}>
                    <Form.Item<any> label="Profit" name="restaurant_address">
                      <Input placeholder="Profit" type="number" />
                    </Form.Item>
                  </Col>
                </Col>
              </Row>
            </Row>
          </Card>
        </Badge.Ribbon>

        <Badge.Ribbon text="Country Taxes" color="blue" placement="start">
          <Card style={{ paddingTop: "20px", marginTop: "15px" }} size="small">
            <Row gutter={[10, 10]}>
              <Col span={24} lg={4}>
                <Form.Item<any>
                  label="Search Client"
                  name="restaurant_name"
                  rules={[
                    { required: true, message: "Search Client is required" },
                  ]}
                >
                  <CommonClient />
                </Form.Item>
              </Col>
              <Col span={24} lg={4}>
                <Form.Item<any>
                  label="Create Employee"
                  name="restaurant_address"
                  rules={[
                    {
                      required: true,
                      message: "Create Employee is required",
                    },
                  ]}
                >
                  <CommonEmployee />
                </Form.Item>
              </Col>
              <Col span={24} lg={4}>
                <Form.Item<any>
                  label="Invoice No"
                  name="restaurant_address"
                  rules={[
                    {
                      required: true,
                      message: "Invoice is required",
                    },
                  ]}
                >
                  <Input placeholder="AIT-00000002" />
                </Form.Item>
              </Col>
              <Col span={24} lg={4}>
                <Form.Item<any> label="Sales Date" name="dueDate">
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
              <Col span={1} lg={4}>
                <Form.Item<any> label="Due Date" name="restaurant_address">
                  <DatePickerWithOptionalToday
                    showToday={false}
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
              <Col span={24} lg={4}>
                <Form.Item<any>
                  label="Select Agent"
                  name="restaurant_address"
                  rules={[
                    {
                      required: true,
                      message: "Select Agent is required",
                    },
                  ]}
                >
                  <CommonAgent />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Badge.Ribbon>
      </Form>
    </React.Fragment>
  );
};

export default CreateNonCommision;

{
  /* ------- */
}
//    <Col span={1} lg={4}>
//    <Form.Item<any> label="Due Date" name="restaurant_address">
//      <DatePickerWithOptionalToday
//        showToday={false}
//        onChange={(date, dateString) => {
//          console.log(
//            "Parent component received date change:",
//            date,
//            dateString
//          );
//        }}
//      />
//    </Form.Item>
//  </Col>
//  <Col span={24} lg={4}>
//    <Form.Item<any>
//      label="Select Agent"
//      name="restaurant_address"
//      rules={[
//        {
//          required: true,
//          message: "Select Agent is required",
//        },
//      ]}
//    >
//      <CommonAgent />
//    </Form.Item>
//  </Col>
