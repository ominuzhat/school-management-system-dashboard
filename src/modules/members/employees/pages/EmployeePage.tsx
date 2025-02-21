/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Card, Col, Row } from "antd";
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
import { useGetEmployeeQuery } from "../api/employeeEndPoints";
import useEmployeeColumns from "../utils/employeeColumns";
import CreateEmployee from "../components/CreateEmployee";
import UpdateEmployee from "../components/UpdateEmployee";

const EmployeePage = () => {
  const [layout, setLayout] = useState("grid");
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const { data: employeeData, isLoading } = useGetEmployeeQuery({
    search: search,
  });

  const employeeColumns = useEmployeeColumns();

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
                    title: "Add Employee",
                    content: <CreateEmployee />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Add Employee
            </Button>
          </Col>
          <Col lg={6} xs={24}>
            <SearchComponent
              onSearch={(value) => setSearch(value)}
              placeholder="Search employees"
            />
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
            <span>All Employee</span>

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
            {employeeData?.data?.results?.map((employee: any, index) => (
              <Col key={index} span={3} xs={12} lg={8} xxl={3}>
                <div
                  style={{
                    textAlign: "center",
                  }}
                  className="border py-8 px-2 rounded-lg space-y-2"
                >
                  <img src={no_img} alt="image" className="mx-auto" />
                  <p> {employee?.id}</p>
                  <p className="font-serif">
                    {employee?.first_name} {employee?.last_name}
                  </p>
                  <div className="space-x-2">
                    <ViewButton to={`employee-view/${employee?.id}`} />
                    <EditButton
                      onClick={() =>
                        dispatch(
                          showModal({
                            title: "Update Employee",
                            content: <UpdateEmployee records={employee} />,
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
            loading={isLoading}
            total={employeeData?.data?.results?.length}
            dataSource={employeeData?.data?.results}
            columns={employeeColumns}
          />
        )}
      </Card>
    </div>
  );
};

export default EmployeePage;
