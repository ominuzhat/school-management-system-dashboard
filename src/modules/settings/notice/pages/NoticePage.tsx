import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Table } from "../../../../common/CommonAnt";
import { useGetNoticeQuery } from "../api/noticeEndPoints";
import { SearchComponent } from "../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { useState } from "react";
import useNoticeColumns from "../utils/noticeColumns";
import CreateNotice from "../components/CreateNotice";

const NoticePage = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({ search: "" });

  const { data: noticeList, isLoading } = useGetNoticeQuery({
    search: filters.search,
  });

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
                    title: "Add Notice",
                    content: <CreateNotice />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Add Notice
            </Button>
          </Col>
          <Col lg={8} xs={12}>
            <SearchComponent
              onSearch={(value) =>
                setFilters((prev) => ({ ...prev, search: value }))
              }
              placeholder="Search Notice"
            />
          </Col>
        </Row>
      </Card>

      <Table
        loading={isLoading}
        total={noticeList?.data?.results?.length}
        dataSource={noticeList?.data?.results || []}
        columns={useNoticeColumns()}
      />
    </div>
  );
};

export default NoticePage;
