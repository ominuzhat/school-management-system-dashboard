import React, { useEffect, useState } from "react";
import {
  Col,
  Form as AntForm,
  Input,
  Row,
  Button,
  Transfer,

} from "antd";
import type { TransferItem } from "antd/es/transfer";
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
  const { data: permissionData } = useGetPermissionQuery({});
  const { data: userPermissionData } = useGetSingleRolePermissionQuery(
    Number(record?.id)
  );

  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [mockData, setMockData] = useState<TransferItem[]>([]);

  useEffect(() => {
    if (Array.isArray(permissionData?.data)) {
      const formattedData: TransferItem[] = permissionData.data.map((item) => ({
        key: item.id.toString(),
        title: item.name,
      }));
      setMockData(formattedData);
    }
  }, [permissionData?.data]);

  useEffect(() => {
    const selectedPermissions = (
      userPermissionData?.data as IGetSingleRolePermission
    )?.permissions?.map((p) => p.id.toString());

    form.setFieldsValue({
      name: record?.name,
      permissions: selectedPermissions,
    });

    setTargetKeys(selectedPermissions || []);
  }, [userPermissionData?.data, record, form]);

  const onFinish = (values: any): void => {
    update({
      id: record.id,
      data: {
        ...values,
        permissions: values.permissions.map((id: string) => Number(id)),
      },
    });
  };

  const handleTransferChange = (newTargetKeys: string[]) => {
    setTargetKeys(newTargetKeys);
    form.setFieldsValue({ permissions: newTargetKeys });
  };

  // const handleSelectAll = () => {
  //   const allKeys = mockData.map((item) => item.key);
  //   setTargetKeys(allKeys);
  //   form.setFieldsValue({ permissions: allKeys });
  // };

  // const handleClearAll = () => {
  //   setTargetKeys([]);
  //   form.setFieldsValue({ permissions: [] });
  // };

  return (
    <AntForm form={form} layout="vertical" onFinish={onFinish}>
      <Row gutter={[10, 10]}>
        <Col span={24} lg={12}>
          <AntForm.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input placeholder="Name" />
          </AntForm.Item>
        </Col>

        <Col span={24}>
          <AntForm.Item
            label="Permissions"
            name="permissions"
            rules={[
              {
                required: true,
                message: "At least one permission is required",
              },
            ]}
          >
            <>
              <div className="flex justify-center items-center">
                <Transfer
                  dataSource={mockData}
                  showSearch
                  listStyle={{
                    width: 300,
                    height: 300,
                  }}
                  titles={["Available", "Selected"]}
                  targetKeys={targetKeys}
                  onChange={handleTransferChange}
                  render={(item) => item.title}
                  oneWay
                />
              </div>
            </>
          </AntForm.Item>
        </Col>

        <Col span={24}>
          <AntForm.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Submit
            </Button>
          </AntForm.Item>
        </Col>
      </Row>
    </AntForm>
  );
};

export default EditRolePermission;
