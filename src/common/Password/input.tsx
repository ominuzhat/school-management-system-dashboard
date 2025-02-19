import { useState } from "react";
import { Form, Input } from "antd";

const PasswordInput = () => {
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e: any) => {
    const value = e.target.value;
    setPassword(value);

    const errors: any = [];

    // Check minimum length
    if (value.length < 8) {
      errors.push("Password must be at least 8 characters long.");
    }
    // Check for all numeric passwords
    if (/^\d+$/.test(value)) {
      errors.push("Password cannot be entirely numeric or too simple.");
    }
    // Check for common passwords
    const commonPasswords = [
      "password123",
      "12345678",
      "qwerty",
      "letmein",
      "12345",
    ];
    if (commonPasswords.includes(value.toLowerCase())) {
      errors.push("Password cannot be a commonly used password.");
    }
    // Check for uppercase letter
    if (value === value.toLowerCase()) {
      errors.push("Password must have at least one uppercase letter.");
    }
  };

  return (
    <Form.Item
      label="Password"
      name="password"
      rules={[
        { required: true, message: "Password is required!" },
        { min: 8, message: "Password must be at least 8 characters long." },
        {
          pattern: /^(?!\d+$)(?!.*password).*$/,
          message: "Password cannot be entirely numeric or too simple.",
        },
        {
          validator: (_, value) => {
            if (value && value.toLowerCase() === value) {
              return Promise.reject(
                new Error("Password must have at least one uppercase letter.")
              );
            }
            return Promise.resolve();
          },
        },
        {
          validator: (_, value) => {
            const commonPasswords = [
              "password123",
              "12345678",
              "qwerty",
              "letmein",
              "12345",
            ];
            if (value && commonPasswords.includes(value.toLowerCase())) {
              return Promise.reject(
                new Error("Password cannot be a common password.")
              );
            }
            return Promise.resolve();
          },
        },
      ]}
    >
      <Input.Password
        placeholder="Enter your password."
        value={password}
        onChange={handlePasswordChange}
      />
    </Form.Item>
  );
};

export default PasswordInput;
