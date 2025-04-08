import { Badge, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import BasicInformation from "../components/BasicInformation";
import { no_img } from "../../../../utilities/images";
import WelcomeInstitute from "../components/WelcomeInstitute";
import { useGetInstituteProfileQuery } from "../api/instituteProfileEndPoint";
import SocialInformation from "../components/SocialInformation";
import AdditionalInformation from "../components/AdditionalInformation";
import EditButton from "../../../../common/CommonAnt/Button/EditButton";
import UpdateInstituteProfile from "../components/UpdateInstituteProfile";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import { useGetDashboardDataQuery } from "../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../utilities/permissionConstant";
import NoPermissionData from "../../../../utilities/NoPermissionData";

const InstituteProfile = () => {
  const dispatch = useDispatch();
  const { data: instituteProfile }: any = useGetInstituteProfileQuery({});

  const { data: dashboardData } = useGetDashboardDataQuery({});
  // const columns = useAccountColumns();

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.institution,
    actionNames.view
  );

  return (
    <div>
      <div className="my-5">
        <BreadCrumb />
      </div>

      {viewPermission ? (
        <Row gutter={[16, 8]}>
          <Col span={24} lg={24}>
            <Row
              gutter={[8, 8]}
              style={{
                display: "flex",
                alignItems: "stretch",
              }}
            >
              <Col lg={6} style={{ display: "flex", flexDirection: "column" }}>
                <Card className="text-center" style={{ flex: 1 }}>
                  <img
                    src={
                      (instituteProfile?.data?.logo &&
                        instituteProfile?.data?.logo) ||
                      no_img
                    }
                    className="mx-auto "
                    style={{ width: "12rem" }}
                  />
                  <br />
                  <EditButton
                    onClick={() =>
                      dispatch(
                        showModal({
                          title: "Update Institute Profile",
                          content: (
                            <UpdateInstituteProfile record={instituteProfile} />
                          ),
                        })
                      )
                    }
                  />
                </Card>
              </Col>

              <Col lg={18} style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ flex: 1 }}>
                  <WelcomeInstitute name={instituteProfile?.data?.name} />
                </div>
              </Col>
            </Row>
          </Col>

          <Col span={24} lg={24}>
            <Badge.Ribbon text="Basic Information" placement="start">
              <Card className="py-5">
                <BasicInformation data={instituteProfile?.data} />
              </Card>
            </Badge.Ribbon>
          </Col>
          <Col span={24} lg={24}>
            <Badge.Ribbon text="Additional Information" placement="start">
              <Card className="py-5">
                <AdditionalInformation data={instituteProfile?.data} />
              </Card>
            </Badge.Ribbon>
          </Col>
          <Col span={24} lg={24}>
            <Badge.Ribbon text="Social Information" placement="start">
              <Card className="py-5">
                <SocialInformation data={instituteProfile?.data} />
              </Card>
            </Badge.Ribbon>
          </Col>
        </Row>
      ) : (
        <NoPermissionData />
      )}
    </div>
  );
};

export default InstituteProfile;
