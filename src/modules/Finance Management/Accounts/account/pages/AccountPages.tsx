import { Button, Card, Col, Row } from "antd";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { useGetAccountQuery } from "../api/accountEndPoints";
import BreadCrumb from "../../../../../common/BreadCrumb/BreadCrumb";
import { showModal } from "../../../../../app/features/modalSlice";
import useAccountColumns from "../utils/accountColumns";
import { IGetAccount } from "../types/accountTypes";
import CreateAccount from "../components/CreateAccount";
import { Table } from "../../../../../common/CommonAnt";

const AccountPage = () => {
  const dispatch = useDispatch();
  const { data: accountList, isLoading } = useGetAccountQuery({});

  const dataLength = (accountList?.data as IGetAccount[] | any)?.length ?? 0;

  const dataSource = (accountList?.data as IGetAccount[] | undefined) ?? [];

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
                    title: "Add Account",
                    content: <CreateAccount />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Add Account
            </Button>
          </Col>
        </Row>
      </Card>

      <Table
        loading={isLoading}
        total={dataLength}
        dataSource={dataSource}
        columns={useAccountColumns()}
      />
    </div>
  );
};

export default AccountPage;
