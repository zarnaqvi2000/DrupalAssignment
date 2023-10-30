import React from "react";
import { Button, Form, Input, InputNumber } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const Step1 = ({ onSubmit }) => {
  const [form] = Form.useForm(); // Create a form instance

  const onFinish = (values) => {
    onSubmit(values, () => {
      // After the data is submitted, reset the form.
      form.resetFields();
    });
  };

  return (
    <div>
      <h1>Personal Details</h1>
      <Form
        {...layout}
        form={form} // Set the form instance
        name="nest-messages"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item name={["Personal Details", "name"]} label="Name">
          <Input />
        </Form.Item>
        <Form.Item name={["Personal Details", "email"]} label="Email">
          <Input />
        </Form.Item>
        <Form.Item name={["Personal Details", "age"]} label="Age">
          <InputNumber />
        </Form.Item>
        <Form.Item name={["Personal Details", "Gender"]} label="Gender">
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 8,
          }}
        >
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Form.Item>
      </Form>
    </div>
  );    
};

export default Step1;

