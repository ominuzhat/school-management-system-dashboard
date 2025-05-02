/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Col, Form as AntForm, Input, Row, Button, Transfer, Collapse } from "antd";
import type { TransferItem } from "antd/es/transfer";
import { IGetSingleRolePermission, Permission } from "../type/rolePermissionTypes";
import {
  useGetPermissionQuery,
  useGetSingleRolePermissionQuery,
  useUpdateRolePermissionMutation,
} from "../api/rolePermissionEndPoints";
import { moduleNames } from "../../../../utilities/permissionConstant";

const { Panel } = Collapse;

interface Props {
  record: IGetSingleRolePermission;
}

interface GroupedPermissions {
  [module: string]: TransferItem[];
}

interface FormValues {
  name: string;
  permissions?: string[];
}


const organizePermissionsByModule = (
  permissions: Permission[],
  modules: typeof moduleNames
): GroupedPermissions => {
  const moduleValues = Object.values(modules);
  const grouped: GroupedPermissions = {};

  permissions.forEach((permission:any) => {
    const [_, ...moduleParts] = permission.codename.split('_');
    const moduleName = moduleParts.join('_');
    
    if (moduleValues.includes(moduleName)) {
      if (!grouped[moduleName]) {
        grouped[moduleName] = [];
      }
      grouped[moduleName].push({
        key: permission.id.toString(),
        title: permission.name,
        description: permission.codename,
      });
    }
  });

  return grouped;
};

const EditRolePermission: React.FC<Props> = ({ record }) => {
  const [form] = AntForm.useForm<FormValues>();
  const [update] = useUpdateRolePermissionMutation();
  const { data: permissionData } = useGetPermissionQuery<any>({});
  const { data: userPermissionData } = useGetSingleRolePermissionQuery<any>(record.id);

  const [groupedPermissions, setGroupedPermissions] = useState<GroupedPermissions>({});
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  useEffect(() => {
    if (permissionData?.data) {
      const organized = organizePermissionsByModule(permissionData.data, moduleNames);
      setGroupedPermissions(organized);
    }
  }, [permissionData]);

  useEffect(() => {
    if (userPermissionData?.data) {
      const initialPermissions = userPermissionData.data.permissions
        ?.map((p:any) => p.id.toString()) || [];
      
      form.setFieldsValue({
        name: record.name,
        permissions: initialPermissions,
      });
      setSelectedPermissions(initialPermissions);
    }
  }, [userPermissionData, record, form]);

  const handleSubmit = async (values: FormValues) => {
    try {
      const requestData: any = {
        id: record.id,
        name: values.name,
        permissions: values.permissions?.map(Number) || [],
      };
      
      await update(requestData).unwrap();
    } catch (error) {
      console.error('Failed to update role permissions:', error);
    }
  };

  const handlePermissionChange = (module: string, newKeys: string[]) => {
    const otherPermissions = selectedPermissions.filter(key => 
      !groupedPermissions[module].some(item => item.key === key)
    );
    const updatedPermissions = [...otherPermissions, ...newKeys];
    
    setSelectedPermissions(updatedPermissions);
    form.setFieldsValue({ permissions: updatedPermissions });
  };

  const renderPermissionItem = (item: TransferItem) => ({
    label: (
      <div className="permission-item">
        <span>{item.title}</span>
      </div>
    ),
    value: item.title || '',
  });

  const renderModuleSection = (module: string) => {
    const modulePermissions = groupedPermissions[module] || [];
    const moduleSelectedKeys = selectedPermissions.filter(key => 
      modulePermissions.some(item => item.key === key)
    );

    return (
      <Collapse ghost key={module}>
        <Panel header={<span className="module-header">{module.toUpperCase()}</span>} key={module}>
          <Transfer
            dataSource={modulePermissions}
            targetKeys={moduleSelectedKeys}
            onChange={(keys:any) => handlePermissionChange(module, keys)}
            render={renderPermissionItem}
            showSearch
            listStyle={{ width: '100%', height: 250 }}
          />
        </Panel>
      </Collapse>
    );
  };

  return (
    <AntForm form={form} layout="vertical" onFinish={handleSubmit}>
      <Row gutter={16}>
        <Col span={24} md={12}>
          <AntForm.Item
            label="Role Name"
            name="name"
            rules={[{ required: true, message: 'Role name is required' }]}
          >
            <Input placeholder="Enter role name" />
          </AntForm.Item>
        </Col>

        <Col span={24}>
          <AntForm.Item
            label="Permissions"
            name="permissions"
          >
            <div className="permissions-container">
              {Object.keys(groupedPermissions).map(renderModuleSection)}
            </div>
          </AntForm.Item>
        </Col>

        <Col span={24}>
          <AntForm.Item>
            <Button type="primary" htmlType="submit">
              Save Role
            </Button>
          </AntForm.Item>
        </Col>
      </Row>
    </AntForm>
  );
};

export default EditRolePermission;