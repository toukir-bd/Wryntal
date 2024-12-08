"use client";
import React from "react";
import Image from "next/image";
import Items from "../../assets/auth.jpg";
import { Icon } from "@iconify/react";
import { DatePicker, Space, Button, Form, Input, Rate } from "antd";
import type { DatePickerProps } from "antd";

const onChange: DatePickerProps["onChange"] = (date, dateString) => {
  console.log(date, dateString);
};

const App: React.FC = () => (
  <section className="lg:py-16 py-6 w-full bg-slate-100">
    <div className="max-w-7xl mx-auto w-full relative lg:px-8 px-6">
      <div className="grid lg:grid-cols-2 grid-cols-1 lg:space-x-5 space-x-0">
        <div className="col-span-1 lg:order-first order-last">
          <div className="bg-white rounded-[15px] px-7 pt-5 pb-8 shadow-md">
            <h1 className="text-[22px] text-slate-700 font-semibold w-full border-b border-[#e9e9e9] pb-2 mb-5">
              Payment Details
            </h1>
            <Form
              name="basic"
              labelCol={{ span: 30 }}
              initialValues={{ remember: true }}
              layout="vertical"
            >
              <div className="grid sm:grid-cols-2 grid-cols-1 sm:space-x-5 space-x-0">
                <Form.Item label="Start Date" name="st-date" className="mb-4">
                  <Space direction="vertical" className="w-full">
                    <DatePicker onChange={onChange} />
                  </Space>
                </Form.Item>
                <Form.Item label="End Date" name="ed-date" className="mb-4">
                  <Space direction="vertical" className="w-full">
                    <DatePicker onChange={onChange} />
                  </Space>
                </Form.Item>
              </div>
              <Form.Item
                label="Delivery Address"
                name="dlv-address"
                className="mb-4"
                rules={[
                  {
                    max: 60,
                    message: "Address must be less than 60 characters.",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Type address here.."
                  maxLength={60}
                />
              </Form.Item>
              <Form.Item
                label="Credit Card Number"
                name="crd-number"
                className="mb-4"
              >
                <Input
                  size="large"
                  placeholder="Type the digits.."
                  maxLength={60}
                />
              </Form.Item>
              <div className="border-t border-b border-[#e9e9e9] space-y-3 py-3 text-[13px] font-[600] text-slate-500">
                <div className="flex justify-between items-center">
                  <span>Rent Price</span>
                  <span className="text-[#2a3647]">$94 ($48 x 2)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>
                    Delivery Fee <span className="text-[#FF715B]">(km)</span>
                  </span>
                  <span className="text-[#2a3647]">$100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>
                    Service Fee <span className="text-[#FF715B]">(3%)</span>
                  </span>
                  <span className="text-[#2a3647]">$100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>
                    Tax <span className="text-[#FF715B]">(13%)</span>
                  </span>
                  <span className="text-[#2a3647]">$29</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="text-[#2a3647]">$48</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Total Amount</span>
                  <span className="text-[#2a3647]">$350</span>
                </div>
              </div>
              <Form.Item className="mb-0">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="mt-6 h-[52px] text-[16px] checkout-btn"
                  href="/receipt"
                >
                  Confirm Order
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="col-span-1 lg:order-last order-first">
          <div className="bg-white rounded-[15px] px-7 pt-5 pb-8 lg:mb-0 mb-6 shadow-md">
            <h1 className="text-[22px] text-slate-700 font-semibold w-full border-b border-[#e9e9e9] pb-2 mb-5">
              Item Details
            </h1>
            <div className="grid sm:grid-cols-7 grid-cols-1 sm:space-x-5 space-x-0 items-center border-b border-[#e9e9e9] pb-5">
              <div className="col-span-2 relative sm:w-full w-[240px] h-[100px] rounded-lg overflow-hidden sm:mb-0 mb-3">
                <Image
                  src={Items}
                  alt="hill"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 200px) 100vw, (max-width: 200px) 50vw, 25vw"
                />
              </div>
              <div className="col-span-5 relative">
                <div className="flex items-center justify-between">
                  <span className="text-[#0094FF] text-[13px] font-[600]">
                    Bicycles
                  </span>
                  <span className="text-slate-700 text-[13px] font-[500] flex items-center">
                    <Icon
                      icon="iconoir:map-pin"
                      width="20"
                      height="20"
                      className="me-1"
                    />
                    Gilgit <span className="text-[#FF715B] ms-1">(39Km)</span>
                  </span>
                </div>
                <h2 className="text-[17px] leading-[19px] font-[600] text-slate-700 my-2 width-200">
                  Ibis ripmo v2 xt trail mountain bike another
                </h2>
                <div className="flex items-center justify-between">
                  <Rate disabled defaultValue={4} />
                  <span className="flex items-center">
                    <span className="text-[20px] font-semibold text-slate-700 me-1">
                      $48
                    </span>
                    <span className="text-[13px] font-[500] text-slate-400">
                      /per day
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="relative mt-2 pt-2">
              <h1 className="text-[18px] font-semibold text-[#FF715B] mb-1">
                Notice
              </h1>
              <p className="text-[13px] font-[500] text-slate-600">
                No refund if cancelled within 24 hours of the rent start date.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default App;
