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

// Fixed GetMenuPermission function
// export const GetMenuPermission = (moduleName: string, actions: string[]): boolean => {
//   return actions.some(action =>
//     permissions.some(
//       permission =>
//         permission.name === `${action}_${moduleName}` &&
//         permission.status
//     )
//   );
// };

// Example usage

// const menuPermissionResult = GetMenuPermission(moduleNames.logentry, [
//   actionNames.change,
//   actionNames.view,
// ]);
// console.log('Menu permission check:', menuPermissionResult);
