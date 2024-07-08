import React from "react";

import { Form } from "../../../common/CommonAnt";
import { Badge, Card, Col, DatePicker, Input, Row, Select, Upload } from "antd";
import Iconify from "../../../common/IconifyConfig/IconifyConfig";
import { phoneValidator } from "../../../utilities/validator";
import { useCreateRestaurantMutation } from "../../Restaurants/api/restaurantsEndpoint";
import { RestaurantTypes } from "../../Restaurants/types/RestaurantTypes";
import {
  HarmonyOSOutlined,
  ManOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import CommonClient from "../../../common/commonCLient/CommonClient";

const CreatePassportManagement = () => {
  const [create, { isLoading, isSuccess }] = useCreateRestaurantMutation();

  const onFinish = (values: RestaurantTypes): void => {
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
              <Col span={24} lg={6}>
                <Form.Item<RestaurantTypes>
                  label="Search Client"
                  name="restaurant_name"
                  rules={[
                    { required: true, message: "Search Client is required" },
                  ]}
                >
                  <CommonClient />
                  {/* <Select
                    showSearch
                    placeholder="Search Client"
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
                  /> */}
                </Form.Item>
              </Col>
              <Col span={24} lg={6}>
                <Form.Item<RestaurantTypes>
                  label="Tracking Number"
                  name="restaurant_address"
                  rules={[
                    {
                      required: true,
                      message: "Tracking Number is required",
                    },
                  ]}
                >
                  <Input placeholder="T000012" />
                </Form.Item>
              </Col>
              <Col span={24} lg={6}>
                <Form.Item<RestaurantTypes>
                  label="Passport Entry Date"
                  name="restaurant_address"
                  rules={[
                    {
                      required: true,
                      message: "Passport Entry Date is required",
                    },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={1} lg={6}>
                <Form.Item<RestaurantTypes>
                  label="Passport Received By"
                  name="restaurant_address"
                  rules={[
                    {
                      required: true,
                      message: "Passport Received By is required",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Country"
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
          </Card>
        </Badge.Ribbon>
        <Badge.Ribbon
          text="Passenger Information"
          color="blue"
          placement="start"
        >
          <Card style={{ marginTop: "15px", paddingTop: "20px" }} size="small">
            <Row gutter={[10, 10]}>
              <Col span={24} lg={6}>
                <Form.Item<RestaurantTypes>
                  label="Passenger Name"
                  name="restaurant_hotline"
                  rules={[{ required: true }, { validator: phoneValidator }]}
                >
                  <Input placeholder="Passenger Name" />
                </Form.Item>
              </Col>
              <Col span={24} lg={6}>
                <Form.Item<RestaurantTypes>
                  label="Gender"
                  name="restaurant_hotline"
                  rules={[{ required: true }, { validator: phoneValidator }]}
                >
                  <Select
                    showSearch
                    placeholder="Gender"
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
                <Form.Item<RestaurantTypes>
                  label="Passport Number"
                  name="restaurant_hotline"
                  rules={[{ required: true }, { validator: phoneValidator }]}
                >
                  <Input placeholder="Passport Number" />
                </Form.Item>
              </Col>{" "}
              <Col span={24} lg={6}>
                <Form.Item<RestaurantTypes>
                  label="Date Of Birth"
                  name="restaurant_address"
                  rules={[
                    {
                      required: true,
                      message: "Date Of Birth is required",
                    },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={24} lg={6}>
                <Form.Item<RestaurantTypes>
                  label="Passport Issue Date"
                  name="restaurant_address"
                  rules={[
                    {
                      required: true,
                      message: "Passport Issue Date is required",
                    },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={24} lg={6}>
                <Form.Item<RestaurantTypes>
                  label="Passport Expiry Date"
                  name="restaurant_address"
                  rules={[
                    {
                      required: true,
                      message: "Passport Expiry Date is required",
                    },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={24} lg={6}>
                <Form.Item<RestaurantTypes>
                  label="Passenger Mobile Number"
                  name="restaurant_hotline"
                  rules={[{ required: true }, { validator: phoneValidator }]}
                >
                  <Input
                    addonBefore="+088"
                    placeholder="Passenger Mobile Number"
                  />
                </Form.Item>
              </Col>
              <Col span={24} lg={6}>
                <Form.Item<RestaurantTypes>
                  label="Visited Country"
                  name="restaurant_hotline"
                >
                  <Select
                    mode="multiple"
                    //   size={size}
                    placeholder="Please select"
                    defaultValue={["India", "England"]}
                    //   onChange={handleChange}
                    style={{ width: "100%" }}
                    //   options={options}
                  />
                </Form.Item>
              </Col>
              <Col span={24} lg={6}>
                <Form.Item<RestaurantTypes>
                  label="Previous Passport Number"
                  name="restaurant_name"
                >
                  <Select
                    showSearch
                    placeholder="Previous Passport Number"
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
          </Card>
        </Badge.Ribbon>

        <Badge.Ribbon text="More Information" color="blue" placement="start">
          <Card style={{ marginTop: "15px", paddingTop: "20px" }} size="small">
            <Row gutter={[10, 10]}>
              <Col span={24} lg={6}>
                <Form.Item<RestaurantTypes>
                  label="Which Country For"
                  name="restaurant_hotline"
                  rules={[{ required: true }, { validator: phoneValidator }]}
                >
                  <Select
                    showSearch
                    placeholder="Country"
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
                <Form.Item<RestaurantTypes>
                  label="Group Name"
                  name="restaurant_hotline"
                  rules={[{ required: true }, { validator: phoneValidator }]}
                >
                  <Input placeholder="Group Name" />
                </Form.Item>
              </Col>{" "}
              <Col span={24} lg={6}>
                <Form.Item<RestaurantTypes>
                  label="Police Clearance Received"
                  name="restaurant_hotline"
                  rules={[{ required: true }, { validator: phoneValidator }]}
                >
                  <Select
                    showSearch
                    placeholder="Yes"
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
                <Form.Item<RestaurantTypes>
                  label="Total Payment"
                  name="restaurant_hotline"
                  rules={[{ required: true }, { validator: phoneValidator }]}
                >
                  <Input addonBefore="BDT" placeholder="Enter Total amount" />
                </Form.Item>
              </Col>
              <Col span={24} lg={6}>
                <Form.Item<RestaurantTypes>
                  label="Passport Status"
                  name="restaurant_hotline"
                  rules={[{ required: true }, { validator: phoneValidator }]}
                >
                  <Select
                    showSearch
                    placeholder="Select Status"
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
                <Form.Item<RestaurantTypes>
                  label="Remaark"
                  name="restaurant_name"
                >
                  <TextArea placeholder="Remark" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Badge.Ribbon>

        <Badge.Ribbon
          text="Document Information"
          color="blue"
          placement="start"
        >
          <Card style={{ marginTop: "15px", paddingTop: "20px" }} size="small">
            <Row gutter={[10, 10]}>
              <Col span={24} lg={6}>
                <Form.Item<RestaurantTypes>
                  label="Documents Upload"
                  name="restaurant_logo"
                  valuePropName="fileList"
                  getValueFromEvent={(e) => {
                    if (Array.isArray(e)) {
                      return e;
                    }
                    return e?.fileList;
                  }}
                >
                  <Upload
                    beforeUpload={() => false}
                    maxCount={1}
                    listType="picture-card"
                    showUploadList={{ showRemoveIcon: true }}
                  >
                    <Iconify name="ant-design:plus-outlined" />
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={24} lg={6}>
                <Form.Item<RestaurantTypes>
                  label="Photo Upload"
                  name="restaurant_logo"
                  valuePropName="fileList"
                  getValueFromEvent={(e) => {
                    if (Array.isArray(e)) {
                      return e;
                    }
                    return e?.fileList;
                  }}
                >
                  <Upload
                    beforeUpload={() => false}
                    maxCount={1}
                    listType="picture-card"
                    showUploadList={{ showRemoveIcon: true }}
                  >
                    <Iconify name="ant-design:plus-outlined" />
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Badge.Ribbon>

        {/* <Row gutter={[10, 10]}>
          <Col span={24} lg={12}>
            <Form.Item<RestaurantTypes>
              label="Restaurant Owner Name"
              name="restaurant_owner_name"
              rules={[
                {
                  required: true,
                },
                { validator: nameValidator },
              ]}
            >
              <Input placeholder="Owner name" />
            </Form.Item>
          </Col>
          <Col span={24} lg={12}>
            <Form.Item<RestaurantTypes>
              label="Restaurant NBR(%)"
              name="restaurant_nbr_percentage"
              rules={[{ required: true }, { validator: numberValidator }]}
            >
              <InputNumber style={{ width: "100%" }} placeholder="NBR(%)" />
            </Form.Item>
          </Col>
        </Row> */}
      </Form>
    </React.Fragment>
  );
};

export default CreatePassportManagement;
