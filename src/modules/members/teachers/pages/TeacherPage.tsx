/* eslint-disable react-hooks/rules-of-hooks */
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
import useTeacherColumns from "../utils/teacherColumns";
import { useGetTeacherQuery } from "../api/teachersEndPoints";
import UpdateTeacher from "../components/UpdateTeacher";
import { useAppSelector } from "../../../../app/store";
import { FilterState } from "../../../../app/features/filterSlice";

const TeacherPage = () => {
  const dispatch = useDispatch();
  const [layout, setLayout] = useState("grid");
  const [filters, setFilters] = useState({ search: "", is_active: "" });

  const { page_size, page } = useAppSelector(FilterState);

  const {
    data: teacherData,
    isLoading,
    refetch,
    isFetching,
  } = useGetTeacherQuery({
    search: filters.search,
    is_active: filters.is_active,
    page_size: page_size,
    page: Number(page) || undefined,
  });

  const handleDelete = async (id: any) => {
    console.log(id);
    try {
      // await deleteCartItem({ id }).unwrap();
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
              <Col lg={8} xs={12}>
                <Select
                  placeholder="Select Active"
                  className="w-full"
                  allowClear
                  onChange={(value) =>
                    setFilters((prev) => ({ ...prev, is_active: value }))
                  }
                >
                  <Select.Option value={true}>ACTIVE</Select.Option>
                  <Select.Option value={false}>INACTIVE</Select.Option>
                </Select>
              </Col>
              <Col lg={16} xs={12}>
                <SearchComponent
                  onSearch={(value) =>
                    setFilters((prev) => ({ ...prev, search: value }))
                  }
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
              <FaListUl
                className={`w-9 h-9 border px-2 cursor-pointer ${
                  layout === "grid"
                    ? "text-blue-500 border-blue-500"
                    : "text-gray-500"
                }`}
                onClick={() => setLayout("grid")}
              />
              <IoGridOutline
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
        {layout !== "grid" ? (
          <Row gutter={[16, 16]}>
            {teacherData?.data?.results?.map((teacher: any, index: number) => (
              <Col key={index} span={3} xs={12} lg={8} xxl={3}>
                <div
                  style={{
                    textAlign: "center",
                  }}
                  className="border py-8 px-2 rounded-lg space-y-2"
                >
                  <img src={no_img} alt="image" className="mx-auto" />
                  <p> {teacher?.id}</p>
                  <p className="font-serif">
                    {teacher?.first_name} {teacher?.last_name}
                  </p>
                  <div className="space-x-2">
                    <ViewButton to={`teacher-view/${teacher?.id}`} />
                    <EditButton
                      onClick={() =>
                        dispatch(
                          showModal({
                            title: "Update Teacher",
                            content: <UpdateTeacher record={teacher} />,
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
            rowKey={"id"}
            loading={isLoading || isFetching}
            refetch={refetch}
            total={teacherData?.data?.results?.length}
            dataSource={teacherData?.data?.results}
            columns={useTeacherColumns()}
          />
        )}
      </Card>
    </div>
  );
};

export default TeacherPage;
