import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import { useGetDashboardDataQuery } from "../modules/Dashboard/api/dashoboardEndPoints";
import { hasFullModuleAccess } from "../utilities/permission";
import { Spin } from "antd";

interface WithPermissionProps {
  requiredPermission: string; // Change type to string for dynamic keys
  children: ReactNode;
}

const WithPermission = ({
  requiredPermission,
  children,
}: WithPermissionProps) => {
  const {
    data: dashboardData,
    isLoading,
    isError,
  } = useGetDashboardDataQuery({});
  const [hasAccess, setHasAccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isError && dashboardData) {
      const permissions = dashboardData?.data?.permissions || [];
      const access = hasFullModuleAccess(permissions, requiredPermission); // Pass string module name

      if (access) {
        setHasAccess(true);
      } else {
        navigate("/"); // Redirect if no access
      }
    }
  }, [dashboardData, isLoading, isError, navigate, requiredPermission]);

  if (isLoading)
    return (
      <div>
        <Spin />
      </div>
    );
  if (isError) return <div>Error loading permissions</div>;

  return hasAccess ? <>{children}</> : <div>No access to this page</div>;
};

export default WithPermission;
