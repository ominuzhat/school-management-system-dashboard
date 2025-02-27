import { Select, Form } from "antd";

const GenderSelect = ({ label = "Gender", name = "gender" }) => {
  return (
    <Form.Item<any> label={label} name={name}>
      <Select placeholder="Select Gender" className="w-full">
        <Select.Option value="M">Male</Select.Option>
        <Select.Option value="F">Female</Select.Option>
        <Select.Option value="O">Other</Select.Option>
      </Select>
    </Form.Item>
  );
};

export default GenderSelect;

export const ReligionSelect = ({ label = "Religion", name = "religion" }) => {
  return (
    <Form.Item label={label} name={name}>
      <Select placeholder="Select Religion" className="w-full">
        <Select.Option value="Islam">Islam</Select.Option>
        <Select.Option value="Christianity">Christianity</Select.Option>
        <Select.Option value="Hinduism">Hinduism</Select.Option>
        <Select.Option value="Buddhism">Buddhism</Select.Option>
        <Select.Option value="Judaism">Judaism</Select.Option>
        <Select.Option value="Sikhism">Sikhism</Select.Option>
        <Select.Option value="Other">Other</Select.Option>
      </Select>
    </Form.Item>
  );
};

export const BloodGroupSelect = ({
  label = "Blood Group",
  name = "blood_group",
}) => {
  return (
    <Form.Item label={label} name={name}>
      <Select placeholder="Select Blood Group" className="w-full">
        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
          <Select.Option key={group} value={group}>
            {group}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};
