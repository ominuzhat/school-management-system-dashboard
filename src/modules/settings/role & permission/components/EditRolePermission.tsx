/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Col,
  Form as AntForm,
  Input,
  Row,
  Button,
  Checkbox,
  Card,
  Space,
} from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import {
  IGetSingleRolePermission,
  Permission,
} from "../type/rolePermissionTypes";
import {
  useGetPermissionQuery,
  useGetSingleRolePermissionQuery,
  useUpdateRolePermissionMutation,
} from "../api/rolePermissionEndPoints";
import { moduleNames } from "../../../../utilities/permissionConstant";

interface Props {
  record: IGetSingleRolePermission;
}

interface GroupedPermissions {
  [module: string]: {
    id: string;
    name: string;
    codename: string;
  }[];
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

  permissions.forEach((permission: any) => {
    const [_, ...moduleParts] = permission.codename.split("_");
    const moduleName = moduleParts.join("_");

    if (moduleValues.includes(moduleName)) {
      if (!grouped[moduleName]) {
        grouped[moduleName] = [];
      }
      grouped[moduleName].push({
        id: permission.id.toString(),
        name: permission.name,
        codename: permission.codename,
      });
    }
  });

  return grouped;
};

const EditRolePermission: React.FC<Props> = ({ record }) => {
  const [form] = AntForm.useForm<FormValues>();
  const [update] = useUpdateRolePermissionMutation();
  const { data: permissionData } = useGetPermissionQuery<any>({});
  const { data: userPermissionData } = useGetSingleRolePermissionQuery<any>(
    record.id
  );

  const [groupedPermissions, setGroupedPermissions] =
    useState<GroupedPermissions>({});
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  useEffect(() => {
    if (permissionData?.data) {
      const organized = organizePermissionsByModule(
        permissionData.data,
        moduleNames
      );
      setGroupedPermissions(organized);
    }
  }, [permissionData]);

  useEffect(() => {
    if (userPermissionData?.data) {
      const initialPermissions =
        userPermissionData.data.permissions?.map((p: any) => p.id.toString()) ||
        [];

      form.setFieldsValue({
        name: record.name,
        permissions: initialPermissions,
      });
      setSelectedPermissions(initialPermissions);
    }
  }, [userPermissionData, record, form]);

  const handleSubmit = async (values: FormValues) => {
    try {
      // Ensure permissions is always an array
      const permissionsArray = Array.isArray(values.permissions)
        ? values.permissions
        : selectedPermissions;

      const requestData: any = {
        id: record.id,
        name: values.name,
        permissions: permissionsArray.map(Number) || [],
      };

      await update({ id: record.id, data: requestData }).unwrap();
    } catch (error) {
      console.error("Failed to update role permissions:", error);
    }
  };

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    const newSelectedPermissions = checked
      ? [...selectedPermissions, permissionId]
      : selectedPermissions.filter((id) => id !== permissionId);

    setSelectedPermissions(newSelectedPermissions);
    form.setFieldsValue({ permissions: newSelectedPermissions });
  };

  const handleModuleSelectAll = (module: string, checked: boolean) => {
    const modulePermissions = groupedPermissions[module] || [];
    const modulePermissionIds = modulePermissions.map((p) => p.id);

    const newSelectedPermissions = checked
      ? [
          ...selectedPermissions.filter(
            (id) => !modulePermissionIds.includes(id)
          ),
          ...modulePermissionIds,
        ]
      : selectedPermissions.filter((id) => !modulePermissionIds.includes(id));

    setSelectedPermissions(newSelectedPermissions);
    form.setFieldsValue({ permissions: newSelectedPermissions });
  };

  const handleGlobalSelectAll = (e: CheckboxChangeEvent) => {
    const allPermissionIds: string[] = [];
    Object.values(groupedPermissions).forEach((modulePermissions) => {
      modulePermissions.forEach((permission) => {
        allPermissionIds.push(permission.id);
      });
    });

    const newSelectedPermissions = e.target.checked
      ? [...allPermissionIds]
      : [];

    setSelectedPermissions(newSelectedPermissions);
    form.setFieldsValue({ permissions: newSelectedPermissions });
  };

  const renderModuleSection = (module: string) => {
    const modulePermissions = groupedPermissions[module] || [];
    const allModuleSelected =
      modulePermissions.length > 0 &&
      modulePermissions.every((p) => selectedPermissions.includes(p.id));

    return (
      <Card
        key={module}
        title={
          <Space>
            <Checkbox
              checked={allModuleSelected}
              indeterminate={
                modulePermissions.some((p) =>
                  selectedPermissions.includes(p.id)
                ) && !allModuleSelected
              }
              onChange={(e) => handleModuleSelectAll(module, e.target.checked)}
            />
            <span>{module.toUpperCase()}</span>
          </Space>
        }
        style={{ marginBottom: 16 }}
      >
        <Row gutter={[16, 16]}>
          {modulePermissions.map((permission) => (
            <Col key={permission.id} xs={24} sm={12} md={8} lg={6}>
              <Checkbox
                checked={selectedPermissions.includes(permission.id)}
                onChange={(e) =>
                  handlePermissionChange(permission.id, e.target.checked)
                }
              >
                {permission.name}
              </Checkbox>
            </Col>
          ))}
        </Row>
      </Card>
    );
  };

  const isGlobalSelectAllChecked = () => {
    const allPermissionIds: string[] = [];
    Object.values(groupedPermissions).forEach((modulePermissions) => {
      modulePermissions.forEach((permission) => {
        allPermissionIds.push(permission.id);
      });
    });

    return (
      allPermissionIds.length > 0 &&
      allPermissionIds.every((id) => selectedPermissions.includes(id))
    );
  };

  const isGlobalSelectAllIndeterminate = () => {
    const allPermissionIds: string[] = [];
    Object.values(groupedPermissions).forEach((modulePermissions) => {
      modulePermissions.forEach((permission) => {
        allPermissionIds.push(permission.id);
      });
    });

    return (
      selectedPermissions.length > 0 &&
      !isGlobalSelectAllChecked() &&
      allPermissionIds.some((id) => selectedPermissions.includes(id))
    );
  };

  return (
    <AntForm form={form} layout="vertical" onFinish={handleSubmit}>
      <Row gutter={16}>
        <Col span={24} md={12}>
          <AntForm.Item
            label="Role Name"
            name="name"
            rules={[{ required: true, message: "Role name is required" }]}
          >
            <Input placeholder="Enter role name" />
          </AntForm.Item>
        </Col>

        <Col span={24}>
          <AntForm.Item label="Permissions" name="permissions">
            <div className="permissions-container">
              <div style={{ marginBottom: 16 }}>
                <Checkbox
                  checked={isGlobalSelectAllChecked()}
                  indeterminate={isGlobalSelectAllIndeterminate()}
                  onChange={handleGlobalSelectAll}
                >
                  <strong>Select All Permissions</strong>
                </Checkbox>
              </div>
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
