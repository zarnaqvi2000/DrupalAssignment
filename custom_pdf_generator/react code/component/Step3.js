import React, { useState } from "react";
import { Button, Form, Input } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const Step3 = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <div>
      <h1>Professional Details</h1>
      <Form
        {...layout}
        form={form}
        name="nest-messages"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item name={['Professional', 'Company Name']} label="Company Name">
          <Input />
        </Form.Item>
        <Form.Item name={['Professional', 'Designation']} label="Designation">
          <Input />
        </Form.Item>
        <Form.Item name={['Professional', 'Technology Working']} label="Current Technology">
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 8,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit and Generate PDF
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Step3;



 
