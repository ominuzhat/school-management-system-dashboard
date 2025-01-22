import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Table } from "../../../../common/CommonAnt";
import { useGetAdmissionSessionQuery } from "../api/admissionSessionEndPoints";
import useAdmissionSessionsColumns from "../utils/admissionSessionColumns";
import CreateAdmissionSessions from "../components/CreateAdmissionSessions";
import { IAdmissionSession } from "../type/admissionSessionType";

const AdmissionSessionPage = () => {
  const dispatch = useDispatch();
  const { data: getAdmissionSessions, isLoading } = useGetAdmissionSessionQuery(
    {}
  );

  const dataLength =
    (getAdmissionSessions?.data as IAdmissionSession[] | undefined)?.length ??
    0;

  const dataSource =
    (getAdmissionSessions?.data as IAdmissionSession[] | undefined) ?? [];

  return (
    <div className="space-y-5">
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Card>
        <Row justify="space-between" gutter={[10, 10]}>
          <Col lg={4} xs={24}>
            <Button
              type="primary"
              onClick={() =>
                dispatch(
                  showModal({
                    title: "Add Addmission Session",
                    content: <CreateAdmissionSessions />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Add Addmission Session
            </Button>
          </Col>
        </Row>
      </Card>
      <Card>
        <Table
          loading={isLoading}
          total={dataLength}
          dataSource={dataSource}
          columns={useAdmissionSessionsColumns()}
        />
      </Card>
    </div>
  );
};

export default AdmissionSessionPage;
