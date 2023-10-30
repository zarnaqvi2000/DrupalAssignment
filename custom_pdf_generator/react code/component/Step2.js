import React, { useState } from "react";
import { Button, Form, Input, InputNumber } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const Step2 = ({ onSubmit }) => {
  const [form] = Form.useForm(); // Create a form instance

  const onFinish = (values) => {
    onSubmit(values);
    form.resetFields(); // Reset the form after submission
  };

  return (
    <div>
      <h1>Educational Details</h1>
      <Form
        {...layout}
        form={form}
        name="nest-messages"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item name={['Educational Details', 'BTech']} label="BTech Branch">
          <Input />
        </Form.Item>
        <Form.Item name={['Educational Details', 'CGPA']} label="CGPA">
          <Input />
        </Form.Item>
        <Form.Item name={['Educational Details', 'Passing Year']} label="Passing Year">
          <InputNumber />
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

export default Step2;

