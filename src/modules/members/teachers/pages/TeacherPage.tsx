import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Card, Col, Row, Select } from "antd";
import { IoGridOutline } from "react-icons/io5";
import { PlusOutlined } from "@ant-design/icons";

import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { SearchComponent } from "../../../../common/CommonAnt/CommonSearch/CommonSearch";
import EditButton from "../../../../common/CommonAnt/Button/EditButton";
import ViewButton from "../../../../common/CommonAnt/Button/ViewButton";
import DeleteButton from "../../../../common/CommonAnt/Button/DeleteButton";
import { Table } from "../../../../common/CommonAnt";

import { showModal } from "../../../../app/features/modalSlice";

import { no_img } from "../../../../utilities/images";

import { FaListUl } from "react-icons/fa6";
import CreateTeacher from "../components/CreateTeacher";
import UpdateTeacher from "../components/UpdateTeacher";
import teacherColumns from "../utils/teacherColumns";

const TeacherPage = () => {
  const [layout, setLayout] = useState("grid");
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
                    title: "Add Teacher",
                    content: <CreateTeacher />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Add Teacher
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
                  placeholder="Search Teacher"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
      <Card
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>All Teacher</span>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <IoGridOutline
                className={`w-9 h-9 border px-2 cursor-pointer ${
                  layout === "grid"
                    ? "text-blue-500 border-blue-500"
                    : "text-gray-500"
                }`}
                onClick={() => setLayout("grid")}
              />

              <FaListUl
                className={`w-9 h-9 border px-2 cursor-pointer ${
                  layout === "column"
                    ? "text-blue-500 border-blue-500"
                    : "text-gray-500"
                }`}
                onClick={() => setLayout("column")}
              />
            </div>
          </div>
        }
      >
        {layout === "grid" ? (
          <Row gutter={[16, 16]}>
            {Array.from({ length: 10 }).map((_, index) => (
              <Col key={index} span={3} xs={12} lg={8} xxl={3}>
                <div
                  style={{
                    textAlign: "center",
                  }}
                  className="border py-8 px-2 rounded-lg space-y-2"
                >
                  <img src={no_img} alt="image" className="mx-auto" />
                  <p> {index + 1}</p>
                  <p className="font-serif"> Omi Hasan {index + 1} </p>
                  <div className="space-x-2">
                    <ViewButton to={`student-view/1`} />
                    <EditButton
                      onClick={() =>
                        dispatch(
                          showModal({
                            title: "Update Student",
                            content: <UpdateTeacher record={"record"} />,
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
        ) : (
          <Table
            loading={true}
            total={0}
            dataSource={[]}
            columns={teacherColumns()}
          />
        )}
      </Card>
    </div>
  );
};

export default TeacherPage;
