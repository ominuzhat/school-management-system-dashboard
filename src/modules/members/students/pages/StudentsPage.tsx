import { Button, Card, Col, Row, Select } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { SearchComponent } from "../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { useState } from "react";
import { showModal } from "../../../../app/features/modalSlice";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { no_img } from "../../../../utilities/images";
import EditButton from "../../../../common/CommonAnt/Button/EditButton";
import UpdateService from "../../../service/components/UpdateService";
import ViewButton from "../../../../common/CommonAnt/Button/ViewButton";
import DeleteButton from "../../../../common/CommonAnt/Button/DeleteButton";
import CreateStudent from "../components/CreateStudent";
import UpdateStudent from "../components/UpdateStudent";

const StudentsPage = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const handleDelete = async (id: any) => {
    try {
      await deleteCartItem({ id }).unwrap();
      console.log("Item deleted successfully");
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };
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
                    title: "Add Student",
                    content: <CreateStudent />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Add Student
            </Button>
          </Col>
          <Col lg={10} xs={24}>
            <Row justify="space-between" gutter={[16, 0]}>
              <Col lg={12} xs={12}>
                <Select placeholder="Select Class" className="w-full">
                  {/* {categoryData?.data?.map((category) => (
                  <Select.Option key={category.id} value={category?.id}>
                    {category?.name}
                  </Select.Option>
                ))} */}

                  <Select.Option value={1}>1</Select.Option>
                </Select>
              </Col>
              <Col lg={12} xs={12}>
                <SearchComponent
                  onSearch={(value) => setSearch(value)}
                  placeholder="Search students"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
      <Card title="All Students">
        <Row gutter={[16, 16]}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Col key={index} span={3} xs={12} lg={8} xxl={3}>
              <div
                style={{
                  background: "#ffffff",
                  textAlign: "center",
                }}
                className="border py-8 px-2 rounded-lg space-y-2"
              >
                <img src={no_img} alt="image" className="mx-auto" />
                <p> {index + 1}</p>
                <p className="font-serif"> Omi Hasan {index + 1} </p>
                <div className="space-x-2">
                  <ViewButton to={`product-view/${index + 1}`} />
                  <EditButton
                    onClick={() =>
                      dispatch(
                        showModal({
                          title: "Update Student",
                          content: <UpdateStudent record={"record"} />,
                        })
                      )
                    }
                  />
                  <DeleteButton
                    onConfirm={() => handleDelete(1)}
                    onCancel={() => console.log("Cancel delete")}
                  ></DeleteButton>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
};

export default StudentsPage;
