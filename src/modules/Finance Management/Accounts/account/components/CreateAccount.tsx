import { Col, Input, Row, Select, Form as AntForm } from "antd";
import { Form } from "../../../../../common/CommonAnt";
import { useCreateAccountMutation } from "../api/accountEndPoints";
import { ICreateAccount } from "../types/accountTypes";
import { useEffect } from "react";
import { MdAccountBalance } from "react-icons/md";
import { CiMobile3 } from "react-icons/ci";
import { BsCash } from "react-icons/bs";

const accountTypes = [
  {
    value: "bank",
    label: "Bank Account",
    color: "#4CAF50", // Green
    icon: <MdAccountBalance />,
  },
  {
    value: "mfs",
    label: "MFS Account",
    color: "#2196F3", // Blue
    icon: <CiMobile3 />,
  },

  {
    value: "cash",
    label: "Cash",
    color: "#7AE2CF", // Purple
    icon: <BsCash />,
  },
  // {
  //   value: "shurjoPay",
  //   label: "ShurjoPay",
  //   color: "#00809D", // Orange
  //   icon: <FaCreditCard />,
  // },
];

const { Option } = Select;

const CreateAccount = () => {
  const [create, { isLoading, isSuccess }] = useCreateAccountMutation();
  const [form] = AntForm.useForm();
  const accountType = AntForm.useWatch("account_type", form);

  console.log(accountType);

  const onFinish = (values: any): void => {
    create(values);
  };

  useEffect(() => {
    form.setFieldsValue({ account_type: accountTypes[0].value });
  }, [form]);

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
    }
  }, [form, isSuccess]);

  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
      >
        <Row gutter={[16, 16]} justify="space-between" className="mb-6">
          {accountTypes.map((account) => {
            const isSelected = accountType === account.value;
            return (
              <Col
                key={account.value}
                xs={24}
                sm={12}
                md={8}
                lg={8}
                className="transition-all duration-300"
              >
                <div
                  onClick={() =>
                    form.setFieldsValue({ account_type: account.value })
                  }
                  className={`border-2 p-4 rounded-lg cursor-pointer hover:shadow-md flex flex-col h-full transition-all duration-300 ${
                    isSelected ? "" : ""
                  }`}
                  style={{
                    borderColor: isSelected ? account.color : ``,
                    backgroundColor: isSelected ? `${account.color}10` : ``,
                  }}
                >
                  <div
                    className="text-3xl mb-2"
                    style={{ color: account.color }}
                  >
                    {account.icon}
                  </div>
                  <p className="text-lg font-medium ">{account.label}</p>
                </div>
              </Col>
            );
          })}
        </Row>

        {/* Hidden Select to retain form field value and validation */}
        <Form.Item
          name="account_type"
          rules={[{ required: true, message: "Please select an account type" }]}
          className="hidden"
        >
          <Select>
            {accountTypes.map((account) => (
              <Option key={account.value} value={account.value}>
                {account.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {accountType === "bank" && (
          <Row gutter={16}>
            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Form.Item<ICreateAccount>
                label="Bank Name"
                name="balance"
                rules={[{ required: true, message: "Bank Name is required!" }]}
              >
                <Input placeholder="Bank Name" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Form.Item<ICreateAccount>
                label="Account Name"
                name="balance"
                rules={[
                  { required: true, message: "Account Name is required!" },
                ]}
              >
                <Input placeholder="Account Name" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Form.Item<ICreateAccount>
                label="Account Number"
                name="balance"
                rules={[
                  { required: true, message: "Account Number is required!" },
                ]}
              >
                <Input placeholder="Account Number" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Form.Item<ICreateAccount>
                label="Branch Name"
                name="balance"
                rules={[
                  { required: true, message: "Branch Name is required!" },
                ]}
              >
                <Input placeholder="Branch Name" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Form.Item<ICreateAccount> label="Routing Number" name="balance">
                <Input placeholder="Routing Number" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Form.Item<ICreateAccount> label="Balance" name="balance">
                <Input addonBefore="৳" placeholder="Balance" type="number" />
              </Form.Item>
            </Col>
          </Row>
        )}

        {accountType === "mfs" && (
          <Row gutter={16}>
            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Form.Item<ICreateAccount>
                label="MFS Name"
                name="balance"
                rules={[{ required: true, message: "MFS Name is required!" }]}
              >
                <Select
                  placeholder="Select MFS"
                  showSearch
                  optionFilterProp="children"
                >
                  <Select.Option value="Rocket">
                    ROCKET — Dutch-Bangla Bank PLC.
                  </Select.Option>
                  <Select.Option value="bKash">
                    bKash — bKash LTD.
                  </Select.Option>
                  <Select.Option value="MYCash">
                    MYCash — Mercantile Bank PLC.
                  </Select.Option>
                  <Select.Option value="mCash">
                    Islami Bank mCash — Islami Bank Bangladesh PLC.
                  </Select.Option>
                  <Select.Option value="tap">
                    Trust Axiata Pay (tap) — Trust Axiata Digital PLC.
                  </Select.Option>
                  <Select.Option value="FirstCash">
                    FirstCash — First Security Islami Bank PLC.
                  </Select.Option>
                  <Select.Option value="Upay">
                    Upay — UCB Fintech Company PLC.
                  </Select.Option>
                  <Select.Option value="OK Wallet">
                    OK Wallet — One Bank PLC.
                  </Select.Option>
                  <Select.Option value="Rupali Bank">
                    Rupali Bank — Rupali Bank PLC.
                  </Select.Option>
                  <Select.Option value="TeleCash">
                    TeleCash — Southeast Bank PLC.
                  </Select.Option>
                  <Select.Option value="Islamic Wallet">
                    Islamic Wallet — Al-Arafah Islami Bank PLC.
                  </Select.Option>
                  <Select.Option value="Meghna Pay">
                    Meghna Pay — Meghna Bank PLC.
                  </Select.Option>
                  <Select.Option value="Nagad">Nagad</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Form.Item<ICreateAccount>
                label="MFS Type"
                name="balance"
                rules={[{ required: true, message: "MFS type is required!" }]}
              >
                <Select
                  placeholder="Select MFS type"
                  showSearch
                  optionFilterProp="children"
                >
                  <Select.Option value="personal">Personal</Select.Option>
                  <Select.Option value="merchant">Merchant</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Form.Item<ICreateAccount>
                label="Account Name"
                name="balance"
                rules={[
                  { required: true, message: "Account Name is required!" },
                ]}
              >
                <Input placeholder="Account Name" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Form.Item<ICreateAccount>
                label="Account Number"
                name="balance"
                rules={[
                  { required: true, message: "Account Number is required!" },
                ]}
              >
                <Input placeholder="Account Number" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Form.Item<ICreateAccount>
                label="Branch Name"
                name="balance"
                rules={[
                  { required: true, message: "Branch Name is required!" },
                ]}
              >
                <Input placeholder="Branch Name" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Form.Item<ICreateAccount> label="Balance" name="balance">
                <Input addonBefore="৳" placeholder="Balance" type="number" />
              </Form.Item>
            </Col>
          </Row>
        )}

        {accountType === "cash" && (
          <Row gutter={16}>
            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Form.Item<ICreateAccount>
                label="Account Name"
                name="balance"
                rules={[
                  { required: true, message: "Account Name is required!" },
                ]}
              >
                <Input placeholder="Account Name" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Form.Item<ICreateAccount> label="Balance" name="balance">
                <Input
                  addonBefore="৳"
                  placeholder="Balance"
                  type="number"
                />
              </Form.Item>
            </Col>
          </Row>
        )}

        {/* <Row gutter={[16, 16]}>
          <Col lg={24}>
            <Form.Item<ICreateAccount>
              label="Balance"
              name="balance"
              rules={[{ required: true, message: "Balance is required!" }]}
            >
              <Input placeholder="Balance" type="number" />
            </Form.Item>
          </Col>
        </Row> */}
      </Form>
    </div>
  );
};

export default CreateAccount;
