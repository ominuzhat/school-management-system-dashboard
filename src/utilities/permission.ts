import { actionNames, moduleNames, TPermission } from "./permissionConstant";

// Fixed GetPermission function
export const GetPermission = (
  data: any,
  moduleName: string,
  action: string
): boolean => {
  if (!data || !Array.isArray(data)) return false;
  const existsPermission = data.find(
    (item) =>
      item.codename === `${action}_${moduleName}` ||
      item.name.toLowerCase().includes(`${action}_${moduleName}`) ||
      item.name.toLowerCase().includes(`${action} ${moduleName}`)
  );

  return !!existsPermission && existsPermission.status;
};

export const hasPermissionForModule = (
  permissions: TPermission[],
  moduleKey: keyof typeof moduleNames
): boolean => {
  const module = moduleNames[moduleKey];

  return Object.values(actionNames).some((action) => {
    const codename = `${action}_${module}`;
    return permissions.some(
      (perm) => perm.codename === codename && perm.status
    );
  });
};

export const hasFullModuleAccess = (
  permissions: TPermission[],
  moduleName: string // Change type to string for dynamic modules
): boolean => {
  return ["view", "add", "change", "delete"].every((action) =>
    permissions.some(
      (perm) => perm.codename === `${action}_${moduleName}` && perm.status
    )
  );
};
