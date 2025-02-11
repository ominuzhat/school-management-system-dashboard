import { Button, Card, Col, Row, Select } from "antd";
import BreadCrumb from "../../../../../common/BreadCrumb/BreadCrumb";
import { useDispatch } from "react-redux";
import { showModal } from "../../../../../app/features/modalSlice";
import CreateFees from "../components/CreateFees";
import { PlusOutlined } from "@ant-design/icons";
import { Table } from "../../../../../common/CommonAnt";
import { useGetFeesQuery } from "../api/feesEndpoints";
import useFeesColumns from "../utils/FeesColumns";
import { useGetClassesQuery } from "../../../../general settings/classes/api/classesEndPoints";

const FeesPage = () => {
  const dispatch = useDispatch();
  const { data: feesList, isLoading } = useGetFeesQuery({});
  const { data: classData } = useGetClassesQuery({});
  // const [search, setSearch] = useState("");

  const dataLength = (feesList?.data as any[] | undefined)?.length ?? 0;

  const dataSource = (feesList?.data as any[] | undefined) ?? [];

  return (
    <div>
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
                    title: "Add Fees",
                    content: <CreateFees />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Add Fees
            </Button>
          </Col>
          <Col lg={10} xs={24}>
            <Row justify="space-between" gutter={[16, 0]}>
              <Col lg={12} xs={12}>
                <Select placeholder="Select Class" className="w-full">
                  {Array?.isArray(classData?.data) &&
                    classData?.data?.map((data) => (
                      <Select.Option key={data.id} value={data?.id}>
                        {data?.name}
                      </Select.Option>
                    ))}
                </Select>
              </Col>
              {/* <Col lg={12} xs={12}>
                <SearchComponent
                  onSearch={(value) => setSearch(value)}
                  placeholder="Search students"
                />
              </Col> */}
            </Row>
          </Col>
        </Row>
      </Card>

      <Table
        loading={isLoading}
        total={dataLength}
        dataSource={dataSource}
        columns={useFeesColumns()}
      />
    </div>
  );
};

export default FeesPage;
