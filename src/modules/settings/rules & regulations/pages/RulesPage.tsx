import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Table } from "../../../../common/CommonAnt";
import { SearchComponent } from "../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { useState } from "react";
import { useGetRuleQuery } from "../api/rulesEndPoints";
import useRulesColumns from "../utils/rulesColumns";
import CreateRules from "../components/CreateRules";

const RulesPage = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({ search: "" });

  const { data: rulesList, isLoading } = useGetRuleQuery({
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
                    title: "Add Rule",
                    content: <CreateRules />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Add Rule
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
        total={rulesList?.data?.results?.length}
        dataSource={rulesList?.data?.results || []}
        columns={useRulesColumns()}
      />
    </div>
  );
};

export default RulesPage;
