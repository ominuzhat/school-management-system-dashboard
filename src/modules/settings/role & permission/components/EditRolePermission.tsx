import React, { useEffect } from "react";
import { Col, Form as AntForm, Input, Row, Button, Checkbox } from "antd";
import { IGetSingleRolePermission } from "../type/rolePermissionTypes";
import {
  useGetPermissionQuery,
  useGetSingleRolePermissionQuery,
  useUpdateRolePermissionMutation,
} from "../api/rolePermissionEndPoints";

interface Props {
  record: IGetSingleRolePermission;
}

const EditRolePermission: React.FC<Props> = ({ record }) => {
  const [form] = AntForm.useForm();
  const [update, { isLoading }] = useUpdateRolePermissionMutation();
  const { data: userPermissionData } = useGetSingleRolePermissionQuery(
    Number(record?.id)
  );
  const { data: permissionData } = useGetPermissionQuery({});

  useEffect(() => {
    const permissionIds = userPermissionData?.data?.permissions?.map(
      (permission: any) => permission?.id
    );
    form.setFieldsValue({
      name: record?.name,
      permissions: permissionIds,
    });
  }, [record, form, userPermissionData?.data?.permissions]);

  const onFinish = (values: any): void => {
    update({ id: record.id, data: values });
  };

  return (
    <React.Fragment>
      <AntForm form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={[10, 10]}>
          <Col span={24} lg={12}>
            <AntForm.Item<any>
              label="Name"
              name="name"
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input placeholder="Name" />
            </AntForm.Item>
          </Col>
        </Row>
        <Col span={24} lg={24}>
          <AntForm.Item<any>
            label="Permissions"
            name="permissions"
            rules={[
              {
                required: true,
                message: "At least one permission is required",
              },
            ]}
          >
            <Checkbox.Group>
              <Row>
                {permissionData?.data?.map((permission: any) => (
                  <Col span={8} key={permission.id}>
                    <Checkbox value={permission.id}>{permission.name}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </AntForm.Item>
        </Col>{" "}
        <Col>
          <AntForm.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Submit
            </Button>
          </AntForm.Item>
        </Col>
      </AntForm>
    </React.Fragment>
  );
};

export default EditRolePermission;
