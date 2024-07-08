import { Button, Card, Col, Flex, Input, Row, Typography } from "antd";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import Iconify from "../IconifyConfig/IconifyConfig";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import "./Container.css";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import { setKey } from "../../app/features/filterSlice";
import { showModal } from "../../app/features/modalSlice";

interface Props {
  headerTitle: string;
  content: React.ReactNode;
  buttonLabel?: string;
  showButton?: boolean;
  openModal?: { title: string; content: React.ReactNode };
  additionalContent?: React.ReactNode;
}

const Container: React.FC<Props> = ({
  headerTitle,
  content,
  buttonLabel = "Create",
  showButton = true,
  openModal,
  additionalContent,
}) => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState<string | undefined>(undefined);

  const debouncedSearch = useMemo(
    () =>
      debounce((text: string | undefined) => {
        if (text?.trim()) {
          dispatch(setKey(text));
        } else {
          dispatch(setKey(undefined));
        }
      }, 500),
    [dispatch]
  );

  useEffect(() => {
    debouncedSearch(search);
    return () => debouncedSearch.cancel();
  }, [search, debouncedSearch]);

  return (
    <React.Fragment>
      <div>
        <Flex align="center" justify="space-between" gap={8}>
          <Typography.Text className="container-header-title">
            {headerTitle}
          </Typography.Text>
          {showButton && (
            <Button
              // onClick={openModal}
              onClick={() => dispatch(showModal(openModal))}
              icon={<Iconify name="ant-design:plus-outlined" />}
              type="primary"
            >
              {buttonLabel}
            </Button>
          )}
        </Flex>

        <BreadCrumb />

        <Row gutter={[10, 10]}>
          <Col span={24} lg={4}>
            <Input
              allowClear
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearch && setSearch(e.target.value.trim())
              }
              prefix={<Iconify name="lucide:search" />}
              placeholder="Search..."
            />
          </Col>
          <Col span={24} lg={20}>
            <Flex align="center" justify="end" gap={8}>
              {additionalContent}
              <Button
                type="default"
                icon={<Iconify name="clarity:filter-line" width={18} />}
              />
            </Flex>
          </Col>
        </Row>
        <br />
        <Card size="small" draggable={"true"} style={{ border: "none" }}>
          {content}
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Container;
