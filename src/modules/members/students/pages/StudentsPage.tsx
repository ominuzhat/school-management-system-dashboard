/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { Button, Card, Col, Row, Select } from "antd";
import { IoGridOutline } from "react-icons/io5";
import { PlusOutlined } from "@ant-design/icons";
import { FaListUl } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { SearchComponent } from "../../../../common/CommonAnt/CommonSearch/CommonSearch";
import ViewButton from "../../../../common/CommonAnt/Button/ViewButton";
import DeleteButton from "../../../../common/CommonAnt/Button/DeleteButton";
import Table from "../../../../common/CommonAnt/Table";
import { useAppSelector } from "../../../../app/store";
import { no_img } from "../../../../utilities/images";

import { useGetStudentsQuery } from "../api/studentEndPoints";
import useStudentColumns from "../utils/studentColumns";
import { FilterState } from "../../../../app/features/filterSlice";

const StudentsPage = () => {
  // const dispatch = useDispatch();
  const [layout, setLayout] = useState("grid");
  const [filters, setFilters] = useState({ search: "", is_active: "" });
  const { page_size, page } = useAppSelector(FilterState);

  // Fetch students data with pagination
  const {
    data: studentData,
    isLoading,
    refetch,
    isFetching,
  } = useGetStudentsQuery({
    search: filters.search,
    is_active: filters.is_active,
    page_size: page_size,
    page: Number(page) || undefined,
  });

  const handleDelete = async (id: any) => {
    console.log(id);
    try {
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
            <Link to={"/students/create"}>
              <Button type="primary" icon={<PlusOutlined />} className="w-full">
                Add Student
              </Button>
            </Link>
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
                  placeholder="Search students"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
      <Card
        title={
          <div className="flex justify-between items-center">
            <span>All Students</span>
            <div className="flex items-center">
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
            {studentData?.data?.results?.map((student: any, index) => (
              <Col key={index} span={3} xs={12} lg={8} xxl={3}>
                <div className="border py-8 px-2 rounded-lg space-y-2 text-center">
                  <img src={no_img} alt="student" className="mx-auto" />
                  <p className="font-serif">
                    {student?.first_name} {student?.last_name}
                  </p>
                  <div className="space-x-2">
                    <ViewButton to={`student-view/${student?.id}`} />
                    <Link to={`/students/update/${student.id}`}>
                      <Button
                        title="Edit"
                        size="small"
                        type="default"
                        style={{
                          color: "#FFA500",
                          border: "1px solid #FFA500",
                        }}
                      >
                        <FaEdit />
                      </Button>
                    </Link>
                    <DeleteButton
                      onConfirm={() => handleDelete(student?.id)}
                      onCancel={() => console.log("Cancel delete")}
                    />
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
            total={studentData?.data?.count}
            dataSource={studentData?.data?.results}
            columns={useStudentColumns()}
          />
        )}
      </Card>
    </div>
  );
};

export default StudentsPage;
