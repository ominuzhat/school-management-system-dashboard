import { Col, Input, Row, Form as AntForm } from "antd";
import { useEffect } from "react";
import {
  useGetSingleVendorQuery,
  useUpdateVendorMutation,
} from "../api/vendorEndPoints";
import { Form } from "../../../../../../common/CommonAnt";
import { ICreateVendor, IGetVendor } from "../types/vendorTypes";

const UpdateVendor = ({ record }: { record: any }) => {
  const [form] = AntForm.useForm();
  const { data: singleData, isLoading } = useGetSingleVendorQuery<any>(
    Number(record)
  );
  const [update, { isLoading: isUpdating, isSuccess }] =
    useUpdateVendorMutation();

  useEffect(() => {
    if (singleData?.data) {
      const vendorData = singleData.data as IGetVendor;
      form.setFieldsValue({
        name: vendorData.name,
        contact_number: vendorData.contact_number,
        email: vendorData.email,
        address: vendorData.address,
        purpose: vendorData.purpose,
      });
    }
  }, [singleData, form]);

  const onFinish = (values: ICreateVendor) => {
    update({ id: record, data: values });
  };

  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        isLoading={isLoading || isUpdating}
        isSuccess={isSuccess}
      >
        <Row gutter={16}>
          <Col lg={12}>
            <Form.Item<ICreateVendor> label="Vendor Name" name="name">
              <Input placeholder="Enter vendor name" />
            </Form.Item>
          </Col>

          <Col lg={12}>
            <Form.Item<ICreateVendor>
              label="Contact Number"
              name="contact_number"
            >
              <Input placeholder="01XXXXXXXXX" />
            </Form.Item>
          </Col>

          <Col lg={24}>
            <Form.Item<ICreateVendor> label="Email" name="email">
              <Input placeholder="vendor@example.com" />
            </Form.Item>
          </Col>

          <Col lg={24}>
            <Form.Item<ICreateVendor> label="Address" name="address">
              <Input.TextArea placeholder="Enter address" rows={2} />
            </Form.Item>
          </Col>

          <Col lg={24}>
            <Form.Item<ICreateVendor> label="Purpose" name="purpose">
              <Input.TextArea placeholder="Enter Description" rows={4} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default UpdateVendor;
